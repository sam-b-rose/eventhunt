import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import moment from 'moment';

import Loader from '../Loader/index';
import defaultThumb from './images/default.png';
import './style.scss';

class Results extends Component {

    static propTypes = {
        events: React.PropTypes.array.isRequired,
        isFetching: React.PropTypes.bool.isRequired
    };

    renderEvents() {
        return this.props.events.map((event) => {
            return (
                <li key={event.id} className="result">
                    <div className="result__image-container">
                        <img alt="thumbnail"
                            src={event.logo ? event.logo.url : defaultThumb}
                            className="result__image"/>
                        <div className="result__category-name">
                            {event.categoryName}
                        </div>
                    </div>
                    <div className="result__content">
                        <a href={event.url}
                            target="_blank"
                            alt={event.name} className="result__title">{event.name}</a>
                        <small className="result__date">
                            {moment(event.start).format('LL')}
                        </small>
                        <a href={event.mapUrl}
                            alt={event.address}
                            target="_blank" className="result__location">{event.address}</a>
                    </div>
                </li>
            );
        });
    }

    render() {
        const mode = {
            list: true,
            mode: false
        };

        const resultsCount = this.props.events.length;
        const msg = (resultsCount > 0) ? `${resultsCount} events for you` : '';

        return (
            <div>
                <div className="results-bar">

                    {(this.props.isFetching) ? <Loader/> : false}

                    <div className="results-count">{msg}</div>
                    <i className={`fa fa-bars ${mode.list ? 'selected' : ''}`}></i>
                    <i className={`fa fa-map ${mode.map}`}></i>

                </div>
                <ul className="result-list">
                    <FlipMove enterAnimation="fade" leaveAnimation="fade">
                        {this.renderEvents()}
                    </FlipMove>
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.data.events,
        isFetching: state.data.isFetching,
    };
}

export default connect(mapStateToProps, null)(Results);
