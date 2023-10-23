import { Game } from '../../game/types'
import { s } from '../story'

export const room1: Game.Room = {
  id: 'grove',
  visited: false,
  visitDesc: s.l0.r1.visit,
  enterDesc: s.l0.r1.enter,
  children: [],
  exits: {
    north: {
      open: true,
      openedDesc: s.l0.r1.e.no,
      closedDesc: '',
      room: 2,
    },
    east: {
      open: true,
      openedDesc: s.l0.r1.e.eo,
      closedDesc: '',
      room: 0,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r1.e.sc,
      room: 1,
    },
    west: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r1.e.wc,
      room: 1,
    },
  },
}
