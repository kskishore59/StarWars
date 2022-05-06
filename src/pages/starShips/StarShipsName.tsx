import { Link } from "react-router-dom";
import { StarShip } from "../../store/rootSlice";

const StarShipsName: React.FC<{ details: StarShip }> = ({ details }) => {
	const { url, name } = details;
	const id = url.split("/");
	return (
		<Link to={`/starships/${id[id.length - 2]}`}>
			<div className="font-bold text-xl mb-2 flex flex-col">{name}</div>
		</Link>
	);
};

export default StarShipsName;
