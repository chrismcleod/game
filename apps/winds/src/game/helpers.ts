import { intersection, last, merge, remove, uniq } from 'lodash'

import { getArticle } from '@warebots/utils-browser'

import { combinations } from '../levels/combinations'
import { Game, Maybe } from './types'

type B = Game.ItemBits
const B = Game.ItemBits

export type Helpers = ReturnType<typeof makeHelpers>
export const makeHelpers = (state: Game.State) => {
  const inMessage = (msg: string) => {
    state.messages.push({
      dir: Game.GameMessageDirection.IN,
      msg,
    })
  }

  const outMessage = (msg: string) => {
    if (!msg.trim()) return
    return state.messages.push({ dir: Game.GameMessageDirection.OUT, msg })
  }

  const inventoryMessage = () => {
    return state.messages.push({
      dir: Game.GameMessageDirection.INVENTORY,
      msg: '',
    })
  }

  const rmBits = (item: Game.Item, bit: Game.ItemBits[] | Game.ItemBits) => {
    const bits = ([] as Game.ItemBits[]).concat(bit)

    item.bits = item.bits.filter((b) => !bits.includes(b))
  }

  const addBits = (item: Game.Item, bit: Game.ItemBits[] | Game.ItemBits) => {
    item.bits = item.bits.concat(bit)
  }

  const hasBits = (item: Game.Item, bit: Game.ItemBits[] | Game.ItemBits) => {
    const bits = ([] as B[]).concat(bit)

    return intersection(item.bits, bits).length === bits.length
  }

  const openExit = (levelId: number, roomId: number, dir: Game.Direction) => {
    const exit = state.levels[levelId].children[roomId].exits[dir]
    if (exit) {
      exit.open = true
    }
  }

  const closeExit = (levelId: number, roomId: number, dir: Game.Direction) => {
    const exit = state.levels[levelId].children[roomId].exits[dir]
    if (exit) {
      exit.open = false
    }
  }

  const consumeItem = (item: Game.Item) => {
    destroyItems([item], true)
    return item.descs[B.CONSUMABLE]
  }

  const getCurrentLevel = () => {
    return state.levels[state.currentLevel]
  }

  const getCurrentRoom = () => {
    return (
      getCurrentLevel().children[state.currentRoom] || getCurrentLevel().start
    )
  }

  const getRoomDescription = (room: Game.Room) => {
    const desc: string[] = []
    desc.push(room.visited ? room.enterDesc : room.visitDesc)

    room.children.forEach((item) => {
      desc.push(getItemDescription(item))
    })

    Object.values(room.exits)
      .filter(({ open }) => open)
      .forEach((exit) => {
        desc.push(exit.openedDesc)
      })

    return uniq(desc).join('\n')
  }

  const getCurrentRoomDescription = () => getRoomDescription(getCurrentRoom())

  const getItems = (names: string[]) => {
    return names.map((name) => getItem(name))
  }

  const getItem = (name: string) => {
    return getRoomItemByName(name) || getInventoryItem(name)
  }

  const getDescendantByProp = (
    prop: keyof Game.Item,
    value: string,
    root: Game.Room | Game.Item
  ): Game.Item | undefined => {
    const child = root.children.find((child) => {
      if (prop === 'name') {
        return child.name === value || child.syn.includes(value)
      } else {
        return child[prop] === value
      }
    })
    if (child) return child
    for (const child of root.children) {
      const desc = getDescendantByProp(prop, value, child)
      if (desc) return desc
    }
    return undefined
  }

  const getRoomItemByName = (name: string) => {
    const room = getCurrentRoom()
    return getDescendantByProp('name', name, room)
  }

  const getRoomItemById = (id: string) => {
    const room = getCurrentRoom()
    return getDescendantByProp('id', id, room)
  }

  const getInventoryItem = (name: string) => {
    return state.inventory.find((item) => matchItem(item, name))
  }

  const findParent = (
    item: Game.Item,
    root: { children: Game.Item[] } | null = null
  ): Game.Item | Game.Room | undefined => {
    if (root === null) return undefined
    if (root.children.includes(item)) return root as Game.Item | Game.Room
    for (const child of root.children) {
      const p = findParent(item, child)
      if (p) return p
    }
    return undefined
  }

  const getItemDescription = (item: Game.Item) => {
    const desc: string[] = []

    if (isContainedItem(item)) {
      desc.push(
        item.descs[B.CONTAINED] || `${getArticle(item.name)} ${item.name}`
      )
      item.children.forEach((child) => desc.push(getItemDescription(child)))
    } else if (isContainerItem(item)) {
      if (isClosedItem(item)) {
        desc.push(
          item.descs[B.CLOSED] || `${getArticle(item.name)} ${item.name}`
        )
      } else {
        desc.push(item.descs[B.CONTAINER] || `${item.name} containing:`)
        item.children.forEach((child) => desc.push(getItemDescription(child)))
      }
    } else if (isUntakeableItem(item)) {
      desc.push(item.descs[B.UNTAKEABLE] || '')
    } else if (isCorpseItem(item)) {
      desc.push(item.descs[B.CORPSE] || '')
    } else if (isVisibleItem(item)) {
      desc.push(item.descs[B.VISIBLE] || '')
    }

    return desc.join(' ')
  }

  const matchItem = (item: Game.Item, name: string) => {
    const words = name.split(' ')
    const noun = last(words)
    const nameMatch = item.name === noun || item.syn.includes(noun || '_')

    if (item.adj.length) {
      if (nameMatch) return item
    }

    return nameMatch ? item : false
  }

  const playerHasItem = (item: Game.Item) => {
    return state.inventory.find(({ id }) => item.id === id)
  }

  const playerHasItemId = (id: string) => {
    return state.inventory.find((item) => item.id === id)
  }

  const playerHasItemName = (name: string) => {
    return state.inventory.find((item) => item.name === name)
  }

  const playerCanConsume = (item: Game.Item) => {
    const roomItem = getRoomItemById(item.id)
    if (roomItem) {
      return roomItem && isConsumableItem(item)
    }
    return false
  }

  const playerCanTake = (item: Game.Item) => {
    const roomItem = getRoomItemById(item.id)
    if (roomItem) {
      if (isContainedItem(roomItem)) {
        const parent = findParent(roomItem)
        if (parent && !isItem(parent)) return isTakeableItem(roomItem)
        return parent && isItem(parent) && isTakeableItem(parent)
      }
      return roomItem && isTakeableItem(item)
    }
    return false
  }

  const playerAlreadyHas = (item: Game.Item) => {
    const roomItem = getRoomItemById(item.id)

    if (
      roomItem &&
      hasBits(roomItem, B.SINGLETON) &&
      playerHasItemId(roomItem.id)
    ) {
      return true
    }

    return false
  }

  const playerCanAttack = (item?: Game.Item): item is Game.Item => {
    if (!item) return false
    if (!playerCanSee(item)) return false
    if (!isAttackableItem(item)) return false
    return true
  }

  const playerCanAttackWith = (item?: Game.Item): item is Game.Item => {
    if (!item) return false
    if (!playerCanSee(item)) return false
    if (!isWeaponItem(item)) return false
    return true
  }

  const playerCanSee = (item: Game.Item | undefined): item is Game.Item => {
    if (!item) return false
    if (!isVisibleItem(item)) return false
    if (state.inventory.includes(item)) return true
    const parent: any = findParent(item, getCurrentRoom())

    return !parent || parent === getCurrentRoom()
      ? true
      : isContainerItem(parent)
      ? !isClosedItem(parent) && playerCanSee(parent)
      : playerCanSee(parent)
  }

  const findCombination = (mi: Game.Item, ii: Game.Item) => {
    return combinations.find((combo) => {
      const [i1, i2] = combo.ids

      if (i1 === mi.id && i2 === ii.id) return true
      if (combo.reversible && i2 === mi.id && i1 === ii.id) return true

      return false
    })
  }

  const attackItemWith = (mi: Game.Item, _ii?: Game.Item) => {
    rmBits(mi, B.ATTACKABLE)
    addBits(mi, B.CORPSE)

    return mi.descs[B.DYING]
  }

  const isAttackableItem = (item: Game.Item) => {
    return item.bits.includes(B.ATTACKABLE) && isVisibleItem(item)
  }

  const isCorpseItem = (item: Game.Item) => hasBits(item, B.CORPSE)

  const isWeaponItem = (item: Game.Item) => {
    return item.bits.includes(B.WEAPON)
  }

  const isConsumableItem = (item: Game.Item) => hasBits(item, B.CONSUMABLE)

  const isTakeableItem = (item: Game.Item) => {
    return hasBits(item, B.TAKEABLE) && isVisibleItem(item)
  }

  const isUntakeableItem = (item: Game.Item) => {
    return hasBits(item, B.UNTAKEABLE) && isVisibleItem(item)
  }

  const isClosedItem = (item: Game.Item) => hasBits(item, B.CLOSED)

  const isContainerItem = (item: Game.Item) => hasBits(item, B.CONTAINER)

  const isContainedItem = (item: Game.Item) => hasBits(item, B.CONTAINED)

  const isVisibleItem = (item: Game.Item) => hasBits(item, B.VISIBLE)

  const openItem = (item: Game.Item) => {
    item.bits = item.bits.filter((bit) => bit !== B.CLOSED)
    const out = { beforeDesc: getItemDescription(item), afterDesc: '' }

    if (destroyOnOpen(item)) {
      const parent = findParent(item, getCurrentRoom()) || getCurrentRoom()

      item.children.forEach((child) => {
        child.bits = child.bits.filter((bit) => bit !== B.CONTAINED)
        parent.children.push(child)
      })

      destroyItems([item])
      out.afterDesc = isItem(parent)
        ? getItemDescription(item)
        : getRoomDescription(parent)
    }

    return out
  }

  const canCombine = (item1: Game.Item, item2: Game.Item) => {
    if (playerCanTake(item1)) {
      transferToPlayer(item1)
    }

    if (playerCanTake(item2)) {
      transferToPlayer(item2)
    }

    const has1 = playerHasItem(item1)
    const has2 = playerHasItem(item2)

    return [has1, has2]
  }

  const transferToPlayer = (item: Game.Item[] | Game.Item) => {
    const items = ([] as Game.Item[]).concat(item)

    ;([] as Game.Item[]).concat(items).forEach((item) => {
      const parent = findParent(item, getCurrentRoom())
      if (parent && !hasBits(item, B.TAKE_COPY))
        parent.children = parent?.children.filter((child) => child !== item)

      if (hasBits(item, B.TAKE_COPY)) state.inventory.push(merge({}, item))
      else state.inventory.push(item)
    })

    state.inventory.forEach((i) => {
      rmBits(i, B.TAKEABLE)
      addBits(i, B.UNTAKEABLE)
    })
  }

  const isItem = (value?: any): value is Game.Item =>
    typeof value == 'object' && value.id && value.bits

  const isItems = (values?: any[]): values is Game.Item[] => {
    if (!values) return false
    return values.every(isItem)
  }

  const examineItem = (item: Game.Item) => {
    if (hasBits(item, B.OPEN_ON_EXAMINE)) {
      openItem(item)
    }

    return item.descs[B.OPEN_ON_EXAMINE] || getItemDescription(item)
  }

  const destroyOnOpen = (item: Game.Item) =>
    item.bits.includes(B.DESTROY_ON_OPEN)

  const destroyItems = (items: Maybe<Game.Item>[], inventoryOnly?: boolean) => {
    const ids = items.filter(isItem).map(({ id }) => id)

    remove(state.inventory, (item) => ids.includes(item.id))

    if (!inventoryOnly) {
      state.levels.forEach((level) => {
        level.children.forEach((room) => {
          remove(room.children, (item) => ids.includes(item.id))
        })
      })
    }
  }

  return {
    addBits,
    attackItemWith,
    canCombine,
    closeExit,
    consumeItem,
    destroyItems,
    examineItem,
    findCombination,
    getCurrentLevel,
    getCurrentRoom,
    getCurrentRoomDescription,
    getInventoryItem,
    getItem,
    getItemDescription,
    getItems,
    getRoomItemById,
    getRoomItemByName,
    hasBits,
    inMessage,
    inventoryMessage,
    isAttackableItem,
    isClosedItem,
    isItem,
    isItems,
    isTakeableItem,
    isVisibleItem,
    isWeaponItem,
    openExit,
    openItem,
    outMessage,
    playerAlreadyHas,
    playerCanAttack,
    playerCanAttackWith,
    playerCanConsume,
    playerCanSee,
    playerCanTake,
    playerHasItem,
    playerHasItemName,
    rmBits,
    transferToPlayer,
  }
}
