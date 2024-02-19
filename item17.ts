function arraySum(array: number[]) {
  let sum = 0,
    num;

  while ((num = array.pop()) !== undefined) {
    sum += num;
  }

  return sum;
}
