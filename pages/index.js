/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { createContext, useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import { SearchContext } from "../contexts/SearchContext";
import { getToken } from "../utils/token";
export const getStaticProps = async () => {
  const token = await getToken();
  return {
    props: {
      token,
    },
    revalidate: 1,
  };
};

export default function Home({ token }) {
  const [albums, setAlbums] = useState(null);
  const [error, setError] = useState(null);
  const { searchTerm } = useContext(SearchContext);
  useEffect(() => {
    const getAlbums = async () => {
      await Search();
    };
    getAlbums();
  }, []);
  async function Search() {
    setAlbums(null);
    const url = "https://api.spotify.com/v1/browse/new-releases";
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    try {
      const searchRequest = await fetch(url, options);
      const searchResponse = await searchRequest.json();
      setAlbums(searchResponse);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }
  return (
    <div className="w-full h-full">
      <Header />
      <Main albums={albums} fetchError={error} />
    </div>
  );
}
