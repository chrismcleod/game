import { Game } from '../../game/types'
import { s } from '../story'
import { pepperPlant, rottenTree } from './items'

export const room2: Game.Room = {
  id: 'pier',
  visited: false,
  visitDesc: s.l0.r2.visit,
  enterDesc: s.l0.r2.enter,
  children: [rottenTree, pepperPlant],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r2.e.nc,
      room: 2,
    },
    east: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r2.e.ec,
      room: 2,
    },
    south: {
      open: true,
      openedDesc: s.l0.r2.e.so,
      closedDesc: '',
      room: 1,
    },
    west: {
      open: false,
      openedDesc: s.l0.r2.e.wo,
      closedDesc: s.l0.r2.e.wc,
      room: 3,
    },
  },
}
