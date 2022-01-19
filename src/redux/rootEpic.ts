import { combineEpics, Epic } from "redux-observable";
import type { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { epics as pokemonDataEpic } from "./pokemonData";
import { epics as pokemonListEpic } from "./pokemonList";

const epics = [pokemonListEpic, pokemonDataEpic];

const rootEpic: Epic = (action$, store$, dependencies) => 
    (combineEpics(...epics)(action$, store$, dependencies) as Observable<unknown>).pipe(catchError((error, source) => { console.error(error); return source; }));

export default rootEpic;