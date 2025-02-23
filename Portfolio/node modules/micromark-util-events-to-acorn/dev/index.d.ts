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
export function eventsToAcorn(
  events: Array<import('micromark-util-types').Event>,
  options: Options
): Result
export type Comment = import('acorn').Comment
export type AcornNode = import('acorn').Node
export type AcornOptions = import('acorn').Options
export type Token = import('acorn').Token
export type EstreeNode = import('estree').Node
export type Program = import('estree').Program
export type Chunk = import('micromark-util-types').Chunk
export type Event = import('micromark-util-types').Event
export type MicromarkPoint = import('micromark-util-types').Point
export type UnistPoint = import('unist').Point
/**
 * Acorn-like interface.
 */
export type Acorn = {
  /**
   *   Parse a program.
   */
  parse: typeof import('acorn').parse
  /**
   *   Parse an expression.
   */
  parseExpressionAt: typeof import('acorn').parseExpressionAt
}
export type AcornLoc = {
  line: number
  column: number
}
export type AcornErrorFields = {
  raisedAt: number
  pos: number
  loc: AcornLoc
}
export type AcornError = Error & AcornErrorFields
/**
 * Configuration.
 */
export type Options = {
  /**
   * Typically `acorn`, object with `parse` and `parseExpressionAt` fields.
   */
  acorn: Acorn
  /**
   * Configuration for `acorn`.
   */
  acornOptions?: AcornOptions | null | undefined
  /**
   * Place where events start.
   */
  start?: MicromarkPoint | null | undefined
  /**
   * Text to place before events.
   */
  prefix?: string | null | undefined
  /**
   * Text to place after events.
   */
  suffix?: string | null | undefined
  /**
   * Whether this is a program or expression.
   */
  expression?: boolean | null | undefined
  /**
   * Whether an empty expression is allowed (programs are always allowed to
   * be empty).
   */
  allowEmpty?: boolean | null | undefined
}
/**
 * Result.
 */
export type Result = {
  /**
   * Program.
   */
  estree: Program | undefined
  /**
   * Error if unparseable
   */
  error: AcornError | undefined
  /**
   * Whether the error, if there is one, can be swallowed and more JavaScript
   * could be valid.
   */
  swallow: boolean
}
export type Stop = [number, MicromarkPoint]
export type Collection = {
  value: string
  stops: Array<Stop>
}
