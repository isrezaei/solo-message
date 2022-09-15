import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, a, img, ol, ul, li, footer, header, section, body {
    margin: 0;
    padding: 0;
    border: 0;
  }
  html {
    background: #4b4b4b;
  }
  body {
    max-width: 30rem;
    height: 100vh;
    margin: auto;
    font-family: 'Ubuntu', sans-serif;
  }

`