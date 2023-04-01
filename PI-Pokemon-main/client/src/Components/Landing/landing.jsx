import {NavLink} from 'react-router-dom'
import './landing.modules.css'

function Landing(){
    return (
        <div className='Landing'>
            <NavLink to="/home">
                <button>Ingresar</button>
            </NavLink>
        </div>
    )
}
export default Landing;
