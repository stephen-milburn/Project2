import React, { useEffect,
                useState,
                createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailsContext = createContext();

const DetailsProvider = ({ children}) => {
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ pokemonData, setPokemonData] = useState([])
    const [ loading, setLoading ] = useState(true);
    const [ url, setUrl ] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
    const [ path, setPath ] = useState(0);
    const [ selectedPokemon, setSelectedPokemon ] = useState({});
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchedUrl, setSearchedUrl] = useState(``);
    const [ pokemonCart, setPokemonCart ] = useState([]);
    const [ selectedUrl, setSelectedUrl ] = useState('');
    const [ favorites, setFavorites ] = useState([]);
    const [ shinyPokemonCart, setShinyPokemonCart ] = useState([]);
    const [ shinyFavorites, setShinyFavorites ] = useState([]);
    const [ selectedImage, setSelectedImage ] = useState('');

    const getColorForType = (type) => {
        switch (type) {
          case "normal" :
            return "#BABAAE";
          case "fighting" :
            return "#A75543";
          case "flying" :
            return "#78A2FF";
          case "poison" :
            return "#A95CA0";
          case "ground" :
            return "#EECC55";
          case "rock" :
            return "#CCBD72";
          case "bug" :
            return "#C2D21E";
          case "ghost" :
            return "#7975D7";
          case "steel" :
            return "#C4C2DB";   
          case "fire" :
            return "#FA5643";
          case "water" :
            return "#56ADFF";
          case "grass" :
            return "#8CD750";
          case "electric" :
            return "#FDE139";
          case "psychic" :
            return "#FA65B4";
          case "ice" :
            return "#96F1FF";
          case "dragon" :
            return "#8673FF";
          case "dark" :
            return "#8D6855";
          case "fairy" :
            return "#F9AEFF";
          default:
            return "lightgrey"; // Default color if type not found
        }
    };

    const navigate = useNavigate();

    const capString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const returnToMarket = () => {
        navigate('/');
    }

    const returnToShinyMarket = () => {
        navigate('/shiny');
    }

    const handlePokemonClick = (pokemon) => {
        setSelectedPokemon(pokemon);
    }

    const handleNextButton = () => {
      let newPath = path;
      if (path < 66) newPath = path + 1;
      setPath(newPath)
      setUrl(pokemonList.next)
    }

    const handlePreviousButton = () => {
        let newPath = path;
        if (path > 0) newPath = path - 1;
        setPath(newPath)
        setUrl(pokemonList.previous)
    }

    const priceOfPokemon = (statsArray) => {
        let priceTotal = 0;
        statsArray.map(stat => priceTotal += stat.base_stat)
        return priceTotal;
    }

    const handleShinyAddToCart = (pokemon) => {
        if(shinyPokemonCart.length > 0 ) {
            let pokemonArray = [...shinyPokemonCart];
            pokemonArray.push(pokemon)
            setShinyPokemonCart(pokemonArray)
        } else {
            let pokemonArray = []
            pokemonArray.push(pokemon)
            setShinyPokemonCart(pokemonArray)
        }
    }

    const handleAddToCart = (pokemon) => { 
        if(pokemonCart.length > 0 ) {
            let pokemonArray = [...pokemonCart];
            pokemonArray.push(pokemon)
            setPokemonCart(pokemonArray)
        } else {
            let pokemonArray = []
            pokemonArray.push(pokemon)
            setPokemonCart(pokemonArray)
        }
    }

    const handleShinyRemoveFromCart = (pokemonToRemove) => {
        const updatedCart = shinyPokemonCart.filter((pokemon) => pokemon.name !== pokemonToRemove.name);
        setShinyPokemonCart(updatedCart)
    }
    
    const handleRemoveFromCart = (pokemonToRemove) => {
        const updatedCart = pokemonCart.filter((pokemon) => pokemon.name !== pokemonToRemove.name);
        setPokemonCart(updatedCart)
    }

    const handleAddToFavorites = (pokemon) => {
        if(favorites.length > 0 ) {
            let pokemonArray = [...favorites];
            if (!favorites.some(fav => fav.name === pokemon.name)) {
                pokemonArray.push(pokemon)
                setFavorites(pokemonArray)
            }
        } else {
            let pokemonArray = []
            pokemonArray.push(pokemon)
            setFavorites(pokemonArray)
            console.log(`${pokemon.name} added to favorites`)
        }
    }
    
    const handleShinyAddToFavorites = (pokemon) => {
        if(favorites.length > 0 ) {
            let pokemonArray = [...shinyFavorites];
            if (!shinyFavorites.some(fav => fav.name === pokemon.name)) {
                pokemonArray.push(pokemon)
                setShinyFavorites(pokemonArray)
            }
        } else {
            let pokemonArray = []
            pokemonArray.push(pokemon)
            setShinyFavorites(pokemonArray)
            console.log(`${pokemon.name} added to favorites`)
        }
    }

    const handleRemoveFromFavorites = (pokemonToRemove) => {
        const updatedCart = favorites.filter((pokemon) => pokemon.name !== pokemonToRemove.name);
        setFavorites(updatedCart)
    }

    const handleRemoveFromShinyFavorites = (pokemonToRemove) => {
        const updatedCart = shinyFavorites.filter((pokemon) => pokemon.name !== pokemonToRemove.name);
        setShinyFavorites(updatedCart)
    }


    useEffect(() => {
        const fetchPokedex = async () => {
            let response = await fetch(url);
            let data = await response.json();
            let pokePromises = data.results.map(async (pokemon) => {
                let pokemonResponse = await fetch(pokemon.url);
                let pokemonData = await pokemonResponse.json();
                return pokemonData
            })
            let pokemonData = await Promise.all(pokePromises);
            setPokemonList(data);
            setPokemonData(pokemonData);
            setLoading(false);
        }
        fetchPokedex();
    }, [url]);

    return (
        <>
            <DetailsContext.Provider value={{ pokemonData,
                                              setPokemonData,
                                              selectedPokemon,
                                              setSelectedPokemon,
                                              loading,
                                              setLoading,
                                              handleNextButton,
                                              handlePreviousButton,
                                              capString,
                                              handlePokemonClick,
                                              searchInput,
                                              setSearchInput,
                                              searchedUrl,
                                              setSearchedUrl,
                                              priceOfPokemon,
                                              returnToMarket,
                                              returnToShinyMarket,
                                              pokemonCart,
                                              setPokemonCart,
                                              selectedUrl,
                                              setSelectedUrl,
                                              handleAddToCart,
                                              handleRemoveFromCart,
                                              favorites,
                                              setFavorites,
                                              handleAddToFavorites,
                                              handleRemoveFromFavorites,
                                              shinyPokemonCart,
                                              setShinyPokemonCart,
                                              handleShinyAddToCart,
                                              handleShinyRemoveFromCart,
                                              shinyFavorites,
                                              setShinyFavorites,
                                              handleShinyAddToFavorites,
                                              handleRemoveFromShinyFavorites,
                                              selectedImage,
                                              setSelectedImage,
                                              getColorForType
                                            }}
            >
            {
                loading ?
                    <div> Loading </div>
                :
                    children
            }
            </DetailsContext.Provider>
        </>
    )
}

export { DetailsContext, DetailsProvider };