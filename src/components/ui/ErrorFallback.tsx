type ErrorFallbackProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
};

export function ErrorFallback({
  title = 'Something went wrong',
  message = 'This part of the page failed to load. You can try again or refresh the page.',
  onRetry,
  compact = false,
}: ErrorFallbackProps) {
  return (
    <div
      className={`rk-error-fallback${compact ? ' rk-error-fallback--compact' : ''}`}
      role="alert"
    >
      <p className="rk-error-fallback__title">{title}</p>
      <p className="rk-error-fallback__message">{message}</p>
      <div className="rk-error-fallback__actions">
        {onRetry ? (
          <button type="button" className="rk-error-fallback__btn" onClick={onRetry}>
            Try again
          </button>
        ) : null}
        {!compact ? (
          <button
            type="button"
            className="rk-error-fallback__btn rk-error-fallback__btn--secondary"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        ) : null}
      </div>
    </div>
  );
}
