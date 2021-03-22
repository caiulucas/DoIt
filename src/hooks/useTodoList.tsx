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

export interface TodoList {
  id: string;
  title: string;
  todos: Todo[];
}

interface TodoListContextData {
  todoLists: TodoList[];
  getTodoListById: (todoListId: string) => TodoList;
  addTodoList: (todoListTitle: string) => Promise<TodoList>;
  addTodo: (todoListId: string, todoTitle: string) => Promise<TodoList>;
  removeTodo: (todoListId: string, todoId: string) => Promise<void>;
  switchDone: (todoListId: string, todoId: string) => Promise<void>;
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

  const getTodoListById = useCallback(
    (todoListId: string) => {
      const todoList = todoLists.find(({ id }) => todoListId === id);

      if (!todoList) throw new Error('Todo List not found');

      return todoList;
    },
    [todoLists],
  );

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

      return newTodoList;
    },
    [todoLists],
  );

  const addTodo = useCallback(
    async (todoListId: string, todoTitle: string) => {
      const todoList = getTodoListById(todoListId);

      const todo: Todo = {
        id: uuid(),
        title: todoTitle,
        done: false,
      };
      const updatedTodoList = { ...todoList, todos: [...todoList.todos, todo] };

      const updatedTodoLists = todoLists.map(list => {
        if (list.id === todoListId) return updatedTodoList;

        return list;
      });

      setTodoLists(updatedTodoLists);

      await AsyncStorage.setItem(
        '@DoIt:todoLists',
        JSON.stringify(updatedTodoLists),
      );

      return updatedTodoList;
    },
    [getTodoListById, todoLists],
  );

  const removeTodo = useCallback(
    async (todoListId: string, todoId: string) => {
      const todoList = getTodoListById(todoListId);

      const filteredTodos = todoList.todos.filter(todo => todo.id !== todoId);

      const updatedTodoLists = todoLists.map(list => {
        if (list.id === todoListId) return { ...list, todos: filteredTodos };

        return list;
      });

      setTodoLists(updatedTodoLists);

      await AsyncStorage.setItem(
        '@DoIt:todoLists',
        JSON.stringify(updatedTodoLists),
      );
    },
    [getTodoListById, todoLists],
  );

  const switchDone = useCallback(
    async (todoListId: string, todoId: string) => {
      const todoList = getTodoListById(todoListId);

      const updatedTodos = todoList.todos.map(todo => {
        if (todo.id === todoId) return { ...todo, done: !todo.done };
        return todo;
      });

      const updatedTodoLists = todoLists.map(list => {
        if (list.id === todoListId) {
          return { ...list, todos: updatedTodos };
        }
        return list;
      });

      setTodoLists(updatedTodoLists);
      await AsyncStorage.setItem(
        '@DoIt:todoLists',
        JSON.stringify(updatedTodoLists),
      );
    },
    [getTodoListById, todoLists],
  );

  const value = useMemo(
    () => ({
      todoLists,
      getTodoListById,
      addTodoList,
      addTodo,
      removeTodo,
      switchDone,
    }),
    [todoLists, getTodoListById, addTodoList, addTodo, removeTodo, switchDone],
  );

  return (
    <TodoListContext.Provider value={value}>
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = (): TodoListContextData => {
  const context = useContext(TodoListContext);

  if (!context)
    throw new Error('useTodoList must be used within a TodoProvider');

  return context;
};
