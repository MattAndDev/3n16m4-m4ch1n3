import { CharSet, Errors, EnigmaError } from '../types'

export const validateCharSet = ({ charSet }: { charSet: CharSet }): null => {
  const charsetIsArray = Array.isArray(charSet)
  if (!charsetIsArray) {
    const e = new Error(Errors['error.charset.type']) as EnigmaError
    throw e
  }

  const charSetIsEven = charSet.length % 2 === 0
  if (!charSetIsEven) {
    const e = new Error(Errors['error.charset.uneven']) as EnigmaError
    throw e
  }

  const dictionary: { [key: string]: null } = {}
  const charSetHasNotUniqueMembers = charSet.reduce((acc, curr) => {
    if (!(curr in dictionary) && !acc) {
      dictionary[curr] = null
      return acc
    }
    return true
  }, false)

  if (charSetHasNotUniqueMembers) {
    const e = new Error(Errors['error.charset.unique']) as EnigmaError
    throw e
  }

  const charSetHasInvalidMembers = charSet.reduce((acc, curr) => {
    if (typeof curr === 'string' && curr.length === 1 && !acc) {
      dictionary[curr]
      return acc
    }
    return true
  }, false)
  if (charSetHasInvalidMembers) {
    const e = new Error(Errors['error.charset.members']) as EnigmaError
    throw e
  }

  return null
}
