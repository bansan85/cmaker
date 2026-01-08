import { describe, expect, test } from 'vitest';

import { arrayMove, compareArrayString } from './string';

describe('compareArrayString', () => {
  test('should be the same', () => {
    const a = [['a', 'b'], ['c']];
    const b = [['a', 'b'], ['c']];
    expect(compareArrayString(a, 0, b, 0, 2)).toBe(true);

    const c = [['ignore'], ['match', 'me']];
    const d = [['match', 'me'], ['ignore']];
    expect(compareArrayString(c, 1, d, 0, 1)).toBe(true);

    const e = [['a']];
    const f = [['b']];
    expect(compareArrayString(e, 0, f, 0, 0)).toBe(true);
  });

  test('should not be the same', () => {
    const a = [['apple']];
    const b = [['banana']];
    expect(compareArrayString(a, 0, b, 0, 1)).toBe(false);

    const c = [['a', 'b']];
    const d = [['a', 'b', 'c']];
    expect(compareArrayString(c, 0, d, 0, 1)).toBe(false);

    const e = [['a']];
    const f = [['a']];
    expect(compareArrayString(e, 0, f, 0, 2)).toBe(false);
  });
});

describe('arrayMove', () => {
  test('should work', () => {
    const list = ['a', 'b', 'c', 'd', 'e'];
    arrayMove(list, 1, 3);
    expect(list).toEqual(['a', 'c', 'd', 'b', 'e']);

    const list2 = ['a', 'b', 'c', 'd', 'e'];
    arrayMove(list2, 3, 1);
    expect(list2).toEqual(['a', 'd', 'b', 'c', 'e']);

    const list3 = ['a', 'b', 'c', 'd', 'e'];
    arrayMove(list3, 4, 0);
    expect(list3).toEqual(['e', 'a', 'b', 'c', 'd']);

    const list4 = ['a', 'b', 'c', 'd', 'e'];
    arrayMove(list4, 0, 4);
    expect(list4).toEqual(['b', 'c', 'd', 'e', 'a']);

    const list5 = ['a', 'b', 'c', 'd', 'e'];
    const original5 = [...list5];
    arrayMove(list5, 2, 2);
    expect(list5).toEqual(original5);

    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const objects = [obj1, obj2];
    arrayMove(objects, 0, 1);
    expect(objects).toEqual([obj2, obj1]);
    expect(objects[1]).toBe(obj1);
  });
});
