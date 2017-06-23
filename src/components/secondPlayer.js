import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Square from '../components/Square'

const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

class Player extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    position: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired
    })
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
  }

  handleKeyDown = (e) => {
    let newDirection;

    switch(e.keyCode) {
      case 65:
        newDirection = { top: 0, left: -1 , dir: LEFT};
        break;
      case 87:
        newDirection = { top: -1, left: 0 , dir: UP};
        break;
      case 68:
        newDirection = { top: 0, left: 1, dir: RIGHT};
        break;
      case 83:
        newDirection = { top: 1, left: 0, dir: DOWN };
        break;
      default:
        return;
    }

    this.props.handlePlayerMovement(newDirection);
  }

  render() {
    const { size, position: { top, left }} = this.props;

    return (
      <div ref={ n => { this.player = n }} >
        <Square
          size={size}
          position={{ top, left }}
          color='red'
        />
      </div>

    );
  }

}

export default SecondPlayer;
