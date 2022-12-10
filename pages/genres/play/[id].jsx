import React from "react";
import { getPlaylist, getCategories } from "../../../utils/helpers";
export const getStaticPaths = async () => {
  try {
    const data = await getCategories();
    const paths = data.categories.items.map((item) => {
      return {
        params: {
          id: item.id,
        },
      };
      console.log(params);
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
  const data = await getPlaylist(id);
  return {
    props: {
      data,
    },
  };
};

const NowPlaying = ({ data }) => {
  console.log("now playing", data);

  return <div>NowPlaying</div>;
};

export default NowPlaying;
