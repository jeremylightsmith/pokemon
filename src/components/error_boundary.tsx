import React, { ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryState {
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error: error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("error", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-4">
          <h1>Something went wrong.</h1>
          <p>Try refreshing the page or contact support.</p>
          <p>{this.state.error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
