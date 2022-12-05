import React from "react";
import { FaPlay } from "react-icons/fa";

const PlaylistCard = ({ playlist }) => {
  return (
    <div>
      <div className="w-[200px] h-[230px] cursor-pointer flex flex-col">
        <div
          className="w-full relative h-[200px] hover:rounded-lg grid hover:rotate-2 place-items-center group opacity-80 hover:opacity-50 duration-500"
          style={{
            backgroundImage:
              "url(" + playlist.images[0].url + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          <span className="absolute hidden group-hover:animate-pulse group-hover:block opacity-20 ">
            <FaPlay size={100} fill="red" />
          </span>
          <div className="absolute hidden group-hover:grid rounded-lg place-items-center w-full p-1 bg-redFire/25 text-[white] text-center text-xs duration-500 animate-bounce ">
            {playlist.description}
          </div>
        </div>
        <div className=" w-full py-2 grid place-items-center">
          {playlist.name}
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
