import { useEffect, useState } from "react";
import "./App.css";
import ArtworkCard from "./components/ArtworkCard";

export type Artwork = {
  id: number;
  title: string;
  artist_display: string;
  is_public_domain: boolean;
  image_id: string;
};

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    async function getArtworks() {
      const url = "https://api.artic.edu/api/v1/artworks";

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArtworks(data.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    }

    getArtworks();
  }, []);

  return (
    <>
      <h1>Art Curator</h1>
      <div className="artwork-grid">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} {...artwork} />
        ))}
      </div>
    </>
  );
}

export default App;
