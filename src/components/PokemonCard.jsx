import React from 'react';

const PokemonCard = ({ pokemon }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={pokemon.image} alt={pokemon.name} className="w-full h-48 object-contain" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 capitalize">{pokemon.name}</h2>
            </div>
        </div>
    );
}

export default PokemonCard;