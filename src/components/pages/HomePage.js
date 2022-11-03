import React from "react";
import MovieList from "components/movie/MovieList";

const HomePage = () => {
  return (
    <>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Now Playing
        </h2>

        <MovieList type="now_playing"/>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top trending
        </h2>

        <MovieList type="popular"/>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top rated
        </h2>

        <MovieList type="top_rated"/>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Up Coming
        </h2>

        <MovieList type="upcoming"/>
      </section>
    </>
  );
};

export default HomePage;
