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
              <StyledCard key={index}>
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
                <h3 style={{ fontFamily: "Pokemon Solid" }}>
                  {capString(pokemon.name)}
                </h3>
                <p>Price: ${priceOfPokemon(pokemon.stats) * 1000}</p>
                {/* <p>Price: More than yo broke ahh can afford.</p> */}
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
                    handleAddToFavorites(pokemon);
                  }}
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


export default ShinyHome;