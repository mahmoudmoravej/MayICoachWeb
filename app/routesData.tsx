import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  BriefcaseIcon,
  ChartBarIcon,
  PlayIcon,
  SignalIcon,
  IdentificationIcon,
  LightBulbIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/solid";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export type RouteData = {
  layout?: string;
  title?: string;
  pages: {
    icon: JSX.Element;
    name: string;
    path: string;
  }[];
};

export const routes: RouteData[] = [
  {
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/",
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "My team",
        path: "/individuals/myteam",
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Organization",
        path: "/individuals",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Rules",
        path: "/rules",
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Cycles",
        path: "/cycles",
      },
    ],
  },
  {
    title: "My profile",
    pages: [
      {
        icon: <LightBulbIcon {...icon} />,
        name: "Coach me!",
        path: "/individuals/#{myId}/coach",
      },
      {
        icon: <SignalIcon {...icon} />,
        name: "My activities",
        path: "/individuals/#{myId}/activities",
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "My Visions",
        path: "/individuals/#{myId}/visions",
      },
      {
        icon: <IdentificationIcon {...icon} />,
        name: "My settings",
        path: "/individuals/#{myId}/edit",
      },
    ],
  },
];

export default routes;

export const teamData: {
  img: string;
  name: string;
  position: string;
  socials: { name: string; color: "pink" | "light-blue" | "blue" }[];
}[] = [
  {
    img: "/images/team-1.jpg",
    name: "Ryan Tompson",
    position: "Web Developer",
    socials: [
      {
        color: "light-blue",
        name: "twitter",
      },
      {
        color: "blue",
        name: "linkedin",
      },
      {
        color: "pink",
        name: "dribbble",
      },
    ],
  },
  {
    img: "/images/team-2.jpg",
    name: "Romina Hadid",
    position: "Marketing Specialist",
    socials: [
      {
        color: "light-blue",
        name: "twitter",
      },
      {
        color: "blue",
        name: "linkedin",
      },
      {
        color: "pink",
        name: "dribbble",
      },
    ],
  },
  {
    img: "/images/team-3.jpg",
    name: "Alexa Smith",
    position: "UI/UX Designer",
    socials: [
      {
        color: "light-blue",
        name: "twitter",
      },
      {
        color: "blue",
        name: "linkedin",
      },
      {
        color: "pink",
        name: "dribbble",
      },
    ],
  },
  {
    img: "/images/team-4.png",
    name: "Jenna Kardi",
    position: "Founder and CEO",
    socials: [
      {
        color: "light-blue",
        name: "twitter",
      },
      {
        color: "blue",
        name: "facebook",
      },
      {
        color: "pink",
        name: "dribbble",
      },
    ],
  },
];

export const featuresData: {
  color: "gray";
  title: string;
  description: string;
  icon: typeof ChatBubbleBottomCenterTextIcon;
}[] = [
  {
    color: "gray",
    title: "Awarded Agency",
    icon: ChatBubbleBottomCenterTextIcon,
    description:
      "Divide details about your product or agency work into parts. A paragraph describing a feature will be enough.",
  },
  {
    color: "gray",
    title: "Free Revisions",
    icon: ChatBubbleBottomCenterTextIcon,
    description:
      "Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious.",
  },
  {
    color: "gray",
    title: "Verified Company",
    icon: ChatBubbleBottomCenterTextIcon,
    description:
      "Write a few lines about each one. A paragraph describing a feature will be enough. Keep you user engaged!",
  },
];

export const contactData = [
  {
    title: "Excelent Services",
    icon: BriefcaseIcon,
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    title: "Grow Your Market",
    icon: ChartBarIcon,
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    title: "Launch Time",
    icon: PlayIcon,
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
];

export type siteRouteType = {
  name: string;
  path: string;
  icon?: string;
  href?: string;
  target?: string;
};

export const siteRoutes: siteRouteType[] = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "dashboard",
    path: "/individuals",
  },
  {
    name: "Sign In",
    path: "/login",
  },
  {
    name: "Sign Up",
    path: "/login",
  },
];
