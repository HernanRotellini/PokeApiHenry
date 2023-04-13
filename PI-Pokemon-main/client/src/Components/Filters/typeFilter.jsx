import { loadFilters,filteredPokemons } from "../../redux/actions";
import Home from "../Home/home";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Filter() {
  const dispatch = useDispatch();
  const [typeFilter, setTypeFilter] = useState("All");
  const [originFilter, setOriginFilter] = useState("Any");
  const order = useSelector((state) => state.saveFilters.order);
  const filter = useSelector((state) => state.saveFilters.filter);
  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value).then(
      dispatch(loadFilters(order, typeFilter))
    ).then(dispatch(filteredPokemons(originFilter,typeFilter)))
  };
  const handleOriginFilterChange = (event) => {
    setOriginFilter(event.target.value).then(
      dispatch(loadFilters(originFilter, filter))
    );
  };
  return (
    <Home
      handleOriginFilterChange={handleOriginFilterChange}
      handleTypeFilterChange={handleTypeFilterChange}
    />
  );
}

export default Filter();

