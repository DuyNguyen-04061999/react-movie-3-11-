import React from "react";
import { imgUrl } from "apiConfig/config";
import Button from "components/button/Button";

const Poster = ({ backdrop_path, title, genres, setOpenModal }) => {
  return (
    <section className="banner h-[500px] page-container mb-20">
      <div className="w-full h-full rounded-lg relative">
        <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.1)] rounded-lg"></div>

        <img
          src={`${imgUrl()}${backdrop_path}`}
          alt=""
          className="h-full w-full object-cover rounded-lg object-top"
        />

        <div className="absolute left-5 bottom-5 w-full text-white">
          <h2 className="font-bold text-3xl mb-5">{title}</h2>

          <div className="flex items-center gap-x-3 mb-8">
            {genres?.map((genre) => (
              <span
                key={genre?.id}
                className="py-2 px-4 border border-white rounded-md"
              >
                {genre?.name}
              </span>
            ))}
          </div>

          <Button onClick={setOpenModal} type="button">
            Watch Trailer
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Poster;
