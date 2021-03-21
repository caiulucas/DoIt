import React from 'react';
import { TodoProvider } from './useTodo';
import { TodoListProvider } from './useTodoList';

const AppProvider: React.FC = ({ children }) => (
  <TodoListProvider>
    <TodoProvider>{children}</TodoProvider>
  </TodoListProvider>
);

export default AppProvider;
