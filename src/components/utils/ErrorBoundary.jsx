import React from "react";
import ErrorAlert from "../error-alert/error-alert.component";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                {this.props.fallback}
                <ErrorAlert message={this.props.message} />
                </>
            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;