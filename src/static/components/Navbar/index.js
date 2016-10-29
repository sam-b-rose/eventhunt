import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { updateLocation } from '../../actions/data';

import ebLogo from './images/eb-logo.png';
import './style.scss';

class Navbar extends Component {

    static propTypes = {
        location: React.PropTypes.object.isRequired,
        updateLocation: React.PropTypes.func.isRequired,
    };

    handleKeyPress(e) {
        var value = e.target.value;
        if (value && e.key === 'Enter') {
            this.props.updateLocation({
                address: value
            });
        }
    }

    render() {
        const hasLocation = this.props.location.latitude || this.props.location.address;
        const locationIcon = hasLocation ? 'fa-location-arrow' : 'fa-spinner fa-pulse';
        const locationPlaceholder = hasLocation ? 'Current Location' : 'Getting current location...'

        return (
            <div className="navbar">
                <div className="navbar__content">
                    <Link className="navbar__title" to="/">
                        eventhunt
                    </Link>

                    <div className="navbar__location-container">
                        <div className="navbar__location-wrapper">
                            <i className={`fa ${locationIcon}`} aria-hidden="true"></i>
                            <input type="text"
                                placeholder={locationPlaceholder}
                                onKeyPress={(e) => { this.handleKeyPress(e); }}
                                className="navbar__location"/>
                        </div>
                    </div>

                    <div className="navbar__right">
                        <small className="navbar__right-text">powered by</small>
                        <a alt="Eventbrite" href="https://eventbrite.com" target="_blank" tabIndex="-1">
                            <img className="eb-logo" alt="Eventbrite" src={ebLogo}/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

function mapPropsToState(state) {
    return {
        location: state.data.location
    };
}

export default connect(mapPropsToState, { updateLocation })(Navbar);
