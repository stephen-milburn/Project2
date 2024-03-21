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
    const [ favorites, setFavorites ] = useState([])

    const navigate = useNavigate();

    const capString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const returnToMarket = () => {
        navigate('/');
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

    const handleRemoveFromFavorites = (pokemonToRemove) => {
        const updatedCart = favorites.filter((pokemon) => pokemon.name !== pokemonToRemove.name);
        setFavorites(updatedCart)
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
                                              pokemonCart,
                                              setPokemonCart,
                                              selectedUrl,
                                              setSelectedUrl,
                                              handleAddToCart,
                                              handleRemoveFromCart,
                                              favorites,
                                              setFavorites,
                                              handleAddToFavorites,
                                              handleRemoveFromFavorites
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