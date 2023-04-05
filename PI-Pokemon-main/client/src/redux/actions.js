import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL,GET_POKEMON_NAME, POST_POKEMON, FILTERED_POKEMONS,ORDERED_POKEMONS } from "./actionstype";
import axios from "axios"

export const getAllPokemons = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("http://localhost:3001/pokemons");
        return dispatch({ type: GET_ALL_POKEMONS, payload: response.data});
      } catch (error) {
        console.error(error);
      }
    };
  };

  export const getPokemonDetail = (idPokemon) => {
    return async (dispatch) => {
      try {
         const response = await axios.get(`http://localhost:3001/pokemons/${idPokemon}`)
        return dispatch({ type: GET_POKEMON_DETAIL, payload: response.data});
      } catch (error) {
        console.error(error);
      }
    };
  };
  export const getPokemonName = (name) => {
    return async (dispatch) => {
      try {
         const response = await axios.get(`http://localhost:3001/pokemons/${name}`)
        return dispatch({ type: GET_POKEMON_NAME, payload: response.data });
      } catch (error) {
        console.error(error);
      }
    };
  };

  export const postPokemon = (pokemon) => {
    return async (dispatch) => {
      try {
         await axios.post("http://localhost:3001/pokemons", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pokemon),
        });
        
        dispatch({ type: POST_POKEMON, payload: pokemon});
      } catch (error) {
        console.error(error);
      }
    };
  };

  export const filteredPokemons=(type= "All", origin = "Any")=>{
    return async (dispatch)=>{
      dispatch({type: FILTERED_POKEMONS, payload: type,origin})
    }
  }
  export const orderedPokemons=(order="NoOrder")=>{
    return async (dispatch)=>{
      dispatch({type: ORDERED_POKEMONS, payload: order})
    }
  }