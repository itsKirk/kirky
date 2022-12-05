const url = "https://accounts.spotify.com/api/token";
 const options = {
  method: "POST",
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
  },
  body:
    "grant_type=client_credentials&client_id=" +
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
    "&client_secret=" +
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
};

export const getToken = async () => {
  try {
    const response = await fetch(url, options);
    const token = await response.json();
    return token.access_token;
  } catch (error) {
    return { error: error.message };
  }
};
