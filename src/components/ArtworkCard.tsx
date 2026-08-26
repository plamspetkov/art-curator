import type { Artwork } from "../types/Artwork";

type ArtworkCardProps = {
  artwork: Artwork;
  iiifUrl: string;
};

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const { title, artist_display, iiif_url, image_id } = artwork;

  console.log(iiif_url);
  return (
    <div className="artwork-card">
      <h2>{title}</h2>
      <p>{artist_display}</p>
      <img src={iiif_url + "/" + image_id} alt={title} />
    </div>
  );
};

export default ArtworkCard;
