import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';

export const getStaticProps: GetStaticProps = async () => {
    const pokemons = await fetch(`${process.env.base_pokemon_url}/pokedex/1/`)
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
    useEffect(() => {
        async function teste() {
            const teste = await fetch(`${process.env.base_api_url}/teste/`).then((response) =>
                response.json()
            );
            console.log(teste);
        }

        teste();
    }, []);

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
