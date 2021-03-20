import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Content = styled.View`
  padding: 24px;
`;

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.placeholder,
}))`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;
