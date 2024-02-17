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
