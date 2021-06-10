import styled, { keyframes } from 'styled-components';

const color_anim = keyframes`
  0% {
    fill: white;
  },
  50% {
    fill: #FBC638;
  }
  100% {
    fill: var(--gray-solid);
  }
`;

export const Container = styled.div`
  background-image: url('/assets/images/background.jpeg');
  background-size: 100vw;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: var(--header-gradient);

    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      h1 {
        width: 50%;
        text-align: center;
        line-height: 7.5rem;
        font-family: 'Rubik Mono One', sans-serif;
        font-size: 7.5rem;
      }

      p {
        text-align: center;
        width: 50%;
        margin: 2rem 0;
        font-weight: 400;
        font-size: 2rem;
      }

      .cta {
        margin-top: 2rem;
        cursor: url("/assets/cursor/pointer.svg"), auto;
        display: flex;
        padding: 1rem 6rem;
        text-decoration: none;
        font-family: 'Rubik Mono One', sans-serif;
        font-size: 3rem;
        font-weight: 700;
        color: var(--gray-solid);
        background: var(--green-solid);
        transition: 1s;
        box-shadow: 6px 6px 0 var(--gray-solid);
        transform: skewX(-15deg);
      }

      svg {
        cursor: url("/assets/cursor/pointer.svg"), auto;
      }

      .cta:focus {
        outline: none; 
      }

      .cta:hover {
        cursor: url("/assets/cursor/pointer.svg"), auto;
        transition: 0.5s;
        box-shadow: 10px 10px 0 var(--gray-solid);
      }

      .cta span:nth-child(2) {
        cursor: url("/assets/cursor/pointer.svg"), auto;
        transition: 0.5s;
        margin-right: 0px;
      }

      .cta:hover  span:nth-child(2) {
        cursor: url("/assets/cursor/pointer.svg"), auto;
        transition: 0.5s;
        margin-right: 2rem;
      }

        span {
          cursor: url("/assets/cursor/pointer.svg"), auto;
          transform: skewX(15deg) 
        }

        span:nth-child(2) {
          cursor: url("/assets/cursor/pointer.svg"), auto;
          width: 20px;
          margin-left: 3rem;
          position: relative;
          top: 12%;
        }
        
      path.one {
        cursor: url("/assets/cursor/pointer.svg"), auto;
        transition: 0.4s;
        transform: translateX(-60%);
      }

      path.two {
        cursor: url("/assets/cursor/pointer.svg"), auto;
        transition: 0.5s;
        transform: translateX(-30%);
      }

      .cta:hover path.three {
        cursor: url("/assets/cursor/pointer.svg"), auto;
        animation: ${color_anim} 1s infinite 0.2s;
      }

      .cta:hover path.one {
        cursor: url("/assets/cursor/pointer.svg"), auto;
        transform: translateX(0%);
        animation: ${color_anim} 1s infinite 0.6s;
      }

      .cta:hover path.two {
        cursor: url("/assets/cursor/pointer.svg"), auto;
        transform: translateX(0%);
        animation: ${color_anim} 1s infinite 0.4s;
      }
    }
  }
`