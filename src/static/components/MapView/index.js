import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMap from 'google-map-react';
import MapResult from './MapResult';

import API_KEY from './constants';

class MapView extends Component {

    static propTypes = {
        events: React.PropTypes.array,
        center: React.PropTypes.object,
        zoom: React.PropTypes.number,
        location: React.PropTypes.object,
        place: React.PropTypes.object,
    };

    static defaultProps = {
        zoom: 12
    };

    renderMapResults() {
        return this.props.events.map((event, index) => {
            return (<MapResult lat={event.latitude} lng={event.longitude} key={event.id} text={''+index}/>);
        });
    }

    render() {
        return (
            <GoogleMap zoom={this.props.zoom}
                bootstrapURLKeys={{
                    key: API_KEY,
                    language: 'en',
                }}
                center={{
                    lat: this.props.location.latitude,
                    lng: this.props.location.longitude,
                }}>
                {this.renderMapResults()}
            </GoogleMap>
        );
    }
}

function mapStateToProps(state) {
    return {
        location: state.data.location,
        events: state.data.events,
    };
}

export default connect(mapStateToProps, null)(MapView);
