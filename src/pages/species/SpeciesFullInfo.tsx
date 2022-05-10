import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	fetchSpecies,
	fetchFilms,
	fetchCharacters,
} from "../../store/rootSlice";
import { AppThunkDispatch, RootState } from "../../store/store";
import CharacterCard from "../characters/characterCard";
import SpeciesMoviesCard from "./SpeciesMovies";
import { useEffect } from "react";

type Props = {};

const SpeciesFullInfo = (props: Props) => {
	const params = useParams();
	const species = useSelector((state: RootState) => state.species);
	const filmsInfo = useSelector((state: RootState) => state.films);
	const peopleInfo = useSelector((state: RootState) => state.characters);
	const dispatch = useDispatch<AppThunkDispatch>();

	const speciesInfo = species.find(
		(each) => each.url === `https://swapi.dev/api/species/${params.id}/`,
	);
	const speciesFilms = filmsInfo.filter((each) =>
		speciesInfo?.films.includes(each.url),
	);
	const speciesCharacters = peopleInfo.filter((each) =>
		speciesInfo?.people.includes(each.url),
	);
	console.log(speciesCharacters);

	useEffect(() => {
		const fetchNewSpecies = () => {
			if (speciesInfo === undefined) {
				const speciesArray = [`${params.id}`];
				dispatch(fetchSpecies(speciesArray));
			}
		};

		const fetchFilmsForSpecies = () => {
			if (speciesFilms.length === 0) {
				dispatch(fetchFilms());
			}
		};

		const fetchSpeciesCharacters = () => {
			if (speciesCharacters.length === 0) {
				const charactersArray = speciesInfo?.people.map((eachCharacter) => {
					const id = eachCharacter.split("/");
					return id[id.length - 2];
				});
				if (charactersArray) {
					dispatch(fetchCharacters(charactersArray));
				}
			}
		};

		fetchFilmsForSpecies();
		fetchSpeciesCharacters();
		fetchNewSpecies();
	}, []);

	console.log(species);
	console.log(speciesInfo);

	return (
		<div className="rounded w-full overflow-hidden transition-all shadow-lg  translate-x-px flex flex-col align-items-center p-5">
			<div className="font-sans font-bold text-xl">
				SPECIES : {speciesInfo?.name}
			</div>
			<ul className="flex flex-col text-left w-full pl-10 pt-10">
				<li className="font-sans p-2 ">
					Classification : {speciesInfo?.classification}
				</li>
				<li className="font-sans p-2 ">Created : {speciesInfo?.created}</li>
				<li className="font-sans p-2 ">
					Eye Color : {speciesInfo?.eye_colors}
				</li>
				<li className="font-sans p-2 ">
					Home World : {speciesInfo?.homeworld}
				</li>
				<li className="font-sans p-2 ">
					Average LifeSpan : {speciesInfo?.average_lifespan}
				</li>
				<li className="font-sans p-2 ">
					Average Height : {speciesInfo?.average_height}
				</li>
				<li className="font-sans p-2 ">
					Hair Color : {speciesInfo?.hair_colors}
				</li>
				<div className="font-sans p-2 ">
					FILMS :{" "}
					{speciesFilms?.map((each) => (
						<SpeciesMoviesCard key={each.url} details={each} />
					))}
				</div>
				<div className="font-sans p-2">
					PEOPLE :
					{speciesCharacters?.map((each) => (
						<CharacterCard key={each.url} details={each} />
					))}
				</div>
			</ul>
		</div>
	);
};

export default SpeciesFullInfo;
