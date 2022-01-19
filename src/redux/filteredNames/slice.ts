import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import pokemon from "pokemon";
import Trie from "../../structures/trie";

const optimizedNames = pokemon.all("en").reduce((acc, cur) => {
    acc.insert(cur.toLowerCase());
    return acc;
}, new Trie());

export default createSlice({
    name: "filteredNames",
    initialState: {
        name: "",
        suggestions: [] as string[]
    },
    reducers: {
        updateSuggestions: (state, action: PayloadAction<string | undefined>) => {
            if (action.payload?.length) {
                state.name = action.payload;
                state.suggestions = Array.from(
                    optimizedNames.autocomplete(action.payload.toLowerCase())
                ).sort();
            } else {
                state.name = "";
                state.suggestions = [];
            }
        }
    }
});