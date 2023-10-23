import { s } from '../../levels/story'
import { PhraseReducer } from '../game-reducer'

export const consumeCommand: PhraseReducer = (state, action, helpers) => {
  const {
    getRoomItemByName,
    outMessage,
    playerHasItem,
    playerCanSee,
    playerCanConsume,
    consumeItem,
  } = helpers
  const { mo, ov } = action.payload.phrase

  const item = getRoomItemByName(mo)
  if (typeof item === 'string') {
    outMessage(item)
  } else if (item && !playerHasItem(item)) {
    outMessage(s.dontHave(item))
  } else if (item && playerCanConsume(item)) {
    outMessage(consumeItem(item) || s.consumed(ov, mo))
  } else if (item && playerCanSee(item)) {
    outMessage(s.cantConsume(ov, mo))
  } else {
    outMessage(s.dontSeeWord(mo))
  }
}
