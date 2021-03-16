import React from 'react';
import TodoProvider from './todo';

const AppProvider: React.FC = ({ children }) => (
  <TodoProvider>{children}</TodoProvider>
);

export default AppProvider;
