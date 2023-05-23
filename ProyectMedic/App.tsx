/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { StackNavigations } from './src/navigation/StackNavigations';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content"/>
        <StackNavigations/>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
