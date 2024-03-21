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
          handleAddToFavorites
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
    pokemonCart.forEach(pokemon => {
        sum += priceOfPokemon(pokemon.stats);
    });
    setTotalPrice(sum);
  };

  useEffect( () => {
    sumPrices();
  }, [pokemonCart])

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
    <h1>Your Cart</h1>
    <div>
      <Row>
      { pokemonCart.length > 0 ?
        pokemonCart.map((pokemon, index) => {
          return (
            <Col key={pokemon.name} xs={3}>
              <StyledCard
                key={index}>
                <CardMedia>
                  <img
                    src={ pokemon.sprites.other["showdown"].front_default }
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
                  handleRemoveFromCart(pokemon)}}
                  className="btn btn-warning my-2 btn-sm"
                  style={{ marginRight: "5px", fontWeight: 500 }}
                >
                  Remove from Cart
                </button>
                <button
                  onClick={() => {
                    handleAddToFavorites(pokemon)
                  }}
                  className="btn btn-warning my-2 btn-sm"
                  style={{ fontWeight: 500 }}
                >
                  Add to Favorites
                </button>
              </StyledCard>
            </Col>
          );
        })
        :
        <h1>Cart is Empty</h1>
    }
      </Row>
      <Row>
        <Col>
          <h2> Your Total: ${totalPrice} </h2>
          <button
          onClick={() => navigate('/checkout')}
          className="btn btn-dark my-2 btn-sm"
          > Checkout
          </button>
        </Col>
      </Row>
    </div>
</>
  )
}

export default Cart;