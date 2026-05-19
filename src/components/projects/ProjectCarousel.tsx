import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { PROJECTS, type Project } from '../../data/projects';
import { useCarouselFocus } from '../../hooks/useCarouselFocus';
import {
  getCenteredSlot,
  getScrollTargetForSlot,
  smoothScrollTo,
} from '../../lib/carouselScroll';

const ProjectPdfPreview = lazy(() => import('./ProjectPdfPreview'));

const PdfPreviewFallback = () => (
  <div className="rk-project-pdf-preview rk-project-pdf-preview--loading" aria-hidden />
);

const REPEAT = 3;
const MIDDLE_COPY = 1;

type CarouselItem = Project & { slot: number; copy: number };

function buildItems(): CarouselItem[] {
  const items: CarouselItem[] = [];
  for (let copy = 0; copy < REPEAT; copy += 1) {
    PROJECTS.forEach((project, i) => {
      items.push({
        ...project,
        copy,
        slot: copy * PROJECTS.length + i,
      });
    });
  }
  return items;
}

const CAROUSEL_ITEMS = buildItems();
const COUNT = PROJECTS.length;

type CarouselCardProps = {
  item: CarouselItem;
  registerNode: (slot: number, node: HTMLElement | null) => void;
  onCardClick: (realIndex: number, githubUrl?: string) => void;
  loadPdf: boolean;
  isCenter: boolean;
};

const CarouselCard: React.FC<CarouselCardProps> = ({
  item,
  registerNode,
  onCardClick,
  loadPdf,
  isCenter,
}) => {
  const ref = useRef<HTMLElement>(null);
  const Icon = item.icon;
  const hasPdf = Boolean(item.previewPdf);
  const realIdx = item.slot % COUNT;

  useLayoutEffect(() => {
    registerNode(item.slot, ref.current);
    return () => registerNode(item.slot, null);
  }, [item.slot, registerNode]);

  return (
    <article
      ref={ref}
      data-carousel-slot={item.slot}
      className="rk-project-card rk-project-card--carousel"
      onClick={() => onCardClick(realIdx, item.githubUrl)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCardClick(realIdx, item.githubUrl);
        }
      }}
      tabIndex={isCenter ? 0 : -1}
      role="group"
      aria-label={item.title}
    >
      <div
        className={`rk-project-card-media ${item.previewClass}${
          hasPdf ? ' rk-project-card-media--pdf' : ''
        }`}
      >
        {item.previewPdf && loadPdf ? (
          <Suspense fallback={<PdfPreviewFallback />}>
            <ProjectPdfPreview src={item.previewPdf} />
          </Suspense>
        ) : null}
        <div
          className={`rk-project-card-media-inner${
            hasPdf ? ' rk-project-card-media-inner--fallback' : ''
          }`}
        >
          <Icon size={48} strokeWidth={1.25} color="rgba(232, 113, 58, 0.42)" />
        </div>
      </div>
      <div className="rk-project-card-body">
        <h3 className="rk-project-card-title">{item.title}</h3>
        <p className="rk-project-card-desc">{item.description}</p>
        <div className="rk-project-card-tags">
          {item.technologies.map((tech) => (
            <span key={tech} className="rk-project-card-tag">
              {tech}
            </span>
          ))}
        </div>
        {item.githubUrl ? (
          <a
            href={item.githubUrl}
            className="rk-project-card-link"
            target="_blank"
            rel="noopener noreferrer"
            data-bird-perch
            onClick={(e) => e.stopPropagation()}
          >
            View Project →
          </a>
        ) : null}
      </div>
    </article>
  );
};

const ProjectCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const registerNode = useCarouselFocus(scrollRef);
  const [activeIndex, setActiveIndex] = useState(0);
  const wasDragged = useRef(false);
  const dragCleanupRef = useRef<(() => void) | null>(null);

  const realIndex = (slot: number) => ((slot % COUNT) + COUNT) % COUNT;

  useEffect(() => {
    return () => {
      dragCleanupRef.current?.();
    };
  }, []);

  const syncActive = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const next = realIndex(getCenteredSlot(el));
    setActiveIndex((prev) => (prev === next ? prev : next));
  }, []);

  const wrapScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || COUNT === 0) return;
    const setWidth = el.scrollWidth / REPEAT;
    const { scrollLeft } = el;
    if (scrollLeft < setWidth * 0.55) {
      el.scrollLeft += setWidth;
    } else if (scrollLeft > setWidth * 2.45) {
      el.scrollLeft -= setWidth;
    }
    syncActive();
  }, [syncActive]);

  const scrollToSlot = useCallback((slot: number, smooth = true) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = getScrollTargetForSlot(el, slot);
    if (smooth) smoothScrollTo(el, target);
    else el.scrollLeft = target;
    setActiveIndex(realIndex(slot));
  }, []);

  const scrollToRealIndex = useCallback(
    (index: number, smooth = true) => {
      const el = scrollRef.current;
      if (!el) return;
      const currentSlot = getCenteredSlot(el);
      const currentCopy = Math.floor(currentSlot / COUNT);
      scrollToSlot(currentCopy * COUNT + index, smooth);
    },
    [scrollToSlot],
  );

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const startSlot = MIDDLE_COPY * COUNT;
    el.scrollLeft = getScrollTargetForSlot(el, startSlot);
    syncActive();
  }, [syncActive]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      syncActive();
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(wrapScroll, 120);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
    };
  }, [syncActive, wrapScroll]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      const el = scrollRef.current;
      if (!el) return;

      const startX = e.pageX;
      const startScroll = el.scrollLeft;
      let moved = false;

      el.classList.add('rk-projects-carousel-track--dragging');

      const onMove = (ev: MouseEvent) => {
        const dx = ev.pageX - startX;
        if (Math.abs(dx) > 4) moved = true;
        el.scrollLeft = startScroll - dx;
      };

      const cleanup = () => {
        el.classList.remove('rk-projects-carousel-track--dragging');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        window.removeEventListener('blur', onUp);
        dragCleanupRef.current = null;
      };

      const onUp = () => {
        cleanup();

        if (moved) {
          wasDragged.current = true;
          setTimeout(() => {
            wasDragged.current = false;
          }, 0);
          wrapScroll();
          const slot = getCenteredSlot(el);
          scrollToSlot(slot);
        }
      };

      dragCleanupRef.current = cleanup;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      window.addEventListener('blur', onUp);
    },
    [scrollToSlot, wrapScroll],
  );

  const handleCardClick = useCallback(
    (clickedRealIndex: number, githubUrl?: string) => {
      if (wasDragged.current) return;

      if (clickedRealIndex !== activeIndex) {
        scrollToRealIndex(clickedRealIndex);
        return;
      }

      if (githubUrl) window.open(githubUrl, '_blank', 'noopener,noreferrer');
    },
    [activeIndex, scrollToRealIndex],
  );

  const goPrev = () => scrollToRealIndex((activeIndex - 1 + COUNT) % COUNT);
  const goNext = () => scrollToRealIndex((activeIndex + 1) % COUNT);

  return (
    <div className="rk-projects-carousel">
      <button
        type="button"
        className="rk-projects-carousel-arrow rk-projects-carousel-arrow--prev"
        onClick={goPrev}
        aria-label="Previous project"
      >
        ‹
      </button>

      <div
        ref={scrollRef}
        className="rk-projects-carousel-track"
        onMouseDown={handleMouseDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
      >
        {CAROUSEL_ITEMS.map((item) => {
          const idx = realIndex(item.slot);
          return (
            <CarouselCard
              key={`${item.copy}-${item.title}`}
              item={item}
              registerNode={registerNode}
              onCardClick={handleCardClick}
              loadPdf={idx === activeIndex}
              isCenter={idx === activeIndex}
            />
          );
        })}
      </div>

      <button
        type="button"
        className="rk-projects-carousel-arrow rk-projects-carousel-arrow--next"
        onClick={goNext}
        aria-label="Next project"
      >
        ›
      </button>

      <div className="rk-projects-carousel-dots" role="tablist" aria-label="Project slides">
        {PROJECTS.map((project, i) => (
          <button
            key={project.title}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to ${project.title}`}
            className={`rk-projects-carousel-dot${i === activeIndex ? ' rk-projects-carousel-dot--active' : ''}`}
            onClick={() => scrollToRealIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
