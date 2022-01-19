import { combineReducers } from "@reduxjs/toolkit";
import filteredNames from "./filteredNames";
import pokemonData from "./pokemonData";
import pokemonList from "./pokemonList";

export default combineReducers({
    pokemonList,
    pokemonData,
    filteredNames
});