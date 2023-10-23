import { Game } from '../../game/types'
import { s } from '../story'

export const room16: Game.Room = {
  id: 'garden',
  visited: false,
  visitDesc: s.l0.r16.visit,
  enterDesc: s.l0.r16.enter,
  children: [],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r16.e.nc,
      room: 16,
    },
    east: {
      open: false,
      openedDesc: s.l0.r16.e.eo,
      closedDesc: '',
      room: 17,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r16.e.sc,
      room: 16,
    },
    west: {
      open: true,
      openedDesc: s.l0.r16.e.wo,
      closedDesc: '',
      room: 13,
    },
  },
}
