import { Helpers } from '../../game/helpers'
import { Game } from '../../game/types'
import { rottenTree } from './items'

export const triggers = (
  _state: Game.State,
  action: Game.Actions.All,
  helpers: Helpers
) => {
  const { getRoomItemByName, openExit, hasBits } = helpers

  if (action.type === 'PhraseCommand') {
    const mo = getRoomItemByName(action.payload.phrase.mo)

    if (mo?.id === rottenTree.id && !hasBits(mo, Game.ItemBits.ATTACKABLE)) {
      openExit(0, 2, Game.Direction.W)
    }
  }
}
