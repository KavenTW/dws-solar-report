import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { caught: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { caught: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.caught) {
      return this.props.fallback ? this.props.fallback(this.state.error) : null;
    }
    return this.props.children;
  }
}
