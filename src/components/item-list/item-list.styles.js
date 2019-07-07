import styled from 'styled-components';

const ItemContainer = styled.div`
  border: 1px solid #bdbdbd;
  padding: 10px;
  display: grid;
  grid-template-rows: auto auto;
  grid-row-gap: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    background-color: #e6f7ff;
  }
`;

const ItemName = styled.div`
  font-weight: 600;
`;

const MainContent = styled.div`
  display:grid;
  grid-template-columns: auto auto;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 500px;
  grid-column-gap: 25px;
  > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Stargazer = styled.div`
  justify-self: end;
  display: grid;
  align-items: center;
`;

const Description = styled.div`
  max-width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Statistics = styled.div`
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-column-gap: 25px;
  align-items: center;
`;

const Stats = styled.div`
  display: grid;
  width: fit-content;
  align-items: center;
  grid-template-columns:auto auto;
  grid-column-gap: 5px;
`;

const Details = styled.div`
  display: grid;
  width: 300px;
  align-items: center;
  grid-template-columns:200px 100px;
  grid-column-gap: 15px;
  > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const AnchorButton = styled.button`
  color: #3080e8;
  cursor: pointer;
  background: transparent;
  padding: 0;
  border: none;
  &:hover {
    text-decoration: underline;
  }
`;

export {
  ItemContainer,
  ItemName,
  MainContent,
  Stargazer,
  TitleContainer,
  Description,
  Statistics,
  Stats,
  Details,
  AnchorButton,
};
