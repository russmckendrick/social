import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`ErrorBoundary${this.props.label ? ` [${this.props.label}]` : ''} caught:`, error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    if (this.props.fallback !== undefined) {
      return this.props.fallback;
    }

    return (
      <div className="glass-card rounded-xl border border-[var(--dashboard-border)] px-4 py-3 text-xs uppercase tracking-[0.18em] text-[var(--dashboard-subtle)]">
        This section is taking a break.
      </div>
    );
  }
}
