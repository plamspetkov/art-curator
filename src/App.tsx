import { useEffect, useState } from "react";
import "./App.css";
import ArtworkCard from "./components/ArtworkCard";
import type { Artwork } from "./types/Artwork";

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  // const [iiif, setIiif] = useState<string>("");

  useEffect(() => {
    async function getArtworks() {
      // const apiUrl =
      //   "https://openaccess-api.clevelandart.org/api/exhibitions/453138?indent=1";
      const apiUrl =
        "https://openaccess-api.clevelandart.org/api/artworks?has_image=1";

      try {
        const response = await fetch(apiUrl, { method: "GET" });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.data[0]);
        // console.log(data.config.iiif_url);
        setArtworks(data.data);
        // setIiif(data.config.iiif_url);
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
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </>
  );
}

export default App;
