interface ScatterProps {
  xs: number[];
  ys: number[];

  xRange: [number, number];
  yRange: [number, number];

  onClick: (x: number, y: number, index: number) => void;
}

/*
 * First example of "shouldUpdate" function that decides which properties should be re-drawn
 * It works fine for the current version of "ScatterProps"
 * However we run into a lot of trouble if someone adds a property to ScatterProps that should not be redrawn
 * There is no type safe way to declare weather it should update or well
 * So something like k !== "onClick" && k!== "onClickAgain" would be needed
 * Which is hard to keep a mental track off
 */
function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;

  for (k in oldProps) {
    if (oldProps[k] === newProps[k])
      if (k !== "onClick") {
        return false;
      }

    return true;
  }
}

const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,

  onClick: false,
};

// Mapped type solve it
function newShouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
  let k: keyof ScatterProps;

  for (k in oldProps) {
    if (oldProps[k] === newProps[k] && REQUIRES_UPDATE[k]) {
      return true;
    }
  }
}
