import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppProvider from './hooks';
import { Dashboard } from './pages/Dashboard';
import { dark, light } from './themes';

const App: React.FC = () => {
  const deviceTheme = useColorScheme();

  const isLight = deviceTheme === 'light';

  return (
    <ThemeProvider theme={isLight ? light : dark}>
      <StatusBar
        barStyle={isLight ? 'light-content' : 'dark-content'}
        backgroundColor={isLight ? '#fff' : '#000'}
      />
      <AppProvider>
        <Dashboard />
      </AppProvider>
    </ThemeProvider>
  );
};
export default App;
