import computeRotors from './rotors'
import computePlugboard from './plugboard'
import validator from './vallidator'
import { DEFAULT_ROTORS, DEFAULT_CHARSET, DEFAULT_PLUGBOARD } from './defaults'
import { Message, Rotor, PlugboardConfig, EnigmaResult } from './types'

export const machine = ({
  message,
  rotors = DEFAULT_ROTORS,
  charSet = DEFAULT_CHARSET,
  plugboard = DEFAULT_PLUGBOARD,
}: {
  message: Message
  rotors?: Rotor[]
  charSet?: string[]
  plugboard?: PlugboardConfig
}): EnigmaResult => {
  validator({
    charSet,
    message,
    rotors,
    plugboard,
  })

  const parts = message.split('')

  // ensure charSet order does not matter
  charSet = charSet.sort()

  let encodedMessage = ''
  let updatedRotors = [...rotors]

  for (let i = 0; i < parts.length; i++) {
    let char = parts[i]
    char = computePlugboard({ char, config: plugboard })
    const { encodedChar, rotors: r } = computeRotors({
      rotors: updatedRotors,
      chars: charSet,
      char,
    })
    char = computePlugboard({ char: encodedChar, config: plugboard })
    encodedMessage += char
    updatedRotors = r
  }
  return { encodedMessage, rotors: updatedRotors }
}

export * from './types'
