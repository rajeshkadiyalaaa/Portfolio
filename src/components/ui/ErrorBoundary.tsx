/**
 * React error boundary — isolates render failures so the rest of the app keeps working.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';

type ErrorBoundaryProps = {
  children: ReactNode;
  /** Custom fallback UI; pass null to render nothing */
  fallback?: ReactNode | null;
  title?: string;
  message?: string;
  compact?: boolean;
  resetKeys?: unknown[];
  onError?: (error: Error, info: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const { resetKeys } = this.props;
    if (!this.state.hasError || resetKeys === undefined) return;

    const prev = prevProps.resetKeys;
    if (
      prev === resetKeys ||
      (prev &&
        resetKeys &&
        prev.length === resetKeys.length &&
        prev.every((key, i) => key === resetKeys[i]))
    ) {
      return;
    }

    this.setState({ hasError: false });
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback === null) {
      return null;
    }

    if (this.props.fallback !== undefined) {
      return this.props.fallback;
    }

    return (
      <ErrorFallback
        title={this.props.title}
        message={this.props.message}
        compact={this.props.compact}
        onRetry={this.handleRetry}
      />
    );
  }
}
