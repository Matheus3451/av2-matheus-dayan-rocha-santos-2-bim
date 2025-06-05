import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(new Set());
  const [favoritePokemonData, setFavoritePokemonData] = useState([]);

  const toggleFavorite = (pokemonData) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      
      if (newFavorites.has(pokemonData.id)) {
        // Remove dos favoritos
        newFavorites.delete(pokemonData.id);
        setFavoritePokemonData(prevData => 
          prevData.filter(pokemon => pokemon.id !== pokemonData.id)
        );
      } else {
        // Adiciona aos favoritos
        newFavorites.add(pokemonData.id);
        setFavoritePokemonData(prevData => [...prevData, pokemonData]);
      }
      
      return newFavorites;
    });
  };

  const isFavorite = (pokemonId) => {
    return favorites.has(pokemonId);
  };

  const value = {
    favorites,
    favoritePokemonData,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.size
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};