import styled from "styled-components";
import { observer } from "mobx-react-lite";

const MainContainer = styled.div`
  display: flex;
  margin: 1% 2% 5% 1%;
  flex-direction: row;
  height: 400px;
  width: 98%;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ContractContainer = styled.div`
  display: flex;
  margin: 4% 3% 4% 3%;
  width: 600px;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 30px;
  background-color: rgb(32, 185, 133, 0.5);
`;

const ContractPanel = observer(() => {
  return (
    <>
      <MainContainer>
        <ContractContainer></ContractContainer>
        <ContractContainer></ContractContainer>
      </MainContainer>
    </>
  );
});

export default ContractPanel;
