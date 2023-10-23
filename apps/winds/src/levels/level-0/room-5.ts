import { Game } from '../../game/types'
import { s } from '../story'

export const room5: Game.Room = {
  id: 'sub-cliff',
  visited: false,
  visitDesc: s.l0.r5.visit,
  enterDesc: s.l0.r5.enter,
  children: [],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r5.e.nc,
      room: 5,
    },
    east: {
      open: true,
      openedDesc: s.l0.r5.e.eo,
      closedDesc: '',
      room: 12,
    },
    south: {
      open: true,
      openedDesc: s.l0.r5.e.so,
      closedDesc: '',
      room: 4,
    },
    west: {
      open: true,
      openedDesc: s.l0.r5.e.wo,
      closedDesc: '',
      room: 6,
    },
    down: {
      open: true,
      openedDesc: s.l0.r5.e.do,
      closedDesc: '',
      room: 18,
    },
  },
}
