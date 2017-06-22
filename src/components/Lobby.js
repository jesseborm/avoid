// src/games/Lobby.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import './Lobby.css'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import RaisedButton from 'material-ui/RaisedButton'
import createGame from '../actions/games/create'
import removeGame from '../actions/games/remove'
import joinGame from '../actions/games/join'

import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';

export class Lobby extends PureComponent {

  componentWillMount() {
    const { subscribed, fetchGames, subscribeToGames } = this.props
    fetchGames()
    if (!subscribed) subscribeToGames()
  }

  goToGame(gameId) {
    const { push } = this.props
    return () => {
      push(`/games/${gameId}`)
    }
  }

  renderGame(game, index) {
    const style = {
      display: 'inline-block',
      margin: '16px 32px 16px 0',
    };
    return (
      <Paper style={style} key={index}>
        <MenuItem
          primaryText={game.title}
          onClick={this.goToGame(game._id)}
        />
        <div>
          { game.players.length < 2 ?
            <RaisedButton
            onClick={() => {this.props.joinGame(game._id)}}
            label="Join Game"
            secondary={true}
          /> : null
          }
          <RaisedButton
            label="Delete Game"
            onClick={() => {this.props.removeGame(game)}}
            primary={true}
          />
        </div>
      </Paper>
    )
  }


  renderCreateGameButton() {
    return (
      <RaisedButton
        fullWidth={true}
        onClick={this.props.createGame}
        label="Create Game"
        secondary={true}
      />
    )
  }

  render() {
      return (
        <div className="games lobby">
          <h1>Welcome to the Game Lobby</h1>
          { this.props.games.length === 0 ?
            <div className="no-results">
              <h2>No Games yet! Feel free to create one!</h2>
              { this.renderCreateGameButton() }
            </div> :
            <div className="games list">
              <div className="actions">
                { this.renderCreateGameButton() }
              </div>
              { this.props.games.map(this.renderGame.bind(this)) }
            </div>
          }
        </div>
      )
    }
}

const mapStateToProps = ({ games, currentUser, subscriptions }) => ({
  games,
  currentUser,
  subscribed: subscriptions.includes('games'),
})

export default connect(mapStateToProps, {
  fetchGames,
  subscribeToGames,
  push,
  createGame,
  removeGame,
  joinGame
})(Lobby)
