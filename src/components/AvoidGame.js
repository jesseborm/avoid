import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import getCurrentGame from '../actions/games/get'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import './AvoidGame.css'

class AvoidGame extends PureComponent {
  componentWillMount() {
    const { game, fetchGames, getCurrentGame, subscribeToGames, subscribed } = this.props
    const { gameId } = this.props.params
    if (!game) fetchGames()
    getCurrentGame(gameId)
    if (!subscribed) subscribeToGames()
  }

  render() {
    const { game } = this.props

    return (
      <div className="AvoidGame">
        <h1>Avoid Game</h1>
        <div className="board">
          <h1>Hello</h1>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentGame, games, subscriptions }) => {
  const game = games.filter((g) => (g._id === currentGame))[0]
  return {
    game,
    subscribed: subscriptions.includes('games'),
  }
}

export default connect(mapStateToProps, {
  getCurrentGame,
  fetchGames,
  subscribeToGames,
})(AvoidGame)
