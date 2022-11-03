import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, imgUrl, tmdbAPI } from "apiConfig/config";
import { Swiper, SwiperSlide } from "swiper/react";
import Poster from "components/banner/Poster";
import ModalMovie from "components/modal/ModalMovie";
import SimilarMovie from "components/movie/SimilarMovie";

const MovieDetailsPage = () => {
  const { movieID } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("Trailer");
  const { data } = useSWR(tmdbAPI?.getMovieDetails(movieID), fetcher);

  const handleClickOpenTrailer = (type) => {
    setType(type);
    setOpenModal(true);
  };

  if (!data) return null;
  const {
    backdrop_path,
    title,
    genres,
    release_date,
    vote_average,
    runtime,
    poster_path,
    overview,
  } = data;

  return (
    <>
      <Poster
        backdrop_path={backdrop_path}
        id={movieID}
        title={title}
        genres={genres}
        setOpenModal={() => setOpenModal(true)}
      />
      <div className="mx-auto flex max-w-[975px] items-center justify-between py-10">
        <div className="text-white">
          <h2 className="max-w-[500px] text-[60px] font-bold">{`${title} ${new Date(
            release_date
          ).getFullYear()}`}</h2>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                style={{
                  background: `conic-gradient(#f62682 ${
                    vote_average * 10 * 3.6
                  }deg, rgba(246,38,130,0.3) 0deg)`,
                }}
                className="relative h-[60px] w-[60px] rounded-full"
              >
                <div className="absolute left-1/2 top-1/2 flex h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black">
                  {vote_average?.toFixed(1)}
                </div>
              </div>
              <span className="text-xl font-medium capitalize">
                User <br /> score
              </span>
            </div>
            <span className="text-3xl">{`${parseInt(runtime / 60)}h ${
              runtime % 60
            }m`}</span>
          </div>
          <div className="mt-10 flex items-center gap-x-4">
            {genres?.map((item) => (
              <span
                key={item.id}
                className="rounded-md border border-white py-2 px-4 capitalize"
              >
                {item.name}
              </span>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-x-8">
            <button
              className="font-bold uppercase text-[#304FFE]"
              onClick={() => {
                handleClickOpenTrailer("Trailer");
              }}
            >
              watch trailer
            </button>
            <button className="rounded-2xl bg-primary py-7 px-9 font-bold uppercase">
              watch full movie
            </button>
          </div>
        </div>
        <div className="relative h-[550px] w-[400px] overflow-hidden rounded-lg">
          <img
            src={`${imgUrl()}${poster_path}`}
            alt=""
            className="h-full w-full object-cover"
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none"
            onClick={() => {
              handleClickOpenTrailer("Teaser");
            }}
          >
            <svg
              width="134"
              height="134"
              viewBox="0 0 134 134"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="67"
                cy="67"
                r="64"
                fill="black"
                fillOpacity="0.6"
                stroke="white"
                strokeWidth="6"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M57.1449 32.0575L93.0281 62.6575C94.2434 63.6925 95 65.245 95 66.9775C95 68.71 94.2204 70.2625 93.0281 71.2975L57.2137 101.875L56.6175 102.393C56.0443 102.775 55.3564 103 54.6227 103C52.6279 103 51 101.335 51 99.265V34.735C51 32.665 52.6279 31 54.6227 31C55.3794 31 56.0902 31.2475 56.6634 31.6525L57.1449 32.0575Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        <ModalMovie
          onClose={() => setOpenModal(false)}
          visible={openModal}
          contentClassName="content z-10"
          type={type}
          id={movieID}
        />
      </div>

      <MovieOverView overview={overview} id={movieID} />
      <SimilarMovie movieID={movieID} />
    </>
  );
};

const MovieOverView = ({ overview, id }) => {
  const { data } = useSWR(tmdbAPI?.getMovieInfo(id, "credits"), fetcher);
  if (!data) return null;
  const { cast } = data;

  return (
    <div className="mx-auto mt-10 min-h-[1000px]  max-w-[1200px] rounded-2xl bg-gradient-to-b from-slate-900 to-[rgba(246,38,130,0.6)] p-10 px-[30px] text-white">
      <div className="">
        <h2 className="text-6xl font-medium capitalize ">Overview</h2>
        <p className="mt-10 text-xl leading-10 ">{overview}</p>
      </div>

      <div className="mt-20 select-none">
        <h2 className="mb-10 text-center text-6xl uppercase">Cast</h2>
        <Swiper
          className=""
          grabCursor={true}
          spaceBetween={30}
          slidesPerView={4}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class=${className}></span>`;
            },
          }}
        >
          {cast?.slice(0, 8).map((item) => (
            <SwiperSlide key={item.id} className="overflow-hidden rounded-2xl">
              <div className="h-[350px] w-full">
                <img
                  src={`${imgUrl()}${item?.profile_path}`}
                  alt=""
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="bg-white p-3 text-black">
                <h4 className="name-actor mb-2 h-20 text-4xl font-bold">
                  {item?.original_name}
                </h4>
                <span className="name-character text-2xl font-normal">
                  {item?.character || "Mass actor"}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
