import z from "zod"

export const PokemonSearchQuery = z.object({
    offset: z.coerce.number().default(0),
    limit: z.coerce.number().default(40),
})

export type PokemonSearchQueryType = z.infer<typeof PokemonSearchQuery>