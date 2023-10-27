import React, { Component, ErrorInfo, ReactNode } from 'react';
import BsError from './BsError';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // eslint-disable-next-line react/state-in-constructor
  public state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const {
      state: { hasError },
      props: { children },
    } = this;
    if (hasError) {
      return <BsError text="Parece que hubo un error" />;
    }

    return children;
  }
}

export default ErrorBoundary;
