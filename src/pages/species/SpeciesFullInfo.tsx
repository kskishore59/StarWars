import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store/store'
import CharacterCard from '../characters/characterCard'
import SpeciesMoviesCard from './SpeciesMovies'

type Props = {}

const SpeciesFullInfo = (props: Props) => {
    const params = useParams()
    const species = useSelector((state:RootState) => state.species)
    const filmsInfo = useSelector((state: RootState) => state.films)
    const peopleInfo = useSelector((state: RootState)  => state.characters)

    const speciesInfo = species.find((each) => each.url === `https://swapi.dev/api/species/${params.id}/`)
    const speciesFilms = filmsInfo.filter((each) => speciesInfo?.films.includes(each.url))
    const speciesCharacters = peopleInfo.filter((each) => speciesInfo?.people.includes(each.url))
    console.log(speciesFilms)
//     average_height: "n/a"
// average_lifespan: "indefinite"
// classification: "artificial"
// created: "2014-12-10T15:16:16.259000Z"
// designation: "sentient"
// edited: "2014-12-20T21:36:42.139000Z"
// eye_colors: "n/a"
// films: (6) ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/', 'https://swapi.dev/api/films/3/', 'https://swapi.dev/api/films/4/', 'https://swapi.dev/api/films/5/', 'https://swapi.dev/api/films/6/']
// hair_colors: "n/a"
// homeworld: null
// language: "n/a"
// name: "Droid"
// people: (4) ['https://swapi.dev/api/people/2/', 'https://swapi.dev/api/people/3/', 'https://swapi.dev/api/people/8/', 'https://swapi.dev/api/people/23/']
// skin_colors: "n/a"

  return (
    <div className="bg-slate-300 rounded w-full overflow-hidden transition-all shadow-lg  translate-x-px flex flex-col align-items-center p-5"><div className="font-sans font-bold text-xl">SPECIES : {speciesInfo?.name}</div>
        <ul className="flex flex-col text-left w-full pl-10 pt-10">
            <li className="font-sans p-2 ">Classification : {speciesInfo?.classification}</li>
            <li className="font-sans p-2 ">Created  : {speciesInfo?.created}</li>
            <li className="font-sans p-2 ">Eye Color : {speciesInfo?.eye_colors}</li>
            <li className="font-sans p-2 ">Home World : {speciesInfo?.homeworld}</li>
            <li className="font-sans p-2 ">Average LifeSpan : {speciesInfo?.average_lifespan}</li>
            <li className="font-sans p-2 ">Average Height : {speciesInfo?.average_height}</li>
            <li className="font-sans p-2 ">Hair Color : {speciesInfo?.hair_colors}</li>
            <div className="font-sans p-2 ">FILMS : {speciesFilms?.map((each) => (<SpeciesMoviesCard details={each} />))}</div>
            <div className="font-sans p-2">PEOPLE : 
                {speciesCharacters?.map((each) => (<CharacterCard details={each} />))}
            </div>
        </ul>
    </div>
  )
}

export default SpeciesFullInfo