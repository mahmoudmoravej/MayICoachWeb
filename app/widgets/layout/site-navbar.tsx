import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  AppBar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@mui/material";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { siteRouteType } from "~/routesData";

export function SiteNavbar({
  brandName,
  routes,
  action,
}: {
  brandName: string;
  routes: siteRouteType[];
  action: any;
}) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography key={name} variant="body2" className="capitalize">
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <AppBar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="ml-2 mr-4 cursor-pointer py-1.5 font-bold">
            {brandName}
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden gap-2 lg:flex">
          {React.cloneElement(action, {
            className: "hidden lg:inline-block",
          })}
        </div>
        <IconButton
          size="small"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse className="rounded-xl bg-white text-blue-gray-900" in={openNav}>
        <div className="mx-aut container  px-4 pb-4 pt-2">
          {navList}
          <a
            href="https://www.material-tailwind.com/blocks/react?ref=mtkr"
            target="_blank"
            className="mb-2 block"
            rel="noreferrer"
          >
            <Button variant="text" size="small" fullWidth>
              pro version
            </Button>
          </a>
          {React.cloneElement(action, {
            className: "w-full block",
          })}
        </div>
      </Collapse>
    </AppBar>
  );
}

SiteNavbar.defaultProps = {
  brandName: "mAy I Coach",
  action: (
    <a href="/" target="_blank" rel="noreferrer">
      <Button variant="text" size="small" fullWidth>
        free 30 days trial!
      </Button>
    </a>
  ),
};

SiteNavbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

SiteNavbar.displayName = "/src/widgets/layout/navbar.jsx";

export default SiteNavbar;
