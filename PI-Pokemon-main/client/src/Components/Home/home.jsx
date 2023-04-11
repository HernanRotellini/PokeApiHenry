/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import {connect} from "react-redux"
import { useDispatch, useSelector } from "react-redux";
import {getAllPokemons,filteredPokemons, orderedPokemons, loadTypes} from "../../redux/actions"
import Card from "../Card/card";
import style from "./home.module.css";
import SearchBar from "../SearchBar/searchBar";
function Home(props) {
    const dispatch = useDispatch();
    //Estados locales para filtros
    const [typeFilter, setTypeFilter] = useState("All");
    const [originFilter, setOriginFilter] = useState("Any");
    const [alphabeticOrder, setAlphabeticOrder] = useState('NoOrder');
    const [attackOrder, setAttackOrder] = useState('NoOrder');
    //Estados locales Paginador
    // const [pokemonList, setPokemonList] = useState([]);
    // const [orderedList, setOrderedList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(12);

    //Estado local para renderizar mientras se cargan los datos
    const [loading,setLoading]= useState(true)
    //Estado Global de todos los types
    const types = useSelector(state => state.allTypes)
    //Paginador
    const getPokemonsByPage = (pokemons, pageNumber, pageSize) => {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return pokemons.slice(startIndex, endIndex);
      };
      //Listas paginadas
      const orderedListPages = getPokemonsByPage(props.orderedPokemons, currentPage, pageSize);
      const filteredListPages = getPokemonsByPage(props.filteredPokemons, currentPage, pageSize);
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      
      const pageCount = Math.ceil(props.filteredPokemons.length / pageSize);
      const orderedPageCount = Math.ceil(props.orderedPokemons.length / pageSize);
      const pages = [];
      const orderedPages=[];
    for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
    }
    for (let i = 1; i <= orderedPageCount; i++) {
      orderedPages.push(i);
      }
//Fin paginador
   //Carga de datos antes de renderizar
    useEffect(() => {
      dispatch(loadTypes())
      dispatch(getAllPokemons())
       //evita que se haga el dispatch de filteredPokemons antes de tener los pokemones
      .then(() => {
        dispatch(filteredPokemons())
      }).then(() => {
        dispatch(filteredPokemons());
        setTimeout(() => setLoading(false), 2000);
      });
    }, [dispatch]);
//Fin Carga de datos

//Manejadores de filtrado
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
   //Fin manejadores de filtros
    return (
      <div>
           <div className="search-container">
      <SearchBar />
      </div>
        <div className="filter-container">
        <label className="labels" htmlFor="">Filtrar por Tipo:</label>
<select className='filter' name="type" id="typeFilter" onChange={handleTypeFilterChange} defaultValue="All">
  <option value="All">Todos</option>
  {types ? types.map(type => <option value={type.name} key={type.id}>{type.name}</option>) 
  : null}
</select>
        <label className="labels" htmlFor="">Filtrar por Origen:  </label>
        <select className='filter' name="origin" id="originFilter"
        onChange={handleOriginFilterChange} defaultValue="Any">
          <option value="Any">Todos</option>
          <option value="Api">Api</option>
          <option value="Database">Base de datos</option>
        </select>

        <label className="labels" htmlFor="">Ordenar Alfabeticamente:  </label>
        <select className='filter' name="orderName" value={alphabeticOrder}
        onChange={handleAlfabeticOrderChange} defaultValue="NoOrder">  
        <option value="NoOrder">No ordenar</option>
        <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <label className="labels" htmlFor="">Ordenar por Ataque:  </label>
        <select className='filter' name="orderAttack" value={attackOrder}
        onChange={handleAttackOrderChange} defaultValue="NoOrder">  
         <option value="NoOrder">No ordenar</option>
        <option value="Asc">Menor a mayor</option>
          <option value="Desc">Mayor a menor</option>
        </select>
        <br /><br />
        </div>
      <div className={style.cards}>
      {loading ? (
  
  <img src="https://i.postimg.cc/pdtFRpqh/Loading-Pokemon.gif" alt="Cargando..." style={{ marginLeft:"350px" }} />
   
) : (
  props.orderedPokemons.length > 0 ? (
    orderedListPages.map((pokemon) => (
      <div key={pokemon.id}>
        <Card
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
        />
      </div>
    ))
  ) : (
    filteredListPages.map((pokemon) => (
      <div key={pokemon.id}>
        <Card
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types}
        />
      </div>
    ))
  )
)}
        </div>
         <nav>
         <ul className="pagination">
         {(() => {
  let pageNumbers = [];
  let orderedPageNumbers = [];

  if (props.orderedPokemons.length > 0) {
    for (let i = 1; i <= orderedPageCount; i++) {
      orderedPageNumbers.push(i);
    }
  } else {
    if (currentPage === pageCount && currentPage >= 3) {
      pageNumbers.push(1);
    }
    if (currentPage > 1) {
      pageNumbers.push(currentPage - 1);
    }
    pageNumbers.push(currentPage);
    if (currentPage < pageCount) {
      pageNumbers.push(currentPage + 1);
    }
    if (currentPage < pageCount - 1) {
      pageNumbers.push(pageCount);
    }
  }

  const pageList = orderedPageNumbers.length > 0 ? orderedPageNumbers : pageNumbers;

  return pageList.map((page) => (
    <button
      key={page}
      className={page === currentPage ? "page-item active" : "page-item"}
      onClick={() => handlePageChange(page)}
    >
      <a className="page-link">{page}</a>
    </button>
  ));
})()}
</ul>
      </nav>
      </div>
    )
     
       
  }
  //Traer estados globales para utilizar en la renderizacion
  const mapStateToProps = (state) => {
    return {
      allPokemons: state.allPokemons,
      filteredPokemons: state.filteredPokemons,
      orderedPokemons: state.orderedPokemons,
    };
  };
  
  export default connect(mapStateToProps, null)(Home);