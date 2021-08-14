import { createGlobalStyle } from 'styled-components';
import { Theme } from '../typings';

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body, #root {
    height: 100%;
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    ${(props) => props.theme.dsl.css}
    ${(props) => props.theme.muiTheme.muiCss}
  }
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
  }
  #root {
    display: flex;
  }
`;
