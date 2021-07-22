import styled from "styled-components";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useStore } from "../../state/StoreContext";

const MainContainer = styled.div`
  display: flex;
  margin: 3% 2% 3% 2%;
  flex-direction: row;
  height: 400px;
  width: 98%;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ContractContainer = styled.div`
  display: flex;
  margin: 2% 3% 2% 3%;
  width: 600px;
  height: 50%;
  flex-direction: column;
  border-radius: 30px;
  background-color: rgb(32, 185, 133, 0.6);
`;

const Title = styled.div`
  margin: 40px 40px 10px 40px;
  font-size: 1.2em;
  height: 30px;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const TextField = styled.div`
  margin: 0px 40px 0px 40px;
  height: 30px;
`;

const Chain = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  padding: 6px 8px 6px 8px;
  margin-left: 30px;
  border-radius: 15px;
`;

const Icon = styled.div`
  margin: 0 0 0 20px;
`;

const ContractPanel = observer(() => {
  const store = useStore();

  const callAPI = () => {
    fetch("http://localhost:3000/api/contract-data")
      .then((response) => response.json())
      .then((data) => (store.firstContract = data));
  };

  return (
    <>
      <MainContainer>
        <button onClick={callAPI}>CALL API</button>
        <ContractContainer>
          <Title>
            {store.firstContract.name}{" "}
            <Chain>{store.firstContract.chain}</Chain>
          </Title>
          <TextField>Address: {store.firstContract.address}</TextField>
          <TextField>
            Status: {store.firstContract.online ? "Online" : "Offline"}
          </TextField>
          <TextField>Balance: {store.firstContract.balance}</TextField>
        </ContractContainer>
        <ContractContainer>
          <Title>
            {store.secondContract.name}{" "}
            <Chain>{store.secondContract.chain}</Chain>
          </Title>
          <TextField>Address: {store.secondContract.address}</TextField>
          <TextField>
            Status: {store.secondContract.online ? "Online" : "Offline"}
          </TextField>
          <TextField>Balance: {store.secondContract.balance}</TextField>
        </ContractContainer>
        <ContractContainer>
          <Title>
            BridgeBot - {store.bot.name}
            <Icon>
              <Image
                src="https://img.icons8.com/pastel-glyph/2x/robot-2.png"
                alt="Picture of the author"
                width={30}
                height={30}
              />
            </Icon>
            <Chain>{store.bot.chain}</Chain>
          </Title>
          <TextField>Address: {store.bot.address}</TextField>
          <TextField>
            Status: {store.bot.online ? "Online" : "Offline"}
          </TextField>
          <TextField>Balance: {store.bot.balance}</TextField>
        </ContractContainer>
      </MainContainer>
    </>
  );
});

export default ContractPanel;
