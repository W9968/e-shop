import styled, { createGlobalStyle } from "styled-components";

export const Wrapper = styled.div`
  max-width: 100%;
  min-height: 100vh;
`;

export const GlobalStyle = createGlobalStyle`

*, html, body {
    margin: 0;
    padding: 0px;
    font-family: 'Karla', sans-serif;
}

/* COLOR varriables */
:root {
  --neut-Black: #1f1f1f; 
  --neut-white: #ffffff;
  --neut-Gray: #f0f0f0;
  --dust-red: #ff4d4f;
  --pola-cyan: #36cfc9;
  --pola-green: #73d13d;
}

`;
