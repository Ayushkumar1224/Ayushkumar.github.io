/**
 * @typedef {import('acorn').Comment} Comment
 * @typedef {import('acorn').Node} AcornNode
 * @typedef {import('acorn').Options} AcornOptions
 * @typedef {import('acorn').Token} Token
 * @typedef {import('estree').Node} EstreeNode
 * @typedef {import('estree').Program} Program
 * @typedef {import('micromark-util-types').Chunk} Chunk
 * @typedef {import('micromark-util-types').Event} Event
 * @typedef {import('micromark-util-types').Point} MicromarkPoint
 * @typedef {import('unist').Point} UnistPoint
 */

/**
 * @typedef Acorn
 *   Acorn-like interface.
 * @property {import('acorn').parse} parse
 *   Parse a program.
 * @property {import('acorn').parseExpressionAt} parseExpressionAt
 *   Parse an expression.
 *
 * @typedef AcornLoc
 * @property {number} line
 * @property {number} column
 *
 * @typedef AcornErrorFields
 * @property {number} raisedAt
 * @property {number} pos
 * @property {AcornLoc} loc
 *
 * @typedef {Error & AcornErrorFields} AcornError
 *
 * @typedef Options
 *   Configuration.
 * @property {Acorn} acorn
 *   Typically `acorn`, object with `parse` and `parseExpressionAt` fields.
 * @property {AcornOptions | null | undefined} [acornOptions]
 *   Configuration for `acorn`.
 * @property {MicromarkPoint | null | undefined} [start]
 *   Place where events start.
 * @property {string | null | undefined} [prefix='']
 *   Text to place before events.
 * @property {string | null | undefined} [suffix='']
 *   Text to place after events.
 * @property {boolean | null | undefined} [expression=false]
 *   Whether this is a program or expression.
 * @property {boolean | null | undefined} [allowEmpty=false]
 *   Whether an empty expression is allowed (programs are always allowed to
 *   be empty).
 *
 * @typedef Result
 *   Result.
 * @property {Program | undefined} estree
 *   Program.
 * @property {AcornError | undefined} error
 *   Error if unparseable
 * @property {boolean} swallow
 *   Whether the error, if there is one, can be swallowed and more JavaScript
 *   could be valid.
 *
 * @typedef {[number, MicromarkPoint]} Stop
 *
 * @typedef Collection
 * @property {string} value
 * @property {Array<Stop>} stops
 */

import {visit} from 'estree-util-visit'
import {codes} from 'micromark-util-symbol/codes.js'
import {values} from 'micromark-util-symbol/values.js'
import {types} from 'micromark-util-symbol/types.js'
import {ok as assert} from 'uvu/assert'
import {VFileMessage} from 'vfile-message'

/**
 * Parse a list of micromark events with acorn.
 *
 * @param {Array<Event>} events
 *   Events.
 * @param {Options} options
 *   Configuration.
 * @returns {Result}
 *   Result.
 */
// eslint-disable-next-line complexity
export function eventsToAcorn(events, options) {
  const prefix = options.prefix || ''
  const suffix = options.suffix || ''
  const acornOptions = Object.assign({}, options.acornOptions)
  /** @type {Array<Comment>} */
  const comments = []
  /** @type {Array<Token>} */
  const tokens = []
  const onComment = acornOptions.onComment
  const onToken = acornOptions.onToken
  let swallow = false
  /** @type {AcornNode | undefined} */
  let estree
  /** @type {AcornError | undefined} */
  let exception
  /** @type {AcornOptions} */
  const acornConfig = Object.assign({}, acornOptions, {
    onComment: comments,
    preserveParens: true
  })

  if (onToken) {
    acornConfig.onToken = tokens
  }

  const collection = collect(events, [
    types.lineEnding,
    // To do: these should be passed by users in parameters.
    'expressionChunk', // From tests.
    'mdxFlowExpressionChunk', // Flow chunk.
    'mdxTextExpressionChunk', // Text chunk.
    // JSX:
    'mdxJsxTextTagExpressionAttributeValue',
    'mdxJsxTextTagAttributeValueExpressionValue',
    'mdxJsxFlowTagExpressionAttributeValue',
    'mdxJsxFlowTagAttributeValueExpressionValue',
    // ESM:
    'mdxjsEsmData'
  ])

  const source = collection.value

  const value = prefix + source + suffix
  const isEmptyExpression = options.expression && empty(source)

  if (isEmptyExpression && !options.allowEmpty) {
    throw new VFileMessage(
      'Unexpected empty expression',
      parseOffsetToUnistPoint(0),
      'micromark-extension-mdx-expression:unexpected-empty-expression'
    )
  }

  try {
    estree =
      options.expression && !isEmptyExpression
        ? options.acorn.parseExpressionAt(value, 0, acornConfig)
        : options.acorn.parse(value, acornConfig)
  } catch (error_) {
    const error = /** @type {AcornError} */ (error_)
    const point = parseOffsetToUnistPoint(error.pos)
    error.message = String(error.message).replace(/ \(\d+:\d+\)$/, '')
    // Always defined in our unist points that come from micromark.
    assert(point.offset !== undefined, 'expected `offset`')
    error.pos = point.offset
    error.loc = {line: point.line, column: point.column - 1}
    exception = error
    swallow =
      error.raisedAt >= prefix.length + source.length ||
      // Broken comments are raised at their start, not their end.
      error.message === 'Unterminated comment'
  }

  if (estree && options.expression && !isEmptyExpression) {
    if (empty(value.slice(estree.end, value.length - suffix.length))) {
      estree = {
        type: 'Program',
        start: 0,
        end: prefix.length + source.length,
        // @ts-expect-error: It’s good.
        body: [
          {
            type: 'ExpressionStatement',
            expression: estree,
            start: 0,
            end: prefix.length + source.length
          }
        ],
        sourceType: 'module',
        comments: []
      }
    } else {
      const point = parseOffsetToUnistPoint(estree.end)
      const error = /** @type {AcornError} */ (
        new Error('Unexpected content after expression')
      )
      // Always defined in our unist points that come from micromark.
      assert(point.offset !== undefined, 'expected `offset`')
      error.pos = point.offset
      error.loc = {line: point.line, column: point.column - 1}
      exception = error
      estree = undefined
    }
  }

  if (estree) {
    // @ts-expect-error: acorn *does* allow comments
    estree.comments = comments

    // @ts-expect-error: acorn looks enough like estree.
    visit(estree, (esnode, field, index, parents) => {
      let context = /** @type {AcornNode | Array<AcornNode>} */ (
        parents[parents.length - 1]
      )
      /** @type {string | number | null} */
      let prop = field

      // Remove non-standard `ParenthesizedExpression`.
      // @ts-expect-error: included in acorn.
      if (esnode.type === 'ParenthesizedExpression' && context && prop) {
        /* c8 ignore next 5 */
        if (typeof index === 'number') {
          // @ts-expect-error: indexable.
          context = context[prop]
          prop = index
        }

        // @ts-expect-error: indexable.
        context[prop] = esnode.expression
      }

      fixPosition(esnode)
    })

    // Comment positions are fixed by `visit` because they’re in the tree.
    if (Array.isArray(onComment)) {
      onComment.push(...comments)
    } else if (typeof onComment === 'function') {
      for (const comment of comments) {
        assert(comment.loc, 'expected `loc` on comment')
        onComment(
          comment.type === 'Block',
          comment.value,
          comment.start,
          comment.end,
          comment.loc.start,
          comment.loc.end
        )
      }
    }

    for (const token of tokens) {
      // Ignore tokens that ends in prefix or start in suffix:
      if (
        token.end <= prefix.length ||
        token.start - prefix.length >= source.length
      ) {
        continue
      }

      fixPosition(token)

      if (Array.isArray(onToken)) {
        onToken.push(token)
      } else {
        // `tokens` are not added if `onToken` is not defined, so it must be a
        // function.
        assert(typeof onToken === 'function', 'expected function')
        onToken(token)
      }
    }
  }

  // @ts-expect-error: It’s a program now.
  return {estree, error: exception, swallow}

  /**
   * Update the position of a node.
   *
   * @param {AcornNode | EstreeNode | Token} nodeOrToken
   * @returns {void}
   */
  function fixPosition(nodeOrToken) {
    assert(
      'start' in nodeOrToken,
      'expected `start` in node or token from acorn'
    )
    assert('end' in nodeOrToken, 'expected `end` in node or token from acorn')
    const pointStart = parseOffsetToUnistPoint(nodeOrToken.start)
    const pointEnd = parseOffsetToUnistPoint(nodeOrToken.end)
    // Always defined in our unist points that come from micromark.
    assert(pointStart.offset !== undefined, 'expected `offset`')
    assert(pointEnd.offset !== undefined, 'expected `offset`')
    nodeOrToken.start = pointStart.offset
    nodeOrToken.end = pointEnd.offset
    nodeOrToken.loc = {
      start: {
        line: pointStart.line,
        column: pointStart.column - 1,
        offset: pointStart.offset
      },
      end: {
        line: pointEnd.line,
        column: pointEnd.column - 1,
        offset: pointEnd.offset
      }
    }
    nodeOrToken.range = [nodeOrToken.start, nodeOrToken.end]
  }

  /**
   * Turn an arbitrary offset into the parsed value, into a point in the source
   * value.
   *
   * @param {number} acornOffset
   * @returns {UnistPoint}
   */
  function parseOffsetToUnistPoint(acornOffset) {
    let sourceOffset = acornOffset - prefix.length

    if (sourceOffset < 0) {
      sourceOffset = 0
    } else if (sourceOffset > source.length) {
      sourceOffset = source.length
    }

    let point = relativeToPoint(collection.stops, sourceOffset)

    if (!point) {
      assert(
        options.start,
        'empty expressions are need `options.start` being passed'
      )
      point = {
        line: options.start.line,
        column: options.start.column,
        offset: options.start.offset
      }
    }

    return point
  }
}

/**
 * @param {string} value
 * @returns {boolean}
 */
function empty(value) {
  return /^\s*$/.test(
    value
      // Multiline comments.
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Line comments.
      // EOF instead of EOL is specifically not allowed, because that would
      // mean the closing brace is on the commented-out line
      .replace(/\/\/[^\r\n]*(\r\n|\n|\r)/g, '')
  )
}

// Port from <https://github.com/wooorm/markdown-rs/blob/e692ab0/src/util/mdx_collect.rs#L15>.
/**
 * @param {Array<Event>} events
 * @param {Array<string>} names
 * @returns {Collection}
 */
function collect(events, names) {
  /** @type {Collection} */
  const result = {value: '', stops: []}
  let index = -1

  while (++index < events.length) {
    const event = events[index]

    // Assume void.
    if (event[0] === 'enter' && names.includes(event[1].type)) {
      const chunks = event[2].sliceStream(event[1])

      // Drop virtual spaces.
      while (chunks.length > 0 && chunks[0] === codes.virtualSpace) {
        chunks.shift()
      }

      const value = serializeChunks(chunks)
      result.stops.push([result.value.length, event[1].start])
      result.value += value
      result.stops.push([result.value.length, event[1].end])
    }
  }

  return result
}

// Port from <https://github.com/wooorm/markdown-rs/blob/e692ab0/src/util/location.rs#L91>.
/**
 * Turn a relative offset into an absolute offset.
 *
 * @param {Array<Stop>} stops
 * @param {number} relative
 * @returns {UnistPoint | undefined}
 */
function relativeToPoint(stops, relative) {
  let index = 0

  while (index < stops.length && stops[index][0] <= relative) {
    index += 1
  }

  // There are no points: that only occurs if there was an empty string.
  if (index === 0) {
    return undefined
  }

  const [stopRelative, stopAbsolute] = stops[index - 1]
  const rest = relative - stopRelative
  return {
    line: stopAbsolute.line,
    column: stopAbsolute.column + rest,
    offset: stopAbsolute.offset + rest
  }
}

// Copy from <https://github.com/micromark/micromark/blob/ce3593a/packages/micromark/dev/lib/create-tokenizer.js#L595>
// To do: expose that?
/**
 * Get the string value of a slice of chunks.
 *
 * @param {Array<Chunk>} chunks
 * @returns {string}
 */
function serializeChunks(chunks) {
  let index = -1
  /** @type {Array<string>} */
  const result = []
  /** @type {boolean | undefined} */
  let atTab

  while (++index < chunks.length) {
    const chunk = chunks[index]
    /** @type {string} */
    let value

    if (typeof chunk === 'string') {
      value = chunk
    } else
      switch (chunk) {
        case codes.carriageReturn: {
          value = values.cr

          break
        }

        case codes.lineFeed: {
          value = values.lf

          break
        }

        case codes.carriageReturnLineFeed: {
          value = values.cr + values.lf

          break
        }

        case codes.horizontalTab: {
          value = values.ht

          break
        }

        /* c8 ignore next 6 */
        case codes.virtualSpace: {
          if (atTab) continue
          value = values.space

          break
        }

        default: {
          assert(typeof chunk === 'number', 'expected number')
          // Currently only replacement character.
          // eslint-disable-next-line unicorn/prefer-code-point
          value = String.fromCharCode(chunk)
        }
      }

    atTab = chunk === codes.horizontalTab
    result.push(value)
  }

  return result.join('')
}
