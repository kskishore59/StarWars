import { Link } from "react-router-dom";
import { Species } from "../../store/rootSlice";

const SpeciesName: React.FC<{ details: Species }> = ({ details }) => {
	const { url, name } = details;
	const id = url.split("/");

	return (
		<Link to={`/species/${id[id.length - 2]}`}>
			<div className="px-6 py-4 flex flex-col">
				<div className="font-bold text-xl mb-2 flex flex-col">{name}</div>
			</div>
		</Link>
	);
};

export default SpeciesName;
