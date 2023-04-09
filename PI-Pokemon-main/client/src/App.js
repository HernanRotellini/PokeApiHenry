import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";

import Home from './Components/Home/home.jsx';
import Landing from './Components/Landing/landing';
import Detail from './Components/Detail/detail.jsx';
import Form from './Components/Form/form';
import SearchBar from './Components/SearchBar/searchBar';
function App() {
  const location = useLocation();
  const showNav = location.pathname === "/home";
  function renderRoutes() {
    return (
      <>
      {showNav && <SearchBar/>}
        
        <Routes>
        <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/detail/:idPokemon' element={<Detail/>}/>
      <Route path='/create' element={<Form/>}/>
        </Routes>
      </>
    );
  }


  return (
   <div>
     {renderRoutes()}
   </div>
    
  );
}

export default App;
