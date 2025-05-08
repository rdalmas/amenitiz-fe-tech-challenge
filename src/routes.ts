import {
    type RouteConfig,
    route,
    index,
    prefix
  } from "@react-router/dev/routes";
  
  export default [
    index("./pages/List.tsx"),
    ...prefix("profile", [
        route(":userId", "./pages/Profile.tsx"),
    ])
  ] satisfies RouteConfig;