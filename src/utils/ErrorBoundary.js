import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Mettez à jour l'état pour que l'UI puisse afficher un fallback.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Vous pouvez aussi enregistrer l'erreur dans un service de logging.
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Vous pouvez rendre un fallback UI personnalisé.
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
