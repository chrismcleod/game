import { Game } from '../../game/types'
import { s } from '../story'

export const room7: Game.Room = {
  id: 'grass',
  visited: false,
  visitDesc: s.l0.r7.visit,
  enterDesc: s.l0.r7.enter,
  children: [],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r7.e.nc,
      room: 7,
    },
    east: {
      open: true,
      openedDesc: s.l0.r7.e.eo,
      closedDesc: '',
      room: 6,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r7.e.sc,
      room: 7,
    },
    west: {
      open: true,
      openedDesc: s.l0.r7.e.wo,
      closedDesc: s.l0.r7.e.wc,
      room: 8,
    },
  },
}
