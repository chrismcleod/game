import { Game } from '../../game/types'
import { s } from '../story'

export const room11: Game.Room = {
  id: 'shack',
  visited: false,
  visitDesc: s.l0.r11.visit,
  enterDesc: s.l0.r11.enter,
  children: [],
  exits: {
    north: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r11.e.nc,
      room: 11,
    },
    east: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r11.e.ec,
      room: 11,
    },
    south: {
      open: true,
      openedDesc: s.l0.r11.e.so,
      closedDesc: '',
      room: 10,
    },
    west: {
      open: false,
      openedDesc: '',
      closedDesc: s.l0.r11.e.wc,
      room: 11,
    },
  },
}
