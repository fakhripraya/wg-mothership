import { DASHBOARD, HOME } from "../global";

export const getMenus = () => {
  return [
    {
      key: HOME,
      name: "Home",
      route: "/",
    },
    {
      key: DASHBOARD,
      name: "Dashboard",
      route: "/dashboard",
    },
  ];
};
