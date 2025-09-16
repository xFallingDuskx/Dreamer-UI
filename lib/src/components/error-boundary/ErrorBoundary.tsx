import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorBoundaryVariants } from './variants';
import { ExclamationTriangle, InfoCircled } from '../../symbols';
import { join } from '../../utils';

export interface ErrorBoundaryProps {
  /** The id of the ErrorBoundary. */
  id?: string;
  /** The variant of the ErrorBoundary. */
  variant?: ErrorBoundaryVariants;
  /** Whether to show a retry button. */
  showRetry?: boolean;
  /** Custom error message to display. */
  fallbackMessage?: string;
  /** Custom fallback UI to render on error. */
  fallback?: ReactNode;
  /** Callback function when retry is clicked. */
  onRetry?: () => void;
  /** Callback function when error occurs. */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Additional classes to apply to the ErrorBoundary container. */
  className?: string;
  /** The children to render inside the ErrorBoundary. */
  children: ReactNode;
  /** Flag to indicate if the app is in development mode. For showing error details in development mode */
  inDevEnv?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

const VariantIcons: Record<ErrorBoundaryVariants, React.ReactNode> = {
  danger: <ExclamationTriangle size={24} />,
  warning: <ExclamationTriangle size={24} />,
  info: <InfoCircled size={24} />,
};

export function ErrorBoundary({
  id,
  variant = 'danger',
  showRetry = true,
  fallbackMessage,
  fallback,
  onRetry,
  onError,
  className,
  children,
  inDevEnv = false,
}: ErrorBoundaryProps) {
  // Since functional components can't have error boundaries,
  // we need to use a class component wrapper
  return (
    <ErrorBoundaryClass
      id={id}
      variant={variant}
      showRetry={showRetry}
      fallbackMessage={fallbackMessage}
      fallback={fallback}
      onRetry={onRetry}
      onError={onError}
      className={className}
      inDevEnv={inDevEnv}
    >
      {children}
    </ErrorBoundaryClass>
  );
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    this.props.onError?.(error, errorInfo);
    
    // Log error for development
    if (this.props.inDevEnv) {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error info:', errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    this.props.onRetry?.();
  };

  render() {
    const {
      id,
      variant = 'danger',
      showRetry = true,
      fallbackMessage = 'Something went wrong',
      fallback,
      className,
      inDevEnv,
    } = this.props;

    if (this.state.hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      const variantStyles = ErrorBoundaryVariants[variant];
      const icon = VariantIcons[variant];

      return (
        <div
          id={id}
          data-variant={variant}
          data-has-error={this.state.hasError}
          className={join(
            'rounded-lg border p-6 text-center',
            variantStyles.container,
            className
          )}
          role="alert"
          aria-live="assertive"
        >
          <div className={join('mb-4 flex justify-center', variantStyles.icon)}>
            {icon}
          </div>
          
          <h3 className={join('text-lg font-semibold mb-2', variantStyles.title)}>
            Oops! Something went wrong
          </h3>
          
          <p className={join('text-sm mb-4', variantStyles.description)}>
            {fallbackMessage}
          </p>

          {inDevEnv && this.state.error && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm font-medium mb-2">
                Error Details (Development Only)
              </summary>
              <div className={join(
                'rounded border p-3 text-xs font-mono whitespace-pre-wrap overflow-auto max-h-40',
                variantStyles.details
              )}>
                <div className="font-bold mb-1">Error:</div>
                <div className="mb-2">{this.state.error.toString()}</div>
                {this.state.errorInfo?.componentStack && (
                  <>
                    <div className="font-bold mb-1">Component Stack:</div>
                    <div>{this.state.errorInfo.componentStack}</div>
                  </>
                )}
              </div>
            </details>
          )}

          {showRetry && (
            <button
              type="button"
              onClick={this.handleRetry}
              className={join(
                'inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent',
                variantStyles.button
              )}
              aria-label="Try again"
            >
              Try Again
            </button>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}