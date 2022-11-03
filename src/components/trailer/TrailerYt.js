import React, { useEffect, useState } from "react";

const TrailerYt = ({ videos, type }) => {
  const trailer = "Trailer";
  const [videoID, setVideoID] = useState();
  useEffect(() => {
    Array.isArray(videos) &&
      videos?.forEach((video) => {
        if (video?.type === type || video?.type === trailer) {
          setVideoID(video?.key?.toString());
        }
      });
  }, [type, videos]);

  return (
    <div className="aspect-video">
      <iframe
        width="711"
        height="400"
        src={`https://www.youtube.com/embed/${videoID}?autoplay=1`}
        title={`${videos?.name}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        autoPlay
      ></iframe>
    </div>
  );
};

export default TrailerYt;
