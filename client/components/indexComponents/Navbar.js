import Image from "next/image";
import styled from "styled-components";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  height: 50px;
  background-color: #20b985;
`;
const Info = styled.div`
  display: flex;
  width: 13%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export default function Navbar() {
  return (
    <>
      <Bar>
        <Info>
          <Image
            src="https://img.icons8.com/pastel-glyph/2x/robot-2.png"
            alt="Picture of the author"
            width={50}
            height={50}
          />
          <div>Ethereum Bridge</div>
        </Info>
      </Bar>
    </>
  );
}
