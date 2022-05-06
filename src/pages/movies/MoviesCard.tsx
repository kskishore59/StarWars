import React from "react";
import { Link } from "react-router-dom";

interface Details {
	url: string;
	title: string;
	director: string;
	producer: string;
	characters: string[];
}

const MoviesCard: React.FC<{ details: Details }> = ({ details }) => {
	const { url, title } = details;

	const id = url.split("/");

	return (
		<Link to={`/films/${id[id.length - 2]}`}>
			<div className="bg-slate-300 rounded w-56 overflow-hidden transition-all shadow-lg cursor-pointer  translate-x-px hover:bg-blue-600 hover:border-color flex flex-col">
				<div className="px-6 py-4 flex flex-col">
					<div className="font-bold text-xl mb-2 flex flex-col">{title}</div>
				</div>
			</div>
		</Link>
	);
};

export default MoviesCard;
