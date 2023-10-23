import { Game } from '../../game/types'
import { s } from '../story'
import { stumptrees } from './items'

export const room3: Game.Room = {
  id: 'bogs',
  visited: false,
  visitDesc: s.l0.r3.visit,
  enterDesc: s.l0.r3.enter,
  children: [stumptrees],
  exits: {
    north: {
      open: true,
      openedDesc: s.l0.r3.e.no,
      closedDesc: '',
      room: 4,
    },
    east: {
      open: true,
      openedDesc: s.l0.r3.e.eo,
      closedDesc: '',
      room: 2,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r3.e.sc,
      room: 3,
    },
    west: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r3.e.wc,
      room: 3,
    },
  },
}
