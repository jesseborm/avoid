import React, { PureComponent } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import JoinGameIcon from 'material-ui/svg-icons/maps/local-dining'
import whatchGameIcon from 'material-ui/svg-icons/maps/local-dining'
import playGameIcon from 'material-ui/svg-icons/maps/local-dining'

import subscribeToGames from '../actions/games/subscribe'
import createGame from '../actions/games/create'
import fetchGames from '../actions/games/fetch'
import './Lobby.sass'



class Lobby extends PureComponent {
  componentWillMount() {
    this.props.fetchGames()
    this.props.subscribeToGames()
  }


  goToGame(gameId) {
    const { push } = this.props

    return () => {
       push(`/games/${gameId}`)
    }
  }

  isJoinable (game){
    if(game.started) return false

    return !!!game.players
    .map((p) => (p.userId))
    .includes(this.props.currentUser._id)
  }

  isPlayer(game) {
    return !!!game.players
    .map((p) => (p.userId))
    .includes(this.props.currentUser._id)
  }

  renderGame(game, index) {
    let ActionIcon = this.isJoinable(game) ? whatchGameIcon : JoinGameIcon
    if (this.isPlayer(game)) ActionIcon = playGameIcon
    return (
      <MenuItem
      key={index}
      onClick = {this.goToGame(game._id).bind(this)}
      rightIcon={<ActionIcon />}
      primaryText={`${game.owner.name}'s game`} />
    )
  }


  render() {
    return (
      <div className="games lobby">
        <h1>Lobby</h1>
        <Menu>
          {this.props.names.map(this.renderGame.bind(this))}
        </Menu>

      </div>
    )
  }
}

const mapStateToProps = ({ games }) => ({ games })

export default connect(mapStateToProps, { push, subscribeToGames, createGame })(Lobby)
