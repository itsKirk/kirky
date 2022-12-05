import React from "react";
import { format } from "date-fns";
import { getToken } from "../../utils/token";
import PlaylistCard from "../../components/PlaylistCard";
export const getStaticProps = async () => {
  const token = await getToken();
  const url = "https://api.spotify.com/v1/browse/featured-playlists";
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
};
const Playlists = ({ data }) => {
  console.log(data.playlists);
  return (
    <div className="w-full h-screen relative top-[100px] px-4">
      <div className="w-full h-3 ">
        <div className="flex justify-center items-center">
          <div className="flex w-2/3  tracking-wider text-xl justify-between items-center">
            {format(new Date(), "PPP")}
            <p>Top Playlists</p>
            <p>{data.playlists.items.length} Playlists</p>
          </div>
        </div>
        <div className=" w-full text-center">
          <p className="p-4 text-2xl italic font-bold">
            Listen to the most popular music today on Kirky music community
          </p>
        </div>
        <div className="w-full gap-x-1 gap-y-[14px] grid grid-cols-6 place-items-center p-4 ">
          {data.playlists.items.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
