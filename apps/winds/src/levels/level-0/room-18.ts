import { Game } from '../../game/types'
import { s } from '../story'

export const room18: Game.Room = {
  id: 'submarine',
  visited: false,
  visitDesc: s.l0.r18.visit,
  enterDesc: s.l0.r18.enter,
  children: [],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r18.e.nc,
      room: 18,
    },
    east: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r18.e.ec,
      room: 18,
    },
    south: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r18.e.sc,
      room: 18,
    },
    west: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r18.e.wc,
      room: 18,
    },
    up: {
      open: true,
      openedDesc: s.l0.r18.e.uo,
      closedDesc: '',
      room: 5,
    },
  },
}
