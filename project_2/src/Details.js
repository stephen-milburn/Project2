import React, { useContext, useState, useEffect } from 'react';
import { DetailsContext } from './DetailsContext.js';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const { selectedPokemon, capString, priceOfPokemon, returnToMarket, selectedUrl, handleAddToCarttotal } = useContext(DetailsContext);
  // const [ selectedPoke, setSelectedPoke ] = useState(() => {
  //   const savedInfo = localStorage.getItem('selectedPoke');
  //   return savedInfo ? JSON.parse(savedInfo) : {};
  // })

  useEffect(() => {
    const fetchSelectedPokemon = async () => {
        let response = await fetch(selectedUrl);
        let data = await response.json();
        console.log(data);
        // localStorage.setItem('selectedPokemon', JSON.stringify(data));
    }
    fetchSelectedPokemon();
  }, [selectedUrl]);

  useEffect( () => {
    console.log("Selected URL", selectedUrl)
    // const savedPokeData = localStorage.getItem('selectedPokemon')
    // if (savedPokeData) setSelectedPokemon(JSON.parse(savedPokeData))
  }, [])

  return (
    <>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />
      <button
        className="pokemon-button btn btn-dark mt-4"
        style={{ float: "right", marginRight:'10px' }}
        onClick={returnToMarket}
      >
        Back to Pokémon Black Market
      </button>
      <Row style={{ marginTop: "30px"}}>
        <Col xs={6} style={{ marginTop: "90px" }}>
          <CardMedia style={{ width: "100%", marginLeft: '65px'  }}>
            <img
              height="155px"
              src={selectedPokemon.sprites.other["showdown"].front_default}
              alt={selectedPokemon.name}
            />
          </CardMedia>
        </Col>
        <Col xs={6}>
          <h1 style={{ fontFamily: "Pokemon Solid", marginTop:'70px' }}>
            {" "}
            {capString(selectedPokemon.name)}{" "}
          </h1>
          <p>Price: ${priceOfPokemon(selectedPokemon.stats)}</p>
          <h6> Height: {selectedPokemon.height} m</h6>
          <h6> Weight: {selectedPokemon.weight} kg</h6>
          <h6>
            {`Type: ${selectedPokemon.types
              .map((pokeType) => capString(pokeType.type.name))
              .join(" / ")}`
            }
          </h6>
        </Col>
      </Row>
      <Row style={{marginTop:'35px'}}>
        <Col xs={12}>

          <h5 style={{marginLeft:'15px'}}>{capString(selectedPokemon.name)}'s moves:</h5>
          <ul
            style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}
          >
            {selectedPokemon.moves.map((pokemonMoves, index) => {
              return <li key={index}>{pokemonMoves.move.name}</li>;
            })}
          </ul>
        </Col>
      </Row>
    </>
  );
}

export default Details;