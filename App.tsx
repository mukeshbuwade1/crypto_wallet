/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Tabs from "./src/navigation/tabs";
import { Provider } from 'react-redux';
import  store  from './src/redux/store';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store} >
      <NavigationContainer>
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
    </Provider>
  );
}


export default App;

