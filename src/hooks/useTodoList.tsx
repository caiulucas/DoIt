import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import { Todo } from './useTodo';

interface TodoList {
  id: string;
  title: string;
  todos: Todo[];
}

interface TodoListContextData {
  todoLists: TodoList[];
  addTodoList: (todoListTitle: string) => Promise<void>;
}

const TodoListContext = createContext<TodoListContextData>(
  {} as TodoListContextData,
);

export const TodoListProvider: React.FC = ({ children }) => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

  useEffect(() => {
    const loadTodoLists = async () => {
      const asyncTodoLists = await AsyncStorage.getItem('@DoIt:todoLists');

      if (asyncTodoLists) setTodoLists(JSON.parse(asyncTodoLists));
    };

    loadTodoLists();
  }, []);

  const addTodoList = useCallback(
    async (todoListTitle: string) => {
      const newTodoList: TodoList = {
        id: uuid(),
        title: todoListTitle,
        todos: [],
      };

      const newTodoLists = [...todoLists, newTodoList];
      setTodoLists(newTodoLists);

      await AsyncStorage.setItem(
        '@DoIt:todoLists',
        JSON.stringify(newTodoLists),
      );
    },
    [todoLists],
  );

  const value = useMemo(() => ({ todoLists, addTodoList }), [
    todoLists,
    addTodoList,
  ]);

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = (): TodoListContextData => {
  const context = useContext(TodoListContext);

  if (context)
    throw new Error('useTodoList must be used within a TodoProvider');

  return context;
};
