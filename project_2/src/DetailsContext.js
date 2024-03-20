import React, { useEffect,
                useState,
                createContext } from 'react';

const DetailsContext = createContext();

const DetailsProvider = ({ children}) => {
    const [ pokemonList, setPokemonList ] = useState([]);
    const [ pokemonData, setPokemonData] = useState([])
    const [ loading, setLoading ] = useState(true);
    const [ price, setPrice ] = useState(0);
    const [ url, setUrl ] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);
    const [ path, setPath ] = useState(0);
    const [ selectedPokemon, setSelectedPokemon ] = useState({});
    const [ searchInput, setSearchInput ] = useState("");
    const [ searchedUrl, setSearchedUrl] = useState(``);

    const capString = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handlePokemonClick = (pokemon) => {
        setSelectedPokemon(pokemon);
    }

    const handleNextButton = () => {
      console.log("Next Button")
      let newPath = path;
      if (path < 66) newPath = path + 1;
      setPath(newPath)
      setUrl(pokemonList.next)
    }

    const handlePreviousButton = () => {
        console.log("Previous Button")
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
                                              priceOfPokemon }}
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