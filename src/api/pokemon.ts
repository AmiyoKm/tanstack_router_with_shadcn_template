import { Pokemon, PokemonList } from "@/types/pokemon"
import { queryOptions } from "@tanstack/react-query"
import axios from "axios"

export const getPokemon = async () => {
    return (await axios.get<PokemonList>('https://pokeapi.co/api/v2/pokemon/')).data

}
export const getPokemonQuery = queryOptions({
    queryKey: ['pokemon'],
    queryFn: getPokemon
})


export const getPokemonWithOffset = async (offset: number, limit: number) => {

    return (await axios.get<PokemonList>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}}&limit=${limit}`)).data
}
export const getPokemonWithOffsetQuery = (limit: number, offset: number) => queryOptions({
    queryKey: ['pokemon', { offset, limit }],
    queryFn: () => getPokemonWithOffset(limit, offset)
})

export const getPokemonById = async (id: string) => {
    return (await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
}

export const getPokemonByIdQuery = (id: string) => queryOptions({
    queryKey: ['pokemon', { id }],
    queryFn: () => getPokemonById(id)
})

