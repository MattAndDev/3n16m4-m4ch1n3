import { rotor } from './rotor'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const randomCharIndex = () => Math.floor(Math.random() * chars.length)

const randomId = () => Math.floor(Math.random() * 100)

describe('rotor ()', () => {
  it('Maps all chars', () => {
    const clone = [...chars]
    const id = randomId()
    const index = randomCharIndex()
    const missingChars = chars.reduce((acc, curr) => {
      const res = rotor({ id, index, chars, char: curr })
      return acc.filter((c) => c !== res)
    }, clone)
    expect(missingChars).toEqual([])
  })

  it('Maps chars in reversible manner', () => {
    const id = randomId()
    const index = randomCharIndex()
    for (let i = 0; i < chars.length; i++) {
      const char = chars[i]
      const res = rotor({ id, index, chars, char })
      const rev = rotor({ id, index, chars, char: res })
      expect(rev).toEqual(char)
    }
  })

  it('Returns same result for same config ', () => {
    const execute1 = () => {
      rotor({
        id: randomId(),
        index: randomCharIndex(),
        chars,
        char: 'C',
      })
    }
    expect(execute1).toEqual(execute1)
  })

  it('Returns different results for configs', () => {
    const rotor1 = chars.reduce((acc, curr) => {
      acc[curr] = rotor({
        id: randomId(),
        index: randomCharIndex(),
        chars,
        char: curr,
      })
      return acc
    }, {} as { [key: string]: string })

    const rotor2 = chars.reduce((acc, curr) => {
      acc[curr] = rotor({
        id: randomId(),
        index: randomCharIndex(),
        chars,
        char: curr,
      })
      return acc
    }, {} as { [key: string]: string })

    expect(rotor1).not.toEqual(rotor2)
  })
})
