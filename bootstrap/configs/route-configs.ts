import type { ReactElement } from 'react';

type RouteItem = {
  langKey: string;
  icon?:
  | ((props: { className?: string } & Record<string, unknown>) => ReactElement);
  path: string;
};

const routeConfigs: Record<string, RouteItem> = {
  home: {
    langKey: "home",
    path: "/",
  }
}

export default routeConfigs;