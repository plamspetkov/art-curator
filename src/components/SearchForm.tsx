import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import type { searchMode } from "../App";

type SearchFormProps = {
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSearchMode: Dispatch<SetStateAction<searchMode>>;
  setSelectedMode: Dispatch<SetStateAction<searchMode>>;
  selectedMode: searchMode;
};

const SearchForm = ({
  searchInput,
  setSearchInput,
  setSearchQuery,
  setSearchMode,
  selectedMode,
  setSelectedMode,
}: SearchFormProps) => {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchQuery(searchInput);
    setSearchMode(selectedMode);
  }

  const modes: searchMode[] = [
    "all",
    "artists",
    "title",
    "medium",
    "technique",
    "culture",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {modes.map((mode) => (
        <label key={mode}>
          <input
            type="radio"
            name="searchMode"
            value={mode}
            checked={selectedMode === mode}
            onChange={() => setSelectedMode(mode)}
          />
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </label>
      ))}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
