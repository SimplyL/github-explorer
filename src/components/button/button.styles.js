import styled from 'styled-components';

export default styled.button`
  width: fit-content;
  cursor: pointer;
  padding: 5px 25px;
  background: #ffffff;
  ${({ isPrimary }) => (isPrimary ? `
    border: 1px solid #3080e8;
    color: #3080e8;
    &:hover {
      color: #ffffff;
      background: #3080e8;
    }`
    : `
    border: 1px solid #cb132d;
    color: #cb132d;
    &:hover {
      color: #ffffff;
      background: #cb132d;
    }`)
}
`;
