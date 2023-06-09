import React from "react";
import {
  createRoutesFromChildren,
  RoutesProps,
  useRoutes,
} from "react-router-dom";

export function Routes({
  children,
  location,
}: RoutesProps): React.ReactElement | null {
  return useRoutes(createRoutesFromChildren(children), location);
}