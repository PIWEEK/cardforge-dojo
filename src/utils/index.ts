export function times(num: number): any[] {
  return [...Array(num).keys()];
}

export function zip(...arrays: any[]): any[][] {
  return arrays[0].map(function(_,i){
    return arrays.map(function(array){return array[i]})
  });
}

function randInt(from, to): number {
  return from + Math.floor(Math.random() * ((to - from) + 1));
}

export function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function flatMap(arr, fn) {
  return arr.reduce((acc, el) => acc.concat(fn(el)), []);
}
