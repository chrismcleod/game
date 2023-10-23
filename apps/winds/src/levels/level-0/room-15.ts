import { Game } from '../../game/types'
import { s } from '../story'

export const room15: Game.Room = {
  id: 'bedroom',
  visited: false,
  visitDesc: s.l0.r15.visit,
  enterDesc: s.l0.r15.enter,
  children: [],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r15.e.nc,
      room: 15,
    },
    east: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r15.e.ec,
      room: 15,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r15.e.sc,
      room: 15,
    },
    west: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r15.e.wc,
      room: 15,
    },
    down: {
      open: true,
      openedDesc: s.l0.r15.e.do,
      closedDesc: '',
      room: 13,
    },
  },
}
