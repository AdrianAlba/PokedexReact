import React from 'react'
import './PokemonCard.css'

function PokemonCard({ id, nombre, imagen, tipo, onViewClick }) {
  return (
    <div className="pokemon-card">
      <img src={imagen} alt={nombre} className="pokemon-image" />
      <h3 className="pokemon-name">{nombre}</h3>
      <p className="pokemon-type">Tipo: {tipo.join(', ')}</p>
      <button onClick={() => onViewClick(id)}>Ver</button>
    </div>
  )
}

export default PokemonCard