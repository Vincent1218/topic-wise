import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error occurred:", error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render your fallback UI here.
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="p-6 m-4 border-0 shadow-lg rounded-lg bg-white dark:bg-gray-800">
            <h1 className="text-3xl font-semibold text-red-500 dark:text-red-400">
              Oops! Something went wrong.
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              We&apos;re working to fix this. Please try again later.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
