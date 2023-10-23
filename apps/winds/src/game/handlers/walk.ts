import { s } from '../../levels/story'
import { PhraseReducer } from '../game-reducer'
import { Game } from '../types'

const directionMap = {
  n: 'north',
  s: 'south',
  e: 'east',
  w: 'west',
  u: 'up',
  d: 'down',
}

export const walkCommand: PhraseReducer = (draft, action, helpers) => {
  const { getCurrentRoom, outMessage, getCurrentRoomDescription } = helpers

  const direction = ((directionMap as any)[action.payload.phrase.mp] ||
    action.payload.phrase.mp) as Game.Direction

  const room = getCurrentRoom()
  const exit = room.exits[direction]

  if (exit?.open) {
    draft.currentRoom = exit.room
    outMessage(getCurrentRoomDescription())
    getCurrentRoom().visited = true
  } else if (exit?.closedDesc) {
    outMessage(exit.closedDesc)
  } else {
    outMessage(s.cantWalk)
  }
}
