import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPokemon = async (page = 1) => {
      try {
        const limit = 20;
        const offset = (page - 1) * limit;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        const pokemonWithImages = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            const detailData = await detailResponse.json();
            return {
              ...pokemon,
              image: detailData.sprites.front_default,
            };
          })
        );
        setPokemonData(pokemonWithImages);
        setFilteredPokemon(pokemonWithImages);
        setTotalPages(Math.ceil(data.count / limit));
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemon(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filtered = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchTerm, pokemonData]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Pokemon App</h1>
      <SearchBar onSearch={handleSearch} />
      <PokemonList pokemon={filteredPokemon} />
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded mx-2"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;