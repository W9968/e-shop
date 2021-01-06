import React from "react";

// ant design componenet call
import styled from "styled-components";
import { Row } from "antd";

const HeroHeader = ({ name }) => {
  return (
    <>
      <StyledRow>
        <Text>{name}</Text>
      </StyledRow>
    </>
  );
};

export default HeroHeader;

const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
  background-color: var(--neut-black);
`;
const Text = styled.h2`
  padding: 10px;
  font-weight: 600;
  margin: 0rem auto;
  letter-spacing: 1px;
  color: var(--pola-cyan);
`;
