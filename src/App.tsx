import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { dark, light } from './themes';
import AppProvider from './hooks';
import TodoList from './pages/TodoList';

const App: React.FC = () => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState(light);

  useEffect(() => {
    setTheme(deviceTheme === 'light' ? light : dark);
  }, [deviceTheme]);

  return (
    <ThemeProvider theme={theme}>
      {/* <StatusBar barStyle="light-content" /> */}
      <AppProvider>
        <TodoList />
      </AppProvider>
    </ThemeProvider>
  );
};
export default App;
