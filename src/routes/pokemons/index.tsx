import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getPokemonWithOffset } from "../../api/pokemon";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pokemons/")({
  validateSearch: (search: { offset?: string; limit?: string }) => {
    return {
      offset: search.offset ? parseInt(search.offset, 10) : 0,
      limit: search.limit ? parseInt(search.limit, 10) : 48,
    };
  },
  component: Pokemon,
  loaderDeps: ({ search }) => {
    return {
      offset: search.offset,
      limit: search.limit,
    };
  },
  loader: async ({ deps }) => {
    return getPokemonWithOffset(deps.offset, deps.limit);
  },
});

function Pokemon() {
  const { results: pokemons } = Route.useLoaderData();
  const { offset, limit } = Route.useSearch();
  const navigate = useNavigate();

  const getPokemonImage = (url: string) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.split("/pokemon/")[1].split("/")[0]}.png`;

  const handlePagination = (newOffset: number) => {
    navigate({
      to: "/pokemons",
      search: { offset: newOffset, limit },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-4 text-center">Pokémon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <Link
            to="/pokemons/$id"
            params={{ id: pokemon.name }}
            key={pokemon.name}
            className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg mb-4">
              <img
                src={getPokemonImage(pokemon.url)}
                alt={pokemon.name}
                className="h-full"
              />
            </div>
            <h2 className="text-xl font-semibold text-center">
              {pokemon.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-between my-4 gap-2">
        <Button
          variant="default"
          disabled={offset <= 0}
          onClick={() => handlePagination(offset - limit)}
        >
          <ArrowLeft className="mr-2" />
          Previous
        </Button>
        <Button
          variant="default"
          onClick={() => handlePagination(offset + limit)}
        >
          Next <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
