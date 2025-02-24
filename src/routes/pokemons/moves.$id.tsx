import { getPokemonById } from "@/api/pokemon";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pokemons/moves/$id")({
  component: RouteComponent,
  loader: ({ params }) => getPokemonById(params.id),
});

function RouteComponent() {
  const { moves } = Route.useLoaderData();
  console.log(moves);

  return (
    <div className="container mx-auto p-4">
      {moves.map((move, index) => (
        <Card key={index} className="bg-white rounded-lg shadow-md">
          <CardHeader>
            <Avatar>
              <AvatarImage src={move.move.url} />
            </Avatar>
            <CardTitle className="text-2xl">{move.move.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Level Learned At: {move.version_group_details[0].level_learned_at}
            </p>
            <p>
              Move Learn Method:{" "}
              {move.version_group_details[0].move_learn_method.name}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
