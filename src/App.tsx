import React from 'react';
import './App.css';
import Movies from './pages/movies/Movies';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Characters from './pages/characters/characters';
import People from './pages/people';
import SpeciesFullInfo from './pages/species/SpeciesFullInfo';
import StarShipFullInfo from './pages/starShips/StarShipFullInfo';

function App() {
  return (
    <BrowserRouter>
    <div className="App bg-white-700 min-h-screen flex flex-col">
      <header className="text-4xl font-serif mt-10 mb-5 font-extrabold ">STAR WARS</header>
      <Routes>
          <Route path="/" element={<Movies />}/>
          <Route path="/films/:id" element={<Characters />} />
          <Route path="/people/:id" element={<People />} />
          <Route path="/species/:id" element={<SpeciesFullInfo />} />
          <Route path="/starships/:id" element={<StarShipFullInfo />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
