import React from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

interface IPokemon {
    id: number;
    name: string;
    front_default: string;
}

interface PokemonPaths {
    entry_number: number;
    pokemon_species: {
        name: string;
        url: string;
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const pokemons: PokemonPaths[] = await fetch(`${process.env.base_pokemon_url}/pokedex/1/`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((JSONresponse) => {
            return JSONresponse.pokemon_entries;
        });

    const paths = pokemons.map((pokemon: PokemonPaths) => {
        return {
            params: { id: pokemon.entry_number.toString() },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const fetchedPokemonData = await fetch(`${process.env.base_pokemon_url}/pokemon/${params?.id}/`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((JSONresponse) => {
            return JSONresponse;
        });

    const pokemon = {
        id: fetchedPokemonData.id,
        name: fetchedPokemonData.name,
        front_default: fetchedPokemonData.sprites.front_default,
    };
    return {
        props: {
            pokemon,
        },
    };
};

const Pokemon: React.FC<{ pokemon: IPokemon }> = ({ pokemon }) => {
    return (
        <>
            <span>{`ID: ${pokemon.id}`}</span>
            <br />
            <span>{`${pokemon.name}`}</span>
            <img src={pokemon.front_default} alt='' />
            <Link href='/'>
                <a>Voltar</a>
            </Link>
        </>
    );
};

export default Pokemon;
