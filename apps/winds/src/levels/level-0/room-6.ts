import { Game } from '../../game/types'
import { s } from '../story'

export const room6: Game.Room = {
  id: 'crossroads',
  visited: false,
  visitDesc: s.l0.r6.visit,
  enterDesc: s.l0.r6.enter,
  children: [],
  exits: {
    north: {
      open: true,
      openedDesc: s.l0.r6.e.no,
      closedDesc: '',
      room: 10,
    },
    east: {
      open: true,
      openedDesc: s.l0.r6.e.eo,
      closedDesc: '',
      room: 5,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r6.e.sc,
      room: 6,
    },
    west: {
      open: true,
      openedDesc: s.l0.r6.e.wo,
      closedDesc: '',
      room: 7,
    },
  },
}
