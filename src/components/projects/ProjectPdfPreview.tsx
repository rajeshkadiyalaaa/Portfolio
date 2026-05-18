import React, { useCallback, useEffect, useState } from 'react';
import { useProjectPdfPreview } from '../../hooks/useProjectPdfPreview';
import { useMobileLayout } from '../../hooks/useMobileLayout';

interface ProjectPdfPreviewProps {
  src: string;
}

const ProjectPdfPreview: React.FC<ProjectPdfPreviewProps> = ({ src }) => {
  const { containerRef, pageImages, loading, failed } = useProjectPdfPreview(src);
  const isMobile = useMobileLayout();
  const [tapScroll, setTapScroll] = useState(false);

  useEffect(() => {
    if (!isMobile) setTapScroll(false);
  }, [isMobile]);

  const handleTap = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if (!isMobile || loading || pageImages.length === 0) return;
      e.stopPropagation();
      if (pageImages.length <= 1) return;
      setTapScroll((active) => !active);
    },
    [isMobile, loading, pageImages.length],
  );

  if (failed) {
    return null;
  }

  const showScroll = !loading && pageImages.length > 0;
  const canTapScroll = isMobile && pageImages.length > 1;

  return (
    <div
      ref={containerRef}
      className={[
        'rk-project-pdf-preview',
        loading || !showScroll ? ' rk-project-pdf-preview--loading' : '',
        tapScroll ? ' rk-project-pdf-preview--tap-active' : '',
        canTapScroll ? ' rk-project-pdf-preview--tap-enabled' : '',
      ].join('')}
      style={{ '--pdf-pages': pageImages.length || 1 } as React.CSSProperties}
      aria-hidden={!canTapScroll}
      role={canTapScroll ? 'button' : undefined}
      tabIndex={canTapScroll ? 0 : undefined}
      aria-label={canTapScroll ? 'Tap to scroll PDF preview pages' : undefined}
      onClick={canTapScroll ? handleTap : undefined}
      onKeyDown={
        canTapScroll
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') handleTap(e);
            }
          : undefined
      }
    >
      {showScroll ? (
        <div className="rk-project-pdf-scroll">
          {pageImages.map((image, index) => (
            <img
              key={`${src}-page-${index + 1}`}
              src={image}
              alt=""
              className="rk-project-pdf-page"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProjectPdfPreview;
