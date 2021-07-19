import Navbar from "../components/indexComponents/Navbar";
import React from "react";
import { useStore } from "../State/StoreContext";

export default function Home() {
  const store = useStore();

  React.useEffect(() => {
    store.loadChain();
  }, []);

  return (
    <div>
      <Navbar />
    </div>
  );
}
