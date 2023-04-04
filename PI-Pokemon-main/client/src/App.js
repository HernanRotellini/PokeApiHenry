import './App.css';
import { Routes, Route } from "react-router-dom";

import Home from './Components/Home/home.jsx';
import Landing from './Components/Landing/landing';
import Detail from './Components/Detail/detail.jsx';
function App() {

  return (
    <Routes>
       <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/detail/:idPokemon' element={<Detail/>}/>
    </Routes>
    
  );
}

export default App;
