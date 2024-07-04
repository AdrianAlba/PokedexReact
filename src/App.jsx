import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import PokemonCompleto from './PokemonCompleto';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302'); // Limitamos a 20 Pokémon para este ejemplo
        const results = response.data.results;
        const pokemonData = await Promise.all(results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        }));
        setPokemonList(pokemonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = (id) => {
    console.log(`Pokémon seleccionado con ID: ${id}`);
    setSelectedPokemonId(id);
  };

  const handleClose = () => {
    setSelectedPokemonId(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonList.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
    <h1>Pokédex</h1>
      <header className="header">
        <input className="entrada" type="text" placeholder="Buscar Pokémon" onChange={handleSearchChange} value={searchTerm} />
      </header>

      <div className="App">
        <section className="contenedor">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="pokemon-list">
              {filteredPokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  nombre={pokemon.name}
                  imagen={pokemon.sprites.front_default}
                  tipo={pokemon.types.map((type) => type.type.name)}
                  onViewClick={handleViewClick}
                />
              ))}
            </div>
          )}
        </section>
        {selectedPokemonId && (
          <div className="overlay">
            <PokemonCompleto id={selectedPokemonId} onClose={handleClose} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
