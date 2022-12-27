export function Once(fn) {
  let tag = fn;
  return function () {
    if (tag) {
      tag.apply(this, arguments);
      tag = null;
    }
  };
}
