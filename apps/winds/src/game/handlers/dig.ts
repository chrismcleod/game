import { s } from '../../levels/story'
import { PhraseReducer } from '../game-reducer'

export const digCommand: PhraseReducer = (draft, action, helpers) => {
  const { getRoomItemByName, isClosedItem, openItem, outMessage } = helpers

  const { mo } = action.payload.phrase

  const item = getRoomItemByName(mo)
  if (item && isClosedItem(item)) {
    const { beforeDesc } = openItem(item)
    outMessage(s.canDig(item) + ' ' + beforeDesc)
  } else if (item && mo) {
    outMessage(s.cantDigItem(item))
  } else if (mo) {
    outMessage(s.cantDigWord(mo))
  } else {
    outMessage(s.cantDig)
  }
}
