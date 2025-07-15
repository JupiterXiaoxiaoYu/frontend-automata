export function isEqual(a: number[], b: number[]) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  return a.every((item: number, index: number) => item === b[index]);
}
