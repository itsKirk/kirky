import { getToken } from "./token";

export const convertMilliSeconds = (timeDuration) => {
  let seconds = Math.floor((timeDuration / 1000) % 60),
    minutes = Math.floor((timeDuration / (1000 * 60)) % 60),
    hours = Math.floor((timeDuration / (1000 * 60 * 60)) % 24);
  return hours + " hours, " + minutes + " minutes & " + seconds + " seconds.";
};
export const convertToChartTime = (timeDuration) => {
  let seconds = Math.floor((timeDuration / 1000) % 60),
    minutes = Math.floor((timeDuration / (1000 * 60)) % 60),
    hours = Math.floor((timeDuration / (1000 * 60 * 60)) % 24);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return minutes + "." + seconds;
};
export const getArtist = async (id) => {
  const token = await getToken();
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const url = "https://api.spotify.com/v1/artists/" + id;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
export const getArtistAlbums = async (id) => {
  const token = await getToken();
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const url = "https://api.spotify.com/v1/artists/" + id + "/albums";
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
export const getAlbum = async (id) => {
  const token = await getToken();
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const url = "https://api.spotify.com/v1/albums/" + id;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
export const getAlbumTracks = async (id) => {
  const token = await getToken();
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const url = "https://api.spotify.com/v1/albums/" + id + "/tracks";
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
export const getFeaturedPlaylists = async () => {
  const token = await getToken();
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const url = "https://api.spotify.com/v1/browse/featured-playlists";
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
export const getPlaylist = async (id) => {
  const token = await getToken();
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const url = "https://api.spotify.com/v1/playlists/" + id;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
export const getNewReleases = async () => {
  const token = await getToken();
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };
  const url = "https://api.spotify.com/v1/browse/new-releases";
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
