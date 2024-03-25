import React, { useContext } from 'react';
import { DetailsContext } from './DetailsContext.js';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Checkout = () => {

  const {
    capString,
    returnToMarket,
    pokemonCart,
    purchasedPokemon
   } = useContext(DetailsContext);

  const navigate = useNavigate();

  const StyledRow = styled(Row)({
    margin: "10px",
    backgroundStyledColor: 'lightgrey',
    padding: "10px",
    border: '1px solid black',
  });

  const StyledCol = styled(Col)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  })

  const shakeAnimation = `@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px) rotate(-5deg); }
    50% { transform: translateX(5px) rotate(5deg); }
    75% { transform: translateX(-5px) rotate(-5deg); }
    100% { transform: translateX(0); }
  }`;

  const ShakingWrapper = styled.div`
    animation: ${shakeAnimation} 0.5s ease-in-out infinite;
  `;

  const StyledImg = styled.img`
    borderRadius: 10px;
    marginRight: 15px;
    width: 100%;
    height: auto;
    max-width: 300px;
    max-height: 300px;
  `
  
  return (
    <div>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />

      <Row>
        <StyledRow>
          <StyledCol xs={6}>
              <CardMedia>
                <ShakingWrapper>
                  <StyledImg src="photos/JeffKissyKiss.png" alt="Jeff"/>
                </ShakingWrapper>
              </CardMedia>
          </StyledCol>
          <StyledCol xs={6} style={{display: 'flex', flexDirection: 'StyledColumn', justifyContent: 'center', alignItems: 'center'}}>
            <h1> Muah! Thank you for your purchase </h1>
          </StyledCol>
        </StyledRow>

        <StyledRow>
          <StyledCol xs={6}>
            <CardMedia>
              <ShakingWrapper>
                <StyledImg src="photos/JeffShows.png" alt="Jeff2"/>
              </ShakingWrapper>
            </CardMedia>
          </StyledCol>
          <StyledCol xs={6} style={{display: 'flex', flexDirection: 'StyledColumn', justifyContent: 'center', alignItems: 'center'}}>
            <h1> You have purchased: </h1>
            { purchasedPokemon.map((pokemon, index) => {
                return (
                  <h3 style={{ fontFamily: "Pokemon Solid" }}>
                  {capString(pokemon.name)}
                </h3>
                )}
            )}
          </StyledCol>
        </StyledRow>

        <StyledRow>
          <StyledCol xs={6}>
            <CardMedia>
              <StyledImg src="photos/JeffPonders.jpg" alt="Jeff2"/>
              </CardMedia>
          </StyledCol>
          <StyledCol xs={6} style={{display: 'flex', flexDirection: 'StyledColumn', justifyContent: 'center', alignItems: 'center'}}>
            <h1> Remember, I am not responsible for any legal actions </h1>
          </StyledCol>
        </StyledRow>

        <StyledRow>
          <StyledCol xs={6}>
            <CardMedia>
              <StyledImg src="photos/JeffRubsHands.png" alt="Jeff2" />
              </CardMedia>
          </StyledCol>
          <StyledCol xs={6} style={{display: 'flex', flexDirection: 'StyledColumn', justifyContent: 'center', alignItems: 'center'}}>
            <h1> Want to buy more? </h1>
          </StyledCol>
        </StyledRow>

        <StyledRow>
          <StyledCol xs={6}>
            <CardMedia>
              <StyledImg src= "photos/JeffWaves.png" alt="Jeff5"/>
              </CardMedia>
          </StyledCol>
          <StyledCol xs={6} style={{display: 'flex', flexDirection: 'StyledColumn', justifyContent: 'center', alignItems: 'center'}}>
              <h1> Goodbye! </h1>
              <button onClick={returnToMarket}
                      className="btn btn-dark my-2 btn-sm"
              >
                Back to shop
              </button>
          </StyledCol>
        </StyledRow>
      </Row>
    </div>
  )
}

export default Checkout;