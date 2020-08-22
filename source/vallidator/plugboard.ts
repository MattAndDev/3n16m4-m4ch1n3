import { PlugboardConfig, Errors, EnigmaError } from '../types'

export const validatePlugboard = ({
  plugboard,
}: {
  plugboard: PlugboardConfig
}): null => {
  if (plugboard === null) return null

  const plugboardValues = Object.entries(plugboard).reduce(
    (acc, [key, val]) => {
      acc.push(key)
      acc.push(val)
      return acc
    },
    [] as string[]
  )
  const dictionary: { [key: string]: null } = {}
  const plugboardHasNotUniqueMembers = plugboardValues.reduce((acc, curr) => {
    if (!(curr in dictionary) && !acc) {
      dictionary[curr] = null
      return acc
    }
    return true
  }, false)

  if (plugboardHasNotUniqueMembers) {
    const e = new Error(Errors['error.plugboard.unique']) as EnigmaError
    throw e
  }
  return null
}
