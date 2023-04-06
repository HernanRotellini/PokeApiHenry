import React from "react"
import { validate } from "./validation";


function Form(props){
    const [postPokemon, setPostPokemon] = React.useState({});
  //  const [errors, setErrors] = React.useState();
    const onChange = (event)=>{
        const { name, value} = event.target
       setPostPokemon({[name]:value})
    }
    function onSubmit(event) {
        event.preventDefault();
        const errors = validate(postPokemon);
       // setErrors(errors);
       
      }
    
    return (
        <form onSubmit={onSubmit} action="">
            <label htmlFor="name">Usuario:</label>
            <input type="text" onChange={onChange} value={postPokemon.name} name="name" placeholder="Ingrese su usuario"/>
            
            <label htmlFor="image">Imagen:</label>
            <input type="file" name="image" id="image" />
            <button type="submit">Crear Pokemon</button>
        </form>
    )
}
export default Form