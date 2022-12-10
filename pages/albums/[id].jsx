/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header";
import {
  convertMilliSeconds,
  getAlbum,
  getArtist,
  getArtistAlbums,
  getAlbumTracks,
  getNewReleases,
} from "../../utils/helpers";
import { MdFavorite, MdOutlineAccessTime } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { FaPlay } from "react-icons/fa";
import Track from "../../components/Track";
import AlbumItem from "../../components/AlbumItem";
export const getStaticPaths = async () => {
  try {
    const data = await getNewReleases();
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
    return {
      params: {
        id: "",
        error,
      },
    };
  }
};
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const albumData = await getAlbum(id);
  const artistId = albumData.artists[0].id;
  const artistData = await getArtist(artistId);
  const tracksData = await getAlbumTracks(id);
  const allAlbumsData = await getArtistAlbums(artistId);
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
  const [albumInfo, setAlbumInfo] = useState(data);
  const [duration, setDuration] = useState("");
  const [error, setError] = useState({ error: "null" });
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (albumInfo) {
      try {
        setAlbumInfo(albumInfo);
        if (albumInfo.album) {
          let lengths = albumInfo.album.tracks.items.map((item) => {
            return item.duration_ms;
          });
          let sum = lengths.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
          });
          setDuration(convertMilliSeconds(sum));
        }
      } catch (error) {
        setError(error);
        console.log(error);
      }
    } else {
      setError({ error: "Error fetching data" });
      setAlbums({ albums: "null" });
      console.log(error);
    }
  }, [albumInfo]);
  const loadAlbum = async (id) => {
    const album = await getAlbum(id);
    setAlbumInfo({ ...data, album, tracks: album.tracks });
  };
  return (
    <div className="w-full flex justify-start items-center flex-col h-screen overflow-hidden">
      <Header title={"Albums"} />
      <div className="w-full h-60 relative top-24 flex px-16 space-x-4">
        <div className="w-80 h-full flex justify-center items-center p-2">
          <div
            className=" h-full w-full "
            style={{
              backgroundImage:
                albumInfo.album.images.length > 0
                  ? "url(" + albumInfo.album.images[0].url + ")"
                  : 'url("/default.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}></div>
        </div>
        <div className="h-full text-x w-full flex flex-col justify-end">
          <p className="uppercase tracking-wide font-extrabold py-1">Album</p>
          <h1
            style={{
              fontSize: albumInfo.album.name.length < 20 ? "45px" : "36px",
              textTransform: "uppercase",
            }}>
            {albumInfo.album.name}
          </h1>
          <div className="flex justify-start items-center space-x-2 py-2 font-bold">
            <div
              className="rounded-full h-10 w-10 px-1"
              style={{
                backgroundImage:
                  albumInfo.artist.images.length > 0
                    ? "url(" + albumInfo.artist.images[0].url + ")"
                    : 'url("/default.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}></div>
            <p className="px-1">{albumInfo.artist.name}</p>
            <p className="px-1">{albumInfo.album.release_date.slice(0, 4)}</p>
            <p className="px-1">
              {albumInfo.album.tracks.total}{" "}
              {albumInfo.album.tracks.total > 1 ? "songs" : "song"},{" "}
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
          <div
            className="p-2 group hover:scale-110 duration-100 flex justify-center items-center w-12 h-12 bg-secondary rounded-full">
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
          {albumInfo.tracks.items.map((track, index) => (
            <Track
              key={track.id}
              name={albumInfo.artist.name}
              fav={fav}
              track={track}
              index={index}
            />
          ))}
        </div>
        <div className="w-1/2 h-full overflow-auto px-2 ">
          <div className="w-full flex justify-between items-center">
            <p className=" font-extrabold">More by {albumInfo.artist.name}</p>
            <a
              href="#"
              className="uppercase tracking-wide hover:underline text-xs">
              see discography
            </a>
          </div>
          <div className="bg-secondary w-full h-[2px]" />

          <div className="w-auto h-[150px] p-3 grid grid-flow-col gap-3 overflow-y-hidden overflow-x-auto">
            {albumInfo.artistAlbums.items.map((item) => (
              <AlbumItem key={item.id} loadAlbum={loadAlbum} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
