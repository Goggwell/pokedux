import { configureStore } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import observableFetch from "./observableFetch";
import rootEpic from "./rootEpic";
import rootReducer from "./rootReducer";

const buildStore = (preloadedState: Parameters<typeof configureStore>[0]["preloadedState"] = undefined, disableMiddlewares = false) => {
    const epicMiddleware = createEpicMiddleware({dependencies: {observableFetch}});

    // const middlewares = process.env.NODE_ENV === "production" ? [epicMiddleware] : (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: false, serializableCheck: false, thunk: false }).concat(epicMiddleware)

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: false, serializableCheck: false, thunk: false }).concat(epicMiddleware), 
        preloadedState
    });

    if (!disableMiddlewares) epicMiddleware.run(rootEpic);

    return store;
}

export default buildStore;