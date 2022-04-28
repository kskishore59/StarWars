import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ActionsFromAsyncThunk, AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers'
import swapi from '../services/apis/swapi'
import { AppDispatch } from './store';
import { useDispatch } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
const _ = require("lodash"); 

export interface Film {
    title: string, 
    episode_id: number, 
    opening_crawl: string,
    director: string, 
    producer: string, 
    release_date: string, 
    characters: string[], 
    planets: string[], 
    starships:string[], 
    vehicles: string[], 
    species: string[], 
    created: string, 
    edited: string, 
    url: string
}

export interface  Character {
    name: string,
    gender: string,
    height: string,
    films: string[],
    birth_year: string,
    eye_color: string,
    homeworld: string,
    hari_color: string,
    mass: string,
    url: string,
    vehicles: string[],
    species: string[],
    edited: string,
    created: string,
    starships: string[],
}

export interface People {
  birth_year: string,
    eye_color: string,
    films: string[]
    gender:string,
    hair_color: string,
    height: string,
    homeworld: string,
    mass:string,
    name: string,
    skin_color: string,
    created: string,
    edited: string,
    species: string[],
    starships: string[],
    url: string,
    vehicles: string[]
}

export interface StarShip {
    MGLT: string,
    cargo_capacity: string,
    consumables: string,
    cost_in_credits: string,
    created: string,
    crew: string,
    edited: string,
    hyperdrive_rating: string,
    length: string,
    manufacturer: string,
    max_atmosphering_speed: string,
    model: string,
    name: string,
    passengers: string,
    films: string[],
    pilots: [],
    starship_class: string,
    url: string,
}

export interface Vehicle {
  cargo_capacity: string,
    consumables: string,
    cost_in_credits: string,
    created: string,
    crew: string,
    edited: string,
    length: string,
    manufacturer: string,
    max_atmosphering_speed: string,
    model: string,
    name: string,
    passengers: string,
    pilots: [],
    films: string[],
    url: string,
    vehicle_class: string,
}

export interface Species {
  name: string, 
    classification: string, 
    designation: string 
    average_height: string, 
    skin_colors: string, 
    hair_colors: string, 
    eye_colors: string, 
    average_lifespan: string, 
    homeworld: null, 
    language: string, 
    people: string[], 
    films: string[], 
    created: string, 
    edited: string, 
    url: string
}

  export interface Films {
    films: Film[],
    characters: Character[],
    people: People[],
    starShips: StarShip[],
    vehicles: Vehicle[],
    species: Species[],
    loadFilms: boolean,
    loadCharacters: boolean,
    loadPeople: boolean,
    loadSpecies:boolean,
    loadStarShips: boolean,
}

export const initialState:Films = {
    films: [],
    characters: [],
    starShips: [],
    vehicles: [],
    people: [],
    species: [],
    loadFilms: true,
    loadCharacters: true,
    loadPeople: true,
    loadSpecies: true,
    loadStarShips: true,
}

export const fetchFilms = createAsyncThunk(
    'allFilms',
    async ( thunkAPI) => {
      const response = await swapi.getFilms()
      return response
    }
  )

  export const fetchCharacters = createAsyncThunk(
    'allCharacters',
    async (characters: string[], thunkAPI) => {
      const response = await swapi.getCharacters(characters)
      return response
    }
  )

  export const fetchDetailedCharacter = createAsyncThunk(
    'detailedCharacter',
    async (character: string, thunkAPI) => {
      const response = await swapi.getPeople(character)
      return response
    }
  )

  export const fetchStarShips = createAsyncThunk(
    'starShips',
    async (starShip: string[], thunkAPI) => {
      const response = await swapi.getStarShips(starShip)
      return response
    }
  )

  export const fetchSpecies = createAsyncThunk(
    'species',
    async (species: string[], thunkAPI) => {
      const response = await swapi.getSpecies(species)
      return response
    }
  )

export const rootSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        updateFilmDetails: (state:Films, action: PayloadAction<Films | any>) => {
            state.films =  {
                  ...state.films,
                  ...action.payload,
            }
              },
            updateCharactersList: (state, action: PayloadAction<any>) => {
                state.characters = {
                    ...state.characters,
                    ...action.payload,
                }
            },
            updateFilmLoader: (state, action:PayloadAction<boolean>) => {
              state.loadFilms = action.payload
            },
            updateCharacterLoader: (state, action:PayloadAction<boolean>) => {
              state.loadCharacters = action.payload
            },
            updatePeopleLoader: (state, action:PayloadAction<boolean>) => {
              state.loadPeople = action.payload
            }

            
    }, 
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchFilms.fulfilled, (state, action:PayloadAction<any>) => {
            // Add user to the state array
            const difference = _.difference(state.films, action.payload)

            state.films = [...state.films, ...difference]
            state.loadFilms = false
          }).addCase(fetchFilms.pending, (state) => {
            state.loadFilms = true
          })
          .addCase(fetchCharacters.fulfilled, (state, action:PayloadAction<any>) => {
            //const char = state.characters.filter((value:Character) => !action.payload.includes(value))
            //console.log(char)
            if (state.characters.length !== 0) {
              const difference = _.difference( action.payload, state.characters)
              state.characters = [...state.characters, ...difference]             
            }
            console.log(action.payload)
            state.characters = action.payload
            state.loadCharacters = false
          }).addCase(fetchCharacters.pending, (state) => {
            state.loadCharacters = true
          }).addCase(fetchDetailedCharacter.fulfilled, (state, action:PayloadAction<any>) => {
            state.people = action.payload
            state.loadPeople = false
          }).addCase(fetchDetailedCharacter.pending, (state) => {
            state.loadPeople = true
          }).addCase(fetchStarShips.fulfilled, (state, action:PayloadAction<any>) => {
            if (state.starShips.length !== 0){
              const starShipIncludes = _.difference(state.starShips, action.payload);
              console.log(starShipIncludes)
              state.starShips= [...state.starShips, ...starShipIncludes]
            }
            state.starShips = action.payload
            state.loadStarShips = false
          }).addCase(fetchSpecies.fulfilled, (state, action:PayloadAction<any>) => {
              if (state.species.length !== 0){
                const speciesIncludes = _.difference(state.species, action.payload);
                console.log(speciesIncludes)
                state.species= [...state.species, ...speciesIncludes]
                state.loadSpecies = false
              }
              state.species = action.payload
          })
    },
})


export const { updateFilmDetails, updateCharactersList, updateFilmLoader,updateCharacterLoader, updatePeopleLoader} = rootSlice.actions
export default rootSlice.reducer