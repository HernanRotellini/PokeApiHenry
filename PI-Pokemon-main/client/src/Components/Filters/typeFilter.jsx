import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loadFilters} from "../../redux/actions"

function Filter(){
const dispatch = useDispatch();
const [typeFilter, setTypeFilter] = useState("All");
const [originFilter, setOriginFilter] = useState("Any");
const order = useSelector(state => state.saveFilters.order);
const filter = useSelector(state => state.saveFilters.filter);
const handleTypeFilterChange = (event) => {
  setTypeFilter(event.target.value)
  .then(dispatch(loadFilters(order, typeFilter)))
};
const handleOriginFilterChange = (event) => {
  setOriginFilter(event.target.value)
  .then(dispatch(loadFilters(originFilter, filter)))
};
}

export default Filter()