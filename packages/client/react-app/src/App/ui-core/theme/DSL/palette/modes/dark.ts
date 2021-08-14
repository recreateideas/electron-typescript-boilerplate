import hexToRgba from 'hex-rgba';
import { primary } from '../common';
import { getAlpha } from '../helpers';
import { Palette } from '../../../typings';

const primaryBg = '#17171f';
const lightPrimaryBg = '#ffffff';

export const neutrals: Palette['neutrals'] = {
    secondaryText: '#6f7f92',
    inactive: '#465265',
    borders: '#373946',
    primaryBg,
    primaryBg70: hexToRgba(primaryBg, 70),
    secondaryBg: '#22222d',
    tertiaryBg: '#1b1b24',
    quaternaryBg: '#34224D',
    boxShadow: `${getAlpha(lightPrimaryBg, '5%')} 0px 8px 20px 0px`,
};

export const fonts: Palette['fonts'] = {
    primary: primary.white,
    primaryInverted: primaryBg,
    secondary: neutrals.secondaryText,
    inactive: neutrals.inactive,
    inverted: primary.darkIndigo[500],
};
