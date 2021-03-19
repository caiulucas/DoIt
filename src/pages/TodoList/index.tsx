import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import Todo from '../../components/Todo';
import { useTodo } from '../../hooks/todo';
import { Container, Content, Input } from './styles';

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');

  const { todos, addTodo } = useTodo();

  const handleInputChange = useCallback((value: string) => {
    setNewTodo(value);
  }, []);

  const handleInputSubmit = useCallback(() => {
    addTodo(newTodo);
    setNewTodo('');
  }, [newTodo, addTodo]);

  return (
    <Container>
      <Content>
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Todo todo={item} />}
        />

        <Input
          placeholder="Add new item"
          onChangeText={handleInputChange}
          value={newTodo}
          onSubmitEditing={handleInputSubmit}
        />
      </Content>
    </Container>
  );
};
export default TodoList;
