import { s } from '../../levels/story'
import { PhraseReducer } from '../game-reducer'

export const examineCommand: PhraseReducer = (draft, action, helpers) => {
  const { getRoomItemByName, playerCanSee, outMessage, examineItem } = helpers
  const { mo } = action.payload.phrase
  const item = getRoomItemByName(mo)
  if (item && playerCanSee(item)) {
    outMessage(examineItem(item))
  } else if (mo) {
    outMessage(s.cantSee(mo))
  } else {
    outMessage(s.unknown())
  }

  return draft
}
