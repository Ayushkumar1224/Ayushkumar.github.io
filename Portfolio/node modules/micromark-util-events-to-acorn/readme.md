# micromark-util-events-to-acorn

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][bundle-size-badge]][bundle-size]
[![Sponsors][sponsors-badge]][opencollective]
[![Backers][backers-badge]][opencollective]
[![Chat][chat-badge]][chat]

[micromark][] utility to try and parse events with acorn.

## Contents

*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`eventsToAcorn(events, options)`](#eventstoacornevents-options)
    *   [`Options`](#options)
    *   [`Result`](#result)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install micromark-util-events-to-acorn
```

In Deno with [`esm.sh`][esmsh]:

```js
import {eventsToAcorn} from 'https://esm.sh/micromark-util-events-to-acorn@1'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {eventsToAcorn} from 'https://esm.sh/micromark-util-events-to-acorn@1?bundle'
</script>
```

## Use

```js
import {eventsToAcorn} from 'micromark-util-events-to-acorn'

// A factory that uses the utility:
/** @type {Tokenizer} */
function factoryMdxExpression(effects, ok, nok) {
  return start

  // …

    // …

    // Gnostic mode: parse w/ acorn.
    const result = eventsToAcorn(this.events.slice(eventStart), {
      acorn,
      acornOptions,
      start: pointStart,
      expression: true,
      allowEmpty,
      prefix: spread ? '({' : '',
      suffix: spread ? '})' : ''
    })

    // …

  // …
}
```

## API

This module exports the identifier [`eventsToAcorn`][api-events-to-acorn].
There is no default export.

The export map supports the [`development` condition][development].
Run `node --conditions development module.js` to get instrumented dev code.
Without this condition, production code is loaded.

### `eventsToAcorn(events, options)`

###### Parameters

*   `events` (`Array<Event>`)
    — events
*   `options` ([`Options`][api-options])
    — configuration

###### Returns

Result ([`Result`][api-result]).

### `Options`

Configuration (TypeScript type).

###### Fields

*   `acorn` ([`Acorn`][acorn], required)
    — typically `acorn`, object with `parse` and `parseExpressionAt` fields
*   `acornOptions` ([`AcornOptions`][acorn-options], optional)
    — configuration for `acorn`
*   `start` (`Point`, optional)
    — place where events start
*   `prefix` (`string`, default: `''`)
    — text to place before events
*   `suffix` (`string`, default: `''`)
    — text to place after events
*   `expression` (`boolean`, default: `false`)
    — whether this is a program or expression
*   `allowEmpty` (`boolean`, default: `false`)
    — whether an empty expression is allowed (programs are always allowed to be
    empty)

### `Result`

Result (TypeScript type).

###### Fields

*   `estree` ([`Program`][program] or `undefined`)
    — Program
*   `error` (`Error` or `undefined`)
    — error if unparseable
*   `swallow` (`boolean`)
    — whether the error, if there is one, can be swallowed and more JavaScript
    could be valid

## Types

This package is fully typed with [TypeScript][].
It exports the additional types [`Acorn`][acorn],
[`AcornOptions`][acorn-options], [`Options`][api-options], and
[`Result`][api-result].

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 16+.
Our projects sometimes work with older versions, but this is not guaranteed.

These extensions work with `micromark` version 3+.

## Security

This package is safe.

## Contribute

See [`contributing.md`][contributing] in [`micromark/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/micromark/micromark-extension-mdx-expression/workflows/main/badge.svg

[build]: https://github.com/micromark/micromark-extension-mdx-expression/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/micromark/micromark-extension-mdx-expression.svg

[coverage]: https://codecov.io/github/micromark/micromark-extension-mdx-expression

[downloads-badge]: https://img.shields.io/npm/dm/micromark-util-events-to-acorn.svg

[downloads]: https://www.npmjs.com/package/micromark-util-events-to-acorn

[bundle-size-badge]: https://img.shields.io/bundlephobia/minzip/micromark-util-events-to-acorn.svg

[bundle-size]: https://bundlephobia.com/result?p=micromark-util-events-to-acorn

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[opencollective]: https://opencollective.com/unified

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/micromark/micromark/discussions

[license]: https://github.com/micromark/micromark-extension-mdx-expression/blob/main/license

[author]: https://wooorm.com

[health]: https://github.com/micromark/.github

[contributing]: https://github.com/micromark/.github/blob/main/contributing.md

[support]: https://github.com/micromark/.github/blob/main/support.md

[coc]: https://github.com/micromark/.github/blob/main/code-of-conduct.md

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[development]: https://nodejs.org/api/packages.html#packages_resolving_user_conditions

[acorn]: https://github.com/acornjs/acorn

[acorn-options]: https://github.com/acornjs/acorn/blob/96c721dbf89d0ccc3a8c7f39e69ef2a6a3c04dfa/acorn/dist/acorn.d.ts#L16

[micromark]: https://github.com/micromark/micromark

[program]: https://github.com/estree/estree/blob/master/es2015.md#programs

[api-events-to-acorn]: #eventstoacornevents-options

[api-options]: #options

[api-result]: #result
