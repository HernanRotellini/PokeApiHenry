import { loadFilters,filteredPokemons } from "../../redux/actions";
import Home from "../Home/home";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Filter() {
  const dispatch = useDispatch();
  
  const origin = useSelector((state) => state.saveFilters.origin);
  const filter = useSelector((state) => state.saveFilters.filter);
  useEffect(() => {
    dispatch(filteredPokemons(origin, filter));
  }, [dispatch,origin, filter]);

  const handleTypeFilterChange = (event) => {
    
    dispatch(loadFilters(origin, event.target.value));
  };

  const handleOriginFilterChange = (event) => {
   
    dispatch(loadFilters(event.target.value, filter));
  };

  return (
    <Home
      handleOriginFilterChange={handleOriginFilterChange}
      handleTypeFilterChange={handleTypeFilterChange}
    />
  );
}

export default Filter;

