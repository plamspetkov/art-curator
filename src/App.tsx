import { useEffect, useState } from "react";
import "./App.css";
import ArtworkCard from "./components/ArtworkCard";
import type { Artwork } from "./types/Artwork";
import SearchForm from "./components/SearchForm";
import ToggleButton from "./components/ToggleButton";

export type SearchView = boolean;

export type SearchMode =
  | "all"
  | "artists"
  | "title"
  | "medium"
  | "technique"
  | "culture";

function App() {
  const [searchView, setSearchView] = useState<SearchView>(false);

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedMode, setSelectedMode] = useState<SearchMode>("all");
  const [searchMode, setSearchMode] = useState<SearchMode>("all");

  console.log("seach query: ", searchQuery);

  useEffect(() => {
    const controller = new AbortController();
    async function getArtworks() {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();

      params.set("has_image", "1");

      if (searchQuery.trim() !== "") {
        switch (searchMode) {
          case "artists":
            params.set("artists", searchQuery.trim());
            break;
          case "title":
            params.set("title", searchQuery.trim());
            break;
          case "medium":
            params.set("medium", searchQuery.trim());
            break;
          case "technique":
            params.set("technique", searchQuery.trim());
            break;
          case "culture":
            params.set("culture", searchQuery.trim());
            break;
          default:
            params.set("q", searchQuery.trim());
            break;
        }
      }

      const apiUrl = `https://openaccess-api.clevelandart.org/api/artworks?&${params.toString()}`;

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!controller.signal.aborted) {
          setArtworks(data.data);
        }
      } catch (error) {
        if (controller.signal.aborted) {
          console.log("Fetch aborted");
          return;
        }
        setError(`Error fetching artworks: ${error}`);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    getArtworks();

    return () => {
      controller.abort();
    };
  }, [searchQuery, searchMode]);

  return (
    <>
      <h1>Art Curator</h1>

      <ToggleButton
        pressed={searchView}
        onToggle={() => setSearchView((prev) => !prev)}
      >
        {searchView ? "ON" : "OFF"}
      </ToggleButton>
      {searchView === false && (
        <SearchForm
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSearchQuery={setSearchQuery}
          setSearchMode={setSearchMode}
          setSelectedMode={setSelectedMode}
          selectedMode={selectedMode}
        />
      )}

      {isLoading && <p>Loading artworks...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error && artworks.length === 0 && (
        <p>No artworks found.</p>
      )}

      {!isLoading && !error && artworks.length > 0 && (
        <div className="artwork-grid">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
