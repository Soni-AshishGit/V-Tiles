import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D Canvas Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-black/40 text-gold/60 p-8 text-center rounded-2xl">
          <p className="font-gujarati text-lg mb-4">ક્ષમા કરશો, 3D પ્રસ્તુતિમાં ભૂલ આવી છે.</p>
          <p className="text-xs uppercase tracking-widest font-english opacity-50 mb-6">Unable to load 3D assets</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 glass-dark border-gold/30 text-gold text-xs font-bold rounded-full hover:bg-gold/10 transition-all"
          >
            Reload View
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
