import { useEffect } from "react";
import {connect} from "react-redux"
import { useDispatch } from "react-redux";
import {getAllPokemons} from "../../redux/actions"
import Card from "../Card/card"
function Home(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllPokemons());
    }, [dispatch]);
  
    return (
      <div>
      {props.allPokemons.map((pokemon)=>{
        return(
         <Card id={pokemon.id} name={pokemon.name} image={pokemon.image} 
         
         types={pokemon.types}/>
        )
      })}
      </div>
    )
     
       
  }
  
  const mapStateToProps = (state) => {
    return {
      allPokemons: state.allPokemons,
    };
  };
  
  export default connect(mapStateToProps, null)(Home);