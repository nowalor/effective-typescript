/*
 * Some faulty code that does not work because
 * "arraySum" modifies the array it takes in
 * Would be nice to have type assurance that "arraySum" does not modify the array
 */

function printTriangles(n: number) {
  const numbers: number[] = [];

  for (let i = 0; i < n; i++) {
    numbers.push(i);
    console.log(arraySum(numbers));
  }
}

/* array: readonly: number[] would catch this
 * with error: Property 'pop' does not exist on type 'readonly number[]'.
 * because "pop" method does not exist on a readonly array
 * because "pop" mutates the array
 */
function arraySum(array: number[]) {
  let sum = 0,
    num;

  while ((num = array.pop()) !== undefined) {
    sum += num;
  }

  return sum;
}

// Prints 0, 1, 2, 3 etc
// Should be printing 1, 1+2, 1+2+3 and etc
printTriangles(5);

// Because "readonly" caught the issue with "pop" I can find a solution that does not mutate the array
function typeSafeArraySum(array: readonly number[]) {
  let sum = 0,
    num;
  /*
   * Some faulty code that does not work because
   * "arraySum" modifies the array it takes in
   * Would be nice to have type assurance that "arraySum" does not modify the array
   */

  function printTriangles(n: number) {
    const numbers: number[] = [];

    for (let i = 0; i < n; i++) {
      numbers.push(i);
      console.log(arraySum(numbers));
    }
  }

  /* array: readonly: number[] would catch this
   * with error: Property 'pop' does not exist on type 'readonly number[]'.
   * because "pop" method does not exist on a readonly array
   * because "pop" mutates the array
   */
  function arraySum(array: number[]) {
    let sum = 0,
      num;

    while ((num = array.pop()) !== undefined) {
      sum += num;
    }

    return sum;
  }

  // Prints 0, 1, 2, 3 etc
  // Should be printing 1, 1+2, 1+2+3 and etc
  printTriangles(5);

  // Because "readonly" caught the issue with "pop" I can find a solution that does not mutate the array
  function typeSafeArraySum(array: readonly number[]) {
    let sum = 0;

    for (const num of array) {
      sum += num;
    }

    return sum;
  }
  for (const num of array) {
    sum += num;
  }

  return sum;
}

/* ---------------------------------------- */
function parseTaggedText(lines: string[]): string[][] {
  const paragraphs: string[][] = [];
  const currPar: string[] = [];

  const addParagraph = () => {
    if (currPar.length) {
      paragraphs.push(currPar);
      currPar.length = 0;
    }
  };

  for (const line of lines) {
    if (!line.length) {
      addParagraph();
    } else {
      currPar.push(line);
    }
  }

  addParagraph();
  return paragraphs;
}

/* function typeSafeParseTaggedText(lines: string[]): string[][] {
  let currPar: readonly string[] = [];

  const paragraphs: string[][] = [];

  const addParagraph = () => {
    if (currPar.length) {
      currPar = paragraphs.push(currPar);
      currPar = [];
    }
  };

  for (const line of lines) {
    if (!line.length) {
      addParagraph();
    } else {
      currPar.push(line);
    }
  }

  addParagraph();
  return paragraphs;
}
*/
const testInput = ["test", "test2", "", "test4", "test5", "", "hey"];

const paragraphs = parseTaggedText(testInput);
console.log(paragraphs);
