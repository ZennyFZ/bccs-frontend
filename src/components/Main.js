import React, {Component} from 'react';
import Banner from './Homepage/Banner';
import HomepageProduct from './Homepage/Homepage_Product';
import HomepageService from './Homepage/Homepage_Service';
import HomepagePost from './Homepage/Homepage_Post';
import { useAuth0 } from "@auth0/auth0-react";
class main extends Component {
    render() {
        return (
            <div>
                <Banner/>
                <HomepageProduct />
                <HomepageService />
                <HomepagePost />
            </div>
        );
    }
}
export default main;