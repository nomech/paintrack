import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { useAuth } from "./features/auth/comtext/useAuth";

export function InnerApp() {
  const auth = useAuth();

  console.log("InnerApp auth:", auth);

  return <RouterProvider router={router} context={{ auth }} />;
}
