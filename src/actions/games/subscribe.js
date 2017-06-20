// src/actions/games/subscribe.js
import API from '../../api'

export const SUBSCRIBED_TO_GAMES_SERVICE = 'SUBSCRIBED_TO_GAMES_SERVICE'
export const GAME_CREATED = 'GAME_CREATED'
export const GAME_UPDATED = 'GAME_UPDATED'
export const GAME_REMOVED = 'GAME_REMOVED'

const api = new API()
const games = api.service('games')

export default () => {
  return (dispatch) => {
    games.on('created', (game) => { dispatch(createdRecipe(game)) })
    games.on('updated', (game) => { dispatch(updatedRecipe(game)) })
    games.on('patched', (game) => { dispatch(updatedRecipe(game)) })
    games.on('removed', (game) => { dispatch(removedRecipe(game)) })

    dispatch({ type: SUBSCRIBED_TO_GAMES_SERVICE })
  }
}

const createdRecipe = (game) => {
  return {
    type: GAME_CREATED,
    payload: game
  }
}

const updatedRecipe = (game) => {
  return {
    type: GAME_UPDATED,
    payload: game
  }
}

const removedRecipe = (game) => {
  return {
    type: GAME_REMOVED,
    payload: game
  }
}
