import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import BasicLayout from '../../layout/Base';

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
        <BasicLayout>
            <Wrapper>
                <ul>
                    {pokemons.map((pokemon: Pokemon) => (
                        <li key={pokemon.entry_number}>
                            <Link href={`/pokemon/${pokemon.entry_number}`}>
                                <a>{pokemon.pokemon_species.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Wrapper>
        </BasicLayout>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 20px 0;

    background: #f8f7ff;

    ul {
        list-style: none;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        li {
            display: flex;
            justify-content: center;
            align-items: center;

            min-width: 100px;
            max-width: 100px;

            margin: 10px;
            border-radius: 5px;

            box-shadow: 4px 4px 4px rgba(0, 67, 70, 0.3), -1px -1px 8px rgba(81, 23, 48, 0.3);
            transition: all 0.3s ease-in-out;

            &:hover {
                box-shadow: 6px 6px 8px rgba(0, 67, 70, 0.5), -1px -1px 2px rgba(81, 23, 48, 0.1);
            }

            a {
                padding: 20px 10px;
                color: #320a28;
                text-transform: capitalize;
                font-size: 16px;
                font-family: sans-serif;
                cursor: pointer;
                text-decoration: none;
            }
        }
    }
`;

export default Home;
