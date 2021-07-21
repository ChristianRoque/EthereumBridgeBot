import Navbar from "../components/indexComponents/Navbar";
import React from "react";
import { useStore } from "../state/StoreContext";
import ContractPanel from "../components/indexComponents/ContractPanel";
import styled from "styled-components";

const App = styled.div``;

export default function Home() {
  const store = useStore();

  React.useEffect(() => {
    store.loadChain();
  }, []);

  return (
    <App>
      <Navbar />
      <ContractPanel />
    </App>
  );
}
