import { useNavigate } from "react-router-dom";
import "./card.modules.css"
function Card(props) {
    
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/detail/${props.id}`);
  };

    return (
      
            <div className="card-container" key={props.id} onClick={handleDetailClick}>
              {props.name ?<h2>{props.name}</h2>: <h2>No tiene nombre</h2>}
              <br />
              {props.image ? <img src={props.image} alt="" />: <h2>No se encontro imagen</h2>}
              
              <div>
              {props.types?
         
            props.types.map((type,i) => {
             return <h4 key={i}>{type}</h4>;
            }): <h2>Unknown</h2>
            
        }
        </div>
            </div>
          
    );
 
  }
  export default Card