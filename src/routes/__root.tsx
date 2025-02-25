import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import { QueryClient } from "@tanstack/react-query";
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <div className="p-2 flex gap-2 mx-10">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link
            to="/pokemons"
            className="[&.active]:font-bold"
            search={{ offset: 0, limit: 48 }}
            activeProps={{ className: "font-bold" }}
          >
            Pokemons
          </Link>
        </div>
        <hr />
        <div className="container mx-auto h-[95vh] p-4">
          <Outlet />
        </div>
        <TanStackRouterDevtools initialIsOpen={false} position="bottom-left" />
      </>
    ),
  }
);
