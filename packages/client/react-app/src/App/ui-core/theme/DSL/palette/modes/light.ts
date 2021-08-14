import hexToRgba from 'hex-rgba';
import { primary } from '../common';
import { getAlpha } from '../helpers';
import { Palette } from '../../../typings';

const primaryBg = '#ffffff';
const darkPrimaryBg = '#17171f';
const borderColor = '#dedeeb';

export const neutrals: Palette['neutrals'] = {
    secondaryText: '#8697BF',
    inactive: '#BDC7DE',
    borders: borderColor,
    primaryBg,
    primaryBg70: hexToRgba(primaryBg, 70),
    secondaryBg: '#f9fafb',
    tertiaryBg: '#f5f5f8',
    quaternaryBg: '#F4EEF9',
    boxShadow: `${getAlpha(darkPrimaryBg, '5%')} 0px 8px 20px 0px`,
};

export const fonts: Palette['fonts'] = {
    primary: primary.royalBlueDark[500],
    primaryInverted: primaryBg,
    secondary: neutrals.secondaryText,
    inactive: neutrals.inactive,
    inverted: primary.white,
};
