// src/actions/games/change-position.js

import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const MOVE_UP = "MOVE_UP"
export const MOVE_DOWN = "MOVE_DOWN"
export const MOVE_LEFT = "MOVE_LEFT"
export const MOVE_RIGHT = "MOVE_RIGHT"

const api = new API()
// const playerId = currentGame.playerId

export default (gameId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

      const backend = api.service('games')
      backend.patch(gameId, {  })


  }
}
