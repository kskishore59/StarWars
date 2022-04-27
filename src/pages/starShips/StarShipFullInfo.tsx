import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store/store'
import CharacterCard from '../characters/characterCard'
import SpeciesMoviesCard from '../species/SpeciesMovies'

type Props = {}

const StarShipFullInfo = (props: Props) => {
    const params = useParams()
    const starships = useSelector((state:RootState) => state.starShips)
    const filmsInfo = useSelector((state: RootState) => state.films)
    const peopleInfo = useSelector((state: RootState) => state.characters)

    const starShipInfo = starships.find((each) => each.url === `https://swapi.dev/api/starships/${params.id}/`)
    const starShipFilms = filmsInfo.filter((each) => starShipInfo?.films.includes(each.url))
    // MGLT: string,
    // cargo_capacity: string,
    // consumables: string,
    // cost_in_credits: string,
    // created: string,
    // crew: string,
    // edited: string,
    // hyperdrive_rating: string,
    // length: string,
    // manufacturer: string,
    // max_atmosphering_speed: string,
    // model: string,
    // name: string,
    // passengers: string,
    // films: string[],
    // pilots: [],
    // starship_class: string,
    // url: string,

  return (
    <div className="bg-slate-300 rounded w-full overflow-hidden transition-all shadow-lg cursor-pointer  translate-x-px flex flex-col align-items-center p-5">STARSHIP : {starShipInfo?.name}
    
    <div className="flex-col align-items-start w-102">
        <h1>MLGT : {starShipInfo?.MGLT}</h1>
        <h1>Passengers : {starShipInfo?.passengers}</h1>
        <h1>Model : {starShipInfo?.model}</h1>
        <h1>Consumables : {starShipInfo?.consumables}</h1>
        <h1>Cargo Capacity : {starShipInfo?.cargo_capacity}</h1>
        <h1>Edited : {starShipInfo?.edited}</h1>
        <h1>Manufacturer : {starShipInfo?.manufacturer}</h1>
        <h1>Length : {starShipInfo?.length}</h1>
        <h1>Starship Class : {starShipInfo?.starship_class}</h1>
        <h1>Films : 
            {starShipFilms.map((each) => (<SpeciesMoviesCard details={each} />))}
        </h1>
    </div>
    </div>
  )
}

export default StarShipFullInfo