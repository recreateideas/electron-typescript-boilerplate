import { css } from 'styled-components';

const muiCss = css`
    ${props => {
        const {
            theme: {
                dsl: { palette, styles }
            }
        } = props;
        return css`
            .btn-primary {
                background-color: ${palette.brand.primary};
            }
            .btn-secondary {
                background-color: ${palette.neutrals.secondaryText};
            }
            .MuiDrawer-paper {
                background-color: ${palette.neutrals.primaryBg};
            }
            .MuiIconButton-label {
                color: ${palette.fonts.primary};
            }
            .MuiFormControl-root {
                border-color: ${palette.fonts.primary};
            }
            .MuiOutlinedInput-root {
                border: solid 1px ${palette.neutrals.borders};
                border-radius: ${styles.borderRadius};
            }
            .MuiInputLabel-formControl {
                background-color: ${palette.neutrals.primaryBg};
                padding: 0 6px;
            }
        `;
    }}
`;

export default muiCss;
