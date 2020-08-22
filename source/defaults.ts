import { Rotor, PlugboardConfig } from './types'

export const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ .'.split('')

export const DEFAULT_ROTORS: Rotor[] = [
  { index: 1, id: 1 },
  { index: 1, id: 2 },
  { index: 1, id: 3 },
]

export const DEFAULT_PLUGBOARD: PlugboardConfig = null
