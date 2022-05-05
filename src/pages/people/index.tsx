import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Character, fetchSpecies, fetchStarShips, Species, StarShip } from '../../store/rootSlice';
import { AppThunkDispatch, RootState } from '../../store/store';
import SpeciesName from '../species/SpeciesName';
import StarShipsName from '../starShips/StarShipsName';
const _ = require("lodash"); 

type Props = {}

const People = (props: Props) => {
  let params = useParams()
  const [speciesInfo, setSpeciesInfo] = useState<Species[]>([])
  const [starShipInfo, setStarShipInfo] = useState<StarShip[]>([])
  const dispatch = useDispatch<AppThunkDispatch>()
  const characters = useSelector((state:RootState) => state.characters)
  const starShips = useSelector((state:RootState) =>  state.starShips)
  const species = useSelector((state:RootState) => state.species)
  const loadPeople = useSelector((state: RootState) => state.loadPeople)
  const loadingSpecies = useSelector((state: RootState) => state.loadSpecies)
  const loadingStarShips = useSelector((state:RootState) => state.loadStarShips)
  // const selectStarShips = createSelector(  
  //   (state: RootState) => state.characters,
  //   (state:RootState) =>  (state.starShips),
  //   (characters) => characters.starships.filter((ship) => ship.url)
  // )

  const character = characters.find((person:Character) => {
    return (person.url === `https://swapi.dev/api/people/${params.id}/`)
  })

  console.log(character)

  const getData = () => {
    const starShipId = character?.starships.map((each) => {
      const id = each.split("/")
      return id[id.length - 2]
    })

 
    const speciesArray = character?.species.map((each) => {
      const id = each.split("/")
      return id[id.length - 2]
    })
    console.log(speciesArray)
    //const found = species.some(r=> character?.species.includes(r.url))
    //const speciesArray1 = species.filter((value) => !character?.species.includes(value.url))
    if (starShipId){
      dispatch(fetchStarShips(starShipId))
    }

    if(speciesArray){
      dispatch(fetchSpecies(speciesArray))
    }
  }

  useEffect(() => {
     getData()
  },[])

  useEffect(() => {
    const speciesInfo = species.filter((value) => character?.species.includes(value.url))
    setSpeciesInfo(speciesInfo)
  },[species])

  useEffect(() => {
    const starShipsInfo = starShips.filter((value) => character?.starships.includes(value.url))
    setStarShipInfo(starShipsInfo)
  },[starShips])

  const renderSpecies = () => {
    return (
      <>
      {speciesInfo.length === 0 ? '' :
(<div>
  Species : 
  <ul>
     {speciesInfo.map((each) => (<SpeciesName details={each} />))}
  </ul>
</div>)}
      </>
    )
  }

  const renderStarShips = () => {
    return (
      <>
        {starShipInfo.length === 0 ? '' : (<div>
  <h1>Starships : </h1>
  {starShips.map((each) => (<StarShipsName details={each} />))}
</div>)} 
      </>
    )
  }

  return (
   <>
  <div className="Card bg-slate-300 rounded w-full overflow-hidden transition-all shadow-lg cursor-pointer  translate-x-px flex flex-col align-items-center p-5">
  <h1 className="font-bold text-2xl">{character?.name}</h1>
  <h1>Birth Year : {character?.birth_year}</h1>
  <h1>Gender : {character?.gender}</h1>
  <h1>Hair Color : {character?.hari_color}</h1>
  <h1>Eye Color : {character?.eye_color}</h1>
  <h1>Height : {character?.height}</h1>
  <h1>Created : {character?.created}</h1>
  <h1>Mass : {character?.mass}</h1>
<div>

</div>
<div>
{loadingStarShips ? (<div className="flex h-9 items-center justify-center">
  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span className="visually-hidden"></span>
  </div>
</div>) : renderStarShips()}
{loadingSpecies ? (<div className="flex h-full items-center justify-center">
  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span className="visually-hidden"></span>
  </div>
</div>) : renderSpecies()}
</div>
</div>
</> 
  ) 
}

export default People;