import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, imgUrl, tmdbAPI } from "apiConfig/config";
import Button from "components/button/Button";

const Banner = ({ type }) => {
  const [backDrops, setbackDrops] = useState([]);
  const [types, setTypes] = useState([]);

  const moviesData = useSWR(tmdbAPI.getMovieListType(type), fetcher);
  const moviesGenres = useSWR(tmdbAPI.getMovieListGenre(), fetcher);
  
  useEffect(() => {
    const { data } = moviesData;
    setbackDrops(data?.results);
  }, [moviesData]);

  useEffect(() => {
    const { data } = moviesGenres;
    setTypes(data?.genres);
  }, [moviesGenres]);

  return (
    <section className="banner page-container mb-20 h-[500px]">
      <Swiper grabCursor={true}>
        {backDrops?.map((backDrop) => {
          return (
            <SwiperSlide key={backDrop?.id}>
              <BannerItem backDrop={backDrop} types={types} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ backDrop, types }) => {
  const { backdrop_path, title, genre_ids, id } = backDrop;
  const navigate = useNavigate();
  return (
    <div className="relative h-full w-full rounded-lg">
      <div className="overlay absolute inset-0 rounded-lg bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0.1)]"></div>

      <img
        src={`${imgUrl()}${backdrop_path}`}
        alt=""
        className="h-full w-full rounded-lg object-cover object-top"
      />

      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>

        <div className="mb-8 flex items-center gap-x-3">
          {genre_ids?.map((id) => {
            types?.forEach((type) => {
              if (id === type?.id) {
                id = type?.name;
              }
            });
            return (
              <span
                key={id}
                className="rounded-md border border-white py-2 px-4"
              >
                {id}
              </span>
            );
          })}
        </div>
        <Button onClick={() => navigate(`/movies/${id}`)} type="button">
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default Banner;
