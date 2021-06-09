import styled, { css, keyframes } from 'styled-components';

interface ContainerProps {
  show: boolean;
}

const loading = keyframes`
  from {
    width: 0;
    height: 0;
    opacity: 1;
  }
  to {
    width: 10rem;
    height: 10rem;
    opacity: 0;
  }
`

export const Container = styled.div<ContainerProps>`
  ${props =>
    props.show
      ? css`

  position: fixed;
  background: var(--header-gradient);
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  top: 0;

  .loading-container {
    width: 20rem;
    height: 20rem;
    overflow: hidden;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;

    .circle1 {
      position: absolute;
      box-sizing: content-box;
      width: 100%;
      height: 100%;
      transform: translateZ(0) scale(1);
      backface-visibility: hidden;
      border-width: 8.5px;
      border-style: solid;
      opacity: 1;
      border-radius: 50%;
      border-color: #ff6400;
      animation: ${loading} .75s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .circle2 {
      position: absolute;
      box-sizing: content-box;
      width: 100%;
      height: 100%;
      transform: translateZ(0) scale(0.75);
      backface-visibility: hidden;
      border-width: 8.5px;
      border-style: solid;
      opacity: 1;
      border-radius: 50%;
      border-color: #ffffff;
      animation: ${loading} 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
  }
  `
      : css`
          display: none;
          visibility: hidden;
        `}
`