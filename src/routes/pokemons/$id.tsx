import { createFileRoute, Link } from "@tanstack/react-router";
import { getPokemonByIdQuery } from "../../api/pokemon";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pokemons/$id")({
  component: RouteComponent,
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(getPokemonByIdQuery(params.id)),
});

function RouteComponent() {
  const pokemon = Route.useLoaderData();
  console.log(pokemon);

  return (
    <div className="flex justify-center items-center min-h-full p-4">
      <Card className="w-full max-w-md bg-white rounded-lg shadow-md">
        <CardHeader className="flex flex-col items-center p-4 bg-gray-100 rounded-t-lg">
          <Avatar className="size-52">
            <AvatarImage
              src={pokemon.sprites.front_default ?? ""}
              alt={pokemon.name}
            />
          </Avatar>
          <h1 className="text-2xl font-bold">{pokemon.name}</h1>
          <Badge className="mt-2">ID: {pokemon.id}</Badge>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Moves:</h3>
          <ul className="list-disc list-inside">
            {pokemon.moves.slice(0, 5).map((move: any, index: number) => (
              <li key={index} className="text-gray-700">
                {move.move.name}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="p-4 bg-gray-100 rounded-b-lg">
          <Link to="/pokemons/moves/$id" params={{ id: pokemon.name }}>
            <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
              View More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
