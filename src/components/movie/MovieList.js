import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { api_key, fetcher, tmdbAPI } from "apiConfig/config";
import Skeleton from "loading/Skeleton";
import { v4 } from "uuid";
const MovieList = ({ type, movieID = null, similar = false }) => {
  const [movies, setMovies] = useState([]);
  const [url, setUrl] = useState(null);

  const { data } = useSWR(url, fetcher);
  useEffect(() => {
    setMovies(data?.results);
  }, [data]);

  const loaded = !!data;
  useEffect(() => {
    if (similar && movieID) {
      setUrl(tmdbAPI.getMovieInfo(movieID, similar));
    } else if (type) {
      setUrl(tmdbAPI.getMovieListType(type));
    }
  }, [movieID, similar, type]);

  return (
    <div className="movie-list">
      {loaded && (
        <Swiper
          modules={[Pagination]}
          spaceBetween={40}
          slidesPerView={4}
          grabCursor={true}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class=${className}></span>`;
            },
          }}
        >
          {movies?.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} api_key={api_key} loaded={loaded} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!loaded && (
        <Swiper modules={[Pagination]} spaceBetween={40} slidesPerView={4}>
          {new Array(20).fill(0).map(() => (
            <SwiperSlide key={v4()}>
              <MovieCardSkeleton />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex h-full flex-col rounded-lg bg-slate-800 p-3 text-white">
      <div className="h-[250px] overflow-hidden rounded-lg">
        <Skeleton />
      </div>

      <div className="flex-grown flex flex-col">
        <div className="movie-title mb-3 mt-2 flex">
          <Skeleton />
        </div>
        <div className="mb-10 flex items-center justify-between text-sm opacity-80">
          <div className="h-5 w-[35px]">
            <Skeleton />
          </div>
          <div className="flex items-center justify-center gap-x-1">
            <div className="h-5 w-4">
              <Skeleton />
            </div>
            <div className="h-5 w-5">
              <Skeleton />
            </div>
          </div>
        </div>
        <div className="h-12 w-full overflow-hidden rounded-lg">
          <Skeleton />
        </div>
      </div>
    </div>
  );
};
export default MovieList;
