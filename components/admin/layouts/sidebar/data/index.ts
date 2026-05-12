import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "/admin/dashboard",
        items: [],
      },
      {
        title: "Carousel",
        url: "/admin/carousel",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Rooms",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Master",
            items: [
              {
                title: "Tiers Room",
                url: "/admin/rooms/master/tiers",
              },
            ],
          },
        ],
      }
    ],
  },

];
