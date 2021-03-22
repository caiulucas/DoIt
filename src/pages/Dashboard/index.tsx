import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { TodoList } from '../../components/TodoList';
import { useTodoList } from '../../hooks/useTodoList';
import { AddButton, Container, PlusIcon } from './styles';

export const Dashboard: React.FC = () => {
  const { todoLists } = useTodoList();
  const { navigate } = useNavigation();

  const handleAddTodoList = useCallback(() => {
    navigate('TodoPage');
  }, [navigate]);

  return (
    <Container>
      <FlatList
        data={todoLists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TodoList todoList={item} />}
      />

      <AddButton onPress={handleAddTodoList}>
        <PlusIcon />
      </AddButton>
    </Container>
  );
};
