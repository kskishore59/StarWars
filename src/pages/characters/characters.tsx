import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '../../store/store';
import { Character, fetchCharacters, Film, updateCharactersList } from '../../store/rootSlice';
import { useDispatch } from 'react-redux';
import swapi from '../../services/apis/swapi';
import { Link } from 'react-router-dom';
import CharacterCard from './characterCard';

type Props = {}

const Characters:React.FC<Props>= (props) => {
  const dispatch = useDispatch<AppThunkDispatch>()
   const [data, setData] = useState<Film>()
   const loadingCharacters = useSelector((state: RootState) =>  state.loadCharacters)
   let params = useParams()
   const details = useSelector((state: RootState) => state.films);
   const characters = useSelector((state: RootState) => state.characters);

  async function getData () {
    const film = Object.values(details).find((obj) => {
        return obj.url === `https://swapi.dev/api/films/${params.id}/`
    })
    setData(film)
    if (film){
    const characterArray  = film.characters.filter((value) => characters.map((each) => each.url === value))
    console.log(characterArray)
    const charactersId = characterArray.map((each) => {
      let split = each.split('/')
      return split[split.length -2]
    }) 
    dispatch(fetchCharacters(charactersId))
      // if (charactersId){
      //   swapi.getCharacters(charactersId)
      //   .then((response) => {
      //     console.log(response)
      //     setCharacterList(response)
      //     dispatch(updateCharactersList(response))
      //   })
      //   .finally(() => {
      //     setLoading(false)
      //   })
        
      }
  }

  console.log(loadingCharacters)
    
  

useEffect(() => {
    getData()
    console.log(characters)
}, [])


  return (
    <div className="flex flex-col text-center justify-center flex-wrap h-full">      
        {loadingCharacters? (<div className="flex justify-center items-center min-h-screen">
  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
    <span className="visually-hidden"></span>
  </div>
</div>) : (<>
  <h1>Movie Name : <span className="font-bold">{data?.title}</span></h1>
      <div className="flex flex-col text-left w-full pl-10 pt-10">
        <h1 className="font-sans m-2 font-bold">Director : {data?.director}</h1>
        <h1 className="font-sans m-2 font-bold">Producer: {data?.producer}</h1>
        <h1 className="font-sans m-2 font-bold">Opening Crawl:<br/><span className="font-normal">{data?.opening_crawl}</span></h1>
        <h1 className="font-sans m-2 font-bold">Release date: <span className="font-normal">{data?.release_date}</span></h1>
        <h1 className="font-sans m-2 font-bold">Episode ID: <span className="font-normal">{data?.episode_id}</span></h1>
        <div className="flex flex-col flex-wrap m-2"><h5 className='font-sans font-bold'>Characters List : </h5></div>
    
        {characters.map((each:any) => {
    return (<CharacterCard details={each}/>)
})}  </div> </>
        )}
</div>
  )
}

export default Characters