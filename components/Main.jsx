/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Main = ({ albums, fetchError }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(true);
  const router = useRouter();
  const getAlbums = () => {
    if (fetchError) {
      setError(true);
      console.log(fetchError);
      return;
    }
    if (albums) {
      let range = albums.albums.items.length;
      let nums = new Set();
      while (nums.size < 4) {
        nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
      }
      let albumsToShow = [];
      for (let i = 0; i < [...nums].length; i++) {
        albumsToShow.push(albums.albums.items[[...nums][i]]);
      }
      setData(albumsToShow);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    getAlbums();
  }, []);
  console.log(data);
  return (
    <div className="w-full h-screen text-center">
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1>
          Welcome to <span className="text-primary italic">Kirky</span>{" "}
          <span className="text-secondary italic">Music</span>
        </h1>
        <p className="py-6 text-xl">Home of musical entertainment.</p>
        {!error && !data.some((x) => x == undefined) ? (
          <div>
            <div className="py-2 text-bold font-raleway text-secondary tracking-widest text-center md:text-left ml-2">
              New Releases
            </div>
            <div className="p-1 grid grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-2 gap-2">
              {data.map((item) => (
                <div
                  onClick={() => router.push("/albums/" + item.id)}
                  key={item.id}
                  style={{
                    backgroundImage: "url(" + item.images[0].url + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="lg:w-[200px] flex justify-center items-center p-14 bg-secondary cursor-pointer lg:h-[200px] mx-1 relative hover:scale-110 hover:rounded-md hover:animate-pulse hover:rotate-2 hover:outline-2 hover:outline-dotted hover:outline-primary duration-500 md:w-[150px] md:h-[150px] w-[120px] h-[120px]">
                  <div className="bg-primary/30 h-full w-full absolute top-0 left-0 flex justify-center items-center font-bold tracking-wide text-[#fff] uppercase text-sm">
                    {item.artists[0].name.length < 15
                      ? item.artists[0].name
                      : item.artists[0].name.slice(0, 12) + "..."}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-4 flex justify-center   items-center">
            <div className="h-full relative  mx-1 object-cover">
              <Image
                priority={true}
                src="/new-releases-banner.png"
                alt="new releases"
                height={150}
                width={800}
              />
              <div
                onClick={getAlbums}
                className="cursor-pointer group   bg-primary/40 hover:bg-primary/80 hover:animate-pulse absolute top-0 left-0 h-full w-full">
                <div class="absolute w-full font-extrabold   bottom-0 inset-x-0 bg-blue-400 text-secondary italic tracking-widest pb-1 text-xl text-center leading-4">
                  Click to Load
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
