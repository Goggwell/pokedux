import React from 'react';
import * as hooks from '../../hooks/filteredNames';

type Props = {
  selectedName: string;
  suggestions: string[];
  onType: (param: string) => void;
  onChoose: () => void;
};

const PokeSearch: React.FC<Props> = (props) => {
  return (
    <form
      onSubmit={(e) => {
        props.onChoose();
        e.preventDefault();
      }}
      className='search'
    >
      <input
        type='search'
        list='pokemonNames'
        placeholder='Search...'
        value={props.selectedName}
        onChange={(e) => {
          props.onType(e.target.value);
        }}
        className='search__input'
      />
      <datalist id='pokemonNames'>
        {props.suggestions.map((r) => (
          <option key={r} value={r} />
        ))}
      </datalist>
      <button type='submit' className='search__button'>
        Go
      </button>
    </form>
  );
};

const Search = () => {
  hooks.useInitialFilterSuggestionsEffect();
  const updateSuggestions = hooks.useUpdateSuggestionsCallback();
  const changeRoute = hooks.useChangeRouteCallback();
  const filterState = hooks.useFilterState();

  return (
    <div>
      <PokeSearch
        selectedName={filterState.name}
        suggestions={filterState.suggestions}
        onType={updateSuggestions}
        onChoose={changeRoute}
      />
    </div>
  );
};

export default Search;
