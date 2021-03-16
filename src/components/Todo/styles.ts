import { Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface TitleProps {
  done?: boolean;
}

export const Container = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text<TitleProps>`
  font-size: 16px;
  margin-left: 8px;
  color: ${props => (props.done ? '#ccc' : '#f4f4f4')};
  text-decoration-line: ${props => (props.done ? 'line-through' : 'none')};
`;

export const OptionsContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 6px;
`;

export const DeleteButton = styled(RectButton)``;

export const ButtonText = styled.Text``;
