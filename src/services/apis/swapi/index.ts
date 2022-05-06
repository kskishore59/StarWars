import axios, { AxiosResponse } from "axios";
import { MovieResponse } from "../../../pages/movies/Movies";
import { Character } from "../../../store/rootSlice";
import { axiosInstance } from "../client";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getFilms() {
		let response = axiosInstance("/films")
			.then((response: AxiosResponse<MovieResponse>) => {
				return response.data.results;
			})
			.catch((error) => {
				console.log(error);
			});
		return response;
	},
	getCharacters(characterApis: string[]) {
		const allCharacters = Promise.all(
			characterApis.map((link) => axiosInstance(`/people/${link}`)),
		)
			.then(function (responses) {
				// Get a JSON object from each of the responses
				return responses.map(function (response) {
					return response.data;
				});
			})
			.catch(function (error) {
				// if there's an error, log it
				console.log(error);
			});

		return allCharacters;
	},
	getPeople(peopleId: string) {
		let response = axiosInstance(`/people/${peopleId}`)
			.then((response: AxiosResponse<MovieResponse>) => {
				return response.data;
			})
			.catch((error) => {
				console.log(error);
			});
		return response;
	},
	getStarShips(peopleId: string[]) {
		const allStarShips = Promise.all(
			peopleId.map((link) => axiosInstance(`/starships/${link}`)),
		)
			.then(function (responses) {
				// Get a JSON object from each of the responses
				return responses.map(function (response) {
					return response.data;
				});
			})
			.catch(function (error) {
				// if there's an error, log it
				console.log(error);
			});

		return allStarShips;
	},
	getVehicles(vehicle: string[]) {
		const allVehicles = Promise.all(
			vehicle.map((link) => axiosInstance(`/vehicles/${link}`)),
		)
			.then(function (responses) {
				// Get a JSON object from each of the responses
				return responses.map(function (response) {
					return response.data;
				});
			})
			.catch(function (error) {
				// if there's an error, log it
				console.log(error);
			});

		return allVehicles;
	},
	getSpecies(species: string[]) {
		console.log(species);
		const allVehicles = Promise.all(
			species.map((link) => axiosInstance(`/species/${link}`)),
		)
			.then(function (responses) {
				// Get a JSON object from each of the responses
				return responses.map(function (response) {
					return response.data;
				});
			})
			.catch(function (error) {
				// if there's an error, log it
				console.log(error);
			});
		return allVehicles;
	},
};
