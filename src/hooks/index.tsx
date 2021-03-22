import React from 'react';
import { TodoListProvider } from './useTodoList';

const AppProvider: React.FC = ({ children }) => (
  <TodoListProvider>{children}</TodoListProvider>
);

export default AppProvider;
