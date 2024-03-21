import React from 'react'
import { Routes, BrowserRouter as Router, Route} from 'react-router-dom'
import { DetailsProvider } from './DetailsContext.js';
import Home from './Home.js';
import Details from './Details.js';
import ShinyHome from './ShinyHome'
import ShinyDetails from './ShinyDetails.js'
import Cart from './Cart.js';
import Favorites from './Favorites.js';
import SearchPage from './SearchPage.js';
import Checkout from './Checkout.js'
import Nav from './Nav.js';

function App() {
  return (
    <Router>
      <DetailsProvider>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shiny" element={<ShinyHome />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pokemon/:name" element={<Details />} />
          <Route path="/pokemon/shiny/:name" element={<ShinyDetails />} />
          <Route path="/search/:name" element={<SearchPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </DetailsProvider>
    </Router>
  )
}

export default App;