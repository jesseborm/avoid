import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import getGame from '../actions/games/get'
import changePosition from '../actions/games/change-position'


const UP = 'UP'
const DOWN = 'DOWN'
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

class Player extends PureComponent {
  componentWillMount() {
   const { game, currentPlayerPosition} = this.props
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown
  }

  handleKeyDown = (e) => {
    let newDirection

    switch(e.keyCode) {
      case 37:
        newDirection = { top: 0, left: -1 , dir: LEFT}
        break
      case 38:
        newDirection = { top: -1, left: 0 , dir: UP}
        break
      case 39:
        newDirection = { top: 0, left: 1, dir: RIGHT}
        break
      case 40:
        newDirection = { top: 1, left: 0, dir: DOWN }
        break
      default:
        return
    }

    this.props.handlePlayerMovement(newDirection)
    this.props.changePosition(this.props.currentGame, newDirection)
    console.log(this.props.currentPlayerPosition.top)
    console.log(this.props.currentPlayerPosition.left)
  }

  style = () => {
    return {
        top: '300px',
        left: '300px',
    }
  }

  render() {
    return (
      <div ref={ n => { this.player = n }} >
        <div id="character" style={this.style()}/>
      </div>
    )
  }

}

const mapStateToProps = ({ currentUser, currentGame, games, subscriptions }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]

  return {
    game,
    currentGame,
    currentUser,
    currentPlayerPosition: game && game.players.filter((p) =>
      (p.userId === currentUser._id))[0].position,
    subscribed: subscriptions.includes('games'),
  }
}

export default connect(mapStateToProps, {
  changePosition
})(Player)
