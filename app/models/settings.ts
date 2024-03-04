export type Settings = {
  graphqlUrl: string;
  sideNavBarOpen: boolean | null; //null means default state
  setSideNavBarOpen: (open: boolean) => void;
};
