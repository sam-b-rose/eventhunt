import React, { Component } from 'react';

import GoogleMap from 'google-map-react';
import MapResult from './MapResult';

class MapView extends Component {

    static propTypes = {
        center: React.PropTypes.object,
        zoom: React.PropTypes.number,
        place: React.PropTypes.object,
    }

    static defaultProps = {
        center: {
            lat: 59.938043,
            lng: 30.337157
        },
        zoom: 9,
        place: {
            lat: 59.724465,
            lng: 30.080121
        }
    };

    render() {
        return (
            <GoogleMap defaultCenter={this.props.center} defaultZoom={this.props.zoom}>
                <MapResult lat={59.955413} lng={30.337844} text={'A'}/>
                <MapResult {...this.props.place} text={'B'}/>
            </GoogleMap>
        );
    }
}

export default MapView;
