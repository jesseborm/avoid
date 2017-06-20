// src/games/GamesContainer.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Lobby.css'
import fetchGames from '../actions/games/fetch'
import subscribeToGamesService from '../actions/games/subscribe'
import CreateGameButton from '../games/CreateGameButton'

export class GamesContainer extends PureComponent {
  static propTypes = {
    games: PropTypes.array.isRequired,
    fetchGames: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchGames()
    this.props.subscribeToGamesService()
  }

  renderGame(game, index) {
    return <li key={index} { ...game }  />
  }

  render() {
    return(
      <div className="games wrapper">
          <CreateGameButton />

        <ul>
          { this.props.games.map(this.renderGame.bind(this)) }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ games }) => ({ games })

export default connect(mapStateToProps, {
  fetchGames, subscribeToGamesService
})(GamesContainer)
