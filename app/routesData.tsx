import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export type RouteData = {
  layout: string;
  title?: string;
  pages: {
    icon: JSX.Element;
    name: string;
    path: string;
  }[];
};

export const routes: RouteData[] = [
  {
    layout: "dashboard",

    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/",
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Managers",
        path: "/managers",
      },

      {
        icon: <InformationCircleIcon {...icon} />,
        name: "My team",
        path: "/managers/team",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Rules",
        path: "/rules",
      },
    ],
  },
];

export default routes;
