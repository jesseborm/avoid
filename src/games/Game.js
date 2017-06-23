import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Board from '../components/Board'
import Player from '../components/firstPlayer'
// import SecondPlayer from '../components/secondPlayer'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import getGame from '../actions/games/get'
import './Game.css'

const UP = 'UP'
const DOWN = 'DOWN'
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'


class Game extends PureComponent {
  constructor(props) {
    super(props)
  }

 componentWillMount() {
  const { game,
    fetchGames,
    getGame,
    subscribed,
    subscribeToGames
  } = this.props
  const { gameId } = this.props.params
  if (!game) fetchGames()
  getGame(gameId)
  if (!subscribed) subscribeToGames()
 }


  handlePlayerMovement = (dirObj) => {
    const { top, left } = this.props.currentPlayerPosition
    // check walls
    switch (dirObj.dir) {
      case UP:
        if (top === 0) return
        break
      case DOWN:
        if (top === 600) return
        break
      case LEFT:
        if (left === 0) return
        break
      case RIGHT:
        if (left === 600) return
        break
    }

    this.props.currentPlayerPosition.top = top + (25 * dirObj.top)
    this.props.currentPlayerPosition.left = left + (25 * dirObj.left)

  }

  render() {
      const playerPos= this.props.currentPlayerPosition

      return (
          <div className="board">
            <Board dimension={625}>
              <Player
                size={25}
                handlePlayerMovement={this.handlePlayerMovement} />
            </Board>
          </div>
      )

  }
}

const mapStateToProps = ({
  currentUser,
  currentGame,
  games,
  subscriptions
}) => {
  const game = games.filter((g) => (g._id === currentGame))[0]

  return {
    game,
    currentUser,
    currentPlayerPosition: game && game.players.filter((p) =>
      (p.userId === currentUser._id))[0].position,
  }
}

export default connect(mapStateToProps, {
  fetchGames,
  subscribeToGames,
  getGame
})(Game)
