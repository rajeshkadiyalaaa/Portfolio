import { useEffect, useRef, useState, type RefObject } from 'react';
import { bucketPdfWidth, renderPdfPages } from '../lib/renderPdfPages';

const WIDTH_RELOAD_DELTA = 40;

interface UseProjectPdfPreviewResult {
  containerRef: RefObject<HTMLDivElement>;
  pageImages: string[];
  loading: boolean;
  failed: boolean;
}

export function useProjectPdfPreview(src: string): UseProjectPdfPreviewResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pageImages, setPageImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const lastRenderedWidthRef = useRef(0);

  useEffect(() => {
    lastRenderedWidthRef.current = 0;
    setPageImages([]);
    setLoading(false);
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let visible = false;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) return;

        const next = Math.round(el.getBoundingClientRect().width);
        if (next > 0) setContainerWidth(next);
      },
      { rootMargin: '120px', threshold: 0.01 },
    );

    const resizeObserver = new ResizeObserver(() => {
      if (!visible) return;
      const next = Math.round(el.getBoundingClientRect().width);
      if (next > 0) setContainerWidth(next);
    });

    visibilityObserver.observe(el);
    resizeObserver.observe(el);

    return () => {
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!containerWidth) return;

    const bucketed = bucketPdfWidth(containerWidth);
    const widthDelta = Math.abs(bucketed - lastRenderedWidthRef.current);
    if (lastRenderedWidthRef.current > 0 && widthDelta < WIDTH_RELOAD_DELTA) return;

    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setFailed(false);

      try {
        const images = await renderPdfPages(src, containerWidth, controller.signal);
        if (controller.signal.aborted) {
          setLoading(false);
          return;
        }

        lastRenderedWidthRef.current = bucketed;
        setPageImages(images);
        setLoading(false);
      } catch (err) {
        if (controller.signal.aborted) {
          setLoading(false);
          return;
        }
        if (err instanceof DOMException && err.name === 'AbortError') {
          setLoading(false);
          return;
        }

        setPageImages([]);
        setFailed(true);
        setLoading(false);
      }
    };

    void load();

    return () => {
      controller.abort();
      setLoading(false);
    };
  }, [src, containerWidth]);

  return { containerRef, pageImages, loading, failed };
}
