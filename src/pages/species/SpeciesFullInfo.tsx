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
    const peopleInfo = useSelector((state: RootState) => state.characters)

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
    <div className="bg-slate-300 rounded w-full overflow-hidden transition-all shadow-lg cursor-pointer  translate-x-px flex flex-col align-items-center p-5"><div>SPECIES : {speciesInfo?.name}</div>
        <div>
            <h1>Classification : {speciesInfo?.classification}</h1>
            <h1>Created  : {speciesInfo?.created}</h1>
            <h1>Eye Color : {speciesInfo?.eye_colors}</h1>
            <h1>Home World : {speciesInfo?.homeworld}</h1>
            <h1>Average LifeSpan : {speciesInfo?.average_lifespan}</h1>
            <h1>Average Height : {speciesInfo?.average_height}</h1>
            <h1>Hair Color : {speciesInfo?.hair_colors}</h1>
            <div>FILMS : {speciesFilms?.map((each) => (<SpeciesMoviesCard details={each} />))}</div>
            <div>PEOPLE : 
                {speciesCharacters?.map((each) => (<CharacterCard details={each} />))}
            </div>
        </div>
    </div>
  )
}

export default SpeciesFullInfo