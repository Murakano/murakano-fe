// src/pages/_app.js
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Pretendard } from "next/font/google";

const pretendard = Pretendard({ weight: ["400", "700"], display: "swap" });

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  ${reset}
  a {
    text-decoration: none;
    color: inherit;
  }
  * {
    box-sizing: border-box;
  }
  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
  a, dl, dt, dd, ol, ul, li, form, label, table {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 10px;
    vertical-align: baseline;
  }
  body { 
    font-family: ${pretendard.style.fontFamily}, sans-serif;
    background-color: #ffffff;
    margin-bottom: 0;
  }
  ol, ul {
    list-style: none;
  }
  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }
`;

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
