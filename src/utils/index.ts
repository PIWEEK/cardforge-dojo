export function times(num: number): any[] {
  return [...Array(num).keys()];
}

export function zip(...arrays: any[]): any[][] {
  return arrays[0].map(function(_,i){
    return arrays.map(function(array){return array[i]})
  });
}
