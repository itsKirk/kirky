import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  getCategories,
  getCategoryPlaylists,
  getHexColor,
} from "../../utils/helpers";
export const getStaticProps = async () => {
  const categories = await getCategories();
  return {
    props: {
      categories,
    }
  };
};
const Search = ({ categories }) => {
  const [playlists, setPlaylists] = useState([]);
  console.log(playlists);
  const router = useRouter();
  const handleClick = async (id) => {
    const data = await getCategoryPlaylists(id);
    setPlaylists(data.playlists.items);
    router.push("/genres/" + id);
  };
  return (
    <div className="relative top-20 w-full h-screen">
      <div className="max-w-5xl h-full  mx-auto p-4">
        <div className="text-primary font-extrabold uppercase p-2">
          Browse All
        </div>
        <div className="grid grid-cols-4 p-2 gap-x-1 gap-y-6">
          {categories.categories.items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              style={{
                backgroundImage:
                  "linear-gradient(to bottom," +
                  getHexColor() +
                  "," +
                  getHexColor() +
                  ")",
              }}
              className="w-[220px] aspect-square cursor-pointer overflow-hidden rounded-[10px] flex justify-start p-3 relative">
              <span className="uppercase text-[white] p-2 font-extrabold">
                {item.name}
              </span>
              <div
                className="absolute w-[100px] rounded bottom-0 -right-4 rotate-[25deg] aspect-square "
                style={{
                  backgroundImage: "url(" + item.icons[0].url + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
