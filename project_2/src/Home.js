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
            priceOfPokemon } = useContext(DetailsContext);
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
              <StyledCard
                key={index}
                onClick={() => {
                  handlePokemonClick(pokemon);
                  navigate(`/pokemon/${pokemon.name}`);
                }}
              >
                <CardMedia>
                  <img
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
                <p>

                  Price: $
                  {priceOfPokemon(pokemon.stats)}
                </p>
                <button
                  className="btn btn-warning my-2 btn-sm"
                  style={{ marginRight: "5px", fontWeight: 500 }}
                >
                  Add to Cart
                </button>
                <button
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
      <Row>
        <Col key="previous" xs={6}>
          <button
            onClick={handlePreviousButton}
            className="btn btn-dark my-2 btn-sm"
          >
            Previous
          </button>
        </Col>
        <Col key="next" xs={6} style={{ textAlign: "right" }}>
          <button
            onClick={handleNextButton}
            className="btn btn-dark my-2 btn-sm"
          >
            Next
          </button>
        </Col>
      </Row>
    </>
  );
}


export default Home;