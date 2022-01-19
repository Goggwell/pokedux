import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../redux/types";
import { actions } from "../redux/filteredNames";
import { pokemonRoute } from "../routing";

export function useInitialFilterSuggestionsEffect() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.updateSuggestions());
    }, [dispatch]);
}
  
export function useUpdateSuggestionsCallback() {
    const dispatch = useDispatch();

    return useCallback(
        (filterParam: string) => {
            dispatch(actions.updateSuggestions(filterParam));
        },
        [dispatch]
    );
}
  
export function useChangeRouteCallback() {
    const navigate = useNavigate();
    const filterState = useTypedSelector(state => state.filteredNames);

    return () => {
        if (filterState.name.trim().length > 0)
            navigate(pokemonRoute.generate({ pokemonName: filterState.name }));
    };
}

export function useFilterState() {
    return useTypedSelector(state => state.filteredNames);
}