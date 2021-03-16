import React from 'react';
import { StatusBar } from 'react-native';
import AppProvider from './hooks';

import TodoList from './pages/TodoList';

const App: React.FC = () => (
  <>
    <StatusBar barStyle="light-content" />
    <AppProvider>
      <TodoList />
    </AppProvider>
  </>
);

export default App;
