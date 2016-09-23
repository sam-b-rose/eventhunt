import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import moment from 'moment';
import { fetchEvents, setViewMode, updateInitialLoad } from '../../actions/data';

import Loader from '../Loader/index';
import defaultThumb from './images/default.png';
import './style.scss';

class Results extends Component {

    static propTypes = {
        events: React.PropTypes.array.isRequired,
        location: React.PropTypes.object,
        viewMode: React.PropTypes.object.isRequired,
        selectedMode: React.PropTypes.object,
        initialLoad: React.PropTypes.bool.isRequired,
        isFetching: React.PropTypes.bool.isRequired,
        setViewMode: React.PropTypes.func.isRequired,
        updateInitialLoad: React.PropTypes.func.isRequired,
        fetchEvents: React.PropTypes.func.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        if (Object.keys(nextProps.location).length > 0 &&
            !nextProps.initialLoad) {
            this.props.updateInitialLoad(true);
            this.props.fetchEvents();
        }

        if (nextProps.selectedMode === null) {
            this.props.setViewMode(this.props.viewMode.LIST);
        }
    }

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
        const { selectedMode } = this.props;
        const mode = selectedMode ? selectedMode.value : 0;

        const resultsCount = this.props.events.length;
        const msg = (resultsCount > 0) ? `${resultsCount} events for you` : '';

        return (
            <div>
                <div className="results-bar">

                    {(this.props.isFetching) ? <Loader/> : false}

                    <div className="results-count">{msg}</div>
                    <i className={`fa fa-bars ${mode === 0 ? 'selected' : ''}`}
                        onClick={() => { this.props.setViewMode(this.props.viewMode.LIST); }}></i>
                    <i className={`fa fa-map ${mode === 1 ? 'selected' : ''}`}
                        onClick={() => { this.props.setViewMode(this.props.viewMode.MAP); }}></i>

                </div>
                {mode === 0 ?
                    (<ul className="result-list">
                        <FlipMove enterAnimation="fade" leaveAnimation="fade">
                            {this.renderEvents()}
                        </FlipMove>
                    </ul>) :
                    (<p>map</p>)
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.data.events,
        location: state.data.location,
        selectedMode: state.data.selectedMode,
        viewMode: state.data.viewMode,
        initialLoad: state.data.initialLoad,
        isFetching: state.data.isFetching,
    };
}

export default connect(mapStateToProps, { fetchEvents, setViewMode, updateInitialLoad })(Results);
