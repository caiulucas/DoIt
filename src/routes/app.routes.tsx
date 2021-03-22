import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dashboard } from '../pages/Dashboard';
import { TodoPage } from '../pages/TodoPage';

const App = createStackNavigator();

export const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="TodoPage" component={TodoPage} />
  </App.Navigator>
);
