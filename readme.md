# 3n16m4-m4ch1n3

A modern interpretation of the infamous [enigma machine](https://en.wikipedia.org/wiki/Enigma_machine) not limited by hardware and wiring.

For an accurate re-implementation of the original machine, see the [amazing work by Daniel Palloks](http://people.physik.hu-berlin.de/~palloks/js/enigma/index_en.html)

## Default state

```js
const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ .'.split('')

const DEFAULT_ROTORS = [
  { index: 1, id: 1 },
  { index: 1, id: 2 },
  { index: 1, id: 3 },
]

const DEFAULT_PLUGBOARD = null
```

## cli

You can use the machine in your cli:

```shell
npm i -g 3n16m4-m4ch1n3
3n16m4-m4ch1n3 -m "HELLO WORLD"
```

will output: `BIMSUK .VOO`

if you:

```
3n16m4-m4ch1n3 -m "BIMSUK .VOO"
```

you'll get: `HELLO WORLD`

magic ✨

### cli options

`-m`: required, message to be encoded

`-r`: rotors in format "id-index id-index"

`-c`: charset as quoted string "CHARSET"

`-p`: plugboard in format "char-char char-char"

`-v`: print updated rotor state

Example:

```
3n16m4-m4ch1n3 \
-r "1-25 2-12 3-25" \
-c "qwertyuiopasdfghjklzxcvbnm ." \
-p "e-l o-h" \
-m "hello world"
```

outputs: `v abuitdyny`

Of course then:

```
3n16m4-m4ch1n3 \
-r "1-25 2-12 3-25" \
-c "qwertyuiopasdfghjklzxcvbnm ." \
-p "e-l o-h" \
"v abuitdyny"
```

outputs: `hello world`

## module

The package exports a single function `machine`, you can use it as follows:

```js
import { machine } from '3n16m4-m4ch1n3'

const { encodedMessage, rotors } = machine({
  message: 'HELLO WORLD',
})
```

You can optionally pass `rotors`, custom `charset` and `plugboard`.
See type definition for details.

## Dependencies

This package requires crypto (required by [seedrandom](https://www.npmjs.com/package/seedrandom))

## Implementation details

As this package offers a HUGE variety of configurations (far more than the original machines), generating all possible configuration ahead of time would have required a limitation on charset choices as well as number of rotors.

Instead it uses a seeded random via [seedrandom](https://github.com/davidbau/seedrandom), based on machine configuration to create the rotor mappings at runtime.

This allows for a huge variety of possible configurations.

This is **not** an **exact** replica of the inner working of any enigma machine version, rather an approximation that expands on the possible number of configurations.

### Notable differences to original design

- A letter can become itself
- Character set is not limited to 26 latin chars
- Lowercase and uppercase characters are not the same
- Used rotor number is not limited to 3
- Choice of available rotors is not limited to 7
- Plugboard expands with character set
