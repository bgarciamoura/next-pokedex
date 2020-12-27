import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export const getStaticProps: GetStaticProps = async () => {
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/1/')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((JSONresponse) => {
            return JSONresponse.pokemon_entries;
        });

    return {
        props: {
            pokemons,
        },
    };
};

interface Pokemon {
    entry_number: number;
    pokemon_species: {
        name: string;
        url: string;
    };
}

const Home: React.FC<{ pokemons: Pokemon[] }> = ({ pokemons }) => {
    return (
        <>
            <div>
                <ul>
                    {pokemons.map((pokemon: Pokemon) => (
                        <li key={pokemon.entry_number}>
                            <Link href={`/pokemon/${pokemon.entry_number}`}>
                                <Title>{pokemon.pokemon_species.name}</Title>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const Title = styled.a`
    color: red;
    font-size: 16px;
    font-family: sans-serif;
    cursor: pointer;
`;

export default Home;
