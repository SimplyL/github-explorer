import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-items: end;
  align-items: center;
  margin-bottom: 10px;
`;

const AnchorLink = styled.a`
  text-decoration: none;
  color: #3080e8;
  &:hover {
    text-decoration: underline;
  }
  justify-self: start;
  font-size: 1.2em;
`;

export {
  HeaderContainer,
  AnchorLink,
};
