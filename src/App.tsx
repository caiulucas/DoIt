import React from 'react';
import { StatusBar } from 'react-native';

import TodoList from './pages/TodoList';

const App = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <TodoList />
  </>
);

export default App;
