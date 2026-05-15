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
              {
                title: "Mattress Room",
                url: "/admin/rooms/master/mattress",
              },
              {
                title: "Fasilities",
                url: "/admin/rooms/master/fasilities",
              },
              {
                title: "Home Rules",
                url: "/admin/rooms/master/homerules",
              },
              {
                title: "Policies",
                url: "/admin/rooms/master/policies",
              },
            ],
          },
          {
            title: "Main",
            url: "/admin/rooms/main",
          },
          {
            title: "Amenties",
            url: "/admin/rooms/amenties",
          },
        ],
      }
    ],
  },

];
