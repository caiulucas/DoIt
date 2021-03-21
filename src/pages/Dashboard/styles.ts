import { Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const AddButton = styled(Pressable).attrs({
  android_ripple: {
    color: '#8a80f2',
    radius: 25,
  },
})`
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 50px;
  height: 50px;
  background: #575199;
  border-radius: 25px;
  top: ${Dimensions.get('window').height - 32}px;
  left: ${Dimensions.get('window').width - 24 - 50}px;
`;

export const PlusIcon = styled(Icon).attrs(({ theme }) => ({
  name: 'plus',
  size: 32,
  color: theme.colors.text,
}))``;
