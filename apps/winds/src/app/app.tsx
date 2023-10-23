import { useEffect, useRef, ChangeEvent, Fragment, KeyboardEvent } from 'react'
import { useImmerReducer } from 'use-immer'

import { gameReducer, initialState } from '../game/game-reducer'
import { Game } from '../game/types'
import * as Sounds from '../levels/sounds'
import { Inventory } from './inventory'

export function App() {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useImmerReducer(gameReducer, initialState)

  const Sound = (Sounds as any)[`Level${state.currentLevel}Sounds`][
    `Room${state.currentRoom}`
  ]

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(Game.Actions.userInput(event.target.value))
  }

  const handleSubmit = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(Game.Actions.userCommand(state.value))
    }
  }

  const handleHideIntro = () => {
    dispatch(Game.Actions.hideIntro())
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView()
  }, [state])

  useEffect(() => {
    localStorage.setItem('game', JSON.stringify(state))
  }, [state])

  return (
    <div className="messages-root">
      <div className="message-box">
        {state.showIntro ? (
          <div className="messages">
            <p className="message-out inactive">
              Raging waters, torrential rains. The wind and waves toss you about
              like a toy.
            </p>
            <button onClick={handleHideIntro} className="intro-button">
              Wake up.
            </button>
          </div>
        ) : (
          <Fragment>
            <div className="messages">
              {state.messages.map(({ dir, msg }, idx) =>
                dir === Game.GameMessageDirection.INVENTORY ? (
                  <Inventory inventory={state.inventory} />
                ) : (
                  <p
                    key={idx}
                    className={`message-${dir} ${
                      idx === state.messages.length - 1 ? 'active' : 'inactive'
                    }`}
                  >
                    {msg.split('\n').map((line, idx) => (
                      <span
                        key={idx}
                        style={{ display: 'block' }}
                        dangerouslySetInnerHTML={
                          dir === 'out' ? { __html: line } : undefined
                        }
                      >
                        {dir === 'in' ? line : undefined}
                      </span>
                    ))}
                  </p>
                )
              )}
              <div ref={bottomRef} />
            </div>
            <input
              autoFocus
              onKeyUp={handleSubmit}
              type="text"
              onChange={handleChange}
              value={state.value}
              style={{
                backgroundColor: '#ffffff11',
                border: '1px solid #666',
                color: 'white',
                outline: 'none',
                padding: 8,
              }}
            />
            {Sound ? <Sound state={state} /> : null}
          </Fragment>
        )}
      </div>
      <button onClick={() => dispatch(Game.Actions.reset())}>reset</button>
    </div>
  )
}

export default App
