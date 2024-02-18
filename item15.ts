/*
 * Name of the key "property" is purely for documentation
 * Key names are not used by type checker in any way
 * This will allow any key for "Rocket"(probably not optimal)
 * "{}" is technically a valid "Rocket"
 */
type Rocket = { [property: string]: string };

/*
 * "rocket" will have no documentation or auto completion for the keys
 */
const rocket: Rocket = {
  name: "Falcon 9",
  variant: "Block 5",
  thrust: "4,940 kN",
};

const emptyRocket: Rocket = {}; // ok

// Obvious improvement using an interface

interface RockerInterface {
  name: string;
  variant: string;
  thrust: number;
}

const falconHeavy: RockerInterface = {
  name: "Falcon heavy",
  variant: "v1",
  thrust: 15_200,
};

/* ------------------------------------- */

/*
 * An example where you would actually use an index signature
 * When the exact input and output is not clear
 * Like in a CSV parser function
 */
interface CSVRow {
  [columnName: string]: string;
}

function parseCSV(input: string): CSVRow[] {
  const lines = input.split("\n");
  const [headerLine, ...rows] = lines; // Name,Age,City, [ 'John,25,New York', 'Alice,30,Los Angeles', 'Bob,22,Chicago' ]
  console.log(headerLine);

  const headers = headerLine.split(","); // [ 'Name', 'Age', 'City' ]

  return rows.map((rowStr /* 'John,25,New York' */) => {
    const row: CSVRow = {};

    rowStr.split(",").forEach((cell, i) => {
      row[headers[i]] = cell; // row['Name' | 'Age' | 'City'] = 'John' | '25', 'NewYork'
    });

    return row;
  });
}

const example1CSV = `Name,Age,City
John,25,New York
Alice,30,Los Angeles
Bob,22,Chicago`;

const parsedCSV = parseCSV(example1CSV);
console.log(parsedCSV);

interface ProductRow {
  productId: number;
  name: string;
  price: string;
}

declare let csvData: ProductRow[];

/*
 *Technically possible although in my case ProductRow is not matching the CSV data structure
 * Being careful to not make assumptions about the data structure would be beneficial
 */
const products = parseCSV(example1CSV) as unknown as ProductRow[];

function saveParseCSV(
  input: string
): { [columnName: string]: string | undefined }[] {
  return parseCSV(input);
}

// Type safe now but I will not get autocompletion or documentation on possible fields
const typeSafeProducts = saveParseCSV(example1CSV);

console.log(typeSafeProducts[0].name);

// Not in the book but seems like a good way to get best of both worls

interface SaferProductRow {
  productId: number | undefined;
  name: string | undefined;
  price: string | undefined;
}

const typeSafeProducts2 = parseCSV(example1CSV) as unknown as SaferProductRow[];

// Now this will throw an error without "?" because "name" might be undefined
console.log(typeSafeProducts2[0].name?.length);

/* ------------------------------------- */

interface Row2 {
  a: number;
  b?: number;
  c?: number;
  d?: number;
}

// Most precise but not so convenient to work with
type Row3 =
  | { a: number }
  | { a: number; b: number }
  | { a: number; b: number; c: number }
  | { a: number; b: number; c: number; d: number };

const test1: Row2 = { a: 123, b: 123 };
const test2: Row3 = { a: 123, b: 123 };

console.log(test1.b?.toString()); // In this example "b" is possibly undefined so "?" needed before toString operation

console.log(test2.b.toString()); // TypeScript knows the type is { a: number, b: number }
// console.log(test2.c?.toString()) 'Property 'c' does not exist on type '{ a: number; b: number; }'

/* ------------------------------------- */

type Vec3D = Record<"x" | "y" | "z", number>;

const testing: Vec3D = { x: 1, y: 1, z: 2 };

testing["b"] = "hey"; // Actually allowed

type MappedVec3D = { [k in "x" | "y" | "z"]: number }; // Same as Vec3D

type ABC = { [k in "a" | "b" | "c"]: k extends "b" ? string : number }; // Very cool
