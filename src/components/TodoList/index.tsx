import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { TodoList as ITodoList } from '../../hooks/useTodoList';

import {
  Container,
  Percentage,
  Progress,
  ProgressText,
  Quantity,
  QuantityContainer,
  QuantityText,
  Title,
  TodosInfo,
} from './styles';

interface TodoListProps {
  todoList: ITodoList;
}

export const TodoList: React.FC<TodoListProps> = ({ todoList }) => {
  const { navigate } = useNavigation();
  const handlePressContainer = useCallback(() => {
    navigate('TodoPage', { todoListId: todoList.id });
  }, [navigate, todoList.id]);

  return (
    <Container onPress={handlePressContainer}>
      <Title>{todoList.title}</Title>

      <TodosInfo>
        <QuantityContainer>
          <Quantity>{todoList.todos.length}</Quantity>
          <QuantityText>items</QuantityText>
        </QuantityContainer>

        <Progress>
          <Percentage>20%</Percentage>
          <ProgressText>concluídos</ProgressText>
        </Progress>
      </TodosInfo>
    </Container>
  );
};
