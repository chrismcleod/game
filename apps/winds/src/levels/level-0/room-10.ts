import { Game } from '../../game/types'
import { s } from '../story'

export const room10: Game.Room = {
  id: 'bush',
  visited: false,
  visitDesc: s.l0.r10.visit,
  enterDesc: s.l0.r10.enter,
  children: [],
  exits: {
    north: {
      open: true,
      openedDesc: s.l0.r10.e.no,
      closedDesc: '',
      room: 11,
    },
    east: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r10.e.ec,
      room: 10,
    },
    south: {
      open: true,
      openedDesc: s.l0.r10.e.so,
      closedDesc: '',
      room: 6,
    },
    west: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r10.e.wc,
      room: 10,
    },
  },
}
