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

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

interface TodoContextData {
  todos: Todo[];
  addTodo: (todoTitle: string) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
  switchDone: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextData>({} as TodoContextData);

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function loadTodos(): Promise<void> {
      const asyncTodos = await AsyncStorage.getItem('@DoIt:todos');

      if (asyncTodos) setTodos(JSON.parse(asyncTodos));
    }

    loadTodos();
  }, []);

  const addTodo = useCallback(
    async (todoTitle: string) => {
      const newTodo: Todo = {
        id: uuid(),
        title: todoTitle,
        done: false,
      };

      const newTodos = [...todos, newTodo];
      setTodos(newTodos);

      await AsyncStorage.setItem('@DoIt:todos', JSON.stringify(newTodos));
    },
    [todos],
  );

  const removeTodo = useCallback(
    async (id: string) => {
      const filteredTodos = todos.filter(todo => todo.id !== id);

      setTodos(filteredTodos);

      await AsyncStorage.setItem('@DoIt:todos', JSON.stringify(filteredTodos));
    },
    [todos],
  );

  const switchDone = useCallback(
    async (id: string) => {
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) return { ...todo, done: !todo.done };

        return todo;
      });

      setTodos(updatedTodos);
      await AsyncStorage.setItem('@DoIt:todos', JSON.stringify(updatedTodos));
    },
    [todos],
  );

  const value = useMemo(() => ({ todos, addTodo, removeTodo, switchDone }), [
    todos,
    addTodo,
    removeTodo,
    switchDone,
  ]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = (): TodoContextData => {
  const context = useContext(TodoContext);

  if (!context) throw new Error('useTodo must be used within a TodoProvider');

  return context;
};
