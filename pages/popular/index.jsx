import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import PlaylistCard from "../../components/PlaylistCard";
import { useRouter } from "next/router";
import { getFeaturedPlaylists } from "../../utils/helpers";

export const getStaticProps = async () => {
  const data = await getFeaturedPlaylists();
  return {
    props: {
      data,
    },
  };
};
const Playlists = ({ data }) => {
  // console.log(data.playlists);
  const [playLoad, setPlayLoad] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (data.playlists) {
      setPlayLoad(
        data.playlists.items.map((item) => {
          return {
            payLoad: {
              id: item.id,
              description: item.description,
              cover: item.images[0].url || "/public/default.jpg",
              name: item.name,
            },
          };
        })
      );
      setReady(true);
      // console.log(playLoad);
    } else {
      console.log("no data available");
    }
  }, [ready]);
  const router = useRouter();
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
            Listen to the most popular music at this time on Kirky music
            community
          </p>
        </div>
        <div className="w-full gap-x-1 gap-y-[14px] grid grid-cols-6 place-items-center p-4 ">
          {data.playlists.items.map((playlist) => (
            <PlaylistCard
              onClick={() => router.push("/playlists/" + playlist.id)}
              key={playlist.id}
              playlist={playlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlists;
