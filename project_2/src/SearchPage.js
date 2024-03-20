import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { DetailsContext } from './DetailsContext.js';
import { useNavigate } from 'react-router-dom';
import App from './App';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const SearchPage = () => {
    const { searchInput, searchedUrl, capString, priceOfPokemon } = useContext(DetailsContext)
    const navigate = useNavigate();
    const [ searchPoke, setSearchPoke ] = useState(() => {
      const savedInfo = localStorage.getItem('searchPoke');
      return savedInfo ? JSON.parse(savedInfo) : {};
    })

    useEffect(() => {
        const fetchSearchedPokemon = async () => {
            let response = await fetch(searchedUrl);
            let data = await response.json();
            setSearchPoke(data);
            // localStorage.setItem('searchPoke', JSON.stringify(data))
            localStorage.setItem('searchPoke', JSON.stringify(data));
        }
        fetchSearchedPokemon();
    }, [searchedUrl]);

    useEffect( () => {
        console.log("Searched URL", searchedUrl)
        const savedPokeData = localStorage.getItem('searchPoke')
        if (savedPokeData) setSearchPoke(JSON.parse(savedPokeData))
    }, [])

    const returnToMarket = () => {
        navigate('/');
    }

    return (
        <>
            <button className="pokemon-button" onClick={returnToMarket}>Back to Pokémon Black Market</button>
            <Row>
                <Card>
                    <Col xs={4}>
                        <CardMedia style={{ width: "100%" }}>
                            {console.log("Search Input", searchInput)}
                            <img src={searchPoke.sprites.other["official-artwork"].front_default} alt={searchPoke.name} />
                        </CardMedia>
                    </Col>
                    <Col xs={8}>
                        <h1> {searchPoke.name} </h1>
                        <h2>
                        <p>
                            Price: $
                            {priceOfPokemon(searchPoke.stats)}
                            </p>
                        </h2>
                        <h2> Height: {searchPoke.height} m</h2>
                        <h2> Weight: {searchPoke.weight} kg</h2>
                        <Col xs={4}> {searchPoke.name}'s moves:
                            <ul>
                                {searchPoke.moves.map((pokemonMoves, index) => {
                                return (
                                    <li key={index}>{pokemonMoves.move.name}</li>
                                )
                                })}
                            </ul>
                        </Col>
                            <p>{`Type: ${searchPoke.types.map(pokeType => capString(pokeType.type.name)).join(" / ")}`}</p>
                    </Col>
                </Card>
            </Row>
        </>
      )
}

export default SearchPage;