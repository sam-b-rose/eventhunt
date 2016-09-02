import React from 'react';
import { Link } from 'react-router';

import ebLogo from './images/eb-logo.png';
import './style.scss';

export default (props) => {
    return (
        <div className="navbar">
            <div className="navbar__content">
                <Link className="navbar__title" to="/">
                    eventhunt
                </Link>
                <div className="navbar__right">
                    <small className="navbar__right-text">powered by</small>
                    <a alt="Eventbrite" href="https://eventbrite.com" target="_blank">
                        <img className="eb-logo" alt="Eventbrite" src={ebLogo}/>
                    </a>
                </div>
            </div>
        </div>
    );
};
