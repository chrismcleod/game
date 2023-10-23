import { FC } from 'react'

import { getArticle } from '@warebots/utils-browser'

import { Game } from '../game/types'

interface Props {
  inventory: Game.State['inventory']
}

export const Inventory: FC<Props> = (props) => {
  const { inventory } = props

  return (
    <div className="inventory-root">
      <span className="title">Inventory</span>
      {inventory.map((item) => (
        <dl>
          <dt>
            {getArticle(item.adj[0] || item.name)}&nbsp;
            {item.adj.join(' ')} {item.name}:
          </dt>
          <dd>{item.desc}</dd>
        </dl>
      ))}
    </div>
  )
}
