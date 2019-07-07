import styled from 'styled-components';

const Loader = styled.div`
  border-radius: 50%;
  width: 6em;
  height: 6em;

    &:after {
      border-radius: 50%;
      width: 6em;
      height: 6em;
    }
  margin: 30px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(48,128,232, 0.2);
  border-right: 1.1em solid rgba(48,128,232, 0.2);
  border-bottom: 1.1em solid rgba(48,128,232, 0.2);
  border-left: 1.1em solid #3080e8;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default Loader;