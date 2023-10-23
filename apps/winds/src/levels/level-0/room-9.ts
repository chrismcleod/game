import { Game } from '../../game/types'
import { s } from '../story'

export const room9: Game.Room = {
  id: 'kitchen',
  visited: false,
  visitDesc: s.l0.r9.visit,
  enterDesc: s.l0.r9.enter,
  children: [],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r9.e.nc,
      room: 9,
    },
    east: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r9.e.ec,
      room: 9,
    },
    south: {
      open: true,
      openedDesc: s.l0.r9.e.so,
      closedDesc: '',
      room: 8,
    },
    west: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r9.e.wc,
      room: 9,
    },
  },
}
