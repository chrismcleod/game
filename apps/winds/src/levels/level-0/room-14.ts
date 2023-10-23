import { Game } from '../../game/types'
import { s } from '../story'

export const room14: Game.Room = {
  id: 'closet',
  visited: false,
  visitDesc: s.l0.r14.visit,
  enterDesc: s.l0.r14.enter,
  children: [],
  exits: {
    north: {
      open: true,
      openedDesc: s.l0.r14.e.no,
      closedDesc: '',
      room: 13,
    },
    east: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r14.e.ec,
      room: 14,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r14.e.sc,
      room: 14,
    },
    west: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r14.e.wc,
      room: 14,
    },
  },
}
