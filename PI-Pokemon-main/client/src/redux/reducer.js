
import {SET_TYPES, GET_ALL_POKEMONS, GET_POKEMON_DETAIL, GET_POKEMON_NAME, POST_POKEMON, FILTERED_POKEMONS,ORDERED_POKEMONS, ALL_TYPES } from "./actionstype";

const initialState= {
allPokemons:[],
pokemonDetail:{},
orderedPokemons:[],
filteredPokemons:[],
allTypes: [],
saveFilters:{order:null,type:null}

}

const reducer = (state= initialState, action)=>{
    switch(action.type){
        case GET_ALL_POKEMONS:{
            return {
                ...state, 
                allPokemons : action.payload,
                filteredPokemons: [...state.allPokemons],
                orderedPokemons: [],
                pokemonDetail:{},
            }
        }
        case GET_POKEMON_DETAIL:{
            return{
                ...state, 
                pokemonDetail: action.payload,
            }
        }
        case GET_POKEMON_NAME:{
            if(action.payload.data.length>0){
               
                return{
                  ...state,
                  orderedPokemons:[...action.payload.data]
                }
            
            }else{
                return{
                    ...state,
                    orderedPokemons:[]
                }
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
            return {}})
            }
        }
        case ORDERED_POKEMONS: {
            if (action.payload === 'NoOrder') {
                return {
                    ...state,
                    orderedPokemons: []
                };
              }
            // if(state.orderedPokemons.length){
            //     let orderPokemons = [...state.orderedPokemons];
            //     switch (action.payload) {
            //         case 'A-Z':
            //           orderPokemons.sort((a, b) => a.name.localeCompare(b.name));
            //           break;
            //         case 'Z-A':
            //           orderPokemons.sort((a, b) => b.name.localeCompare(a.name));
            //           break;
            //         case 'Asc':
            //           orderPokemons.sort((a, b) => a.attack - b.attack);
            //           break;
            //         case 'Desc':
            //           orderPokemons.sort((a, b) => b.attack - a.attack);
            //           break;
            //         default:
            //           break;
            //       }
            //     return{
            //         ...state,
            //         orderedPokemons:[...orderPokemons],
            //     }
            // }else{
            let orderPokemons = [...state.filteredPokemons];
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
        case SET_TYPES:{
            if(action.payload.type !== state.saveFilters.type){
                state.saveFilters.type = action.payload.type
            }
            if(action.payload.order !== state.saveFilters.order){
                state.saveFilters.order = action.payload.order
            }
            return{
                ...state
            }
        }
            case ALL_TYPES:
                {
                return {
                    ...state,
                    allTypes: action.payload
                }
            }
          
        default: {
       return state  
    }
    }
}
export default reducer;