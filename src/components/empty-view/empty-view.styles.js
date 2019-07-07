import styled from 'styled-components';
import { ReactComponent as GithubIcon } from '../../assets/svg/mark-github.svg';

const Container = styled.div`
  border: 1px solid #bdbdbd;
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  align-items: center;
  padding: 30px;
`;

const Icon = styled(GithubIcon)`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

export {
  Container,
  Icon,
};
