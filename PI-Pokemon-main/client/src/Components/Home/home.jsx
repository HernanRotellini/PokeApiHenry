import { useEffect } from "react";

import {connect} from "react-redux"
import { useDispatch } from "react-redux";
import {getAllPokemons,filteredPokemons, orderedPokemons} from "../../redux/actions"

import Card from "../Card/card"
function Home(props) {

  const types = [
		{ value: 'All', label: 'Todos'},
    { value: 'Normal', label: 'Normal'},
		{ value: 'Fighting', label: 'Fighting'},
		{ value: 'Flying', label: 'Flying'},
		{ value: 'Poison', label: 'Poison'},
		{ value: 'Ground', label: 'Ground'},
		{ value: 'Rock', label: 'Rock'},
		{ value: 'Bug', label: 'Bug'},
		{ value: 'Ghost', label: 'Ghost'},
		{ value: 'Steel', label: 'Steel'},
		{ value: 'Fire', label: 'Fire'},
		{ value: 'Water', label: 'Water'},
		{ value: 'Grass', label: 'Grass'},
		{ value: 'Electric', label: 'Electric'},
		{ value: 'Psychic', label: 'Psychic'},
		{ value: 'Ice', label: 'Ice'},
		{ value: 'Dragon', label: 'Dragon'},
		{ value: 'Dark', label: 'Dark'},
		{ value: 'Fairy', label: 'Fairy'},
		{ value: 'Unknown', label: 'Unknown'},
		{ value: 'Shadow', label: 'Shadow'}
	];
  const origins = [
		{ value: 'Any', label: 'Todos'},
    { value: 'Normal', label: 'Normal'},
		{ value: 'Fighting', label: 'Fighting'},
	];
  const orders = [
		{ value: 'NoOrder', label: 'Todos'},
    { value: 'A-Z', label: 'A-Z'},
		{ value: 'Z-A', label: 'Z-A'},
    { value: 'Asc', label: '+DAÑO'},
		{ value: 'Desc', label: '-DAÑO'},
	];

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllPokemons());
      dispatch(filteredPokemons())
    }, [dispatch]);
    const handleFilterChange =(event)=>{
      const {name, value}= event.target
      dispatch(filteredPokemons({[name]:value}))
    }
    const handleOrderChange =(event)=>{
      const {name, value}= event.target
      dispatch(orderedPokemons({[name]:value}))
    }
    return (
      <div >
        <select className='filter' name="type" id="typeFilter"
        onChange={handleFilterChange} options={types} defaultValue="All">  
        Filtrar por Tipo:
        </select>
        <select className='filter' name="origin" id="originFilter"
        onChange={handleFilterChange} options={origins} defaultValue="Any">
          Filtrar por Origen:  
        </select>
        <select className='filter' name="order" id="orderName"
        onChange={handleOrderChange} options={orders} defaultValue="NoOrder">  
        Ordenar Alfabeticamente:
        </select>
        <select className='filter' name="order" id="orderAttack"
        onChange={handleOrderChange} options={orders} defaultValue="NoOrder">  
        Ordenar por Ataque:
        </select>
      
      {props.allPokemons.map((pokemon)=>{
        return(
          <div key={pokemon.id}>
         <Card id={pokemon.id} name={pokemon.name} image={pokemon.image} 
         types={pokemon.types}
         />
        </div>
        )
      })}
      </div>
    )
     
       
  }
  
  const mapStateToProps = (state) => {
    return {
      allPokemons: state.allPokemons,
      filteredPokemons: state.filteredPokemons
    };
  };
  
  export default connect(mapStateToProps, null)(Home);