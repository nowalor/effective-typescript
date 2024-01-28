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
// Personal favorite
type TopNavState3 = {
  [k in "userId" | "pageTitle" | "recentFiles"]: State[k];
};
