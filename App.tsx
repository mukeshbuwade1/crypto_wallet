/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DarkTheme, DefaultTheme, } from '@react-navigation/native';
import Tabs from "./src/navigation/tabs";
import { Provider, useSelector } from 'react-redux';
import store from './src/redux/store';
import TestComponent from './src/screens/TestComponent';
import { useColorScheme } from 'react-native';
import { darkTheme,lightTheme } from './src/theme/themeValues';
import MainLayout from './src/components/MainLayout';
const Stack = createStackNavigator();


const BaseNavigation = () => {
  const { theme: { isDark } } = useSelector(s => s)
  
  

  
  return (
    <NavigationContainer theme={isDark?darkTheme:lightTheme} >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'MainLayout'}
      >
        <Stack.Screen
          name="MainLayout"
          component={Tabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


function App(): JSX.Element {

  return (
    <Provider store={store} >
      <BaseNavigation />
    </Provider>
  );
}


export default App;

