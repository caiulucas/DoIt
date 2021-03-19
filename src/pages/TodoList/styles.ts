import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${props => props.theme.colors.background};
  flex: 1;
`;

export const Content = styled.View`
  padding: 24px;
`;

export const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.border};
  /* color: #000; */
`;
