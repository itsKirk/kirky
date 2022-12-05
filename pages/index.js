/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { createContext, useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import { SearchContext } from "../contexts/SearchContext";
import { getToken } from "../utils/token";
export const getStaticProps = async () => {
  const token = await getToken();
  const url = "https://api.spotify.com/v1/browse/new-releases";
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const newReleases = await response.json();
    return {
      props: {
        newReleases,
        Error: "",
      },
      revalidate: 1,
    };
  } catch (Error) {
    return {
      props: {
        Error,
      },
    };
  }
};

export default function Home({ newReleases, Error }) {
  const [albums, setAlbums] = useState(newReleases);
  const [error, setError] = useState(Error);
  const { searchTerm } = useContext(SearchContext);
  console.log(albums);
  useEffect(() => {
    if (newReleases) {
      try {
        setAlbums(newReleases);
        console.log("new releases found", newReleases);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    } else {
      setError({ error: "Error fetching data" });
      setAlbums({ albums: null });
    }
  }, [newReleases]);

  return (
    <div className="w-full h-full">
      <Header />
      <Main albums={albums} fetchError={error} />
    </div>
  );
}
