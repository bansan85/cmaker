export function compareArrayString(
  a: string[][],
  aBegin: number,
  b: string[][],
  bBegin: number,
  c: number
): boolean {
  for (let i = 0; i < c; i += 1) {
    const subA = a[aBegin + i];
    const subB = b[bBegin + i];

    if (!subA || !subB) {
      return false;
    }

    if (subA.length !== subB.length) {
      return false;
    }

    for (let j = 0; j < subA.length; j += 1) {
      if (subA[j] !== subB[j]) {
        return false;
      }
    }
  }

  return true;
}

export function arrayMove(arr: unknown[], fromIndex: number, toIndex: number) {
  const element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

export function sortArrayFromList<T>(items: T[], indices: number[]): T[] {
  return indices.map((id) => items[id]);
}
