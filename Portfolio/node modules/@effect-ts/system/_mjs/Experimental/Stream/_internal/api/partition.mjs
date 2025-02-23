import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as PartitionEither from "./partitionEither.mjs";
/**
 * Partition a stream using a predicate. The first stream will contain all element evaluated to true
 * and the second one will contain all element evaluated to false.
 * The faster stream may advance by up to buffer elements further than the slower one.
 */

export function partition_(self, p, buffer = 16) {
  return PartitionEither.partitionEither_(self, a => p(a) ? T.succeed(E.left(a)) : T.succeed(E.right(a)), buffer);
}
/**
 * Partition a stream using a predicate. The first stream will contain all element evaluated to true
 * and the second one will contain all element evaluated to false.
 * The faster stream may advance by up to buffer elements further than the slower one.
 *
 * @ets_data_first partition_
 */

export function partition(p, buffer = 16) {
  return self => partition_(self, p, buffer);
}
//# sourceMappingURL=partition.mjs.map