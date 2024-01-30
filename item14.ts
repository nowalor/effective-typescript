interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}

// Worst way to achieve this since it's 100% hard coded
// Will always have to change the properties in "State" and "TopNavState1"
interface TopNavState1 {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
}

// Use indexing instead.
// It's still a lot of work and not worth it for this example
// But I should remember the power of indexing a type
interface TopNavState2 {
  userId: State["userId"];
  pageTitle: State["pageTitle"];
  recentFiles: State["recentFiles"];
}

// Mapped type, here we cannot use an interface
// Basically a more programmatic way to achieve the power off "TopNavState2"
// Personal favorite since it has the least "magic" and I don't have to remember another built in type
type TopNavState3 = {
  [k in "userId" | "pageTitle" | "recentFiles"]: State[k];
};

// "Pick is also pretty nice"
// type Pick<T, K extends keyof T> = { [P in K]: T[P]; }
type TopNavState4 = Pick<State, "userId" | "pageTitle" | "recentFiles">;

interface Options {
  width: number;
  height: number;
  color: string;
  label: string;
}

// Example one
// Hard coded and not connected at all to "Option"
interface OptionsUpdate {
  width?: number;
  height?: number;
  color?: string;
  label?: string;
}

class UIWidget {
  constructor(init: Options) {}
  update(options: OptionsUpdate) {}
}

// Mapped type + keyof operator
// Used to programatically resolve whatever is in "Options"
// And make it optional
type OptionsUpdate2 = { [k in keyof Options]?: Options[k] };

// Same as above but with a built in Partial type
type OptionsUpdate3 = Partial<Options>;
