import { GOT_GAME } from '../actions/games/get'
import { JOINED_GAME } from '../actions/games/join'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case JOINED_GAME :
    case GOT_GAME :
      return payload._id

    default :
      return state
  }
}
