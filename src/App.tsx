import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppProvider from './hooks';
import { AppRoutes } from './routes/app.routes';
import { dark, light } from './themes';

const App: React.FC = () => {
  const deviceTheme = useColorScheme();

  const isLight = deviceTheme === 'light';

  return (
    <ThemeProvider theme={isLight ? light : dark}>
      <NavigationContainer>
        <StatusBar
          barStyle={isLight ? 'light-content' : 'dark-content'}
          backgroundColor={isLight ? '#fff' : '#000'}
        />
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};
export default App;
