import hexToRgba from 'hex-rgba';

const getAlpha = (hex: string, alpha: string = '100%') => {
    const rgba = hexToRgba(hex);
    const rgbAlpha = rgba.replace(/rgba/g, 'rgb').replace(/,/g, '').replace(/1\)$/, `/ ${alpha})`);
    return rgbAlpha;
};

export { getAlpha };
