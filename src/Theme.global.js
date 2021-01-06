import styled, { createGlobalStyle } from "styled-components";

export const Wrapper = styled.div`
  max-width: 100%;
  min-height: 100vh;
  background-color: var(--neut-gray);
`;

export const GlobalStyle = createGlobalStyle`



*, html, body {
    margin: 0;
    padding: 0;
    font-family: 'Karla', sans-serif;
}

/* COLOR varriables */
:root {
  --neut-black: #1f1f1f; 
  --neut-white: #ffffff;
  --neut-gray: #f0f0f0;
  --dust-red: #ff4d4f;
  --pola-cyan: #40a9ff;
  --pola-green: #73d13d;
}

`;
