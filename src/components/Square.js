import React from 'react';

const style = ({ size, position, color }) => {
    const dim = size + 'px';
    return {
        top: position.top + 'px',
        left: position.left + 'px',
        transition: 'all 0.2s ease'
    };
};

export default (props) => <div id="character" style={style(props)}/>
