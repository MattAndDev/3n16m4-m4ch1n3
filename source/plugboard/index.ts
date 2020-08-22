import { PlugboardConfig } from '../types'

const plugboard = ({
  char,
  config = null,
}: {
  config: PlugboardConfig
  char: string
}): string => {
  if (config === null) return char

  const reverseConfig = Object.entries(config).reduce(
    (acc, [value, key]) => {
      acc[key] = value
      return acc
    },
    {} as {
      [input: string]: string
    }
  )
  const fullConfig = { ...config, ...reverseConfig }

  if (!fullConfig[char]) return char

  return fullConfig[char]
}

export default plugboard
