export enum Errors {
  'error.charset.type' = 'CharSet must be an array',
  'error.charset.members' = 'CharSet members must be strings and have length 1',
  'error.charset.uneven' = 'CharSet length must be even',
  'error.charset.unique' = 'CharSet members must be unique',
  'error.rotors.index' = 'Rotor indexes should be within 1 and Charset length',
  'error.message.characters' = 'Message can only have characters present in Charset',
  'error.plugboard.unique' = 'Plugboard can map character only once',
}

export type EnigmaError = Error & {
  data: { [key: string]: unknown }
}

export type CharSet = Char[]

export type Char = string

export type Message = string

export type Rotor = {
  id: number
  index: number
}

export type RotorInput = {
  char: string
  chars: string[]
}

export type PlugboardConfig = {
  [input: string]: string
} | null

export type EnigmaResult = {
  rotors: Rotor[]
  encodedMessage: string
}
