import React from "react";
import styled from "styled-components";
import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Wrapper>
        <StyledRow>
          <Col span={18}>
            <Text>
              Hanouti is an online platform for shop owners to expend their
              businesse online so join us and grow bigger. Interaction between
              you and your client hase never been this easy
            </Text>
          </Col>
          <Col className="coling" span={6}>
            <StyledButton>
              <Linker to="/login">join us</Linker>
            </StyledButton>

            <StyledButton>
              <Linker to="/signup">sign up</Linker>
            </StyledButton>
          </Col>
        </StyledRow>
      </Wrapper>
    </>
  );
};

export default Footer;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--neut-black);
`;

const StyledRow = styled(Row)`
  width: 70%;
  padding: 2rem 0rem;
  align-items: center;

  @media (max-width: 768px) {
    width: 90%;

    flex-direction: column;
  }

  .coling {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }
`;

const Text = styled.h3`
  padding: 10px;
  font-weight: 600;
  margin: 0rem auto;
  letter-spacing: 1px;
  color: var(--neut-white);
  text-transform: capitalize;
`;

const StyledButton = styled(Button)`
  margin: 1rem;
`;

const Linker = styled(Link)``;
