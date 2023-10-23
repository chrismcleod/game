import { Game } from '../../game/types'
import { s } from '../story'

export const room4: Game.Room = {
  id: 'seed',
  visited: false,
  visitDesc: s.l0.r4.visit,
  enterDesc: s.l0.r4.enter,
  children: [],
  exits: {
    north: {
      open: true,
      openedDesc: s.l0.r4.e.no,
      closedDesc: '',
      room: 5,
    },
    east: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r4.e.ec,
      room: 4,
    },
    south: {
      open: true,
      openedDesc: s.l0.r4.e.so,
      closedDesc: '',
      room: 3,
    },
    west: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r4.e.wc,
      room: 4,
    },
  },
}
