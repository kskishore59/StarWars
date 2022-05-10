import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";

type Props = {};

const SideBar = (props: Props) => {
	const films = useSelector((state: RootState) => state.films);
	const characters = useSelector((state: RootState) => state.characters);
	const species = useSelector((state: RootState) => state.species);
	const starShips = useSelector((state: RootState) => state.starShips);

	return (
		<aside className="w-64 mt-14 h-screen fixed z-20" aria-label="Sidebar">
			<div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-100 h-full">
				<ul className="space-y-2">
					<div className="w-full px-4 ">
						<div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
							{films ? (
								<Disclosure>
									{({ open, close }) => (
										<>
											<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
												<span>Movies</span>
												<ChevronUpIcon
													className={`${
														open ? "rotate-180 transform" : ""
													} h-5 w-5 text-purple-500`}
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
												{films.map((each) => {
													const id = each.url.split("/");
													return (
														<li key={each.title}>
															<a
																href={`/films/${id[id.length - 2]}`}
																className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
															>
																{each.title}
															</a>
														</li>
													);
												})}
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							) : (
								""
							)}
							{characters ? (
								<Disclosure as="div" className="mt-2">
									{({ open }) => (
										<>
											<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
												<span>Characters</span>
												<ChevronUpIcon
													className={`${
														open ? "rotate-180 transform" : ""
													} h-5 w-5 text-purple-500`}
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
												{characters.map((each) => {
													const characterId = each.url.split("/");
													return (
														<li key={each.name}>
															<a
																href={`/people/${
																	characterId[characterId.length - 2]
																}`}
																className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
															>
																{each.name}
															</a>
														</li>
													);
												})}
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							) : (
								""
							)}
							{species ? (
								<Disclosure as="div" className="mt-2">
									{({ open }) => (
										<>
											<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
												<span>Species</span>
												<ChevronUpIcon
													className={`${
														open ? "rotate-180 transform" : ""
													} h-5 w-5 text-purple-500`}
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
												{species.map((each) => {
													const speciesId = each.url.split("/");
													return (
														<li key={each.name}>
															<a
																href={`/people/${
																	speciesId[speciesId.length - 2]
																}`}
																className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
															>
																{each.name}
															</a>
														</li>
													);
												})}
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							) : (
								""
							)}
							{starShips ? (
								<Disclosure as="div" className="mt-2">
									{({ open }) => (
										<>
											<Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
												<span>Starships</span>
												<ChevronUpIcon
													className={`${
														open ? "rotate-180 transform" : ""
													} h-5 w-5 text-purple-500`}
												/>
											</Disclosure.Button>
											<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
												{starShips.map((each) => {
													const starShipId = each.url.split("/");
													return (
														<li key={each.name}>
															<a
																href={`/people/${
																	starShipId[starShipId.length - 2]
																}`}
																className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black"
															>
																{each.name}
															</a>
														</li>
													);
												})}
											</Disclosure.Panel>
										</>
									)}
								</Disclosure>
							) : (
								""
							)}
						</div>
					</div>
				</ul>
			</div>
		</aside>
	);
};

export default SideBar;
