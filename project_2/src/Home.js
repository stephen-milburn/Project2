import React, { useContext } from 'react';
import { DetailsContext } from './DetailsContext.js';
import styled from '@emotion/styled';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { pokemonData,
            handleNextButton,
            handlePreviousButton,
            capString,
            handlePokemonClick,
            priceOfPokemon,
            setSelectedUrl,
            handleAddToCart,
            handleAddToFavorites,
            pokemonCart } = useContext(DetailsContext);

    const navigate = useNavigate();

    const StyledCard = styled(Card)({
        margin: "10px",
        backgroundColor: 'lightgrey',
        padding: "10px",
        border: '1px solid black',
        width: "250px",
        height: "400px"
    });


  return (
    <>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />
      <Row>
        {pokemonData.map((pokemon, index) => {
          return (
            <Col key={pokemon.name} xs={3}>
              <StyledCard key={index}>
                <CardMedia>
                  <img
                    key={index}
                    onClick={async () => {
                      handlePokemonClick(pokemon);
                      await setSelectedUrl(
                        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                      );
                      navigate(`/pokemon/${pokemon.name}`);
                    }}
                    src={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                    alt={pokemon.name}
                    style={{ width: "100%" }}
                  />
                </CardMedia>
                <h3 style={{ fontFamily: "Pokemon Solid" }}>
                  {capString(pokemon.name)}
                </h3>
                <p>Price: ${priceOfPokemon(pokemon.stats)}</p>

                <button

                  onClick={() => {
                    handleAddToCart(pokemon);
                    console.log("clicked on Add to Cart");
                  }}
                  className="btn btn-warning my-2 btn-sm"
                  style={{ marginRight: "5px", fontWeight: 500 }}
                >
                  Add to Cart
                </button>
                <button
                onClick={() => {
                  handleAddToFavorites(pokemon)}}
                  className="btn btn-warning my-2 btn-sm"
                  style={{ fontWeight: 500 }}
                >
                  Add to Favorites
                </button>
              </StyledCard>
            </Col>
          );
        })}
      </Row>
      <Row style={{marginBottom:'20px'}}>
        <Col key="previous" xs={6}>
          <button
            style={{marginLeft:'20px'}}
            onClick={handlePreviousButton}
            className="btn btn-dark my-2 btn-lg"
          >
            Previous
          </button>
        </Col>
        <Col key="next" xs={6} style={{ textAlign: "right" }}>
          <button
            style={{marginRight:'20px'}}
            onClick={handleNextButton}
            className="btn btn-dark my-2 btn-lg"
          >
            Next
          </button>
        </Col>
      </Row>
    </>
  );
}


export default Home;