import type { Artwork } from "../types/Artwork";

type ArtworkCardProps = {
  artwork: Artwork;
};

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const { title, artist_display, url } = artwork;

  //   console.log(iiifUrl);
  console.log("image_id:", url);
  // console.log("imageUrl:", imageUrl);
  return (
    <div className="artwork-card">
      <h2>{title}</h2>
      <p>{artist_display}</p>
      <img src={url} alt={title} />
    </div>
  );
};

export default ArtworkCard;
