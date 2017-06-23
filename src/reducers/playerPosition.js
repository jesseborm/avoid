// src/reducers/playerPosition.js
import {
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT
} from '../actions/games/change-position'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case MOVE_UP :
      return [ ...payload ]

    default :
      return state

  }
}
