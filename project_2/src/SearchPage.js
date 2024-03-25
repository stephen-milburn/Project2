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
            getColorForType,
            handleAddToCart,
            handleShinyAddToCart,
            handleAddToFavorites,
            handleShinyAddToFavorites } = useContext(DetailsContext)
    const navigate = useNavigate();
    const [ searchMessage, setSearchMessage ] = useState('Shiny Version ✨')

    const [ searchPoke, setSearchPoke ] = useState(() => {
      const savedInfo = localStorage.getItem('searchPoke');
      return savedInfo ? JSON.parse(savedInfo) : {};
    })

    const [mainImage, setMainImage] = useState(() => {
        const savedImage = localStorage.getItem('mainImage')
        return savedImage ? JSON.parse(savedImage) : {};
    })
    const [image1, setImage1] = useState(() => {
        const savedImage = localStorage.getItem('mainImage')
        return savedImage ? JSON.parse(savedImage) : {};
    })
    const [image2, setImage2] = useState(() => {
        const savedImage = localStorage.getItem('mainImage')
        return savedImage ? JSON.parse(savedImage) : {};
    })

    const [ isShiny, setIsShiny ] = useState(false)

// conditionally render load screen if no searchPoke
    useEffect(() => {
        const fetchSearchedPokemon = async () => {
            let response = await fetch(searchedUrl);
            let data = await response.json();
            setSearchPoke(data);
            localStorage.setItem('searchPoke', JSON.stringify(data));
            // setSelectedImage(searchPoke.sprites.other["showdown"].front_default)
            console.log("should update image")
        }
        fetchSearchedPokemon();
    }, [searchedUrl]);

    useEffect(() => {
        const fetchMainImage = async () => {
            let response = await fetch(searchedUrl)
            let data = await response.json();
            setMainImage(data.sprites.other["showdown"].front_default)
            // else setMainImage(data.sprites.other["showdown"].front_default)
            localStorage.setItem("mainImage", JSON.stringify(data.sprites.other["showdown"].front_default))
        }
        fetchMainImage();
    }, [searchedUrl])

    useEffect(() => {
        const fetchMainImage1 = async () => {
            let response = await fetch(searchedUrl)
            let data = await response.json();
            if(isShiny) setImage1(data.sprites.other["showdown"].front_default)
            else setImage1(data.sprites.other["showdown"].front_default)
            localStorage.setItem("mainImage", JSON.stringify(data.sprites.other["showdown"].front_default))
        }
        fetchMainImage1();
    }, [searchedUrl])

    useEffect(() => {
        const fetchImage2= async () => {
            let response = await fetch(searchedUrl)
            let data = await response.json();
            if(isShiny) setImage2(data.sprites.other["showdown"].back_default)
            else setImage2(data.sprites.other["showdown"].back_default)
            localStorage.setItem("image2", JSON.stringify(data.sprites.other["showdown"].back_default))
        }
        fetchImage2();
    }, [searchedUrl])

    useEffect(() => {
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

    // const [ image1, setImage1 ] = useState(searchPoke.sprites.other["showdown"].front_default);
    // const [ image2, setImage2 ] = useState(searchPoke.sprites.other["showdown"].back_default);
    const [ price, setPrice ] = useState(priceOfPokemon(searchPoke.stats))

    return (
      <div className={searchPoke.types[0].type.name}>
      {/* {selectedImage === searchPoke.sprites.other["showdown"].front_default ?
        (
        <> */}
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
                    <h4>${price}</h4>
                    <h6>Height: {searchPoke.height / 10} m | Weight: {searchPoke.weight / 10} kg</h6>
                    <h6>Type: {searchPoke.types.map(pokeType => capString(pokeType.type.name)).join(" / ")}</h6>
                    <button className="btn btn-dark my-2 btn-sm"
                        style={{ marginRight: "5px", fontWeight: 500 }}
                        onClick={async () => {
                            if (searchMessage == 'Normal Version 🥱') {
                                setIsShiny(false);
                                setMainImage(searchPoke.sprites.other["showdown"].front_default)
                                setSearchMessage("Shiny Version ✨")
                                setImage1(searchPoke.sprites.other["showdown"].front_default)
                                setImage2(searchPoke.sprites.other["showdown"].back_default)
                                setPrice(priceOfPokemon(searchPoke.stats))
                            } else {
                                setIsShiny(true);
                                setMainImage(searchPoke.sprites.other["showdown"].front_shiny)
                                setSearchMessage("Normal Version 🥱")
                                setImage1(searchPoke.sprites.other["showdown"].front_shiny)
                                setImage2(searchPoke.sprites.other["showdown"].back_shiny)
                                setPrice(priceOfPokemon(searchPoke.stats) * 1000)
                            }
                    }}>
                        {searchMessage}
                    </button>
                    <button
                        onClick={() => {
                            if (isShiny) {
                                handleShinyAddToCart(searchPoke);
                                console.log("clicked on shiny Add to Cart");
                            }
                            else { 
                                handleAddToCart(searchPoke)
                                console.log("clicked on normal Add to Cart");
                            }
                        }}   
                        className="btn btn-dark my-2 btn-sm"
                        style={{ marginRight: "5px", fontWeight: 500 }}
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={() => {
                            if (!isShiny) {
                                handleAddToFavorites(searchPoke);
                            } else {
                                handleShinyAddToFavorites(searchPoke)
                            }
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
                        src={mainImage}
                        alt={`{searchPoke.name} front`}
                        style={{ width: "300px", height: "300px", objectFit: "contain" }}            />
                    </CardMedia>
                </Col>
                <Col xs={4} style={{ marginTop: "40px", background: getColorForType(searchPoke.types[0].type.name)}}>
                    <Card style={{ marginBottom: "50px", width: '100px', height: '100px', background: getColorForType(searchPoke.types[0].type.name)}}
                            onClick={() => setMainImage(image1)}
                    >
                        <CardMedia style={{border: "1px solid black"}}>
                            <img
                                src={image1}
                                alt={`${searchPoke.name} back`}
                                style={{ width: "100px", height: "100px", objectFit: "contain" }}              
                            />
                        </CardMedia>
                    </Card>
                    <Card
                        onClick={() => setMainImage(image2)}
                        style={{width: '100px', height: '100px', background: getColorForType(searchPoke.types[0].type.name)}}
                    >
                        <CardMedia style={{border: "1px solid black"}}>
                            <img
                                src={image2}
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
        {/* </> */}
        {/* ) : */}
            {/* <h1>LOADING</h1> */}
      {/* } */}
        </div>
    );
}

export default SearchPage;