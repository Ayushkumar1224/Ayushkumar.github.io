# micromark-extension-mdx-expression

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[micromark][] extension to support [MDX][mdxjs] expressions (`{Math.PI}`).

## Contents

*   [What is this?](#what-is-this)
*   [When to use this](#when-to-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`mdxExpression(options?)`](#mdxexpressionoptions)
    *   [Options](#options)
*   [Authoring](#authoring)
*   [Syntax](#syntax)
*   [Errors](#errors)
    *   [Unexpected end of file in expression, expected a corresponding closing brace for `{`](#unexpected-end-of-file-in-expression-expected-a-corresponding-closing-brace-for-)
    *   [Could not parse expression with acorn: Unexpected content after expression](#could-not-parse-expression-with-acorn-unexpected-content-after-expression)
    *   [Could not parse expression with acorn: $error](#could-not-parse-expression-with-acorn-error)
*   [Tokens](#tokens)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package contains an extension that adds support for the expression syntax
enabled by [MDX][mdxjs] to [`micromark`][micromark].
These extensions are used inside MDX.

This package can be made aware or unaware of JavaScript syntax.
When unaware, expressions could include Rust or variables or whatnot.

## When to use this

This project is useful when you want to support expressions in markdown.

You can use this extension when you are working with [`micromark`][micromark].
To support all MDX features, use
[`micromark-extension-mdxjs`][micromark-extension-mdxjs] instead.

When you need a syntax tree, combine this package with
[`mdast-util-mdx-expression`][mdast-util-mdx-expression].

All these packages are used in [`remark-mdx`][remark-mdx], which focusses on
making it easier to transform content by abstracting these internals away.

When you are using [`mdx-js/mdx`][mdxjs], all of this is already included.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install micromark-extension-mdx-expression
```

In Deno with [`esm.sh`][esmsh]:

```js
import {mdxExpression} from 'https://esm.sh/micromark-extension-mdx-expression@1'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {mdxExpression} from 'https://esm.sh/micromark-extension-mdx-expression@1?bundle'
</script>
```

## Use

```js
import {Parser} from 'acorn'
import acornJsx from 'acorn-jsx'
import {micromark} from 'micromark'
import {mdxExpression} from 'micromark-extension-mdx-expression'

// Unaware of JavaScript (“agnostic”) (balanced braces):
const output = micromark('a {1 + 1} b', {extensions: [mdxExpression()]})

console.log(output)

// Aware of JavaScript:
micromark('a {!} b', {extensions: [mdxExpression({acorn: Parser.extend(acornJsx())})]})
```

Yields:

```html
<p>a  b</p>
```

```txt
[1:5: Could not parse expression with acorn: Unexpected token] {
  reason: 'Could not parse expression with acorn: Unexpected token',
  line: 1,
  column: 5,
  source: 'micromark-extension-mdx-expression',
  ruleId: 'acorn',
  position: {
    start: { line: 1, column: 5, offset: 4 },
    end: { line: null, column: null }
  }
}
```

…which is useless: go to a syntax tree with
[`mdast-util-from-markdown`][mdast-util-from-markdown] and
[`mdast-util-mdx-expression`][mdast-util-mdx-expression] instead.

## API

This package exports the identifier [`mdxExpression`][api-mdx-expression].
There is no default export.

The export map supports the [`development` condition][development].
Run `node --conditions development module.js` to get instrumented dev code.
Without this condition, production code is loaded.

### `mdxExpression(options?)`

Create an extension for `micromark` to enable MDX expression syntax.

###### Parameters

*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Extension for `micromark` that can be passed in `extensions` to enable MDX
expression syntax ([`Extension`][micromark-extension]).

### Options

Configuration (TypeScript type).

###### Fields

*   `acorn` ([`Acorn`][acorn], optional)
    — acorn parser to use
*   `acornOptions` ([`AcornOptions`][acorn-options], default:
    `{ecmaVersion: 2020, locations: true, sourceType: 'module'}`)
    — configuration for acorn; all fields except `locations` can be set
*   `addResult` (`boolean`, default: `false`)
    — whether to add `estree` fields to tokens with results from acorn

<!-- Note: `spread` and `allowEmpty` are intentionally not documented. -->

## Authoring

When authoring markdown with JavaScript, keep in mind that MDX is a whitespace
sensitive and line-based language, while JavaScript is insensitive to
whitespace.
This affects how markdown and JavaScript interleave with eachother in MDX.
For more info on how it works, see [§ Interleaving][mdxjs-interleaving] on the
MDX site.

## Syntax

This extension supports MDX both aware and unaware to JavaScript (respectively
gnostic and agnostic).
Depending on whether acorn is passed, either valid JavaScript must be used in
expressions, or arbitrary text (such as Rust code or so) can be used.

There are two types of expressions: in text (inline, span) or in flow (block).
They start with `{`.

Depending on whether `acorn` is passed, expressions are either parsed in several
tries until whole JavaScript is found (as in, nested curly braces depend on JS
expression nesting), or they are counted and must be balanced.

Expressions end with `}`.

For flow (block) expressions, optionally markdown spaces (` ` or `\t`) can occur
after the closing brace, and finally a markdown line ending (`\r`, `\n`) or the
end of the file must follow.

While markdown typically knows no errors, for MDX it is decided to instead
throw on invalid syntax.

```markdown
Here is an expression in a heading:

## Hello, {1 + 1}!

In agnostic mode, balanced braces can occur: {a + {b} + c}.

In gnostic mode, the value of the expression must be JavaScript, so
this would fail: {!}.
But, in gnostic mode, braces can be in comments, strings, or in other
places: {1 /* { */ + 2}.

The previous examples were text (inline, span) expressions, they can
also be flow (block):

{
  1 + 1
}

This is incorrect, because there are further characters:

{
  1 + 1
}!

Blank lines cannot occur in text, because markdown has already split them in
separate constructs, so this is incorrect: {1 +

1}


In flow, you can have blank lines:

{
  1 +

  2
}
```

## Errors

### Unexpected end of file in expression, expected a corresponding closing brace for `{`

This error occurs if a `{` was seen without a `}` (source:
`micromark-extension-mdx-expression`, rule id: `unexpected-eof`).
For example:

```markdown
a { b
```

### Could not parse expression with acorn: Unexpected content after expression

This error occurs when there is more content after a JS expression (source:
`micromark-extension-mdx-expression`, rule id: `acorn`).
For example:

```markdown
a {"b" "c"} d
```

### Could not parse expression with acorn: $error

This error occurs if acorn crashes (source: `micromark-extension-mdx-expression`,
rule id: `acorn`).
For example:

```markdown
a {var b = "c"} d
```

## Tokens

Two tokens are used, `mdxFlowExpression` and `mdxTextExpression`, to reflect
flow and text expressions.

They include:

*   `lineEnding` for the markdown line endings `\r`, `\n`, and `\r\n`
*   `mdxFlowExpressionMarker` and `mdxTextExpressionMarker` for the braces
*   `whitespace` for markdown spaces and tabs in blank lines
*   `mdxFlowExpressionChunk` and `mdxTextExpressionChunk` for chunks of
    expression content

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 16+.
Our projects sometimes work with older versions, but this is not guaranteed.

These extensions work with `micromark` version 3+.

## Security

This package is safe.

## Related

*   [`micromark-extension-mdxjs`][micromark-extension-mdxjs]
    — support all MDX syntax
*   [`mdast-util-mdx-expression`][mdast-util-mdx-expression]
    — support MDX expressions in mdast
*   [`remark-mdx`][remark-mdx]
    — support all MDX syntax in remark

## Contribute

See [`contributing.md` in `micromark/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/micromark/micromark-extension-mdx-expression/workflows/main/badge.svg

[build]: https://github.com/micromark/micromark-extension-mdx-expression/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/micromark/micromark-extension-mdx-expression.svg

[coverage]: https://codecov.io/github/micromark/micromark-extension-mdx-expression

[downloads-badge]: https://img.shields.io/npm/dm/micromark-extension-mdx-expression.svg

[downloads]: https://www.npmjs.com/package/micromark-extension-mdx-expression

[size-badge]: https://img.shields.io/bundlephobia/minzip/micromark-extension-mdx-expression.svg

[size]: https://bundlephobia.com/result?p=micromark-extension-mdx-expression

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/micromark/micromark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[license]: https://github.com/micromark/micromark-extension-mdx-expression/blob/main/license

[author]: https://wooorm.com

[contributing]: https://github.com/micromark/.github/blob/main/contributing.md

[support]: https://github.com/micromark/.github/blob/main/support.md

[coc]: https://github.com/micromark/.github/blob/main/code-of-conduct.md

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[development]: https://nodejs.org/api/packages.html#packages_resolving_user_conditions

[micromark]: https://github.com/micromark/micromark

[micromark-extension]: https://github.com/micromark/micromark#syntaxextension

[micromark-extension-mdxjs]: https://github.com/micromark/micromark-extension-mdxjs

[mdast-util-mdx-expression]: https://github.com/syntax-tree/mdast-util-mdx-expression

[mdast-util-from-markdown]: https://github.com/syntax-tree/mdast-util-from-markdown

[remark-mdx]: https://mdxjs.com/packages/remark-mdx/

[mdxjs]: https://mdxjs.com

[mdxjs-interleaving]: https://mdxjs.com/docs/what-is-mdx/#interleaving

[acorn]: https://github.com/acornjs/acorn

[acorn-options]: https://github.com/acornjs/acorn/blob/96c721dbf89d0ccc3a8c7f39e69ef2a6a3c04dfa/acorn/dist/acorn.d.ts#L16

[api-mdx-expression]: #mdxexpressionoptions

[api-options]: #options
