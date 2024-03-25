import React, { useState, useContext, useEffect } from 'react';
import { DetailsContext } from './DetailsContext.js';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Cart = () => {

  const { selectedPokemon,
          capString,
          priceOfPokemon,
          returnToMarket,
          pokemonCart,
          setPokemonCart,
          handlePokemonClick,
          handleRemoveFromCart,
          handleAddToFavorites,
          shinyPokemonCart,
          setShinyPokemonCart,
          handleShinyRemoveFromCart,
          getColorForType,
          purchasedPokemon,
          setPurchasedPokemon
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

  const [ totalPrice, setTotalPrice ] = useState(0)
  const sumPrices = () => {
    let sum = 0;
    if (pokemonCart.length > 0) pokemonCart.forEach(pokemon => sum += priceOfPokemon(pokemon.stats));
    if (shinyPokemonCart.length > 0) shinyPokemonCart.forEach(pokemon => sum += (priceOfPokemon(pokemon.stats) * 1000));
    setTotalPrice(sum);
  };

  useEffect( () => {
    sumPrices();
    // localStorage.setItem('pokemonCart', JSON.stringify(pokemonCart));
    // localStorage.setItem('shinyPokemonCart', JSON.stringify(shinyPokemonCart));
  }, [pokemonCart, shinyPokemonCart])

  // const checkout = () => {
  //   console.log('test checkout');
  //   navigate('/checkout')
  // }

  return (
    <>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />
      <h1
        style={{ marginLeft: "20px", marginTop: "20px", textAlign: "center" }}
      >
        Your Cart
      </h1>
      <div>
        <Row style={{ marginLeft: "10px" }}>
          {pokemonCart.length > 0 || shinyPokemonCart.length > 0 ? (
            <>
              {pokemonCart.map((pokemon, index) => {
                return (
                  <Col
                    style={{ textAlign: "center" }}
                    key={pokemon.name}
                    xs={3}
                  >
                    <StyledCard
                      key={index}
                      style={{
                        backgroundColor: getColorForType(
                          pokemon.types[0].type.name
                        ),
                      }}
                    >
                      <CardMedia>
                        <img
                          src={
                            pokemon.sprites.other["official-artwork"]
                              .front_default
                          }
                          alt={pokemon.name}
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
                      <h4>${priceOfPokemon(pokemon.stats)}</h4>
                      <button
                        onClick={() => {
                          handleRemoveFromCart(pokemon);
                        }}
                        className="btn btn-dark my-2 btn-sm"
                        style={{ marginRight: "5px", fontWeight: 500 }}
                      >
                        Remove from Cart
                      </button>
                      <button
                        onClick={() => {
                          handleAddToFavorites(pokemon);
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
              {shinyPokemonCart.map((pokemon, index) => {
                return (
                  <Col
                    key={pokemon.name}
                    xs={3}
                    style={{ textAlign: "center" }}
                  >
                    <StyledCard
                      key={index}
                      style={{
                        backgroundColor: getColorForType(
                          pokemon.types[0].type.name
                        ),
                      }}
                    >
                      <CardMedia>
                        <img
                          src={
                            pokemon.sprites.other["official-artwork"]
                              .front_shiny
                          }
                          alt={pokemon.name}
                          style={{ width: "auto", height: "200px" }}
                          onClick={() => {
                            handlePokemonClick(pokemon);
                            navigate(`/pokemon/shiny/:name${pokemon.name}`);
                          }}
                        />
                      </CardMedia>
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
                      <h4>${priceOfPokemon(pokemon.stats) * 1000}</h4>
                      <button
                        onClick={() => {
                          handleShinyRemoveFromCart(pokemon);
                        }}
                        className="btn btn-dark my-2 btn-sm"
                        style={{ marginRight: "5px", fontWeight: 500 }}
                      >
                        Remove from Cart
                      </button>
                      <button
                        onClick={() => {
                          handleAddToFavorites(pokemon);
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
            </>
          ) : (
            <div>
              <h1 style={{ textAlign: "center" }}>Cart is Empty</h1>
              <svg
                style={{ marginLeft:'49%' }}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-emoji-frown"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
              </svg>
            </div>
          )}
        </Row>
        <Row>
          <Col>
            <h2
              style={{
                marginLeft: "20px",
                marginTop: "20px",
                textAlign: "center",
              }}
            >
              {" "}
              Your Total: ${totalPrice}{" "}
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{ marginLeft: "25px" }}
                onClick={() => {
                  let cart = [];
                  cart.push(...pokemonCart, ...shinyPokemonCart);
                  setPurchasedPokemon(cart);
                  console.log("Purchased:", cart);
                  setPokemonCart([]);
                  setShinyPokemonCart([]);
                  navigate("/checkout");
                }}
                className="btn btn-dark my-2 btn-lg"
              >
                Checkout
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Cart;