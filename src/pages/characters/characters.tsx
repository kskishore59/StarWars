import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacters, Film } from "../../store/rootSlice";
import { AppThunkDispatch, RootState } from "../../store/store";
import CharacterCard from "./characterCard";

type Props = {};

const Characters: React.FC<Props> = (props) => {
	const dispatch = useDispatch<AppThunkDispatch>();
	const [data, setData] = useState<Film>();
	const loadingCharacters = useSelector(
		(state: RootState) => state.loadCharacters,
	);
	let params = useParams();
	const details = useSelector((state: RootState) => state.films);
	const characters = useSelector((state: RootState) => state.characters);

	function getData() {
		const film = Object.values(details).find((obj) => {
			return obj.url === `https://swapi.dev/api/films/${params.id}/`;
		});
		setData(film);
		if (film) {
			const characterArray = film.characters.filter(
				(value) =>
					characters.findIndex((eachChar) => eachChar.url === value) < 0,
			);

			if (characterArray) {
				const charactersId = characterArray.map((each) => {
					let split = each.split("/");
					return split[split.length - 2];
				});
				dispatch(fetchCharacters(charactersId));
			}
		}
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="flex flex-col text-center justify-center flex-wrap h-full">
			{loadingCharacters ? (
				<div className="flex justify-center items-center min-h-screen">
					<div
						className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
						role="status"
					>
						<span className="visually-hidden"></span>
					</div>
				</div>
			) : (
				<>
					<h1>
						Movie Name : <span className="font-bold">{data?.title}</span>
					</h1>
					<div className="flex flex-col text-left w-full pl-10 pt-10">
						<h1 className="font-sans m-2 font-bold">
							Director : {data?.director}
						</h1>
						<h1 className="font-sans m-2 font-bold">
							Producer: {data?.producer}
						</h1>
						<h1 className="font-sans m-2 font-bold">
							Opening Crawl:
							<br />
							<span className="font-normal">{data?.opening_crawl}</span>
						</h1>
						<h1 className="font-sans m-2 font-bold">
							Release date:{" "}
							<span className="font-normal">{data?.release_date}</span>
						</h1>
						<h1 className="font-sans m-2 font-bold">
							Episode ID:{" "}
							<span className="font-normal">{data?.episode_id}</span>
						</h1>
						<div className="flex flex-col flex-wrap m-2">
							<h5 className="font-sans font-bold">Characters List : </h5>
						</div>
						{characters.map((each: any) => {
							return <CharacterCard details={each} />;
						})}{" "}
					</div>{" "}
				</>
			)}
		</div>
	);
};

export default Characters;
