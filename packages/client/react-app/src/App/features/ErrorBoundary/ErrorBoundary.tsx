import { Component, ErrorInfo } from 'react';

interface IProps {
    children: React.ReactNode;
}

interface State {
    error: null | Error;
}

export class ErrorBoundary extends Component<IProps, State> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            error: null,
        };
    }
    public componentDidCatch(error: Error, _: ErrorInfo) {
        const { stack, message } = error;
        this.setState({ error: { name: error.name, message, stack } });
    }
    public render() {
        const {
            state: { error },
        } = this;
        if (error) {
            return (
                <>
                    <div className="error-boundary header">Error:</div>
                    <div className="error-boundary error-body">
                        {JSON.stringify(error, null, 4)}
                    </div>
                </>
            );
        }
        return this.props.children;
    }
}
