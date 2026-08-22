import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import App from "./App";

export default function RootLayout() {
  return (
    <>
      <App>
        <Outlet />
      </App>
      <TanStackRouterDevtools />
    </>
  );
}
