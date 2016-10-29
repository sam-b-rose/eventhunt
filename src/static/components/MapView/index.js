import React, { Component } from 'react';
import { connect } from 'react-redux';

import GoogleMap from 'google-map-react';
import MapResult from './MapResult';

class MapView extends Component {

    static propTypes = {
        events: React.PropTypes.array,
        center: React.PropTypes.object,
        zoom: React.PropTypes.number,
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
            <GoogleMap center={{lat: this.props.location.latitude, lng: this.props.location.longitude}}
                       zoom={this.props.zoom}>
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

export default connect(mapStateToProps, null )(MapView);
