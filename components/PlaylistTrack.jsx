import React from "react";
import { BiPlay } from "react-icons/bi";
import { format } from "date-fns";
import { convertToChartTime } from "../utils/helpers";
const PlaylistTrack = (props) => {
  return (
    <div className="w-full grid auto-cols-max grid-cols-[33%_23%_22%_22%] group py-2 items-center hover:bg-primary/40 hover:rounded-[5px]">
      {/* className="w-full flex justify-between group py-2 items-center hover:bg-primary/40 hover:rounded-[5px]"> */}
      <div>
        <div className="flex justify-start group space-x-7 items-center ">
          <div className="relative group flex justify-start  items-center">
            <span className="absolute -bottom-3 hover:bg-secondary hover:rounded-full hidden group-hover:block">
              <BiPlay size={20} />
            </span>
            <span className="absolute group-hover:hidden">
              {props.index + 1}
            </span>
          </div>
          <div className="min-w-[30px] min-h-[30px]">
            <div
              className="h-[30px] w-[30px]"
              style={{
                backgroundImage:
                  "url(" + props.track.track.album.images[0].url + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
          </div>
          <div>
            <div className="text-sm">{props.track.track.name}</div>
            <div className="font-bold text-[10px]">
              {props.track.track.artists[0].name}
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm grid  ">{props.track.track.album.name}</div>
      <div className="text-sm flex justify-center items-center">
        {format(Date.parse(props.track.added_at), "P")}
      </div>

      <div className="text-sm flex justify-end items-center">
        {convertToChartTime(props.track.track.duration_ms)}
      </div>
    </div>
  );
};

export default PlaylistTrack;
