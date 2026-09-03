import { useState, type SubmitEvent } from "react";

export type SearchMode =
  | "all"
  | "artists"
  | "title"
  | "medium"
  | "technique"
  | "culture";

export type SimpleSearchParams = {
  query: string;
  mode: SearchMode;
};

type SearchFormProps = {
  onSearch: (params: SimpleSearchParams) => void;
};

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedMode, setSelectedMode] = useState<SearchMode>("all");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch({
      query: searchInput,
      mode: selectedMode,
    });
  }

  const modes: SearchMode[] = [
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
