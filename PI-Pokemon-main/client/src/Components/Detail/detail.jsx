import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getPokemonDetail } from "../../redux/actions";
import { useParams, NavLink } from "react-router-dom";
import "./detail.modules.css";
function Detail(props) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { idPokemon } = useParams();
  useEffect(() => {
    dispatch(getPokemonDetail(idPokemon)).then(() => {
      setTimeout(() => setLoading(false), 2000);
    });
  }, [dispatch, idPokemon]);
  const { pokemonDetail } = props;
  return (
    <div>
      {loading ? (
        <span class="loader"></span>
      ) : (
        <div className="detail-container">
  <div className="image-container">
    {pokemonDetail.image ? (
      <img className="image" src={pokemonDetail.image} alt="" />
    ) : (
      <h2>No se encontro imagen</h2>
    )}
  </div>
  <div className="left-column">
    {pokemonDetail.name ? (
      <h2>Nombre: {pokemonDetail.name}</h2>
    ) : (
      <h2>No tiene nombre</h2>
    )}
    <h2>Peso: {pokemonDetail.weight}</h2>
    <h2>Altura: {pokemonDetail.height}</h2>
    <div className="types-container">
  <h2>Tipos:</h2>
  {pokemonDetail.types ? (
    pokemonDetail.types.map((type, i) => {
      return <h2 key={i}>{type}</h2>;
    })
  ) : (
    null
  )}
</div>
  </div>
  <div className="right-column">
    <h2>Vida: {pokemonDetail.hp}</h2>
    <h2>Ataque: {pokemonDetail.attack}</h2>
    <h2>Defensa: {pokemonDetail.defense}</h2>
    <h2>Velocidad: {pokemonDetail.speed}</h2>
  </div>
  <div>
    <NavLink to="/home">
      <button className="buttons">Volver</button>
    </NavLink>
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
