import React, { Component } from 'react'
import Service from './Service';
import callerApi from '../../utils/APICaller2';
export class Main_service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Services: []
        };
    }

    componentDidMount() {
        callerApi("Service", "GET", null).then(res => {
            this.setState({
                Services: res.data
            });
        });
    };

    render() {
        var { Services } = this.state;
        return (
            <div>
                <Service Services={Services} />
            </div>
        )
    }
}
export default Main_service;