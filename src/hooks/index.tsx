import React from 'react';
import { TodoProvider } from './useTodo';

const AppProvider: React.FC = ({ children }) => (
  <TodoProvider>{children}</TodoProvider>
);

export default AppProvider;
