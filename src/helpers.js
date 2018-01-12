export function arrToMap(arr) {
  return arr.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: cur,
    }),
    {},
  );
}

export function mapToArr(obj) {
  return Object.keys(obj).map(id => obj[id]);
}
