import { rotor } from './rotor'
import { move } from './move'
import { Rotor } from '../types'

export const compute = ({
  rotors: r,
  char,
  chars,
}: {
  rotors: Rotor[]
  char: string
  chars: string[]
  skipSpace?: boolean
}): {
  encodedChar: string
  rotors: Rotor[]
} => {
  // clone (only one level deep)
  let rotors = [...r]

  let encodedChar = char

  // first round
  for (let i = 0; i < rotors.length; i++) {
    const { id, index } = rotors[i]
    encodedChar = rotor({ id, index, char: encodedChar, chars })
  }

  // reflector
  encodedChar = rotor({ id: 10, index: 10, char: encodedChar, chars })

  // return
  for (let i = rotors.length - 1; i >= 0; i--) {
    const { id, index } = rotors[i]
    encodedChar = rotor({ id, index, char: encodedChar, chars })
  }

  rotors = move({ rotors, chars })
  return {
    encodedChar,
    rotors,
  }
}
