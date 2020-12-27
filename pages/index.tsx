import { GetStaticProps } from 'next';
import React from 'react';
import styled from 'styled-components';

/**
 * LINK DA API PARA IMAGENS
 * https://pokeapi.co/api/v2/pokemon/1/
 * substituir o id no fim
 * seção sprites do json
 */

export const getStaticProps: GetStaticProps = async () => {
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
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
                            <Title>{pokemon.pokemon_species.name}</Title>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const Title = styled.h1`
    color: red;
    font-size: 16px;
    font-family: sans-serif;
`;

export default Home;
