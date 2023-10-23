import { Game } from '../../game/types'
import { s } from '../story'

const { ItemBits: B } = Game

export const spellbook: Game.Item = {
  id: 'spellbook',
  name: s.i.spellbook.name,
  syn: s.i.spellbook.syn,
  adj: s.i.spellbook.adj,
  desc: s.i.spellbook.desc,
  descs: s.i.spellbook.descs,
  bits: [B.VISIBLE, B.CONTAINED, B.PERMANENT, B.CONTAINER, B.TAKEABLE],
  children: [],
}

export const hollowstump: Game.Item = {
  id: 'hollowstump',
  name: s.i.hollowstump.name,
  syn: s.i.hollowstump.syn,
  adj: s.i.hollowstump.adj,
  desc: s.i.hollowstump.desc,
  descs: s.i.hollowstump.descs,
  bits: [B.VISIBLE, B.CONTAINER, B.CLOSED, B.UNTAKEABLE],
  children: [spellbook],
}

export const stumptrees: Game.Item = {
  id: 'stumptrees',
  name: s.i.stumptrees.name,
  syn: s.i.stumptrees.syn,
  adj: s.i.stumptrees.adj,
  desc: s.i.stumptrees.desc,
  descs: s.i.stumptrees.descs,
  bits: [B.VISIBLE, B.CONTAINER, B.CLOSED, B.UNTAKEABLE, B.OPEN_ON_EXAMINE],
  children: [hollowstump],
}

export const seawater: Game.Item = {
  id: 'seawater',
  name: s.i.seawater.name,
  syn: s.i.seawater.syn,
  adj: s.i.seawater.adj,
  desc: s.i.seawater.desc,
  descs: s.i.seawater.descs,
  bits: [B.VISIBLE, B.CONTAINED],
  children: [],
}

export const flask: Game.Item = {
  id: 'flask',
  name: s.i.flask.name,
  syn: s.i.flask.syn,
  adj: s.i.flask.adj,
  desc: s.i.flask.desc,
  descs: s.i.flask.descs,
  bits: [B.VISIBLE, B.TAKEABLE, B.CONTAINER, B.CONTAINED],
  children: [seawater],
}

export const sand: Game.Item = {
  id: 'sand',
  name: s.i.sand.name,
  syn: s.i.sand.syn,
  adj: s.i.sand.adj,
  desc: s.i.sand.desc,
  descs: s.i.sand.descs,
  bits: [B.VISIBLE, B.CONTAINER, B.CLOSED, B.DESTROY_ON_OPEN, B.UNTAKEABLE],
  children: [flask],
}

export const coconut1: Game.Item = {
  id: 'coconut1',
  name: s.i.coconut.name,
  syn: s.i.coconut.syn,
  adj: s.i.coconut.adj,
  desc: s.i.coconut.desc,
  descs: s.i.coconut.descs,
  bits: [Game.ItemBits.VISIBLE, Game.ItemBits.TAKEABLE],
  children: [],
}

export const rottenTree: Game.Item = {
  id: 'rottentree',
  name: s.i.rottentree.name,
  syn: s.i.rottentree.syn,
  adj: s.i.rottentree.adj,
  desc: s.i.rottentree.desc,
  descs: s.i.rottentree.descs,
  bits: [Game.ItemBits.VISIBLE, Game.ItemBits.ATTACKABLE],
  children: [],
}

export const pepper: Game.Item = {
  id: 'pepper',
  name: s.i.pepper.name,
  syn: s.i.pepper.syn,
  adj: s.i.pepper.adj,
  desc: s.i.pepper.desc,
  descs: s.i.pepper.descs,
  bits: [
    Game.ItemBits.VISIBLE,
    Game.ItemBits.TAKEABLE,
    Game.ItemBits.TAKE_COPY,
    Game.ItemBits.SINGLETON,
    Game.ItemBits.CONSUMABLE,
  ],
  children: [],
}

export const pepperPlant: Game.Item = {
  id: 'pepperplant',
  name: s.i.pepperplant.name,
  syn: s.i.pepperplant.syn,
  adj: s.i.pepperplant.adj,
  desc: s.i.pepperplant.desc,
  descs: s.i.pepperplant.descs,
  bits: [Game.ItemBits.VISIBLE, Game.ItemBits.CONTAINER],
  children: [pepper],
}
