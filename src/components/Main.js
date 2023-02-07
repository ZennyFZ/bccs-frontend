import React, {Component} from 'react';
import Banner from './Homepage/Banner';
import Introduction from './Homepage/Introduction';
import Introduction2 from './Homepage/Introduction2';
class main extends Component {
    render() {
        return (
            <div>
                <Banner/>
                <Introduction/>
                <Introduction2/>
            </div>
        );
    }
}
export default main;