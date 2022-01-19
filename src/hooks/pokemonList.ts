import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { actions as pokemonDataActions } from "../redux/pokemonData";
import { actions } from "../redux/pokemonList";
import { useTypedSelector } from "../redux/types";
import { listRoute, pokemonRoute } from "../routing";

export const useFetchInitialPageEffect = () => {
    const dispatch = useDispatch();
    const pageState = useTypedSelector(state => state.pokemonList);

    useEffect(() => {
        if (pageState.currentPage === 0)
            dispatch(actions.fetchPage({
                offset: 0,
                size: 20
            })
        );
    }, [dispatch, pageState.currentPage]);

    useEffect(() => {
        dispatch(pokemonDataActions.clearData());
    }, [dispatch]);
}

export const useFetchPage = () => {
    const dispatch = useDispatch();
    const pageState = useTypedSelector(state => state.pokemonList);

    return {
        fetchPrevPage: () => {
            if (pageState.data?.previous)
                dispatch(actions.fetchPage({
                    url: pageState.data.previous
                })
            );
        },
        fetchNextPage: () => {
            if (pageState.data?.next)
                dispatch(actions.fetchPage({
                    url: pageState.data.next
                })
            );
        }
    };
}

export const usePokemonPageState = () => {
    return useTypedSelector(state => state.pokemonList);
}

type ListHistoryState = {
    scrollTop?: number;
};

type DetailsHistoryState = {
    listIsAvailable?: boolean;
};

export const useGoToDetails = (scrollAreaRef: React.RefObject<HTMLElement>) => {
    const navigate = useNavigate();
    const location = useLocation();

    useLayoutEffect(() => {
        const historyState = location?.state as ListHistoryState | undefined;
        if (historyState?.scrollTop)
            scrollAreaRef.current?.scrollBy(0, historyState?.scrollTop);
    }, [location, scrollAreaRef]);

    return (pokemonName: string) => {
        navigate(location.pathname, { replace: true });

        navigate(pokemonRoute.generate({ pokemonName }));
    };
}

export const useGoBack = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goBack = useCallback(() => {
        const historyState = location?.state as DetailsHistoryState | undefined;
        if (historyState?.listIsAvailable) navigate(-1);
        else navigate(listRoute.path);
    }, [navigate, location]);

    return goBack;
}