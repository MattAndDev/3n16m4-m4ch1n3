import { move } from './move'

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const rotors = [
  { index: 1, id: 1 },
  { index: 1, id: 2 },
  { index: 1, id: 3 },
]

describe('move ()', () => {
  it('Moves by one', () => {
    const updated = move({ rotors, chars })
    expect(updated[0].index).toEqual(2)
  })

  it('Moves at regular steps', () => {
    let updated = rotors
    for (let i = 0; i < chars.length; i++) {
      updated = move({ rotors: updated, chars })
    }
    expect(updated[0].index).toEqual(1)
    expect(updated[1].index).toEqual(2)
  })

  it('Moves at regular steps different charSet', () => {
    let updated = rotors
    const doubleChars = [...chars, ...chars]
    for (let i = 0; i < doubleChars.length * doubleChars.length; i++) {
      updated = move({ rotors: updated, chars: doubleChars })
    }
    expect(updated[0].index).toEqual(1)
    expect(updated[1].index).toEqual(1)
    expect(updated[2].index).toEqual(2)
  })

  it('Is pure', () => {
    const local = rotors
    const result = move({ rotors: local, chars })
    expect(local[0].index).toEqual(1)
    expect(result[0].index).toEqual(2)
  })
})
