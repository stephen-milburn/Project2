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
          selectedImage,
          moveDetails,
          setMoveDetails,
          getColorForType,
          handleShinyAddToCart,
          handleShinyAddToFavorites } = useContext(DetailsContext);
  // const [ selectedPoke, setSelectedPoke ] = useState(() => {
  //   const savedInfo = localStorage.getItem('selectedPoke');
  //   return savedInfo ? JSON.parse(savedInfo) : {};
  // })

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSelectedPokemon = async () => {
        let response = await fetch(selectedUrl);
        let data = await response.json();
        console.log(data);
        localStorage.setItem('selectedPokemon', JSON.stringify(data));
    }
    fetchSelectedPokemon();
  }, [selectedUrl]);

  useEffect( () => {
    console.log("Selected URL", selectedUrl)
    // const savedPokeData = localStorage.getItem('selectedPokemon')
    // if (savedPokeData) setSelectedPokemon(JSON.parse(savedPokeData))
    setSelectedImage(selectedPokemon.sprites.other["showdown"].front_shiny)
  }, [])

  useEffect(() => {
    const fetchMoveDetails = async() => {
      const allMoveDetails = [];
      await Promise.all(selectedPokemon.moves.map(async pokemonMove => {
        const response = await fetch(pokemonMove.move.url)
        const moveData = await response.json()
        const moveDetail = {
          name: capString(pokemonMove.move.name),
          type: moveData.type.name,
          damageClass: moveData.damage_class.name
        }
        allMoveDetails.push(moveDetail)
      }))
      // console.log('moveDetails:', allMoveDetails)
      setMoveDetails(allMoveDetails)
    }
    fetchMoveDetails();
  }, [selectedPokemon.moves])

const Wave1 = () => (
  <div
    style={{
      marginTop: "110px",
      fontFamily: "Pokemon Solid",
      color: "#ffc107",
      fontSize: "50px",
      textShadow:
        "2px 0 #000000, -2px 0 #000000, 0 2px #000000, 0 -2px #000000,1px 1px #000000, -1px -1px #000000, 1px -1px #000000, -1px 1px #000000",
    }}
  >
    <Wave
      text={capString(selectedPokemon.name)}
      effect="fadeOut"
      effectChange={6.0}
    />

    <div></div>
  </div>
);

  return (
    <div style={{backgroundColor: getColorForType(selectedPokemon.types[0].type.name)}}>
      <link
        href="https://fonts.cdnfonts.com/css/pokemon-solid"
        rel="stylesheet"
      />
      <button
        className="pokemon-button btn btn-dark"
        style={{ float: "Left" }}
        onClick={returnToShinyMarket}
      >
        Back to Shiny Pokémon Black Market
      </button>
      <Row className={selectedPokemon.types[0].type.name}>
        <Col xs={4} style={{textAlign: 'center'}}>
          <Wave1 />
          <h4>${priceOfPokemon(selectedPokemon.stats) * 1000}</h4>
          <h6>Height: {selectedPokemon.height / 10} m | Weight: {selectedPokemon.weight / 10} kg</h6>
          <h6>Type: {selectedPokemon.types.map(pokeType => capString(pokeType.type.name)).join(" / ")}</h6>
          <button className="btn btn-dark my-2 btn-sm"
                  style={{ marginRight: "5px", fontWeight: 500 }}
                  onClick={() => {
                  navigate(`/pokemon/${selectedPokemon.name}`);
          }}>
            Normal Poké 🥱
           </button> 
          <button
            onClick={() => {
              handleShinyAddToCart(selectedPokemon);
              console.log("clicked on Add to Cart");
            }}
            className="btn btn-dark my-2 btn-sm"
            style={{ marginRight: "5px", fontWeight: 500 }}
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              handleShinyAddToFavorites(selectedPokemon);
            }}
            className="btn btn-dark my-2 btn-sm"
            style={{ fontWeight: 500 }}
          >
            Add to Favorites
          </button>
        </Col>
        <Col xs={4}>
          <CardMedia style={{ width: "300px", height: "300px", marginLeft: "55px" }}>
            <img
              height="155px"
              src={selectedImage}
              alt={`{selectedPokemon.name} front`}
              style={{ width: "300px", height: "300px", objectFit: "contain" }}            />
          </CardMedia>
        </Col>
        <Col xs={4} style={{ marginTop: "40px", background: getColorForType(selectedPokemon.types[0].type.name)}}>
          <Card style={{ marginBottom: "50px", width: '100px', height: '100px', background: getColorForType(selectedPokemon.types[0].type.name)}}
                onClick={() => setSelectedImage(selectedPokemon.sprites.other["showdown"].front_shiny)}
          >
            <CardMedia style={{border: "1px solid black"}}>
              <img
                src={selectedPokemon.sprites.other["showdown"].front_shiny}
                alt={`${selectedPokemon.name} back`}
                style={{ width: "100px", height: "100px", objectFit: "contain" }}              />
            </CardMedia>
          </Card>
          <Card
            onClick={() => setSelectedImage(selectedPokemon.sprites.other["showdown"].back_shiny)}
            style={{width: '100px', height: '100px', background: getColorForType(selectedPokemon.types[0].type.name)}}
          >
            <CardMedia style={{border: "1px solid black"}}>
              <img
                src={selectedPokemon.sprites.other["showdown"].back_shiny}
                alt={`${selectedPokemon.name} back`}
                style={{ width: "100px", height: "100px", objectFit: "contain" }}
              />
            </CardMedia>
          </Card>
        </Col>
      </Row>
      <Row className={selectedPokemon.types[0].type.name}
           style={{ marginTop: "35px" }}
      >
        <Col xs={12} style={{textAlign: 'center'}}>
          <h4 style={{ marginLeft: "15px" }}>{capString(selectedPokemon.name)}'s Moveset:</h4>
          {
            moveDetails.length > 0 ?
            <Row>
                  <Col xs={4} className='physical' style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h5>Physical Moves</h5>
                    {moveDetails.map((pokemonMove, index) => (
                    <>
                      {
                        pokemonMove.damageClass == 'physical' ?
                          <Card style={{ textAlign: "center", background: getColorForType(pokemonMove.type), width: "200px", height: "30px", border: "1px solid black" }}
                                key={index}
                          >
                            {pokemonMove.name}
                          </Card>
                          :
                          <></>
                      }
                    </>
                    ))}
                  </Col>
                  <Col xs={4} className='special' style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h5>Special Moves</h5>
                    {moveDetails.map((pokemonMove, index) => (
                    <>
                      {
                        pokemonMove.damageClass == 'special' ?
                        <Card style={{ textAlign: "center", background: getColorForType(pokemonMove.type), width: "200px", height: "30px", border: "1px solid black" }}
                                key={index}
                          >
                            {pokemonMove.name}
                          </Card>
                          :
                          <></>
                      }
                    </>
                    ))}
                  </Col>
                  <Col xs={4} className='status' style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h5>Status Moves</h5>
                    {moveDetails.map((pokemonMove, index) => (
                    <>
                      {
                        pokemonMove.damageClass == 'status' ?
                        <Card style={{ textAlign: "center", background: getColorForType(pokemonMove.type), width: "200px", height: "30px", border: "1px solid black" }}
                                key={index}
                          >
                            {pokemonMove.name}
                          </Card>
                          :
                          <></>
                      }
                    </>
                    ))}
                  </Col>
            </Row> :
          <>LOADING MOVESET</>
          }
        </Col>
      </Row>
    </div>
  );
}

export default ShinyDetails;