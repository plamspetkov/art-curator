import { useState, type SubmitEvent } from "react";

export type AdvancedSearchParams = {
  artist: string;
  title: string;
  technique: string;
  culture: string;
};

type AdvancedSearchFormProps = {
  onSearch: (searchParams: AdvancedSearchParams) => void;
};

const AdvancedSearchForm = ({ onSearch }: AdvancedSearchFormProps) => {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [technique, setTechnique] = useState("");
  const [culture, setCulture] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch({ artist, title, technique, culture });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Technique"
        value={technique}
        onChange={(e) => setTechnique(e.target.value)}
      />
      <input
        type="text"
        placeholder="Culture"
        value={culture}
        onChange={(e) => setCulture(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default AdvancedSearchForm;
