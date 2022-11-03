import React, { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "apiConfig/config";
import useDebounce from "hooks/useDebounce";
import Skeleton from "loading/Skeleton";
import Banner from "components/banner/Banner";
import MovieCard from "components/movie/MovieCard";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
import useSWRInfinite from "swr/infinite";

const Movies = () => {
  const [filmFilter, setFilmFilter] = useState(null);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(tmdbAPI.getMoviePopular(page));

  const filmQuery = useDebounce(filmFilter, 1000);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const movies = data ? data?.reduce((a, b) => [...a, ...b?.results], []) : [];
  const isEmpty = data?.[0]?.results?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.page >= data[data.length - 1]?.total_pages);

  const loading = !data || error;
  useEffect(() => {
    if (filmQuery) {
      setUrl(tmdbAPI.getMovieQuery(filmQuery, page));
    } else {
      setUrl(tmdbAPI.getMoviePopular(page));
    }
  }, [filmQuery, page]);

  const handleChange = (e) => {
    setFilmFilter(e.target.value);
  };
  return (
    <div className="py-10">
      <Banner type="popular" />

      <form
        action=""
        className="mx-auto my-20 flex h-16 w-full max-w-[600px] items-center overflow-hidden"
      >
        <input
          type="text"
          onChange={handleChange}
          placeholder="Type to search..."
          className="h-full flex-grow rounded-lg rounded-r-none p-4 outline-none"
        />
        <button
          type="submit"
          className="h-full rounded-lg rounded-l-none bg-primary px-6 py-4 text-xl uppercase text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>

      <div className="mx-auto mb-10 grid max-w-[1200px] grid-cols-4 gap-5 px-[30px]">
        {!loading
          ? movies?.map((movie) => <MovieCard movie={movie} key={v4()} />)
          : new Array(20)
              .fill(data?.results?.length)
              .map(() => <MovieLoadingItem key={v4()} />)}
      </div>

      <button
        className={`mx-auto block w-max rounded-lg bg-primary px-5 py-4 text-center uppercase text-white ${
          isEmpty || (isReachingEnd && "cursor-not-allowed bg-opacity-75")
        }`}
        onClick={() => setSize(size + 1)}
        disabled={isEmpty || isReachingEnd}
      >
        Load more
      </button>
    </div>
  );
};

const MovieLoadingItem = () => {
  return (
    <div className="movie-card flex h-full flex-col rounded-lg bg-slate-800 p-3 text-white">
      <Skeleton width="100%" height="250px" borderRadius="4px" />

      <div className="flex flex-1 flex-col">
        <div className="">
          <Skeleton height="20px" marginTop="10px" />
          <Skeleton height="20px" marginTop="10px" />
        </div>
        <div className="mb-10 mt-3 flex items-center justify-between gap-x-4 text-sm opacity-80">
          <Skeleton height="20px" />
          <div className="flex items-center justify-center gap-x-1">
            <Skeleton height="20px" width="10px" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 46 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M46 16.4415H28.4009L23 0L17.5991 16.4415H0L14.3955 26.5585L8.78929 43L23 32.8106L37.2107 43L31.5942 26.5585L46 16.4415Z"
                fill="#FF9500"
              />
            </svg>
          </div>
        </div>

        <Skeleton padding="20px" />
      </div>
    </div>
  );
};

export default Movies;
