import React, { useContext } from 'react';
import { DetailsContext } from './DetailsContext.js';
import styled from '@emotion/styled';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
// import { Wave } from "react-animated-text";

const ShinyHome = () => {
    const { pokemonData,
            handleNextButton,
            handlePreviousButton,
            capString,
            handlePokemonClick,
            priceOfPokemon,
            setSelectedUrl,
            handleAddToCart,
            handleAddToFavorites,
            pokemonCart,
            shinyPokemon,
            handleShinyAddToCart,
            handleShinyAddToFavorites,
            getColorForType } = useContext(DetailsContext);

    const navigate = useNavigate();

    const StyledCard = styled(Card)({
        margin: "10px",
        backgroundColor: 'lightgrey',
        padding: "10px",
        border: '1px solid black',
        width: "250px",
        height: "400px"
    });
// const Wave2 = () => (
//   <div
//     style={{
//       fontFamily: "Pokemon Solid",
//       color: "#ffc107",
//       fontSize: "20px",
//     }}
//   >
//     <Wave text={capString(pokemon.name)} effect="fadeOut" effectChange={5.0} />
//   </div>
// );

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
                style={{
                  backgroundColor: getColorForType(pokemon.types[0].type.name),
                }}
              >
                <CardMedia>
                  <img
                    key={index}
                    onClick={async () => {
                      handlePokemonClick(pokemon);
                      await setSelectedUrl(
                        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                      );
                      navigate(`/pokemon/shiny/${pokemon.name}`);
                    }}
                    src={pokemon.sprites.other["official-artwork"].front_shiny}
                    alt={pokemon.name}
                    style={{ width: "100%" }}
                  />
                </CardMedia>
                {/* <Wave2/> */}
                <h3
                  style={{
                    fontFamily: "Pokemon Solid",
                    color: "#FFBF00",
                    textShadow:
                      "2px 0 #000000, -2px 0 #000000, 0 2px #000000, 0 -2px #000000,1px 1px #000000, -1px -1px #000000, 1px -1px #000000, -1px 1px #000000",
                  }}
                >
                  {capString(pokemon.name)}
                </h3>
                <h4 style={{ textAlign: "center" }}>
                  ${priceOfPokemon(pokemon.stats) * 1000}
                </h4>
                <button
                  onClick={() => {
                    handleShinyAddToCart(pokemon);
                    console.log("clicked on Add to Cart");
                  }}
                  className="btn btn-dark my-2 btn-sm"
                  style={{ marginRight: "5px", fontWeight: 500 }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    handleShinyAddToFavorites(pokemon);
                  }}
                  className="btn btn-dark my-2 btn-sm"
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


export default ShinyHome;