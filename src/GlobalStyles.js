import {createGlobalStyle} from "styled-components";


//Global Styles
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
  }
  .map_app_main {
    height: 100vh;
    max-height: 100vh;
  }
  @media (min-width: 767px) {
    body {
      font-size: 18px;
    }
  }
`;