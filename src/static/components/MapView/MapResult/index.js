import React, { Component } from 'react';

import {mapResultStyle} from './style.scss';

class MapResult extends Component {
    static propTypes = {
        text: React.PropTypes.string,
    };

    render() {
        return (
            <div className="marker">
                {this.props.text}
            </div>
        );
    }
}

export default MapResult;
