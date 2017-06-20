// src/games/GamesContainer.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import './Lobby.css'
import fetchGames from '../actions/games/fetch'
import subscribeToGamesService from '../actions/games/subscribe'
import createGame from '../actions/games/create'
import removeGame from '../actions/games/remove'




export class GamesContainer extends PureComponent {
  static propTypes = {
    fetchGames: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchGames()
    this.props.subscribeToGamesService()
  }

  renderGame(game, index) {
    return <li key={index} { ...game }  />
  }



  renderCreateGameButton() {
    return (
      <RaisedButton
        onClick={this.props.createGame}
        label="Create Game"
        primary={true} />
    )
  }

 renderDeleteGameButton() {
    return (
      <RaisedButton
        onClick={this.props.removeGame}
        label="Delete Game"
        primary={true} />
    )
  }

  render() {
    return(
      <div className="games wrapper">
        { this.renderCreateGameButton}
        <ul>
          { this.props.games.map(this.renderGame.bind(this)) }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ games }) => ({ games })

export default connect(mapStateToProps, { createGame,
  fetchGames, subscribeToGamesService
})(GamesContainer)
