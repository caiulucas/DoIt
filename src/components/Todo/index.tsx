import CheckBox from '@react-native-community/checkbox';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Feather';
import { useTodo } from '../../hooks/todo';
import { Container, DeleteButton, OptionsContainer, Title } from './styles';

interface TodoProps {
  todo: {
    id: string;
    title: string;
    done: boolean;
  };
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const moveAnim = useRef(new Animated.Value(-30)).current;
  const { switchDone, removeTodo } = useTodo();

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [moveAnim]);

  const handleRemoveTodo = useCallback(
    (id: string) => {
      Animated.timing(moveAnim, {
        toValue: -30,
        duration: 300,
        useNativeDriver: false,
      }).start();

      setTimeout(() => removeTodo(id), 300);
    },
    [removeTodo, moveAnim],
  );

  return (
    <Swipeable
      renderLeftActions={() => (
        <OptionsContainer>
          <DeleteButton onPress={() => handleRemoveTodo(todo.id)}>
            <Icon name="trash-2" size={20} color="#F76F6D" />
          </DeleteButton>
        </OptionsContainer>
      )}
    >
      <Container
        style={{
          marginTop: moveAnim,
        }}
      >
        <CheckBox
          onValueChange={() => switchDone(todo.id)}
          tintColors={{ true: '#8a80f2', false: '#575199' }}
          value={todo.done}
        />
        <Title done={todo.done}>{todo.title}</Title>
      </Container>
    </Swipeable>
  );
};

export default Todo;
