import { useEffect, useState } from "react";
import "./App.css";
import ArtworkCard from "./components/ArtworkCard";
import type { Artwork } from "./types/Artwork";
import SearchForm, { type SearchMode } from "./components/SearchForm";
import ToggleButton from "./components/ToggleButton";
import AdvancedSearchForm, {
  type AdvancedSearchParams,
} from "./components/AdvancedSearchForm";

export type SearchView = boolean;

export type SubmittedSearchView = boolean;

function App() {
  const [searchView, setSearchView] = useState<SearchView>(false);
  const [submittedSearchView, setSubmittedSearchView] =
    useState<SubmittedSearchView>(false);

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [searchMode, setSearchMode] = useState<SearchMode>("all");

  const [advancedSearchParams, setAdvancedSearchParams] =
    useState<AdvancedSearchParams>({
      artist: "",
      title: "",
      technique: "",
      culture: "",
    });

  console.log("search query: ", searchQuery);

  useEffect(() => {
    const controller = new AbortController();
    async function getArtworks() {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();

      params.set("has_image", "1");

      // Simple Search Fields
      if (submittedSearchView === false) {
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
      }

      // Advanced Search Fields
      if (submittedSearchView === true) {
        if (advancedSearchParams.artist.trim()) {
          params.set("artists", advancedSearchParams.artist.trim());
        }

        if (advancedSearchParams.title.trim()) {
          params.set("title", advancedSearchParams.title.trim());
        }

        if (advancedSearchParams.technique.trim()) {
          params.set("technique", advancedSearchParams.technique.trim());
        }

        if (advancedSearchParams.culture.trim()) {
          params.set("culture", advancedSearchParams.culture.trim());
        }
      }

      const apiUrl = `https://openaccess-api.clevelandart.org/api/artworks?${params.toString()}`;

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
  }, [searchQuery, searchMode, advancedSearchParams, submittedSearchView]);

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
          onSearch={(params) => {
            setSearchQuery(params.query);
            setSearchMode(params.mode);
            setSubmittedSearchView(false);
          }}
        />
      )}

      {searchView === true && (
        <AdvancedSearchForm
          onSearch={(params) => {
            setAdvancedSearchParams(params);
            setSubmittedSearchView(true);
          }}
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
