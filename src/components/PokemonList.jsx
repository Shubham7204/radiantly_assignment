import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemon }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemon.map((poke) => (
                <PokemonCard key={poke.name} pokemon={poke} />
            ))}
        </div>
    );
}

export default PokemonList;
