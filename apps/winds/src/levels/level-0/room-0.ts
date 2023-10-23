import { Game } from '../../game/types'
import { s } from '../story'
import { coconut1, sand } from './items'

export const room0: Game.Room = {
  id: 'cliff',
  visited: false,
  visitDesc: s.l0.r0.visit,
  enterDesc: s.l0.r0.enter,
  children: [coconut1, sand],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r0.e.nc,
      room: 0,
    },
    east: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r0.e.ec,
      room: 0,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r0.e.sc,
      room: 0,
    },
    west: {
      open: true,
      openedDesc: s.l0.r0.e.wo,
      closedDesc: '',
      room: 1,
    },
  },
}
