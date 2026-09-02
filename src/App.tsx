import { useEffect, useState } from "react";
import "./App.css";
import ArtworkCard from "./components/ArtworkCard";
import type { Artwork } from "./types/Artwork";
import SearchForm from "./components/SearchForm";

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    async function getArtworks() {
      setError(null);
      // const apiUrl =
      //   "https://openaccess-api.clevelandart.org/api/exhibitions/453138?indent=1";
      const apiUrl =
        "https://openaccess-api.clevelandart.org/api/artworks?has_image=1";

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
  }, []);

  return (
    <>
      <h1>Art Curator</h1>

      <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
