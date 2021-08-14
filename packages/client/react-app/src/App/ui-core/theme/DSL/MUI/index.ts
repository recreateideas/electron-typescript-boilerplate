import muiPaletteFactory from './palette';
import { Theme as MuiTheme, createTheme } from '@material-ui/core/styles';
import muiCss from './css';
import { Palette } from '../../typings';

interface IArgs {
    palette: Palette;
}
const muiThemeFactory = ({ palette }: IArgs): MuiTheme => {
    const muiTheme = {
        palette: muiPaletteFactory(palette),
        muiCss,
    };
    return createTheme(muiTheme);
};

export default muiThemeFactory;
