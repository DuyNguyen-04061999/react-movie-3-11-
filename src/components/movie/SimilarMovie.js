import React from "react";
import MovieList from "./MovieList";

const SimilarMovie = ({ movieID }) => {
  return (
    <div className="movie-list mt-20">
      <h3 className="capitalize text-white mb-10 text-3xl font-bold">
        Similar Movies
      </h3>
      <MovieList similar="similar" movieID={movieID} />
    </div>
  );
};

export default SimilarMovie;
