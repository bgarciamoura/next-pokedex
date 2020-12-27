import React from 'react';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import styled from 'styled-components';
import BasicLayout from '../../../layout/Base';
import { BsChevronLeft } from 'react-icons/bs';

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
        <BasicLayout>
            <CardWrapper>
                <div className='card'>
                    <div className='card-info'>
                        <img src={pokemon.front_default} alt={pokemon.name} />
                        <div>
                            <span>{`Número da DEX: ${pokemon.id}`}</span>
                            <br />
                            <span>{`Nome: ${pokemon.name}`}</span>
                        </div>
                    </div>
                    <div className='button-wrapper'>
                        <Link href='/'>
                            <a>
                                <BsChevronLeft size={16}></BsChevronLeft>
                            </a>
                        </Link>
                    </div>
                </div>
            </CardWrapper>
        </BasicLayout>
    );
};

const CardWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    background: #f8f7ff;

    .card {
        position: relative;
        width: 100%;
        max-width: 400px;
        min-height: 250px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;

        border-radius: 5px;
        box-shadow: 4px 4px 4px rgba(0, 67, 70, 0.3), -1px -1px 8px rgba(81, 23, 48, 0.3);

        background: #1985a1;
        color: #f8f7ff;

        .card-info {
            width: 100%;

            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 100%;
                margin: 16px;
                background: #f8f7ff;
                border-radius: 50%;
            }

            div {
                flex-grow: 1;
                width: 100%;
                align-self: flex-start;
                margin: 16px 16px 16px 0;
                text-align: left;

                & span:nth-child(3) {
                    text-transform: capitalize;
                }
            }
        }

        .button-wrapper {
            position: absolute;
            right: 10px;
            bottom: 10px;

            a {
                display: flex;
                justify-content: center;
                align-items: center;

                width: 48px;
                height: 48px;
                border-radius: 50%;

                background: #950952;
                color: #f8f7ff;

                font-weight: bold;

                transition: all 0.2s ease-in-out;

                &:hover {
                    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
                }
            }
        }
    }
`;

export default Pokemon;
