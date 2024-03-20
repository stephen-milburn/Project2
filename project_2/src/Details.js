import React, { useContext } from 'react';
import { DetailsContext } from './DetailsContext.js';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'

const Details = () => {
  const { selectedPokemon, capString, priceOfPokemon } = useContext(DetailsContext);
  const navigate = useNavigate();

    const returnToMarket = () => {
        navigate('/');
    }

  return (
    <>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />
       <button className="pokemon-button" onClick={returnToMarket}>Back to Pokémon Black Market</button>
      <Row>
        <Card>
          <Col xs={4}>
            <CardMedia style={{ width: "100%" }}>
              <img
                src={
                  selectedPokemon.sprites.other["official-artwork"]
                    .front_default
                }
                alt={selectedPokemon.name}
              />
            </CardMedia>
          </Col>
          <Col xs={8}>
            <h1 style={{ fontFamily: "Pokemon Solid" }}> {capString(selectedPokemon.name)} </h1>
            <h2>
              <p>

                Price: $
                {priceOfPokemon(selectedPokemon.stats)}
              </p>
            </h2>
            <h2> Height: {selectedPokemon.height} m</h2>
            <h2> Weight: {selectedPokemon.weight} kg</h2>
            <Col xs={4}>
              {" "}
              {selectedPokemon.name}'s moves:
              <ul>
                {selectedPokemon.moves.map((pokemonMoves, index) => {
                  return <li key={index}>{pokemonMoves.move.name}</li>;
                })}
              </ul>
            </Col>
            <h2> {`Type: ${selectedPokemon.types.map(pokeType => capString(pokeType.type.name)).join(" / ")}`} </h2>
          </Col>
        </Card>
      </Row>
    </>
  );
}

export default Details;