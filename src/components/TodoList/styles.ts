import { Pressable } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(Pressable).attrs(({ theme }) => ({
  android_ripple: {
    color: theme.colors.border,
  },
}))`
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 0.36px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  font-weight: bold;
`;

export const TodosInfo = styled.View`
  align-items: flex-end;
  justify-content: center;
`;

export const QuantityContainer = styled.View`
  flex-direction: row;
`;

export const Quantity = styled.Text`
  margin-right: 8px;
  font-weight: bold;
  font-size: 16px;
  color: #ddd;
`;

export const QuantityText = styled.Text`
  font-size: 16px;
  color: #ddd;
`;

export const Progress = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Percentage = styled.Text`
  margin-right: 8px;
  color: #f2994a;
  font-weight: bold;
  font-size: 16px;
`;

export const ProgressText = styled.Text`
  color: ${({ theme }) => theme.colors.placeholder};
  font-size: 16px;
`;
