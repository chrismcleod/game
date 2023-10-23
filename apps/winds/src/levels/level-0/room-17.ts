import { Game } from '../../game/types'
import { s } from '../story'

export const room17: Game.Room = {
  id: 'toolshed',
  visited: false,
  visitDesc: s.l0.r17.visit,
  enterDesc: s.l0.r17.enter,
  children: [],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r17.e.nc,
      room: 17,
    },
    east: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r17.e.ec,
      room: 17,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r17.e.sc,
      room: 17,
    },
    west: {
      open: true,
      openedDesc: s.l0.r17.e.wo,
      closedDesc: '',
      room: 16,
    },
  },
}
