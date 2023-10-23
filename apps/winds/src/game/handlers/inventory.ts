import { PhraseReducer } from '../game-reducer'

export const inventoryCommand: PhraseReducer = (state, action, helpers) => {
  helpers.inventoryMessage()
}
