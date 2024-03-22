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
          handleShinyRemoveFromCart,
          getColorForType
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
    <h1 style={{marginLeft:"20px", marginTop:'20px'}}>Your Cart</h1>
    <div>
      <Row style={{marginLeft:'10px'}}>
      {pokemonCart.length > 0 || shinyPokemonCart.length > 0 ? (
      <>
          {pokemonCart.map((pokemon, index) => {
            return (
              <Col style={{textAlign: 'center'}} key={pokemon.name} xs={3}>
                <StyledCard
                  key={index} style={{backgroundColor: getColorForType(pokemon.types[0].type.name)}}>
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
                  <h4>
                    ${ priceOfPokemon(pokemon.stats)}
                  </h4>
                  <button
                  onClick={() => {
                    handleRemoveFromCart(pokemon)}}
                    className="btn btn-dark my-2 btn-sm"
                    style={{ marginRight: "5px", fontWeight: 500 }}
                  >
                    Remove from Cart
                  </button>
                  <button
                    onClick={() => {
                      handleAddToFavorites(pokemon)
                    }}
                    className="btn btn-dark my-2 btn-sm"
                    style={{ fontWeight: 500 }}
                  >
                    Add to Favorites
                  </button>
                </StyledCard>
              </Col>
        )})
      }
            {shinyPokemonCart.map((pokemon, index) => {
              return (
                <Col key={pokemon.name} xs={3} style={{ textAlign: "center" }}>
                  <StyledCard key={index} style={{backgroundColor: getColorForType(pokemon.types[0].type.name)}}>
                    <CardMedia>
                      <img
                        src={
                          pokemon.sprites.other["official-artwork"].front_shiny
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
      )
        : (
        <div>
          <h1 style={{marginLeft:'35%'}}>Cart is Empty</h1>
        </div>
      )}
      </Row>
      <Row>
        <Col>
          <h2 style={{marginLeft:"20px", marginTop:'20px'}}> Your Total: ${totalPrice} </h2>
            <button
              style={{marginLeft:'25px'}}
          onClick={() => navigate('/checkout')}
          className="btn btn-dark my-2 btn-lg"
          > Checkout
          </button>
        </Col>
      </Row>
    </div>
</>
  )
}

export default Cart;