import React, { useEffect, useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { TbCaretDown } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import PlaylistTrack from "../../components/PlaylistTrack";
import {
  convertMilliSeconds,
  getFeaturedPlaylists,
  getPlaylist,
} from "../../utils/helpers";
export const getStaticPaths = async () => {
  try {
    const data = await getFeaturedPlaylists();
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
  const thisListData = await getPlaylist(id);
  return {
    props: {
      thisListData,
    },
  };
};

const Play = ({ thisListData }) => {
  const [duration, setDuration] = useState("");
  const [ready, setReady] = useState(false);
  console.log("thisListData", thisListData);
  useEffect(() => {
    if (thisListData) {
      let lengths = thisListData.tracks.items.map((item) => {
        return item.track.duration_ms;
      });
      let sum = lengths.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      });
      setDuration(convertMilliSeconds(sum));
    }
  }, [thisListData]);
  useEffect(() => {
    setReady(true);
  }, [ready]);
  console.log(thisListData);
  return (
    <div className=" flex relative justify-center  items-center top-[50px] w-full">
      <div className="fixed z-10 bottom-0 left-0 w-full h-20 bg-[gray]/70"></div>
      <div className="h-screen w-4/5 bg-gradient from-base to-base/50">
        <div className="flex w-full justify-between items-center h-5 px-4 py-8">
          <div className="flex justify-between items-center space-x-3 ">
            <span className="rounded-full cursor-pointer bg-secondary p-1">
              <GrPrevious size={25} />
            </span>
            <span className="rounded-full cursor-pointer bg-secondary p-1">
              <GrNext size={25} />
            </span>
          </div>
          <div className="flex justify-between items-center space-x-2 rounded-2xl hover:shadow-[0px_22px_70px_4px_rgba(1,2,3,0.16)]  font-bold tracking-wide border border-secondary px-2 py-1">
            <div
              className="h-[25px] cursor-pointer w-[25px] rounded-full"
              style={{
                backgroundImage: 'url("/default.jpg")',
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="cursor-pointer">Jasmine</div>
            <span className="h-[25px] cursor-pointer w-[25px] rounded-full">
              <TbCaretDown size={25} />
            </span>
          </div>
        </div>
        <div className="w-full flex justify-start h-[250px]">
          <div
            className="grid  place-content-center w-[250px] hover:scale-95 hover:rounded-md hover:rotate-2 duration-500"
            style={{
              backgroundImage: thisListData.images[0].url
                ? "url(" + thisListData.images[0].url + ")"
                : 'url("/default.jpg")',
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <div className="flex flex-col justify-end px-3">
            <p className="uppercase text-lg tracking-wide font-bold text-[#c58686]">
              Playlist
            </p>
            <p className="text-6xl  font-bold tracking-tighter py-2">
              {thisListData.name}
            </p>
            <p className="text-md text-blueQueen ">
              {thisListData.description}
            </p>
            <div className="flex justify-start items-center p-2 space-x-2">
              <p className=" font-extrabold tracking-wide ">Kirk</p>
              <p className="  tracking-wide ">
                {thisListData.tracks.items.length} songs
              </p>
              <p className="text-blueQueen font-semibold  tracking-wider ">
                {duration}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[70px] py-1">
          <div className="py-4 px-16  w-full h-full space-x-4 flex items-center justify-start">
            <div className="p-2 group hover:scale-110 duration-100 flex justify-center items-center w-12 h-12 bg-secondary rounded-full">
              <FaPlay size={25} className="group-hover:rotate-[5deg]" />
            </div>
            <div className="p-2 cursor-pointer">
              <SlOptions size={25} />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-start mx-2 pb-2">
          <div className="flex w-full justify-between items-center">
            <div className="uppercase tracking-wider font-bold text-sm space-x-4 flex justify-between">
              <p>#</p>
              <p>Title</p>
            </div>
            <div className="uppercase tracking-wider font-bold text-sm ">
              ALBUM
            </div>
            <div className="uppercase tracking-wider font-bold text-sm ">
              DATE ADDED
            </div>
            <div className="mr-4">
              <MdOutlineAccessTime />
            </div>
          </div>
        </div>
        <div className="bg-secondary w-full h-[2px]" />
        <div className="w-full h-full overflow-auto px-2 ">
          <div>
            <div className=" pb-1 w-full h-[2px]" />
          </div>
          <div className="pb-20">
            {thisListData.tracks.items.map((track, index) => (
              <PlaylistTrack key={track.id} track={track} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
