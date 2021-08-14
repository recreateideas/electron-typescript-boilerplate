import * as layout from './layout';
import * as sizes from './sizes';
import { styles } from './styles';
import { themeCss } from './css';
import * as animations from './animations';
import paletteFactory from './palette';
import typefaceFactory from './typography';
import muiThemeFactory from './MUI';
import { ThemeMode, Theme } from '../typings';
import { sizes as fontSizes } from './typography/styles';

export const createTheme = (mode: ThemeMode = 'light') => {
    const palette = paletteFactory(mode);
    const typefaces = typefaceFactory(mode);
    const dsl = {
        palette,
        layout,
        sizes,
        styles,
        animations,
        css: themeCss,
        typography: {
            sizes: fontSizes,
            typefaces,
        },
    };
    const muiTheme = muiThemeFactory(dsl);
    const theme: Theme = { dsl, muiTheme };
    window.theme = theme;
    return theme;
};
export * from '../typings.d';
