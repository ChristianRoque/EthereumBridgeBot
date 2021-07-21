import "../styles/globals.css";
import { StoreProvider } from "../state/StoreContext";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
