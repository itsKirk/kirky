import { useRouter } from "next/router";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { getCategories, getCategoryPlaylists } from "../../utils/helpers";
export const getStaticPaths = async () => {
  try {
    const data = await getCategories();
    const paths = data.categories.items.map((item) => {
      return {
        params: {
          id: item.id,
        },
      };
    });
    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await getCategoryPlaylists(id);
  return {
    props: {
      data,
    },
  };
};

const ThisGenre = ({ data }) => {
  const router = useRouter();
  const handleClick = (id) => {
    router.push("/genres/play/" + id);
  };
  return (
    <div className="relative top-[80px] mx-auto w-4/5 h-full">
      <div className="w-full grid place-items-center grid-cols-5 gap-x-3 gap-y-4">
        {data &&
          data.playlists.items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              style={{
                backgroundImage: "url(" + item.images[0].url + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="w-[200px] relative group aspect-square cursor-pointer bg-secondary rounded-md hover:rotate-2 hover:opacity-70 duration-500 grid place-items-center text-md font-bold uppercase">
              <div className="hidden group-hover:grid bg-[green] w-12 absolute bottom-2 right-2 aspect-square  place-items-center cursor-default rounded-full hover:scale-110 duration-500">
                <FaPlay
                  size={25}
                  fill="red"
                  className="group-hover:rotate-[5deg]"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ThisGenre;
