import { useNavigate } from "react-router-dom";
import "./card.modules.css";
function Card(props) {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/detail/${props.id}`);
  };

  return (
    <div className="card-container" key={props.id} onClick={handleDetailClick}>
      {props.name ? <h2>{props.name}</h2> : <h2>No tiene nombre</h2>}
      <br />
      {props.image ? (
        <img src={props.image} alt="" />
      ) : (
        <h2>No se encontro imagen</h2>
      )}

      <div>
        <div className="types">
          {props.types ? (
            props.types.map((type, i) => {
              let typeClass = "";
              let imgSrc = "";
              switch (type) {
                case "Normal":
                  typeClass = "Normal";
                  imgSrc="https://i.postimg.cc/PNs930w9/Captura-de-pantalla-813-Cropped-16.png"
                  break;
                case "Fire":
                  typeClass = "Fire";
                  imgSrc="https://i.postimg.cc/CLCwy4xk/Captura-de-pantalla-813-Cropped-3.png"
                  break;
                case "Water":
                  typeClass = "Water";
                  imgSrc="https://i.postimg.cc/9QWCcqDS/Captura-de-pantalla-813-Cropped-2.png"
                  break;
                case "Flying":
                  typeClass = "Flying";
                  imgSrc= "https://i.postimg.cc/521NjRRs/Captura-de-pantalla-813-Cropped-11.png"
                  break;
                  case "Fighting":
                    typeClass = "Fighting";
                    imgSrc= "https://i.postimg.cc/KYjbMSrD/Captura-de-pantalla-813-Cropped.png"
                    break;
                case "Poison":
                  typeClass = "Poison";
                  imgSrc="https://i.postimg.cc/xjz05Qrs/Captura-de-pantalla-813-Cropped-5.png"
                  break;
                case "Grass":
                  typeClass = "Grass";
                  imgSrc="https://i.postimg.cc/TwZTx7bq/Captura-de-pantalla-813-Cropped-8.png"
                  break;
                case "Ground":
                  typeClass = "Ground";
                  imgSrc="https://i.postimg.cc/Dzp2jyyN/Captura-de-pantalla-813-Cropped-9.png"
                  break;
                case "Rock":
                  typeClass = "Rock";
                  imgSrc="https://i.postimg.cc/FHZFSxtN/Captura-de-pantalla-813-Cropped-14.png"
                  break;
                case "Electric":
                  typeClass = "Electric";
                  imgSrc="https://i.postimg.cc/sDC30Ls3/Captura-de-pantalla-813-Cropped-4.png"
                  break;
                case "Bug":
                  typeClass = "Bug";
                  imgSrc="https://i.postimg.cc/VvnmkqBy/Captura-de-pantalla-813-Cropped-6.png"
                  break;
                case "Ghost":
                  typeClass = "Ghost";
                  imgSrc="https://i.postimg.cc/7LZHnTD7/Captura-de-pantalla-813-Cropped-10.png"
                  break;
                case "Steel":
                  typeClass = "Steel";
                  imgSrc="https://i.postimg.cc/RC60YftL/Captura-de-pantalla-813-Cropped-15.png"
                  break;
                case "Psychic":
                  typeClass = "Psychic";
                  imgSrc="https://i.postimg.cc/hPVtDBpJ/Captura-de-pantalla-813-Cropped-13.png"
                  break;
                case "Ice":
                  typeClass = "Ice";
                  imgSrc="https://i.postimg.cc/jSZK2dNj/Captura-de-pantalla-813-Cropped-1.png"
                  break;
                case "Dragon":
                  typeClass = "Dragon";
                  imgSrc="https://i.postimg.cc/26qCPR1S/Captura-de-pantalla-813-Cropped-7.png"
                  break;
                case "Dark":
                  typeClass = "Dark";
                  imgSrc="https://i.postimg.cc/05TN1QdR/Captura-de-pantalla-813-Cropped-12.png"
                  break;
                case "Fairy":
                  typeClass = "Fairy";
                  imgSrc="https://i.postimg.cc/G2Lf6k93/Captura-de-pantalla-813-Cropped-17.png"
                  break;
                case "Unknown":
                  typeClass = "Unknown";
                  break;
                case "Shadow":
                  typeClass = "Shadow";

                  break;
                default:
                  typeClass = "";
              }
              return (
                <div key={i} className={`type ${typeClass}`}>
                  {type}
                  {imgSrc && <img src={imgSrc} alt={type} style={{ maxWidth: '15px',height: 'auto', marginLeft: '5px' }} />}
                </div>
              );
            })
          ) : (
            <h4>Unknown</h4>
          )}
        </div>
      </div>
    </div>
  );
}
export default Card;
