import { Animated } from 'react-native';
import styled from 'styled-components/native';

interface TitleProps {
  done?: boolean;
}

export const Container = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  background: ${props => props.theme.colors.background};
`;

export const Title = styled.Text<TitleProps>`
  font-size: 16px;
  margin-left: 8px;
  color: ${props => (props.done ? '#858585' : props.theme.colors.text)};
  text-decoration-line: ${props => (props.done ? 'line-through' : 'none')};
`;

export const OptionsContainer = styled.View`
  background: #f76f6d;
  justify-content: center;
  padding: 6px;
  flex: 1;
`;
