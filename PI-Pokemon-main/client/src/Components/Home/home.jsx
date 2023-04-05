import { useEffect, useState } from "react";
import {connect} from "react-redux"
import { useDispatch } from "react-redux";
import {getAllPokemons,filteredPokemons, orderedPokemons} from "../../redux/actions"
import Card from "../Card/card"


function Home(props) {
    const dispatch = useDispatch();
    const [typeFilter, setTypeFilter] = useState("All");
    const [originFilter, setOriginFilter] = useState("Any");
    const [alphabeticOrder, setAlphabeticOrder] = useState('NoOrder');
    const [attackOrder, setAttackOrder] = useState('NoOrder');
    const [pokemonList, setPokemonList] = useState([]);
    const [orderedList, setOrderedList] = useState([]);

    useEffect(() => {
      dispatch(getAllPokemons())
       //evita que se haga el dispatch de filteredPokemons antes de tener los pokemones
      .then(() => {
        dispatch(filteredPokemons())
      });
    }, [dispatch]);

    useEffect(() => {
      setPokemonList([...props.filteredPokemons]);
    }, [props.filteredPokemons]);

    const handleTypeFilterChange = (event) => {
      setTypeFilter(event.target.value);
      dispatch(filteredPokemons({ type: event.target.value, origin: originFilter }));
      if(alphabeticOrder !== "NoOrder")
      dispatch(orderedPokemons(alphabeticOrder))
      if(attackOrder !== "NoOrder")
      dispatch(orderedPokemons(attackOrder))
    };
  
    const handleOriginFilterChange = (event) => {
      setOriginFilter(event.target.value);
      dispatch(filteredPokemons({ type: typeFilter, origin: event.target.value }));
      if(alphabeticOrder !== "NoOrder")
      dispatch(orderedPokemons(alphabeticOrder))
      if(attackOrder !== "NoOrder")
      dispatch(orderedPokemons(attackOrder))
    };
    useEffect(() => {
     
      setOrderedList(props.orderedPokemons);
    }, [props.orderedPokemons]);

    const handleAlfabeticOrderChange = (event) => {
      dispatch(orderedPokemons(event.target.value))
      setAlphabeticOrder(event.target.value)
      setAttackOrder('NoOrder')
      dispatch(filteredPokemons({ type: typeFilter, origin: originFilter }));
    };
    const handleAttackOrderChange = (event) => {
      dispatch(orderedPokemons(event.target.value))
      setAttackOrder(event.target.value)
      setAlphabeticOrder('NoOrder')
    };
   
    return (
      <div >
        <label htmlFor="">Filtrar por Tipo:</label>
        <select className='filter' name="type" id="typeFilter"
        onChange={handleTypeFilterChange} defaultValue="All">
          <option value="All">Todos</option>
          <option value="Normal">Normal</option>
          <option value="Fighting">Fighting</option>
          <option value="Flying">Flying</option>  
        </select>

        <label htmlFor="">Filtrar por Origen:  </label>
        <select className='filter' name="origin" id="originFilter"
        onChange={handleOriginFilterChange} defaultValue="Any">
          <option value="Any">Todos</option>
          <option value="Api">Api</option>
          <option value="Database">Base de datos</option>
        </select>

        <label htmlFor="">Ordenar Alfabeticamente:  </label>
        <select className='filter' name="orderName" value={alphabeticOrder}
        onChange={handleAlfabeticOrderChange} defaultValue="NoOrder">  
        <option value="NoOrder">No ordenar</option>
        <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <label htmlFor="">Ordenar por Ataque:  </label>
        <select className='filter' name="orderAttack" value={attackOrder}
        onChange={handleAttackOrderChange} defaultValue="NoOrder">  
         <option value="NoOrder">No ordenar</option>
        <option value="Asc">Menor a mayor</option>
          <option value="Desc">Mayor a menor</option>
        </select>
      
      {orderedList.length >0 ?
      orderedList.map((pokemon)=>{
        return(
          <div key={pokemon.id}>
         <Card id={pokemon.id} name={pokemon.name} image={pokemon.image} 
         types={pokemon.types}
         />
        </div>
        )
      })
        : pokemonList.map((pokemon)=>{
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
      filteredPokemons: state.filteredPokemons,
      orderedPokemons: state.orderedPokemons,
    };
  };
  
  export default connect(mapStateToProps, null)(Home);