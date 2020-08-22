import { Rotor, CharSet, Errors, EnigmaError } from '../types'

export const validateRotors = ({
  rotors,
  charSet,
}: {
  rotors: Rotor[]
  charSet: CharSet
}): null => {
  const indexes = rotors.reduce((acc, curr) => {
    acc.push(curr.index)
    return acc
  }, [] as number[])
  const hasWrongIndex = indexes.find((n) => n > charSet.length || n <= 0)
  if (hasWrongIndex) {
    const e = new Error(Errors['error.rotors.index']) as EnigmaError
    throw e
  }
  return null
}
