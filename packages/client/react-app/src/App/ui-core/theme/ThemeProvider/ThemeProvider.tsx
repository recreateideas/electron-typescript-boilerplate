import { ReactNode, ReactElement } from 'react';
import { createTheme, ThemeMode } from '../DSL';
import { GlobalStyle } from '../GlobalStyle';
import { ThemeProvider as ThemeProviderMui } from '@material-ui/core/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

interface IProps {
    mode: ThemeMode;
    children: ReactNode;
}

type WrapperWithThemeContext = ReactElement;

export const ThemeProvider = (props: IProps): WrapperWithThemeContext => {
    const { mode = 'light', children } = props;
    const { dsl, muiTheme } = createTheme(mode);
    return (
        <StyledThemeProvider theme={{ muiTheme, dsl }}>
            <ThemeProviderMui {...{ theme: muiTheme }}>{children}</ThemeProviderMui>
            <GlobalStyle />
        </StyledThemeProvider>
    );
};
