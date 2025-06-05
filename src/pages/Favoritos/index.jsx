import { Link } from "react-router-dom";
import { useFavorites } from "../../contexts/FavoritesContext";

// Função para cores dos tipos
function getTypeColor(type) {
  const colors = {
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
  return colors[type] || "#777";
}

export default function Favoritos() {
  const { favoritePokemonData, toggleFavorite, favoritesCount } = useFavorites();

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
        Meus Pokémon Favoritos ({favoritesCount})
      </h1>

      {favoritePokemonData.length === 0 ? (
        <div style={{
          backgroundColor: '#98FB98',
          borderRadius: '10px',
          padding: '40px',
          maxWidth: '500px',
          margin: '0 auto',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            color: '#2F4F4F',
            marginBottom: '20px'
          }}>
            Nenhum Pokémon favoritado ainda! 💔
          </h2>
          <p style={{ 
            color: '#2F4F4F',
            marginBottom: '20px'
          }}>
            Vá para a página inicial e clique no coração dos Pokémon que você mais gosta!
          </p>
          <Link 
            to="/" 
            style={{
              display: 'inline-block',
              padding: '12px 20px',
              backgroundColor: '#142727',
              color: '#8FBC8F',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Ir para Home
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {favoritePokemonData.map((pokemon, index) => (
            <div 
              key={pokemon.id}
              style={{
                backgroundColor: '#98FB98',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                position: 'relative',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Botão de remover favorito */}
              <button
                onClick={() => toggleFavorite(pokemon)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '5px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.backgroundColor = 'transparent';
                }}
                title="Remover dos favoritos"
              >
                ❤️
              </button>

              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <img 
                  src={pokemon.sprite} 
                  alt={pokemon.name}
                  style={{ 
                    width: '80px',
                    height: '80px',
                    marginRight: '15px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.2))'
                  }}
                />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h2 style={{ 
                    color: '#2F4F4F',
                    margin: 0,
                    textTransform: 'capitalize',
                    fontSize: '1.3rem'
                  }}>
                    #{pokemon.id.toString().padStart(3, '0')} - {pokemon.name}
                  </h2>
                  
                  {pokemon.category && (
                    <p style={{ 
                      marginTop: '5px',
                      fontStyle: 'italic',
                      fontSize: '0.9rem',
                      color: '#2F4F4F'
                    }}>
                      {pokemon.category}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Descrição se disponível */}
              {pokemon.description && (
                <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                  <h3 style={{ 
                    marginBottom: '8px',
                    fontSize: '1rem',
                    color: '#2F4F4F'
                  }}>
                    Descrição:
                  </h3>
                  <p style={{ 
                    margin: 0,
                    lineHeight: '1.4',
                    fontSize: '0.9rem',
                    color: '#2F4F4F'
                  }}>
                    "{pokemon.description}"
                  </p>
                </div>
              )}
              
              {/* Tipos se disponível */}
              {pokemon.types && (
                <div style={{ textAlign: 'left' }}>
                  <h3 style={{ 
                    marginBottom: '8px',
                    fontSize: '1rem',
                    color: '#2F4F4F'
                  }}>
                    Tipos:
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {pokemon.types.map((type, i) => (
                      <span 
                        key={i}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          backgroundColor: getTypeColor(type),
                          color: 'white',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Contador fixo de favoritos */}
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
          ❤️ {favoritesCount} Favorito{favoritesCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}