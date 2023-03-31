import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home/home.jsx';

function App() {
  return (
    <Routes>
      <Route path='/home' element={<Home/>}></Route>
    </Routes>
    
  );
}

export default App;
