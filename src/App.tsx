import React from "react";
import "./App.css";
import Movies from "./pages/movies/Movies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Characters from "./pages/characters/characters";
import People from "./pages/people";
import SpeciesFullInfo from "./pages/species/SpeciesFullInfo";
import StarShipFullInfo from "./pages/starShips/StarShipFullInfo";
import Navbar from "./pages/Navbar";
import SideBar from "./pages/sidebar";

function App() {
	return (
		<BrowserRouter>
			<div className="App bg-white-700 min-h-screen flex flex-col">
				<Navbar />
				<div className="flex flex-row">
					<div className="h-full">
						<SideBar />
					</div>
					<div className="mt-14 ml-56  flex w-3/4 justify-center align-center">
						<Routes>
							<Route path="/" element={<Movies />} />
							<Route path="/films/:id" element={<Characters />} />
							<Route path="/people/:id" element={<People />} />
							<Route path="/species/:id" element={<SpeciesFullInfo />} />
							<Route path="/starships/:id" element={<StarShipFullInfo />} />
						</Routes>
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
