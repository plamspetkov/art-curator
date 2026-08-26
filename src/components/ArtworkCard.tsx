import type { Artwork } from "../types/Artworks";

type ArtworkCardProps = {
  artwork: Artwork;
};

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const { title, artist_display } = artwork;
  return (
    <div className="artwork-card">
      <h2>{title}</h2>
      <p>{artist_display}</p>
    </div>
  );
};

export default ArtworkCard;
