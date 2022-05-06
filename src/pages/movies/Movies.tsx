import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFilms, Film } from "../../store/rootSlice";

import { useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "../../store/store";
import MoviesCard from "./MoviesCard";

export interface MovieResponse {
	count: string;
	next: string;
	previous: string;
	results: Film[];
}

type Props = {};

const Movies = (props: Props) => {
	const dispatch = useDispatch<AppThunkDispatch>();
	const filmsData = useSelector((state: RootState) => state.films);
	const loadingFilms = useSelector((state: RootState) => state.loadFilms);

	useEffect(() => {
		console.log(filmsData);
		if (filmsData.length === 0) {
			dispatch(fetchFilms());
		}
	}, []);

	const renderMovies = () => {
		return filmsData.map((film: Film) => {
			return (
				<div
					key={film.title}
					className="flex justify-center pt-5 min-w-full w-98"
				>
					<MoviesCard key={film.title} details={film} />
				</div>
			);
		});
	};

	return (
		<div className="flex flex-col text-center justify-center flex-wrap min-h-screen">
			{loadingFilms ? (
				<div className="flex h-9 items-center justify-center">
					<div
						className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
						role="status"
					>
						<span className="visually-hidden"></span>
					</div>
				</div>
			) : (
				renderMovies()
			)}
		</div>
	);
};

export default Movies;
