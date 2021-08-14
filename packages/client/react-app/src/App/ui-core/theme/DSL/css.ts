import { css } from 'styled-components';

const scrollbar = css`
    * {
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
            border: none;
            box-shadow: none;
        }
        ::-webkit-scrollbar-thumb {
            background: ${(props) => props.theme.dsl.palette.neutrals.borders};
            border: none;
            box-shadow: none;
            border-radius: 100px;
        }
    }
`;

export const themeCss = css`
    ${(props) => {
        const {
            theme: {
                dsl: { palette, typography },
            },
        } = props;
        return css`
            ${typography.typefaces.p()}
            background-color: ${palette.neutrals.primaryBg};
            ${scrollbar}
        `;
    }}
`;
