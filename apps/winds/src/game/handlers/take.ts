import { s } from '../../levels/story'
import { PhraseReducer } from '../game-reducer'

export const takeCommand: PhraseReducer = (state, action, helpers) => {
  const {
    getRoomItemByName,
    outMessage,
    playerAlreadyHas,
    playerCanSee,
    playerCanTake,
    playerHasItemName,
    transferToPlayer,
  } = helpers
  const { mo } = action.payload.phrase

  const item = getRoomItemByName(mo)
  if (typeof item === 'string') {
    outMessage(item)
  } else if (item && playerAlreadyHas(item)) {
    outMessage(s.alreadyHave(item))
  } else if (item && playerCanTake(item)) {
    transferToPlayer(item)
    outMessage(s.taken)
  } else if (item && playerCanSee(item)) {
    outMessage(s.cantTake(item))
  } else if (playerHasItemName(mo)) {
    outMessage(s.dontSeeAnymore(mo))
  } else {
    outMessage(s.dontSeeWord(mo))
  }
}
