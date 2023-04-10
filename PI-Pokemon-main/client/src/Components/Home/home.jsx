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
    const [typeFilter, setTypeFilter] = useState("All");
    const [originFilter, setOriginFilter] = useState("Any");
    const [alphabeticOrder, setAlphabeticOrder] = useState('NoOrder');
    const [attackOrder, setAttackOrder] = useState('NoOrder');
    const [pokemonList, setPokemonList] = useState([]);
    const [orderedList, setOrderedList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(12);
    const [loading,setLoading]= useState(true)
    const types = useSelector(state => state.allTypes)
    const getPokemonsByPage = (pokemons, pageNumber, pageSize) => {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return pokemons.slice(startIndex, endIndex);
      };
      const orderedListPages = getPokemonsByPage(orderedList, currentPage, pageSize);
      const filteredListPages = getPokemonsByPage(pokemonList, currentPage, pageSize);
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
      
      const pageCount = Math.ceil(pokemonList.length / pageSize);
      const pages = [];
    for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
    }
    const handleResetFilters = () => {
      setTypeFilter("All");
      setOriginFilter("Any");
      setAlphabeticOrder('NoOrder');
      setAttackOrder('NoOrder');
    };
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
           <div className="search-container">
      <SearchBar
        handleTypeFilter={setTypeFilter}
        handleOriginFilter={setOriginFilter}
        handleResetFilters={handleResetFilters}
      />
      </div>
        <div className="filter-container">
        <label htmlFor="">Filtrar por Tipo:</label>
<select className='filter' name="type" id="typeFilter" onChange={handleTypeFilterChange} defaultValue="All">
  <option value="All">Todos</option>
  {types ? types.map(type => <option value={type.name} key={type.id}>{type.name}</option>) 
  : null}
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
        <br /><br />
        </div>
      <div className={style.cards}>
      {loading ? (
  <div className="loader">
  <img src="https://i.postimg.cc/pdtFRpqh/Loading-Pokemon.gif" alt="Cargando..." style={{ marginLeft:"350px" }} />
   </div>
) : (
  orderedList.length > 0 ? (
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
    const pageNumbers = [];
    if (currentPage === pageCount && pageCount > 1 || currentPage>3) {
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
    return pageNumbers.map((page) => (
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
  
  const mapStateToProps = (state) => {
    return {
      allPokemons: state.allPokemons,
      filteredPokemons: state.filteredPokemons,
      orderedPokemons: state.orderedPokemons,
    };
  };
  
  export default connect(mapStateToProps, null)(Home);