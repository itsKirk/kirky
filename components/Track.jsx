import React, { useContext } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import { convertToChartTime } from "../utils/helpers";
import { BiPlay } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";
const Track = (props) => {
  return (
    <div className="w-full flex justify-between group py-2 items-center hover:bg-primary/40 hover:rounded-[5px]">
      <div className="flex justify-between group space-x-4 items-center ">
        <div className="relative group flex justify-start items-center">
          <span className="absolute -bottom-3 hover:bg-secondary hover:rounded-full hidden group-hover:block">
            <BiPlay size={20} />
          </span>
          <span className="absolute   group-hover:hidden">
            {props.index + 1}
          </span>
        </div>
        <div>
          <div>{props.track.name}</div>
          <div className="font-bold text-[10px]">{props.name}</div>
        </div>
      </div>
      <div className="flex justify-between group items-center space-x-2">
        <span className="hidden group-hover:block">
          <MdFavorite fill={props.fav ? "red" : "grey"} />
        </span>
        <div>{convertToChartTime(props.track.duration_ms)}</div>
      </div>
    </div>
  );
};

export default Track;
