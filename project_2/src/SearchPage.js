import React, { useState, useEffect, useContext } from 'react';
import { DetailsContext } from './DetailsContext.js';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Type.css'

const SearchPage = () => {
    const { searchInput, 
            searchedUrl, 
            capString, 
            priceOfPokemon, 
            returnToMarket,
            setSelectedImage,
            moveDetails,
            setMoveDetails,
            selectedImage,
            getColorForType } = useContext(DetailsContext)
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
                setSelectedImage(searchPoke.sprites.other["showdown"].front_default)
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

    useEffect(() => {
        const fetchMoveDetails = async() => {
          const allMoveDetails = [];
          await Promise.all(searchPoke.moves.map(async pokemonMove => {
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
      }, [searchPoke.moves])

    return (
      <div className={searchPoke.types[0].type.name}>
            <link
                href="https://fonts.cdnfonts.com/css/pokemon-solid"
                rel="stylesheet"
            />
            <button
                className="pokemon-button btn btn-dark"
                style={{ float: "Left"}}
                onClick={returnToMarket}
            >
                Back to Pokémon Black Market
            </button>
            
            <Row className={searchPoke.types[0].type.name}>
                <Col xs={4} style={{ textAlign: "center" }}>
                    <h1 style={{ fontFamily: "Pokemon Solid", marginTop: "110px" }}>{capString(searchPoke.name)}</h1>
                    <h4>${priceOfPokemon(searchPoke.stats)}</h4>
                    <h6>Height: {searchPoke.height / 10} m | Weight: {searchPoke.weight / 10} kg</h6>
                    <h6>Type: {searchPoke.types.map(pokeType => capString(pokeType.type.name)).join(" / ")}</h6>
                </Col>
                <Col xs={4}>
                    <CardMedia style={{ width: "300px", height: "300px", marginLeft: "55px" }}>
                        <img
                        height="155px"
                        src={selectedImage}
                        alt={`{searchPoke.name} front`}
                        style={{ width: "300px", height: "300px", objectFit: "contain" }}            />
                    </CardMedia>
                </Col>
                <Col xs={4} style={{ marginTop: "40px", background: getColorForType(searchPoke.types[0].type.name)}}>
                    <Card style={{ marginBottom: "50px", width: '100px', height: '100px', background: getColorForType(searchPoke.types[0].type.name)}}
                            onClick={() => setSelectedImage(searchPoke.sprites.other["showdown"].front_default)}
                    >
                        <CardMedia style={{border: "1px solid black"}}>
                            <img
                                src={searchPoke.sprites.other["showdown"].front_default}
                                alt={`${searchPoke.name} back`}
                                style={{ width: "100px", height: "100px", objectFit: "contain" }}              
                            />
                        </CardMedia>
                    </Card>
                    <Card
                        onClick={() => setSelectedImage(searchPoke.sprites.other["showdown"].back_default)}
                        style={{width: '100px', height: '100px', background: getColorForType(searchPoke.types[0].type.name)}}
                    >
                        <CardMedia style={{border: "1px solid black"}}>
                            <img
                                src={searchPoke.sprites.other["showdown"].back_default}
                                alt={`${searchPoke.name} back`}
                                style={{ width: "100px", height: "100px", objectFit: "contain" }}
                            />
                        </CardMedia>
                    </Card>
                </Col>
            </Row>
            <Row className={searchPoke.types[0].type.name}
                style={{ marginTop: "35px" }}
            >
                <Col xs={12} style={{textAlign: 'center'}}>
                    <h4 style={{ marginLeft: "15px" }}>{capString(searchPoke.name)}'s Moveset:</h4>
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

export default SearchPage;