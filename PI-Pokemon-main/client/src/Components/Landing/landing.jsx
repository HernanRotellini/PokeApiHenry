import {NavLink} from 'react-router-dom'


function Landing(){
    return (
        <div>
            <NavLink to="/home">
                <button>Ingresar</button>
            </NavLink>
        </div>
    )
}
export default Landing;
