import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
export const Route = createRootRoute({
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
          search={{ offset: 0, limit: 20 }}
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
});
