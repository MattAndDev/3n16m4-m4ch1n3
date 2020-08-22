import minimist from 'minimist'
import { machine } from './index'
import { DEFAULT_ROTORS, DEFAULT_CHARSET } from './defaults'

const argv = minimist(process.argv.slice(2))

let rotors = DEFAULT_ROTORS
let charSet = DEFAULT_CHARSET
let plugboard = null
const message = argv.m || ''

if (argv.r) {
  rotors = argv.r.split(' ').map((s: string) => {
    const [id, index] = s.split('-')
    return {
      id: parseInt(id, 10),
      index: parseInt(index, 10),
    }
  })
}

if (argv.p) {
  plugboard = argv.p
    .split(' ')
    .reduce((acc: { [key: string]: string }, s: string) => {
      const [a, b] = s.split('-')
      acc[a] = b
      return acc
    }, {} as { [key: string]: string })
}

if (argv.c) {
  charSet = argv.c.split('')
}

const res = machine({
  message,
  rotors,
  charSet,
  plugboard,
})

if (!argv.v) {
  console.log(res.encodedMessage)
} else {
  console.log(`Encoded message: ${res.encodedMessage}`)
  console.log(`Rotors state: ${JSON.stringify(res.rotors, null, 2)}`)
}

process.exit(0)
