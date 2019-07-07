import styled from 'styled-components';

const Input = styled.input`
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  border: 1px solid #bdbdbd;
  background-image: none;
  background-color: #ffffff;
  box-shadow: none;
  box-sizing: border-box;
  outline: 0;
  &:focus {
    border: 1px solid #3080e8;
  }
`;

export default Input;
