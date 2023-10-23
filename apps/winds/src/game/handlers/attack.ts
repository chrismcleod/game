import { s } from '../../levels/story'
import { PhraseReducer } from '../game-reducer'

export const attackCommand: PhraseReducer = (draft, action, helpers) => {
  const {
    attackItemWith,
    playerCanAttack,
    playerCanAttackWith,
    getRoomItemByName,
    playerCanSee,
    outMessage,
  } = helpers
  const { mo, io, ov } = action.payload.phrase

  if (mo && io) {
    const mi = getRoomItemByName(mo)
    const ii = getRoomItemByName(io)

    if (!playerCanAttack(mi)) {
      outMessage(s.cantAttackThat(ov, mo))
    } else if (!playerCanAttackWith(ii)) {
      outMessage(s.cantAttackWithThat(ov, mo, io))
    } else {
      outMessage(attackItemWith(mi, ii) || s.attackedWith(ov, mo, io))
    }
  } else {
    const mi = getRoomItemByName(mo)

    if (mi && playerCanSee(mi)) {
      if (playerCanAttack(mi)) {
        outMessage(attackItemWith(mi) || s.attackedWithHands(ov, mo))
      } else {
        outMessage(s.cantAttack(ov))
      }
    } else if (mo) {
      outMessage(s.cantSee(mo))
    } else {
      outMessage(s.unknown())
    }
  }

  return draft
}
