import { ArrTypeId, concrete } from "../definition.mjs";
/**
 * Iterate over the chunk applying f
 */

export function forEach_(self, f) {
  ;

  switch (self._typeId) {
    case ArrTypeId:
      {
        const arr = self.arrayLike();
        const len = arr.length;
        let i = 0;

        while (i < len) {
          f(arr[i]);
          i++;
        }

        return;
      }

    default:
      {
        const iterator = self.arrayLikeIterator();
        let next;

        while ((next = iterator.next()) && !next.done) {
          const array = next.value;
          const len = array.length;
          let i = 0;

          while (i < len) {
            const a = array[i];
            f(a);
            i++;
          }
        }

        return;
      }
  }
}
/**
 * Iterate over the chunk applying f
 *
 * @ets_data_first forEach_
 */

export function forEach(f) {
  return self => forEach_(self, f);
}
//# sourceMappingURL=forEach.mjs.map