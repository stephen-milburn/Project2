import React, { useContext, useState, useEffect } from 'react';
import { DetailsContext } from './DetailsContext.js';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Wave } from "react-animated-text";

const ShinyDetails = () => {
  const { selectedPokemon, 
          capString, 
          priceOfPokemon, 
          returnToShinyMarket, 
          selectedUrl, 
          handleAddToCarttotal,
          setSelectedImage,
          selectedImage } = useContext(DetailsContext);
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
    setSelectedImage(selectedPokemon.sprites.other["showdown"].front_shiny)
  }, [])

const Wave1 = () => (
  <div style={{ fontFamily: "Pokemon Solid", color: "#ffc107", fontSize:"50px"}}>
    <Wave
      text={capString(selectedPokemon.name)}
      effect="fadeOut"
      effectChange={6.0}
    />

    <div></div>
  </div>
);

  return (
    <>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />

      <button
        className="pokemon-button btn btn-dark mt-4"
        style={{ float: "Left", marginLeft:'10px' }}
        onClick={returnToShinyMarket}
      >
        Back to Shiny Pokémon Black Market
      </button>
      <Row style={{ marginTop: "30px"}}>
        <Col xs={5} style={{textAlign: 'center'}}>
          <Wave1 />
          <h4>${priceOfPokemon(selectedPokemon.stats) * 1000}</h4>
          <h6> Height: {selectedPokemon.height / 10} m | Weight: {selectedPokemon.weight} kg</h6>
          <h6>
            {`Type: ${selectedPokemon.types
              .map((pokeType) => capString(pokeType.type.name))
              .join(" / ")}`}
          </h6>
        </Col>
        <Col xs={5} style={{ marginTop: "80px" }}>
          <CardMedia style={{ width: "100%", marginLeft: '55px'}}>
            <img
              height="155px"
              src={selectedImage}
              alt={`${selectedPokemon.name} front`}
            />
          </CardMedia>
        </Col>
        <Col item xs={2} style={{marginTop:'40px'}}>  
          <Card style={{marginBottom:'80px'}} onClick={() => setSelectedImage(selectedPokemon.sprites.other["showdown"].front_shiny)}>
            <CardMedia style={{ width: "100%", marginLeft: '40px'}}>
              <img
                // height="155px"
                src={selectedPokemon.sprites.other["showdown"].front_shiny}
                alt={`${selectedPokemon.name} back`}
              />
            </CardMedia>
          </Card>  
          <Card style={{}} onClick={() => setSelectedImage(selectedPokemon.sprites.other["showdown"].back_shiny)}>
            <CardMedia style={{ width: "100%", marginLeft: '40px'}}>
              <img
                // height="155px"
                src={selectedPokemon.sprites.other["showdown"].back_shiny}
                alt={`${selectedPokemon.name} back`}
              />
            </CardMedia>
          </Card>
        </Col>
      </Row>
      <Row>
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

export default ShinyDetails;