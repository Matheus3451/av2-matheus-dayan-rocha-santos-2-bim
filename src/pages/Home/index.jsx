import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";

const POKEMON_LIST = [
  { name: 'bulbassaur', id: 1 },
  { name: 'ivyssaur', id: 2 },
  { name: 'venossaur', id: 3 },
  { name: 'squirtle', id: 4 },
  { name: 'wartortle', id: 5 },
  { name: 'blastoise', id: 6 },
  { name: 'charmander', id: 7 },
  { name: 'chameleon', id: 8 },
  { name: 'charizard', id: 9 },
  { name: 'weedle', id: 13 },
  { name: 'kakuna', id: 14 },
  { name: 'beedrill', id: 15 },
];

export default function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite, favoritesCount } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all(
          POKEMON_LIST.map(async (pokemon) => {
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
            
            // Busca descrição em português primeiro, depois em inglês
            const ptEntry = speciesResponse.data.flavor_text_entries
              .find(entry => entry.language.name === "pt");
            
            const enEntry = speciesResponse.data.flavor_text_entries
              .find(entry => entry.language.name === "en");
            
            const description = ptEntry?.flavor_text || enEntry?.flavor_text || "Descrição não disponível";

            return {
              ...pokemon,
              description: description.replace(/[\n\f]/g, ' '),
              sprite: pokemonResponse.data.sprites.other['official-artwork'].front_default,
              types: pokemonResponse.data.types.map(t => t.type.name),
              category: speciesResponse.data.genera.find(g => g.language.name === "pt")?.genus || 
                       speciesResponse.data.genera.find(g => g.language.name === "en")?.genus ||
                       "Categoria desconhecida"
            };
          })
        );
        setPokemonData(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para alternar o estado de favorito
  const handleToggleFavorite = (pokemon) => {
    toggleFavorite(pokemon);
  };

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
        <p style={{ color: '#2F4F4F', fontWeight: 'bold' }}>Carregando Pokédex...</p>
      </div>
    </div>
  );

  return (
    <div style={{
      backgroundColor: '#ADD8E6',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1 style={{ 
        color: '#142727', 
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        Home
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {pokemonData.map((pokemon, index) => (
          <div 
            key={index}
            style={{
              backgroundColor: '#98FB98',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <img 
                src={pokemon.sprite} 
                alt={pokemon.name}
                style={{ 
                  width: '80px',
                  height: '80px',
                  marginRight: '15px',
                  objectFit: 'contain'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between'
                }}>
                  <h2 style={{ 
                    color: '#2F4F4F',
                    margin: 0,
                    textTransform: 'capitalize',
                    flex: 1
                  }}>
                    #{pokemon.id.toString().padStart(3, '0')} - {pokemon.name}
                  </h2>
                  
                  {/* Coração clicável */}
                  <button
                    onClick={() => handleToggleFavorite(pokemon)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '24px',
                      cursor: 'pointer',
                      padding: '5px',
                      borderRadius: '50%',
                      transition: 'all 0.3s ease',
                      marginLeft: '10px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.2)';
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    {isFavorite(pokemon.id) ? '❤️' : '🤍'}
                  </button>
                </div>

                <p style={{ 
                  marginTop: '5px',
                  fontStyle: 'italic',
                  fontSize: '0.9rem'
                }}>
                  {pokemon.category}
                </p>
              </div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ 
                marginBottom: '8px',
                fontSize: '1.1rem'
              }}>
                Descrição:
              </h3>
              <p style={{ 
                margin: 0,
                lineHeight: '1.5'
              }}>
                "{pokemon.description}"
              </p>
            </div>
            
            <div>
              <h3 style={{ 
                marginBottom: '8px',
                fontSize: '1.1rem'
              }}>
                Tipos:
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {pokemon.types.map((type, i) => (
                  <span 
                    key={i}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      backgroundColor: typeColors[type] || '#777',
                      color: 'white',
                      fontSize: '0.9rem'
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contador de favoritos */}
      {favoritesCount > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#2F4F4F',
          color: '#98FB98',
          padding: '10px 15px',
          borderRadius: '25px',
          fontWeight: 'bold',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}>
          ❤️ {favoritesCount} Pokémon favoritado{favoritesCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC"
};