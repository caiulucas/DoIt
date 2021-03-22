import CheckBox from '@react-native-community/checkbox';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';
import { Todo as ITodo } from '../../hooks/useTodoList';
import { Container, OptionsContainer, Title } from './styles';

interface TodoProps {
  onRemove: (todoId: string) => Promise<void>;
  onSwitch: (todoId: string) => Promise<void>;
  todo: ITodo;
}

export const Todo: React.FC<TodoProps> = ({ todo, onRemove, onSwitch }) => {
  const moveAnim = useRef(new Animated.Value(-35)).current;

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [moveAnim]);

  const handleSwitchDone = useCallback(async () => {
    await onSwitch(todo.id);
  }, [onSwitch, todo.id]);

  const handleRemoveTodo = useCallback(
    (id: string) => {
      Animated.timing(moveAnim, {
        toValue: -35,
        duration: 300,
        useNativeDriver: false,
      }).start();

      setTimeout(() => onRemove(id), 300);
    },
    [moveAnim, onRemove],
  );

  return (
    <Swipeable
      onSwipeableLeftOpen={() => handleRemoveTodo(todo.id)}
      renderLeftActions={() => (
        <OptionsContainer>
          <Icon name="trash-2" size={20} color="#fff" />
        </OptionsContainer>
      )}
    >
      <Container
        style={{
          marginTop: moveAnim,
        }}
      >
        <CheckBox
          onValueChange={() => handleSwitchDone()}
          tintColors={{ true: '#8a80f2', false: '#575199' }}
          value={todo.done}
        />
        <Title done={todo.done}>{todo.title}</Title>
      </Container>
    </Swipeable>
  );
};
