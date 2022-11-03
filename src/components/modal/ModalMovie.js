import React, { useEffect, useState } from "react";
import TrailerYt from "components/trailer/TrailerYt";
import ModalBase from "./ModalBase";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";

const ModalMovie = ({ id, type, ...props }) => {
  const { data } = useSWR(tmdbAPI?.getMovieVideo(id), fetcher);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(data?.videos?.results);
  }, [data?.videos?.results]);

  if (!data) return null;
  return (
    <>
      <ModalBase {...props}>
        <TrailerYt videos={videos} type={type} />
      </ModalBase>
    </>
  );
};

export default ModalMovie;
