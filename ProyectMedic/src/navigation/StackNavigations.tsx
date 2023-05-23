import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from '../views/LoginScreen';
import { RegisterScreen } from '../views/RegisterScreen';
import { ProfileScreen } from '../views/ProfileScreen';
import { HomeScreen } from '../views/HomeScreen';

export type StackParamList = {
    Login: undefined;
    Register: undefined;
    Profile: undefined;
    Home: undefined;
}

const Stack = createStackNavigator<StackParamList>();

export const StackNavigations = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle:{
                backgroundColor: 'white'
            }
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}
