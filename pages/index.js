/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import { SearchContext } from "../contexts/SearchContext";
import { getNewReleases } from "../utils/helpers.js";
export const getStaticProps = async () => {
  try {
    const newReleases = await getNewReleases();
    return {
      props: {
        newReleases,
        Error: "",
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: {
        Error: error,
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
