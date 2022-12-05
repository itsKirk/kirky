import Head from "next/head";
import React, { useEffect } from "react";
import { useState } from "react";

const Header = ({ title }) => {
  const [tytle, setTytle] = useState("| " + title);
  useEffect(() => {
    if (!title) {
      setTytle("");
    }
  }, []);
  return (
    <Head>
      <title>Kirky Tunes {tytle}</title>
      <meta name="description" content="generic music website" />
      <meta name="keywords" content="kirky music" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Header;
