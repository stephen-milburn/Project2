import React, { useState, useEffect, useContext } from 'react';
import { DetailsContext } from './DetailsContext.js';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchPage = () => {
    const { searchInput, 
            searchedUrl, 
            capString, 
            priceOfPokemon, 
            returnToMarket,
            setSelectedImage } = useContext(DetailsContext)
    const navigate = useNavigate();
    const [ searchPoke, setSearchPoke ] = useState(() => {
      const savedInfo = localStorage.getItem('searchPoke');
      return savedInfo ? JSON.parse(savedInfo) : {};
    })
// conditionally render load screen if no searchPoke
    useEffect(() => {
        const fetchSearchedPokemon = async () => {
            try {
                let response = await fetch(searchedUrl);
                let data = await response.json();
                setSearchPoke(data);
                localStorage.setItem('searchPoke', JSON.stringify(data));
            }
            catch (error) { 
                console.error(error);
            }
        }
        fetchSearchedPokemon();
    }, [searchedUrl]);

    useEffect( () => {
        console.log("Searched URL", searchedUrl)
        const savedPokeData = localStorage.getItem('searchPoke')
        if (savedPokeData) setSearchPoke(JSON.parse(savedPokeData))
    }, [])

    return (
      <>
        <link
          href="https://fonts.cdnfonts.com/css/pokemon-solid"
          rel="stylesheet"
        />
        <button
          className="pokemon-button btn btn-dark mt-4"
          style={{ float: "Left", marginLeft: "10px" }}
          onClick={returnToMarket}
        >
          Back to Pokémon Black Market
        </button>
        
        <Row className={searchPoke.types[0].type.name}>
            <Col xs={5} style={{textAlign: 'center'}}>
                <h1 style={{ fontFamily: "Pokemon Solid", marginTop: "70px" }}>
                {" "}
                {capString(searchPoke.name)}{" "}
                </h1>

                <p>Price: ${priceOfPokemon(searchPoke.stats)}</p>

                <h6> Height: {searchPoke.height} m</h6>
                <h6> Weight: {searchPoke.weight} kg</h6>
                <h6>{`Type: ${searchPoke.types
                .map((pokeType) => capString(pokeType.type.name))
                            .join(" / ")}`}</h6>
            </Col>
            <Col xs={5} style={{ marginTop: "90px" }}>
                <CardMedia style={{ width: "100%", marginLeft: "65px" }}>
                    {console.log("Search Input", searchInput)}
                    <img
                    height="155px"
                    src={searchPoke.sprites.other["showdown"].front_default}
                    alt={searchPoke.name}
                    />
                </CardMedia>
            </Col>
            <Col item xs={2} style={{ marginTop: "40px" }}>
                <Card
                style={{ marginBottom: "80px" }}
                onClick={() =>
                    setSelectedImage(
                        searchPoke.sprites.other["showdown"].front_default
                    )
                }
                >
                <CardMedia style={{ width: "100%", marginLeft: "40px" }}>
                    <img
                    src={searchPoke.sprites.other["showdown"].front_default}
                    alt={`${searchPoke.name} back`}
                    />
                </CardMedia>
                </Card>
                <Card
                style={{}}
                onClick={() =>
                    setSelectedImage(
                        searchPoke.sprites.other["showdown"].back_default
                    )
                }
                >
                <CardMedia style={{ width: "100%", marginLeft: "40px" }}>
                    <img
                    src={searchPoke.sprites.other["showdown"].back_default}
                    alt={`${searchPoke.name} back`}
                    />
                </CardMedia>
                </Card>
            </Col>
        </Row>
        <Row style={{marginTop:'35px'}}>
            <Col xs={12}>
                <h5 style={{ marginLeft: "15px" }}>
                {capString(searchPoke.name)}'s moves:
                </h5>
                <Card style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
                    {searchPoke.moves.map((pokemonMoves, index) => {
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
      </>
    );
}

export default SearchPage;