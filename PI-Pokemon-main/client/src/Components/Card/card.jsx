function Card(props) {
    
    return (
            <div key={props.id}>
              {props.image ? <img src={props.image} alt="" />: <h2>No se encontro imagen</h2>}
              {props.name ?<h2>{props.name}</h2>: <h2>No tiene nombre</h2>}
              {props.types?
           
            props.types.map((type) => {
             return <h4 key={type.id}>{type}</h4>;
            }): <h2>Unknown</h2>
        }
            </div>
      
    );
 
  }
  export default Card