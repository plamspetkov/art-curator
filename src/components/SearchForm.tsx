type SearchFormProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchForm = ({ searchQuery, setSearchQuery }: SearchFormProps) => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
