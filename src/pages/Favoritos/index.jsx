import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Lista dos Pokémon favoritos
const FAVORITE_POKEMON = [
  { name: 'growlithe', id: 58 },
  { name: 'ampharos', id: 181 },
  { name: 'corviknight', id: 823 },
  { name: 'pancham', id: 674 },
  { name: 'volcarona', id: 637 }
];

export default function Favoritos() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all(
          FAVORITE_POKEMON.map(async (pokemon) => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
            return {
              ...pokemon,
              sprite: response.data.sprites.other['official-artwork'].front_default || 
                     response.data.sprites.front_default
            };
          })
        );
        setPokemonData(data);
      } catch (error) {
        console.error("Erro ao buscar Pokémon favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#ADD8E6'
    }}>
      <div style={{
        padding: '20px',
        backgroundColor: '#98FB98',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #142727',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          margin: '0 auto 15px',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#2F4F4F', fontWeight: 'bold' }}>Carregando Favoritos...</p>
      </div>
    </div>
  );

  return (
    <div style={{
      backgroundColor: '#ADD8E6',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <Link 
        to="/" 
        style={{
          display: 'inline-block',
          padding: '10px 15px',
          backgroundColor: '#142727',
          color: '#8FBC8F',
          borderRadius: '5px',
          marginBottom: '20px',
          textDecoration: 'none'
        }}
      >
        ← Voltar para Home
      </Link>

      <h1 style={{ 
        color: '#142727', 
        marginBottom: '30px'
      }}>
        Meus Pokémon Favoritos de todos os tempos
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '30px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {pokemonData.map((pokemon, index) => (
          <div 
            key={index}
            style={{
              backgroundColor: '#98FB98',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s',
              ':hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <img 
              src={pokemon.sprite} 
              alt={pokemon.name}
              style={{ 
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.2))'
              }}
            />
            <h3 style={{ 
              color: '#2F4F4F',
              marginTop: '10px',
              textTransform: 'capitalize'
            }}>
              {pokemon.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}