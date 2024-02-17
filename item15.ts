/*
 * Name of the key "property" is purely for documentation
 * Key names are not used by type checker in any way
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
