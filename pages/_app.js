import Artist from "../components/Artist";
import { SearchContextProvider } from "../contexts/SearchContext";
import MainLayout from "../layouts/MainLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SearchContextProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SearchContextProvider>
  );
}

export default MyApp;
