import { Game } from '../../game/types'
import { s } from '../story'

export const room8: Game.Room = {
  id: 'cottage',
  visited: false,
  visitDesc: s.l0.r8.visit,
  enterDesc: s.l0.r8.enter,
  children: [],
  exits: {
    north: {
      open: true,
      openedDesc: s.l0.r8.e.no,
      closedDesc: '',
      room: 9,
    },
    east: {
      open: true,
      openedDesc: s.l0.r8.e.eo,
      closedDesc: '',
      room: 7,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r8.e.sc,
      room: 8,
    },
    west: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r8.e.wc,
      room: 8,
    },
  },
}
