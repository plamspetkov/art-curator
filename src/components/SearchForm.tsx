type SearchFormProps = {
  searchInput: string;
  setSearchInput: (input: string) => void;
};

const SearchForm = ({ searchInput, setSearchInput }: SearchFormProps) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
