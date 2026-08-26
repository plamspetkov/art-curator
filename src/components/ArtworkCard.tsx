import type { Artwork } from "../types/Artwork";

type ArtworkCardProps = {
  artwork: Artwork;
  iiifUrl: string;
};

const ArtworkCard = ({ artwork, iiifUrl }: ArtworkCardProps) => {
  const { title, artist_display, image_id } = artwork;

  const imageUrl = `${iiifUrl}/${image_id}/full/843,/0/default.jpg`;

  console.log(iiifUrl);
  return (
    <div className="artwork-card">
      <h2>{title}</h2>
      <p>{artist_display}</p>
      <img src={imageUrl} alt={title} />
    </div>
  );
};

export default ArtworkCard;
