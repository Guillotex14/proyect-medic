/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { NativeBaseProvider,  } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigations } from './src/navigation/StackNavigations';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar barStyle="default" />
        <StackNavigations/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
