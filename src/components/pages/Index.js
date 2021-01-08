import React from "react";
import { Link } from "react-router-dom";

import Caroussel from "../utils/Caroussel";
import Footer from "../utils/Footer";

// and design compoenent
import styled from "styled-components";
import { Col } from "antd";

import sneak from "../assets/sources/shoes.png";
import acc from "../assets/sources/access.jpg";
import hat from "../assets/sources/hat.jpg";
import women from "../assets/sources/women.jpg";
import man from "../assets/sources/man.jpg";

const Index = () => {
  document.title = "HANOUTI";
  return (
    <>
      <Caroussel />
      <Wrapper>
        <StyledRow>
          <StyledCol>
            <ImageFix src={man} alt="shoes" />
            <Content>
              <Linker to="/man">Man</Linker>
            </Content>
          </StyledCol>
          <StyledCol>
            <ImageFix src={women} alt="shoes" />
            <Content>
              <Linker to="/women">Women</Linker>
            </Content>
          </StyledCol>
          <StyledCol>
            <ImageFix src={sneak} alt="shoes" />
            <Content>
              <Linker to="/shoes">Shoes</Linker>
            </Content>
          </StyledCol>
          <StyledCol>
            <ImageFix src={hat} alt="shoes" />
            <Content>
              <Linker to="/hats">Hats</Linker>
            </Content>
          </StyledCol>
          <StyledCol>
            <ImageFix src={acc} alt="shoes" />
            <Content>
              <Linker to="/accessories">Accessories</Linker>
            </Content>
          </StyledCol>
        </StyledRow>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Index;

const Wrapper = styled.div`
  display: flex;
  max-width: 100%;
  min-height: 70vh;
  align-items: center;
  justify-content: center;
`;

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledCol = styled(Col)`
  padding: 0px;
  margin: 1rem;
  width: 300px;
  height: 300px;
  display: flex;
  border-radius: 42px;
  background-color: black;
  transition: 0.5s ease-in-out;
`;

const ImageFix = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 42px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  border-radius: 42px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Linker = styled(Link)`
  font-size: 1.5rem;
  letter-spacing: 2px;
  color: var(--neut-white);

  &:hover {
    color: var(--neut-white);
  }
`;
