
export function ignoreIndefined(element: any) {
  if (typeof element != "undefined") {
    return element;
  }
}
