import seedrandom from 'seedrandom'
import { Rotor, RotorInput } from '../types'

export type Map = { [char: string]: string }

export const rotor = ({
  id,
  index,
  char,
  chars,
}: Rotor & RotorInput): string => {
  // ensure each char becomes a different random seed
  let i = 0
  const shuffle = [...chars].sort(() => {
    i += 1
    // order chars based on unique seed (stable random)
    return 0.5 - seedrandom(`${i}${index}-${id}-rotor`)()
  })

  // create map for randomized chars
  const map = shuffle.reduce<Map>((acc, curr, i) => {
    if (i < chars.length / 2) {
      acc[curr] = shuffle[i + chars.length / 2]
    }
    return acc
  }, {})

  // reversed map
  const reverseMap = Object.entries(map).reduce<Map>((acc, [value, key]) => {
    acc[key as string] = value
    return acc
  }, {})

  return { ...map, ...reverseMap }[char]
}
