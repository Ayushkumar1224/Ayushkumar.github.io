import type { ZSpec } from "../Spec/index.js";
export declare const TestAspectTypeId: unique symbol;
export declare type TestAspectTypeId = typeof TestAspectTypeId;
export declare type ZSpecLB<R, E, LowerR> = ZSpec<R, E> & [LowerR] extends [R] ? ZSpec<R, E> : ZSpec<LowerR, E>;
/**
 * A `TestAspect` is an aspect that can be weaved into specs. You can think of
 * an aspect as a polymorphic function, capable of transforming one test into
 * another, possibly enlarging the environment or error type.
 */
export interface TestAspect<LowerR, UpperR, LowerE, UpperE> extends TestAspectBase<LowerR, UpperR, LowerE, UpperE> {
    <R, E extends UpperE>(spec: ZSpecLB<R, E, LowerR>): ZSpec<R & UpperR, E | LowerE>;
}
export interface TestAspectBase<LowerR, UpperR, LowerE, UpperE> {
    readonly [TestAspectTypeId]: TestAspectTypeId;
    readonly some: (predicate: (s: string) => boolean) => <R, E extends UpperE>(spec: ZSpecLB<R, E, LowerR>) => ZSpec<R & UpperR, E | LowerE>;
}
/**
 * Creates a test aspect by specify the some function
 */
export declare function aspect<LowerR, UpperR, LowerE, UpperE>(some: (predicate: (s: string) => boolean) => <R, E extends UpperE>(spec: ZSpecLB<R, E, LowerR>) => ZSpec<R & UpperR, E | LowerE>): TestAspect<LowerR, UpperR, LowerE, UpperE>;
/**
 * An aspect that returns the tests unchanged
 */
export declare const identity: TestAspect<never, unknown, never, unknown>;
//# sourceMappingURL=index.d.ts.map