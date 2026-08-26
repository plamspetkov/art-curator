import React from "react";
import type { Artwork } from "../App";

const ArtworkCard = ({ title, artist_display }: Artwork) => {
  return (
    <div className="artwork-card">
      <h2>{title}</h2>
      <p>{artist_display}</p>
    </div>
  );
};

export default ArtworkCard;
