import { Game } from '../../game/types'
import { s } from '../story'

export const room13: Game.Room = {
  id: 'mansion',
  visited: false,
  visitDesc: s.l0.r13.visit,
  enterDesc: s.l0.r13.enter,
  children: [],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r13.e.nc,
      room: 13,
    },
    east: {
      open: true,
      openedDesc: s.l0.r13.e.eo,
      closedDesc: '',
      room: 16,
    },
    south: {
      open: true,
      openedDesc: s.l0.r13.e.so,
      closedDesc: '',
      room: 14,
    },
    west: {
      open: true,
      openedDesc: s.l0.r13.e.wo,
      closedDesc: '',
      room: 12,
    },
    up: {
      open: true,
      openedDesc: s.l0.r13.e.uo,
      closedDesc: '',
      room: 15,
    },
  },
}
