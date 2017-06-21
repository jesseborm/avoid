// src/games/Lobby.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import './Lobby.css'
import fetchGames from '../actions/games/fetch'
import subscribeToGames from '../actions/games/subscribe'
import RaisedButton from 'material-ui/RaisedButton'
import createGame from '../actions/games/create'
import Menu from 'material-ui/Menu';
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
    return <MenuItem
      primaryText={game.title}
      key={index} />
  }

  renderCreateGameButton() {
    return <RaisedButton
     onTouchTap={this.props.createGame}
     label="Create Game"
     primary={true} />
  }

  render() {

    return (
      <div className="games wrapper">
        { this.renderCreateGameButton() }
        <Menu>
          { this.props.games.map(this.renderGame) }
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = ({ games, currentUser, subscriptions }) => ({
  games,
  currentUser,
  subscribed: subscriptions.includes('games'),
})

export default connect(mapStateToProps, { fetchGames, subscribeToGames, push })(Lobby)
