import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Board from '../components/Board'
import Player from '../components/firstPlayer'
// import SecondPlayer from '../components/secondPlayer'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import getGame from '../actions/games/get'
import changePosition from '../actions/games/change-position'
import '../components/Square.css'

const UP = 'UP'
const DOWN = 'DOWN'
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

const getDefaultState = () => {
    return {
        size: {
            board: 25,
            player: 25,
            maxDim: 625
        },
        positions: {
            player: {
                top: 300,
                left: 300
            },
        }
    }
}

class Game extends PureComponent {
  constructor(props) {
    super(props)
    this.state = getDefaultState()
  }

 componentWillMount() {
  const { game, fetchGames, getGame, subscribeToGames, subscribed } = this.props
  const { gameId } = this.props.params
  getGame(gameId)
  if (!game) fetchGames()
  if (!subscribed) subscribeToGames()
  console.log(game)
 }


  handlePlayerMovement = (dirObj) => {
    const { top, left } = this.state.positions.player
    const { player, maxDim } = this.state.size

    // check walls
    switch (dirObj.dir) {
      case UP:
        if (top === 0) return
        break
      case DOWN:
        if (top === maxDim - player) return
        break
      case LEFT:
        if (left === 0) return
        break
      case RIGHT:
        if (left === maxDim - player) return
        break
    }

    this.setState({
      positions: {
        ...this.state.positions,
        player: {
          top: top + (player * dirObj.top),
          left: left + (player * dirObj.left)
        }
      }
    })
  }

    style = () => {
        return {
            width: '85%',
            maxWidth: '600px',
            margin: '0 auto'
        }
    }

    render() {
        const {
            size: { board, player },
            positions: { player: playerPos },
        } = this.state

        return (
            <div style={this.style()}>
              <Board dimension={board * player}>
                <Player
                  size={player}
                  position={playerPos}
                  handlePlayerMovement={this.handlePlayerMovement} />
              </Board>
            </div>
        )
    }
}

const mapStateToProps = ({ currentUser, currentGame, games, subscriptions }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]
  // const currentPlayer = game && game.players.filter((p) => (p.userId === currentUser._id))[0]
  return {
    game,
    subscribed: subscriptions.includes('games'),
  }
}

export default connect(mapStateToProps, {
  fetchGames,
  subscribeToGames,
  getGame
})(Game)
