
export function ignoreUndefined(element: any) {
  if (typeof element != "undefined") {
    return element;
  }
}
