import React from "react";
import { useNavigate } from "react-router-dom";
import { imgUrl } from "apiConfig/config";
import Button from "components/button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MovieCard = ({ movie }) => {
  const { poster_path, title, release_date, vote_average, id } = movie;
  const navigate = useNavigate();
  const handleClickMovieDetail = () => {
    navigate(`/movies/${id}`);
  };
  return (
    <div className="movie-card flex h-full flex-col rounded-lg bg-slate-800 p-3 text-white">
      <div
        className="h-[250px] cursor-pointer"
        onClick={handleClickMovieDetail}
      >
        <img
          onError={(event) => (event.target.style.display = "none")}
          src={`${imgUrl()}${poster_path}`}
          alt=""
          className="h-full w-full rounded-lg object-cover object-top"
        />
      </div>
      <div className="flex-grown flex flex-col">
        <h3 className="movie-title mb-3 mt-2 flex text-xl font-bold text-white">
          {title}
        </h3>
        <div className="mb-10 flex items-center justify-between text-sm opacity-80">
          <span>{new Date(release_date)?.getFullYear()}</span>
          <div className="flex items-center justify-center gap-x-1">
            <span>{vote_average?.toFixed(1)}</span>
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
        <Button
          onClick={() => navigate(`/movies/${id}`)}
          type="button"
          className="w-full"
        >
          Watch Now
        </Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    id: PropTypes.number,
  }),
};

const FallbackComponent = () => {
  return (
    <p className="bg-red-50 text-red-400">
      Some thing went wrong with this component
    </p>
  );
};

const ComponentWithErrorBoundary = withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export default ComponentWithErrorBoundary;
