import { s } from '../../levels/story'
import { PhraseReducer } from '../game-reducer'

export const combineCommand: PhraseReducer = (state, action, helpers) => {
  const { outMessage, getItems, destroyItems, canCombine, findCombination } =
    helpers

  const { mo, io } = action.payload.phrase
  const [mi, ii] = getItems([mo, io])

  if (!mi && !ii) {
    if (mo && io) {
      outMessage(s.dontSeeEitherWord(mo, io))
    } else {
      outMessage(s.dontSeeEither())
    }
  } else if (!mi && ii) {
    outMessage(s.dontSeeWord(mo))
  } else if (mi && !ii) {
    outMessage(s.dontSeeWord(io))
  } else if (typeof mi === 'string') {
    outMessage(mi)
  } else if (typeof ii === 'string') {
    outMessage(ii)
  } else if (mi && ii) {
    const [haveMo, haveIo] = canCombine(mi, mi)

    if (!haveMo && !haveIo) {
      outMessage(s.dontHaveEither(mi, ii))
    } else if (!haveMo) {
      outMessage(s.dontHave(mi))
    } else if (!haveIo) {
      outMessage(s.dontHave(ii))
    } else {
      const combo = findCombination(mi, ii)

      if (combo) {
        if (combo.destroys) destroyItems([mi, ii])
        outMessage(combo.desc)
      } else {
        outMessage(s.comboFailed(mi, ii))
      }
    }
  }
}
