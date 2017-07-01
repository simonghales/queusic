export function union_arrays (x, y) {
  let obj = {};
  for (let i = x.length-1; i >= 0; -- i)
    obj[x[i]] = x[i];
  for (let i = y.length-1; i >= 0; -- i)
    obj[y[i]] = y[i];
  let res = []
  for (let k in obj) {
    if (obj.hasOwnProperty(k))  // <-- optional
      res.push(obj[k]);
  }
  return res;
}