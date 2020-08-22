import { compute } from './compute'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const rotors = [
  { index: 1, id: 1 },
  { index: 1, id: 2 },
  { index: 1, id: 3 },
]

describe('move ()', () => {
  it('Computes decodable value', () => {
    const char = 'H'
    const { encodedChar } = compute({ rotors, chars, char })
    const { encodedChar: result } = compute({
      rotors,
      chars,
      char: encodedChar,
    })
    expect(result).toEqual(char)
  })

  it('Updates rotors correctly', () => {
    const message = new Array(chars.length).fill('A')
    let newRotors = [...rotors]
    for (let i = 0; i < message.length; i++) {
      const { rotors: r } = compute({
        rotors: newRotors,
        chars,
        char: message[i],
      })
      newRotors = r
    }
    expect(newRotors[0].index).toEqual(1)
    expect(newRotors[1].index).toEqual(2)
  })
})
