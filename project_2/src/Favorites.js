import React, { useState, useContext, useEffect } from 'react';
import { DetailsContext } from './DetailsContext.js';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Favorites = () => {

  const { selectedPokemon,
          capString,
          priceOfPokemon,
          returnToMarket,
          pokemonCart,
          setPokemonCart,
          handlePokemonClick,
          handleRemoveFromCart,
          handleAddToFavorites,
          handleRemoveFromFavorites,
          favorites
         } = useContext(DetailsContext);
  const navigate = useNavigate();

  const StyledCard = styled(Card)({
    margin: "10px",
    backgroundColor: 'lightgrey',
    padding: "10px",
    border: '1px solid black',
    width: "250px",
    height: "400px"
  });

  useEffect( () => {
    console.log("added new pokemon to favorites")
  }, [favorites])

  return (
<>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />
    <h1 style={{marginLeft:"20px", marginTop:'20px'}}>Your Favorite Pokémon's</h1>
    <div>
      <Row style={{marginLeft:'10px'}}>
      { favorites.length > 0 ?
        favorites.map((pokemon, index) => {
          return (
            <Col key={pokemon.name} xs={3}>
              <StyledCard
                key={index}>
                <CardMedia>
                  <img
                    src={ pokemon.sprites.other["official-artwork"].front_default }
                    alt={ pokemon.name }
                    style={{ width: "auto", height: "200px" }}
                    onClick={() => {
                        handlePokemonClick(pokemon);
                        navigate(`/pokemon/${pokemon.name}`);
                    }}
                  />
                </CardMedia>
                <h3 style={{ fontFamily: "Pokemon Solid" }}>
                  {capString(pokemon.name)}
                </h3>
                <p>

                  Price: $
                  {priceOfPokemon(pokemon.stats)}
                </p>
                <button
                onClick={() => {
                  handleRemoveFromFavorites(pokemon)}}
                  className="btn btn-warning my-2 btn-sm"
                  style={{ marginRight: "5px", fontWeight: 500 }}
                >
                  Remove from Favorites
                </button>
                {/* <button
                  className="btn btn-warning my-2 btn-sm"
                  style={{ fontWeight: 500 }}
                >
                  Add to Favorites
                </button> */}
              </StyledCard>
            </Col>
          );
        })
        :
        <h1 style={{marginLeft:'30%', marginTop:'30px'}}>No Favorite Pokémon? Boo.</h1>
    }
      </Row>
      {/* <Row>
        <Col>
          <h2>  </h2>
          <button
          className="btn btn-dark my-2 btn-sm"
          > Checkout
          </button>
        </Col>
      </Row> */}
    </div>
</>
  )
}

export default Favorites;