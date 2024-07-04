import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PokemonCompleto.css'

function PokemonCompleto({ id, onClose }) {
  const [pokemonData, setPokemonData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemonData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [id])

  if (!pokemonData) {
    return <p>Loading...</p>
  }

  return (
    <div className="pokemon-completo">

    <div className="zona-izquierda">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{pokemonData.name}</h2>
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
    </div>

    <div className="zona-derecha">
        <div className="info-pokemon">
            <p>Altura: {pokemonData.height}</p>
            <p>Peso: {pokemonData.weight}</p>
            <p>Experiencia Base: {pokemonData.base_experience}</p>
            <p>Tipos: {pokemonData.types.map(type => type.type.name).join(', ')}</p>
        </div>
    </div>

    <div className="zona-derecha">
        <p>Estadísticas:</p>
        <ul>
            {pokemonData.stats.map(stat => (
            <li key={stat.stat.name}>
                {stat.stat.name +": "+ stat.base_stat}
            </li>
            ))}
        </ul>

        <p>Movimientos:</p>
        <ul>
            {pokemonData.moves.slice(0, 5).map(move => (
            <li key={move.move.name}>
                {move.move.name+ ".    "}
            </li>
            ))}
        </ul>
        
    </div>

    </div>
  )
}

export default PokemonCompleto
