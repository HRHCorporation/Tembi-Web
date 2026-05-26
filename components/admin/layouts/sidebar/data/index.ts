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
        icon: Icons.RoomIcon,
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
      },
      {
        title: "Food Catering",
        icon: Icons.FoodIcon,
        items: [
          {
            title: "Catering",
            url: "/admin/food/catering",
          },
          {
            title: "Our Menu",
            url: "/admin/food/menu",
          },
          {
            title: "Our Package",
            url: "/admin/food/package",
          },
          {
            title: "Menu Highlight",
            url: "/admin/food/highlight",
          },
        ],
      },
      {
        title: "Celebrate",
        url: "/admin/celebrate",
        icon: Icons.BoxIcon,
        items: [],
      },
      {
        title: "Vanue",
        icon: Icons.TagIcon,
        items: [
          {
            title: "Master Fasilities",
            url: "/admin/vanue/facilities",
          },
          {
            title: "Main Vanue",
            url: "/admin/vanue/main",
          }
        ],
      },
      {
        title: "Collections",
        icon: Icons.CalendarIcon,
        items: [
          {
            title: "Master Collections",
            url: "/admin/collections/master",
          },
          {
            title: "Main Collections",
            url: "/admin/collections/main",
          }
        ],
      },
      {
        title: "Blog",
        url: "/admin/blogs",
        icon: Icons.DocumentIcon,
        items: [],
      },
      {
        title: "Event",
        url: "/admin/event",
        icon: Icons.ChevronUp,
        items: [],
      },
      {
        title: "Banner Setting",
        url: "/admin/banner",
        icon: Icons.SettingsIcon,
        items: [],
      },
      {
        title: "Invoice",
        url: "/admin/invoice",
        icon: Icons.BoxIcon,
        items: [],
      },
    ],
  },

];
