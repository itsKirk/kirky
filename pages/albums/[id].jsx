/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header";
import { getToken } from "../../utils/token";
import { BiPlay } from "react-icons/bi";
import { MdFavorite, MdOutlineAccessTime } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { FaPlay } from "react-icons/fa";
export const getStaticPaths = async () => {
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
    const data = await response.json();
    const paths = data.albums.items.map((album) => {
      return {
        params: {
          id: album.id,
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
  const albumUrl = "https://api.spotify.com/v1/albums/" + id;
  const response = await fetch(albumUrl, options);
  const albumData = await response.json();
  const artistId = albumData.artists[0].id;
  const artistUrl = "https://api.spotify.com/v1/artists/" + artistId;
  const artistResponse = await fetch(artistUrl, options);
  const artistData = await artistResponse.json();
  const allAlbumsUrl =
    "https://api.spotify.com/v1/artists/" + artistId + "/albums";
  let tracksIds = albumData.tracks.items.map((item) => {
    return item.id;
  });
  tracksIds = tracksIds.join(",");
  const tracksUrl = "https://api.spotify.com/v1/tracks?ids=" + tracksIds;
  const tracksResponse = await fetch(tracksUrl, options);
  const tracksData = await tracksResponse.json();
  const albumsResponse = await fetch(allAlbumsUrl, options);
  const allAlbumsData = await albumsResponse.json();
  return {
    props: {
      data: {
        album: albumData,
        artist: artistData,
        tracks: tracksData,
        artistAlbums: allAlbumsData,
      },
    },
  };
};
const Album = ({ data }) => {
  console.log(data);
  const [duration, setDuration] = useState("");
  const [fav, setFav] = useState(false);
  const [displayAlbums, setDisplayAlbums] = useState([]);
  const convertMilliSeconds = (timeDuration) => {
    var milliseconds = parseInt((timeDuration % 1000) / 100),
      seconds = Math.floor((timeDuration / 1000) % 60),
      minutes = Math.floor((timeDuration / (1000 * 60)) % 60),
      hours = Math.floor((timeDuration / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + " hours, " + minutes + " minutes & " + seconds + " seconds.";
  };
  useEffect(() => {
    const getAlbums = () => {
      let range = data.artistAlbums.items.length;
      let nums = new Set();
      while (nums.size < 5) {
        nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
      }
      let albumsToShow = [];
      for (let i = 0; i < [...nums].length; i++) {
        albumsToShow.push(data.artistAlbums.items[[...nums][i]]);
      }
      setDisplayAlbums(albumsToShow);
      console.log(displayAlbums);
    };
    getAlbums();
  }, []);
  const convertToChartTime = (timeDuration) => {
    var milliseconds = parseInt((timeDuration % 1000) / 100),
      seconds = Math.floor((timeDuration / 1000) % 60),
      minutes = Math.floor((timeDuration / (1000 * 60)) % 60),
      hours = Math.floor((timeDuration / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + "." + seconds;
  };
  useEffect(() => {
    if (data.album) {
      let lengths = data.album.tracks.items.map((item) => {
        return item.duration_ms;
      });
      let sum = lengths.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      });
      setDuration(convertMilliSeconds(sum));
    }
  }, []);
  return (
    <div className="w-full flex justify-start items-center flex-col h-screen overflow-hidden">
      <Header title={"Albums"} />
      <div className="w-full h-60 relative top-24 flex px-16 space-x-4">
        <div className="w-80 h-full flex justify-center items-center p-2">
          <div
            className=" h-full w-full "
            style={{
              backgroundImage:
                data.album.images.length > 0
                  ? "url(" + data.album.images[0].url + ")"
                  : 'url("/default.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}></div>
        </div>
        <div className="h-full w-full flex flex-col justify-end">
          <p className="uppercase tracking-wide font-extrabold py-1">Album</p>
          <h1>{data.album.name}</h1>
          <div className="flex justify-start items-center space-x-2 py-2 font-bold">
            <div
              className="rounded-full h-10 w-10 px-1"
              style={{
                backgroundImage:
                  data.artist.images.length > 0
                    ? "url(" + data.artist.images[0].url + ")"
                    : 'url("/default.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}></div>
            <p className="px-1">{data.artist.name}</p>
            <p className="px-1">{data.album.release_date.slice(0, 4)}</p>
            <p className="px-1">
              {data.album.tracks.total}{" "}
              {data.album.tracks.total > 1 ? "songs" : "song"},{" "}
              <span
                style={{
                  fontFamily: "Century Gothic",
                }}
                className="font-normal tracking-tighter ">
                {duration}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[70px]  mt-[90px]">
        <div className="py-4 px-16  w-full h-full space-x-4 flex items-center justify-start">
          <div className="p-2 group hover:scale-110 duration-100 flex justify-center items-center w-12 h-12 bg-secondary rounded-full">
            <FaPlay size={25} className="group-hover:rotate-[5deg]" />
          </div>
          <div
            className="p-2 hover:scale-125 duration-300"
            onClick={() => setFav(!fav)}>
            <MdFavorite size={25} fill={fav ? "red" : "grey"} />
          </div>
          <div className="p-2 cursor-pointer">
            <SlOptions size={25} />
          </div>
        </div>
      </div>
      <div className="w-full px-16 h-[200px] flex ">
        <div className="w-1/2 h-full overflow-auto px-2 ">
          <div className="flex justify-center items-start">
            <div className="flex w-full justify-between items-center">
              <div className="uppercase tracking-wider font-bold text-sm space-x-4 flex justify-between">
                <p>#</p>
                <p>Title</p>
              </div>
              <div>
                <MdOutlineAccessTime />
              </div>
            </div>
          </div>
          <div>
            <div className=" pb-1 w-full h-[2px]" />
            <div className="bg-secondary w-full h-[2px]" />
          </div>
          {data.tracks.tracks.map((track, index) => (
            <div
              key={track.id}
              className="w-full flex justify-between group py-2 items-center hover:bg-primary/40 hover:rounded-[5px]">
              <div className="flex justify-between group space-x-4 items-center ">
                <div className="relative group flex justify-start items-center">
                  <span className="absolute -bottom-3 hover:bg-secondary hover:rounded-full hidden group-hover:block">
                    <BiPlay size={20} />
                  </span>
                  <span className="absolute   group-hover:hidden">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <div>{track.name}</div>
                  <div className="font-bold text-[10px]">
                    {data.artist.name}
                  </div>
                </div>
              </div>
              <div className="flex justify-between group items-center space-x-2">
                <span className="hidden group-hover:block">
                  <MdFavorite fill={fav ? "red" : "grey"} />
                </span>
                <div>{convertToChartTime(track.duration_ms)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 h-full overflow-auto px-2 ">
          <div className="w-full flex justify-between items-center">
            <p className=" font-extrabold">More by {data.artist.name}</p>
            <a
              href="#"
              className="uppercase tracking-wide hover:underline text-xs">
              see discography
            </a>
          </div>
          <div className="bg-secondary w-full h-[2px]" />

          <div className="w-full h-[150px] p-3  flex justify-between items-center overflow-x-auto">
            {displayAlbums.map((item) => (
              <div
                key={item.id}
                className="h-[100px] w-[100px] px-2 hover:scale-110 hover:rounded-md hover:animate-pulse hover:rotate-2 hover:outline-2 cursor-pointer hover:outline-dotted hover:outline-primary duration-500 "
                style={{
                  backgroundImage: "url(" + item.images[0].url + ")",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
