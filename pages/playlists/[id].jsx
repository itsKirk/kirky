import React from "react";
import { getToken } from "../../utils/token";
export const getStaticPaths = async () => {
  const token = await getToken();
  const url = "https://api.spotify.com/v1/browse/featured-playlists";
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const paths = data.playlists.items.map((list) => {
      return {
        params: {
          id: list.id,
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
  const token = await getToken();
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  console.log(token);
  const playlistUrl = "https://api.spotify.com/v1/playlists/" + id + "/tracks";
  const response = await fetch(playlistUrl, options);
  const playlistData = await response.json();

  return {
    props: {
      playlistData,
    },
  };
};
const Play = ({ playlistData }) => {
  console.log(playlistData.items);
  return <div>Play</div>;
};

export default Play;
