import React from "react";

const AlbumItem = (props) => {
  return (
    <div
      onClick={() => props.loadAlbum(props.item.id)}
      className="h-[100px] w-[100px] px-2 hover:scale-110 hover:rounded-md hover:animate-pulse hover:rotate-2 hover:outline-2 cursor-pointer hover:outline-dotted hover:outline-primary duration-500 "
      style={{
        backgroundImage: props.item.images
          ? "url(" + props.item.images[0].url + ")"
          : "url('/default.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}></div>
  );
};

export default AlbumItem;
