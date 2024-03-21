import React, { useContext, useState, useEffect } from 'react';
import { DetailsContext } from './DetailsContext.js'
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Nav = () => {
  const { searchInput, setSearchInput, setSearchedUrl, returnToMarket } = useContext(DetailsContext);
  const navigate = useNavigate();
  const [ suggestions, setSuggestions ] = useState([]);
  const [ pokemonNameList, setPokemonNameList ] = useState([]);
  const [ loadingSuggestions, setLoadingSuggestions ] = useState(false);
  const [ shiny, setShiny ] = useState(false);
  const [ message, setMessage ] = useState('Shiny Poké 👀');

  const handleSearchChange = (event) => {
    const inputValue = (event.target.value)
    setSearchInput(inputValue);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchInput}`)
    setSearchedUrl(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
  }

  const typeSuggestion = (suggestion) => {
    setSearchInput(suggestion);
    navigate(`/search/${suggestion}`);
    setSearchedUrl(`https://pokeapi.co/api/v2/pokemon/${suggestion}`)
    //clear after each selection
    setSuggestions([]);
  }


  const StyledDiv = styled.div`
    position: absolute;
    top: 75px;
    right: 200px;
    maxHeight: 300px;
    width: 250px;
    overflowX: auto;
    background-color: red;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    z-index: 999;
    justifyContent: right;
  `;

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        setLoadingSuggestions(true);
         const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
         const data = await response.json();
         const pokemonNames = data.results.map(poke => poke.name);
         setPokemonNameList(pokemonNames);
         setLoadingSuggestions(false);
      } catch (error) {
        console.error('Could not find that shit:', error);
        setLoadingSuggestions(false);
      }
    };
    fetchPokemonNames();
  }, []);

  const filteredSuggestionsList = pokemonNameList.filter(name =>
    name.toLowerCase().includes(searchInput.toLowerCase())
    );

  const first10suggestions = filteredSuggestionsList.slice(0, 9);

  return (
    <header>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />

      <nav className="navbar navbar-dark bg-dark justify-content-between p-4">
        <h2
          className="navbar-brand bg-dark mt-2"
          style={{
            fontFamily: "Pokemon Solid",
            color: "#ffc107",
            textShadow:
              "2px 0 #0075BE, -2px 0 #0075BE, 0 2px #0075BE, 0 -2px #0075BE,1px 1px #0075BE, -1px -1px #0075BE, 1px -1px #0075BE, -1px 1px #0075BE",
          }}
          onClick={returnToMarket}
        >
          Pokémon Black Market
        </h2>
        <button
            className="btn btn-warning my-2 my-sm-0"
            type="submit"
            onClick={() => {
              shiny ?
                setMessage("Shiny Poké 👀")
                  :
                setMessage("Normal Poké 🤡")
              shiny ?
                navigate('/')
              :
                navigate('/shiny')
              setShiny(!shiny);
            }}>
            {message}
          </button>

        <form
          id="searchFrom"
          className="form-inline d-flex justify-content-end"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Enter Pokémon Name"
            value={searchInput}
            onChange={handleSearchChange}
            aria-label="Search"
            style={{ marginRight: "15px" }}
          />
          <div>
            <datalist id="pokemonNames">
              {first10suggestions.map((name, index) => (
                <option key={index} value={name} />
              ))}
            </datalist>

          </div>

          <div>

            {searchInput.trim().length > 0 && (
              <StyledDiv>
                {loadingSuggestions ? (
                  <div>Loading suggestions...</div>
                ) : (
                  first10suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: "white", padding:"5px" }}
                      className="suggestion-item"
                      onClick={() => typeSuggestion(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))
                )}
              </StyledDiv>
            )}
          </div>

          <button className="btn btn-warning my-2 my-sm-0" type="submit">
            Search
          </button>
          <svg
            onClick={() => navigate('/cart')}
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="white"
            className="bi bi-cart"
            viewBox="0 0 16 16"
            style={{ marginLeft: "25px" }}
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <svg
            onClick={() => navigate('/favorites')}
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="white"
            className="bi bi-heart"
            viewBox="0 0 16 16"
            style={{ marginLeft: "25px", marginTop: "4px" }}
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>
        </form>
      </nav>
    </header>
  );
}

export default Nav;