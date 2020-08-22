import { CharSet, Message, Rotor, PlugboardConfig } from '../types'
import { validateCharSet } from './charset'
import { validateRotors } from './rotors'
import { validateMessage } from './message'
import { validatePlugboard } from './plugboard'

const validator = ({
  charSet,
  message,
  rotors,
  plugboard,
}: {
  charSet: CharSet
  message: Message
  rotors: Rotor[]
  plugboard: PlugboardConfig
}): void => {
  validateCharSet({ charSet })
  validateRotors({ rotors, charSet })
  validateMessage({ message, charSet })
  validatePlugboard({ plugboard })
}

export default validator
