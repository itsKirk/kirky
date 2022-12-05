import React from "react";
import { getToken } from "../../utils/token";
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
function Artist({ data }) {
  console.log(data);
  return (
    <div className="w-full flex justify-center relative top-24 items-center flex-col">
      <div className="w-full h-screen">
        <div className="w-full h-60 bg-[#25211F] relative">
          <div className="flex absolute bottom-0">
            <div className="w-80  relative flex justify-center align-center">
              <div
                className=" absolute w-48 top-[-40px] h-48 flex items-center justify-center"
                style={{
                  backgroundImage:
                    data.artist.images.length > 0
                      ? "url(" + data.artist.images[0].url + ")"
                      : 'url("/default.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></div>
            </div>
            <div className="relative left-[-50px]">
              <div className="flex justify-start px-4 items-center relative">
                <div className="text-5xl">{data.artist.name}</div>
                <div className="px-2 ml-2">
                  <button>Become a Fan</button>
                </div>
              </div>
              <div className="flex justify-start px-4 pt-2 space-x-4">
                <div className="flex flex-col justify-center items-center">
                  <div className="text-primary uppercase">
                    {data.artist.genres[0]}
                  </div>
                  <div className="text-secondary font-bold">Genre</div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-primary">{data.artist.popularity}%</div>
                  <div className="text-secondary font-bold">Popularity</div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="text-primary">
                    {data.artist.followers.total.toLocaleString()}
                  </div>
                  <div className="text-secondary font-bold">Followers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
