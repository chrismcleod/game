import { Game } from '../../game/types'

export const start: Game.Room = {
  id: 'start',
  visited: true,
  visitDesc: '',
  enterDesc: '',
  children: [],
  exits: {
    north: {
      open: true,
      openedDesc: '',
      closedDesc: '',
      room: 0,
    },
  },
}
