import { useEffect, useState } from "react";
import {connect} from "react-redux"
import { useDispatch } from "react-redux";
import {getPokemonDetail} from "../../redux/actions"
import { useParams, Link} from "react-router-dom";
import "./detail.modules.css"
function Detail(props) {
  const [loading,setLoading]= useState(true)
    const dispatch = useDispatch()
    const {idPokemon}= useParams()
    useEffect(()=>{
        dispatch(getPokemonDetail(idPokemon)).then(() => {
          setTimeout(() => setLoading(false), 2000);
        });
    },[dispatch,idPokemon])
    const {pokemonDetail} = props;
    return (
      <div >
        {loading ? (
         <span class="loader"></span>
        ) : (
          <div>
            <div className="fondoDetail" key={pokemonDetail.id}>
              {pokemonDetail.image ? <img className="image" src={pokemonDetail.image} alt="" />: <h2>No se encontro imagen</h2>}
              {pokemonDetail.name ?<h2>{pokemonDetail.name}</h2>: <h2>No tiene nombre</h2>}
              {pokemonDetail.types?
              pokemonDetail.types.map((type,i) => {
                return <h4 key={i}>{type}</h4>;
              }): <h2>Unknown</h2>
              }
              {pokemonDetail.hp ? <h2>Hp: {pokemonDetail.hp}</h2>: <h2>No tiene hp</h2>}
              <h2>Attack: {pokemonDetail.attack}</h2>
              <h2>Defense: {pokemonDetail.defense}</h2>
              <h2>Speed: {pokemonDetail.speed}</h2>
              <h2>Weight: {pokemonDetail.weight}</h2>
              <h2>Height: {pokemonDetail.height}</h2>
            </div>
              
            <div>
              <Link to="/home">
                <button></button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  const mapStateToProps = (state) => {
    return {
      pokemonDetail: state.pokemonDetail,
    };
  };
  
  export default connect(mapStateToProps, null)(Detail);
