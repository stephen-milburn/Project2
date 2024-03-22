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
   } = useContext(DetailsContext);

  const navigate = useNavigate();

  const StyledRow = styled(Row)({
    margin: "10px",
    backgroundColor: 'lightgrey',
    padding: "10px",
    border: '1px solid black',
  });

  const shakeAnimation = `@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px) rotate(-5deg); }
    50% { transform: translateX(5px) rotate(5deg); }
    75% { transform: translateX(-5px) rotate(-5deg); }
    100% { transform: translateX(0); }
  }`;

  const ShakingCardMedia = styled(CardMedia)`
  animation: ${shakeAnimation} 0.5s ease-in-out infinite;
  `
  
  return (
    <div>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />

      <Row>
        <StyledRow>
          <Col xs={8}>
            <CardMedia>
              <ShakingCardMedia>
              <img src="photos/JeffKissyKiss.png" alt="Jeff"
              style={{ borderRadius: '10px',
              marginRight: '15px' }}/>
              </ShakingCardMedia>
            </CardMedia>
          </Col>
          <Col xs={4} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1> Muah! Thank you for your purchase </h1>
          </Col>
        </StyledRow>

        <StyledRow>
          <Col xs={8}>
            <CardMedia>
            <ShakingCardMedia>
              <img src="photos/JeffShows.png" alt="Jeff2"
              style={{ borderRadius: '10px',
              marginRight: '15px' }}/>
              </ShakingCardMedia>
            </CardMedia>
          </Col>
          <Col xs={4} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1> You have purchased: </h1>
            { pokemonCart.map((pokemon, index) => {
                return (
                  <h3 style={{ fontFamily: "Pokemon Solid" }}>
                  {capString(pokemon.name)}
                </h3>
                )}
            )}
          </Col>
        </StyledRow>

        <StyledRow>
          <Col xs={8}>
            <CardMedia>
            <ShakingCardMedia>
              <img src="photos/JeffPonders.jpg" alt="Jeff2"
              style={{ borderRadius: '10px',
              marginRight: '15px' }}/>/
              </ShakingCardMedia>
            </CardMedia>
          </Col>
          <Col xs={4} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1> Remember, I am not responsible for any legal actions </h1>
          </Col>
        </StyledRow>

        <StyledRow>
          <Col xs={8}>
            <CardMedia>
            <ShakingCardMedia>
              <img src="photos/JeffRubsHands.png" alt="Jeff2" 
              style={{ borderRadius: '10px',
              marginRight: '15px' }}/>
              </ShakingCardMedia>
            </CardMedia>
          </Col>
          <Col xs={4} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1> Want to buy more? </h1>
          </Col>
        </StyledRow>

        <StyledRow>
          <Col xs={8}>
            <CardMedia>
            <ShakingCardMedia>
              <img src= "photos/JeffWaves.png" alt="Jeff5" 
              style={{ borderRadius: '10px',
              marginRight: '15px' }}/>
              </ShakingCardMedia>
            </CardMedia>
          </Col>
          <Col xs={4} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <h1> Goodbye! </h1>
              <button onClick={returnToMarket}>
                Back to shop
              </button>
          </Col>
        </StyledRow>
      </Row>
    </div>
  )
}

export default Checkout;