import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateLocation } from '../../actions/data';
import { SideMenu, Results } from '../../components';

class HomeView extends Component {

    static propTypes = {
        updateLocation: React.PropTypes.func
    };

    componentWillMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.props.updateLocation(position.coords);
        }, () => {
            console.error('Could not get current location. Please select a location manually.');
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row margin-top-medium">
                    <div className="small-3 columns">
                        <SideMenu/>
                    </div>
                    <div className="small-9 columns">
                        <Results/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { updateLocation })(HomeView);
