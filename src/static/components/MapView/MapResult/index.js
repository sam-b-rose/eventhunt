import React from 'react';

export default (props) => {
    const style = this.props.$hover ? 'transform: scale(1.1);' : '';

    return (
        <div style={style}>
            {this.props.text}
        </div>
    );
};
