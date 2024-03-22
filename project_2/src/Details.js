import React, { useContext, useState, useEffect } from 'react';
import { DetailsContext } from './DetailsContext.js';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Type.css'
import { useNavigate } from 'react-router-dom';


const Details = () => {

  // const TYPES = [
  //   "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying",
  //   "ghost", "grass", "ground", "ice", "normal", "poison", "psychic",
  //   "rock", "steel", "water"
  // ];

  // const typeButtons = () => {
  //   return TYPES.map(type => (
  //       <button className={`type-button ${type}`} onClick={() => handleFilterByType(type)}>
  //           {capString(type)}
  //       </button>
  //   ))
  // }

  const { selectedPokemon, 
          capString, 
          priceOfPokemon, 
          returnToMarket, 
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
        setSelectedImage(selectedPokemon.sprites.other["showdown"].front_default)
    }
    fetchSelectedPokemon();
  }, [selectedUrl]);

  useEffect( () => {
    console.log("Selected URL", selectedUrl)
    // const savedPokeData = localStorage.getItem('selectedPokemon')
    // if (savedPokeData) setSelectedPokemon(JSON.parse(savedPokeData))
  }, [])

  return (
    <div className={selectedPokemon.types[0].type.name}>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />
      <button
        className="pokemon-button btn btn-dark "
        style={{ float: "left", marginLeft: "10px" }}
        onClick={returnToMarket}
      >
        Back to Pokémon Black Market
      </button>
      <Row
        className={selectedPokemon.types[0].type.name}
        
      >
        <Col xs={5} style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "Pokemon Solid", marginTop: "70px" }}>
            {" "}
            {capString(selectedPokemon.name)}{" "}
          </h1>
          <h4>${priceOfPokemon(selectedPokemon.stats)}</h4>
          <h6>
            {" "}
            Height: {selectedPokemon.height / 10} m | Weight:{" "}
            {selectedPokemon.weight} kg
          </h6>
          <h6>
            {`Type: ${selectedPokemon.types
              .map((pokeType) => capString(pokeType.type.name))
              .join(" / ")}`}
          </h6>
        </Col>
        <Col xs={5} style={{ marginTop: "90px" }}>
          <CardMedia style={{ width: "100%", marginLeft: "55px" }}>
            <img
              height="155px"
              src={selectedImage}
              alt={`{selectedPokemon.name} front`}
            />
          </CardMedia>
        </Col>
        <Col item xs={2} style={{ marginTop: "40px" }}>
          <Card
            style={{ marginBottom: "80px" }}
            onClick={() =>
              setSelectedImage(
                selectedPokemon.sprites.other["showdown"].front_default
              )
            }
          >
            <CardMedia style={{ width: "100%", marginLeft: "40px" }}>
              <img
                src={selectedPokemon.sprites.other["showdown"].front_default}
                alt={`${selectedPokemon.name} back`}
              />
            </CardMedia>
          </Card>
          <Card
            style={{}}
            onClick={() =>
              setSelectedImage(
                selectedPokemon.sprites.other["showdown"].back_default
              )
            }
          >
            <CardMedia style={{ width: "100%", marginLeft: "40px" }}>
              <img
                src={selectedPokemon.sprites.other["showdown"].back_default}
                alt={`${selectedPokemon.name} back`}
              />
            </CardMedia>
          </Card>
        </Col>
      </Row>
      <Row
        className={selectedPokemon.types[0].type.name}
        style={{ marginTop: "35px" }}
      >
        <Col xs={12}>
          <h5 style={{ marginLeft: "15px" }}>
            {capString(selectedPokemon.name)}'s moves:
          </h5>
          <Card
            
            style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}
          >
            {selectedPokemon.moves.map((pokemonMoves, index) => {
              return (
                <Card style={{ textAlign: "center" }}
                      key={index}
                >
                  {capString(pokemonMoves.move.name)}
                </Card>
              );
            })}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Details;