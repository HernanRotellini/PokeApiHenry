import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL, GET_POKEMON_NAME, POST_POKEMON } from "./actionstype";

const initialState= {
allPokemons:[],
pokemonDetail:{},
orderedPokemons:[],
filteredPokemons:[],
}

const reducer = (state= initialState, action)=>{
    switch(action.type){
        case GET_ALL_POKEMONS:{
            return {
                ...state, 
                allPokemons : action.payload,
            }
        }
        case GET_POKEMON_DETAIL:{
            return{
                ...state, 
                pokemonDetail: action.payload,
            }
        }
        case GET_POKEMON_NAME:{
            return{
                ...state,
                filteredPokemons: state.allPokemons.filter((poke) =>{return poke.name === action.payload.name})
            }
        }
        case POST_POKEMON:{
            return{
                ...state,
                allPokemons: [...state.allPokemons,action.payload]
            }
        }
        default: {
        return{
            ...state,
        }
    }
    }
}
export default reducer;