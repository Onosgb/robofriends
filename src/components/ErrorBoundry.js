import React, {Component} from 'react';

class ErrorBoundry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
componentDidCatch(errer, info) {
    this.setState({hasError: true});
}
    render() {
        return this.state.hasError ? <h1>OOooops something went wrong!</h1> : this.props.children;
    }
}

export default ErrorBoundry;