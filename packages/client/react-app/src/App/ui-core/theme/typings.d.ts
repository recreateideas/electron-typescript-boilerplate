export type ThemeMode = 'light' | 'dark';

export type ColorCode = `#${string}` | `${'rgb' | 'rgba'}(${number},${number},${number},${number})`;

export interface ThemeColor {
    [shade: number]: ColorCode;
}

export interface Palette {
    brand: {
        primary: ThemeColor;
    };
    primary: {
        ice: ThemeColor;
        purple: ThemeColor;
        darkIndigo: ThemeColor;
        royalBlueDark: ThemeColor;
        white: string;
    };
    secondary: {
        red: ThemeColor;
        orange: ThemeColor;
        green: ThemeColor;
        neon: ThemeColor;
        yellow: ThemeColor;
    };
    tertiary: {
        blue: ThemeColor;
        pink: ThemeColor;
        brown: ThemeColor;
        grey: ThemeColor;
    };
    neutrals: {
        secondaryText: ColorCode;
        inactive: ColorCode;
        borders: ColorCode;
        primaryBg: ColorCode;
        primaryBg70: string;
        secondaryBg: ColorCode;
        tertiaryBg: ColorCode;
        quaternaryBg: ColorCode;
        boxShadow: string;
    };
    fonts: {
        primary: ColorCode | string;
        primaryInverted: ColorCode;
        secondary: ColorCode;
        inactive: ColorCode;
        inverted: string;
    };
}

export interface FontSize {
    fontSize: string;
    lineHeight: string;
    letterSpacing?: string;
}

export type FontType = 'heading1' | 'heading2' | 'paragraph' | 'subHeading' | 'label' | 'caption';

export type ThemeFontStyle = Record<FontType, FontSize>;

export interface ThemeFontOptions {
    color?: keyof Palette['fonts'];
    weight?: number;
    textTransform?: string;
}

export interface ThemeFont extends FontSize {
    color: string;
    textTransform?: string;
    fontWeight: number;
    fontFamily: string;
}

export type ThemeFontType = (args: ThemeFontOptions) => ThemeFont;

export interface ThemeFontTypes {
    h1: ThemeFontType;
    h2: ThemeFontType;
    p: ThemeFontType;
    subHeading: ThemeFontType;
    label: ThemeFontType;
    caption: ThemeFontType;
}

export interface Theme {
    dsl: {
        palette: any;
        layout: any;
        sizes: any;
        styles: any;
        animations: any;
        css: any;
        typography: {
            sizes: any;
            typefaces: any;
        };
    };
    muiTheme: any;
}
