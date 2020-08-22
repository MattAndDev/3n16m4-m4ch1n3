import { Message, CharSet, Errors, EnigmaError } from '../types'

export const validateMessage = ({
  message,
  charSet,
}: {
  message: Message
  charSet: CharSet
}): null => {
  const messageHasUnsupportedChar = message.split('').reduce((acc, curr) => {
    if (charSet.find((c) => c === curr) && !acc) {
      return acc
    }
    return true
  }, false)

  if (messageHasUnsupportedChar) {
    const e = new Error(Errors['error.message.characters']) as EnigmaError
    throw e
  }
  return null
}
