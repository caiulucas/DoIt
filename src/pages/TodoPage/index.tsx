import { useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Todo } from '../../components/Todo';
import { TodoList, useTodoList } from '../../hooks/useTodoList';
import { Container, Content, Input, TitleInput } from './styles';

interface RouteParams {
  todoListId: string;
}

export const TodoPage: React.FC = () => {
  const [todo, setTodo] = useState('');
  const [title, setTitle] = useState('');
  const [todoList, setTodoList] = useState<TodoList>({} as TodoList);
  const [hasTitle, setHasTitle] = useState(false);

  const { params } = useRoute();
  const routeParams = params as RouteParams;

  const {
    getTodoListById,
    addTodoList,
    addTodo,
    removeTodo,
    switchDone,
  } = useTodoList();

  useEffect(() => {
    if (!!routeParams && routeParams.todoListId) {
      const list = getTodoListById(routeParams.todoListId);
      setTodoList(list);
      setTitle(list.title);
      setHasTitle(true);
    }
  }, [getTodoListById, routeParams]);

  const handleTitleInputChange = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const handleTitleInputSubmit = useCallback(async () => {
    const list = await addTodoList(title);
    setTodoList(list);
    setHasTitle(true);
  }, [addTodoList, title]);

  const handleInputChange = useCallback((value: string) => {
    setTodo(value);
  }, []);

  const handleInputSubmit = useCallback(async () => {
    const list = await addTodo(todoList.id, todo);
    setTodoList(list);
    setTodo('');
  }, [addTodo, todo, todoList]);

  const handleRemoveTodo = useCallback(
    async (todoId: string) => {
      await removeTodo(todoList.id, todoId);
    },
    [removeTodo, todoList.id],
  );

  const handleSwitchDone = useCallback(
    async (todoId: string) => {
      await switchDone(todoList.id, todoId);
    },
    [switchDone, todoList.id],
  );

  return (
    <Container>
      <Content>
        <TitleInput
          placeholder="Título da lista"
          onChangeText={handleTitleInputChange}
          value={title}
          onSubmitEditing={handleTitleInputSubmit}
        />

        {hasTitle && (
          <>
            <FlatList
              data={todoList.todos}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Todo
                  todo={item}
                  onRemove={handleRemoveTodo}
                  onSwitch={handleSwitchDone}
                />
              )}
            />

            <Input
              placeholder="Add new item"
              onChangeText={handleInputChange}
              value={todo}
              onSubmitEditing={handleInputSubmit}
            />
          </>
        )}
      </Content>
    </Container>
  );
};
