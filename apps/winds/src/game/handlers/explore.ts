import { PhraseReducer } from '../game-reducer'

/**
 * - describe the current location
 *    - short description
 *    - describe the exits
 * - describe any NPC's
 * - describe any items the player can see
 *   - describe their short descriptions
 *   - describe closed containers
 *   - describe the contents of open or transparent containers
 *   - describe any vehicles
 * 5.
 */

export const exploreCommand: PhraseReducer = (draft, action, helpers) => {
  const { getCurrentRoomDescription, outMessage } = helpers

  outMessage(getCurrentRoomDescription())
}
