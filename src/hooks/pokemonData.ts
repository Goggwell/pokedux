import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { actions } from "../redux/pokemonData";
import { useTypedSelector } from "../redux/types";
import type { PokemonRouteParams } from "../routing";

export const usePokemonDataEffect = () => {
    const dispatch = useDispatch();
    const { pokemonName } = useParams<PokemonRouteParams>();

    useEffect(() => {
        dispatch(actions.fetchData({
            name: pokemonName?.toLowerCase()
        }));
    }, [dispatch, pokemonName]);
}

export const usePokemonDataState = () => {
    return useTypedSelector(state => state.pokemonData);
}