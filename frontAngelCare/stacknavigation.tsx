import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { HomeScreen } from './homescreen';

const stack = createStackNavigator();

export const StackNavigation = () => {
    return (
        <stack.Navigator screenOptions={
            {
                headerShown: false
            }
        }>
            <stack.Screen name="Home" component={HomeScreen} />
        </stack.Navigator>

    )
}
