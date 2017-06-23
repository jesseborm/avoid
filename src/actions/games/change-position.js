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

export default (gameId, newDirection) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('games')

    backend.patch(gameId, newDirection) //position from playerId
    .then((result) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })

      dispatch({
        type: MOVE_UP,
        payload: result
      })
    })

    .catch((error) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })


  }
}
