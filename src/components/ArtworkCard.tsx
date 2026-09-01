import type { Artwork } from "../types/Artwork";

type ArtworkCardProps = {
  artwork: Artwork;
};

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const title = artwork.title;
  const url = artwork.images.web?.url;
  const description = artwork.creators[0]?.description;

  //   console.log(iiifUrl);
  console.log("image_id:", url);
  // console.log("imageUrl:", imageUrl);
  return (
    <div className="artwork-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <img src={url} alt={title} />
    </div>
  );
};

export default ArtworkCard;
