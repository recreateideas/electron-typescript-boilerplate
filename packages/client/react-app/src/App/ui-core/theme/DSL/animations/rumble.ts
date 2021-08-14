import { keyframes, css } from 'styled-components';

const keyFrames = () => {
    return keyframes`
  0% {
    transform: rotate(-8deg)
  }
  25% {
    transform: rotate(8deg)
  }
  50% {
    transform: rotate(-8deg)
  }
  75% {
    transform: rotate(8deg)
  }
  100% {
    transform: rotate(0deg)
  }
`;
};

export const rumble = css`
    animation-name: ${keyFrames};
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
`;
