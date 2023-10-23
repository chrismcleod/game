import { Game } from '../../game/types'
import { s } from '../story'

export const room12: Game.Room = {
  id: 'boat',
  visited: false,
  visitDesc: s.l0.r12.visit,
  enterDesc: s.l0.r12.enter,
  children: [],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r12.e.nc,
      room: 12,
    },
    east: {
      open: true,
      openedDesc: s.l0.r12.e.eo,
      closedDesc: '',
      room: 13,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r12.e.sc,
      room: 12,
    },
    west: {
      open: true,
      openedDesc: s.l0.r12.e.wo,
      closedDesc: '',
      room: 5,
    },
  },
}
