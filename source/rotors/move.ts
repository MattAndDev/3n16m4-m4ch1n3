import { Rotor } from '../types'

export const move = ({
  chars,
  rotors,
}: {
  rotors: Rotor[]
  chars: string[]
}): Rotor[] => {
  let next = false
  const updated = new Array(rotors.length).fill(0)
  for (let i = 0; i < rotors.length; i++) {
    updated[i] = {}
    updated[i].id = rotors[i].id
    if (next || i === 0) {
      if (rotors[i].index === chars.length) {
        updated[i].index = 1
        next = true
      } else {
        updated[i].index = rotors[i].index + 1
        next = false
      }
    } else {
      updated[i].index = rotors[i].index
    }
  }

  return updated
}
