
import { GET_ALL_POKEMONS, GET_POKEMON_DETAIL, GET_POKEMON_NAME, POST_POKEMON, FILTERED_POKEMONS,ORDERED_POKEMONS } from "./actionstype";

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
        case FILTERED_POKEMONS: {
            return{
                ...state,
                filteredPokemons: state.allPokemons.filter(pokemon=>{
                if(action.payload.origin === "Api"){
                    if(action.payload.type !== "All"){
                return pokemon.types.includes(action.payload.type) && Number.isInteger(pokemon.id)
                    }else{
                        return Number.isInteger(pokemon.id)
                    }
                }
                if(action.payload.origin === "Database"){
                    if(action.payload.type !== "All"){
                        return pokemon.types.includes(action.payload.type) && !Number.isInteger(pokemon.id)
                            }else{
                                return !Number.isInteger(pokemon.id)
                            }
                }
                if(action.payload.origin === "Any"){
                    if(action.payload.type !== "All"){
                        return pokemon.types.includes(action.payload.type)
                    }else{
                        return pokemon
                    }
                }
            return "No se encontraron pokemones con ese tipo u origen"})
            }
        }
        case ORDERED_POKEMONS: {
            if (action.payload === 'NoOrder') {
                return {
                    ...state,
                    orderedPokemons: []
                };
              }
            let orderPokemons = [...state.filteredPokemons]; // Clonamos el array filtrado
            switch (action.payload) {
              case 'A-Z':
                orderPokemons.sort((a, b) => a.name.localeCompare(b.name));
                break;
              case 'Z-A':
                orderPokemons.sort((a, b) => b.name.localeCompare(a.name));
                break;
              case 'Asc':
                orderPokemons.sort((a, b) => a.attack - b.attack);
                break;
              case 'Desc':
                orderPokemons.sort((a, b) => b.attack - a.attack);
                break;
              default:
                break;
            }
            return {
              ...state,
              orderedPokemons: [...orderPokemons], 
             
            };
          }
        default: {
       return state  
    }
    }
}
export default reducer;