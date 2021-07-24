import styled from "styled-components";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useStore } from "../../state/StoreContext";

const MainContainer = styled.div`
  display: flex;
  margin: 3% 2% 3% 1%;
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

  const firstContract = store.contracts.firstContract;
  const secondContract = store.contracts.secondContract;
  const bot = store.contracts.bot;

  return (
    <>
      <MainContainer>
        <ContractContainer>
          <Title>
            {firstContract.name} <Chain>{firstContract.chain}</Chain>
          </Title>
          <TextField>Address: {firstContract.address}</TextField>
          <TextField>
            Status: {firstContract.online ? "Online" : "Offline"}
          </TextField>
          <TextField>Balance: {firstContract.balance}</TextField>
        </ContractContainer>
        <ContractContainer>
          <Title>
            {secondContract.name} <Chain>{secondContract.chain}</Chain>
          </Title>
          <TextField>Address: {secondContract.address}</TextField>
          <TextField>
            Status: {secondContract.online ? "Online" : "Offline"}
          </TextField>
          <TextField>Balance: {secondContract.balance}</TextField>
        </ContractContainer>
        <ContractContainer>
          <Title>
            BridgeBot - {bot.name}
            <Icon>
              <Image
                src="https://img.icons8.com/pastel-glyph/2x/robot-2.png"
                alt="Picture of the author"
                width={30}
                height={30}
              />
            </Icon>
            <Chain>{bot.chain}</Chain>
          </Title>
          <TextField>Address: {bot.address}</TextField>
          <TextField>Status: {bot.online ? "Online" : "Offline"}</TextField>
          <TextField>Balance: {bot.balance[1]}</TextField>
        </ContractContainer>
      </MainContainer>
    </>
  );
});

export default ContractPanel;
