import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from '../views/LoginScreen';
import { RegisterScreen } from '../views/RegisterScreen';
import { ProfileScreen } from '../views/ProfileScreen';
// import { HomeScreen } from '../views/HomeScreen';
import { RegisterStep2Screen } from '../views/RegisterStep2Screen';
import { RegisterStep3Screen } from '../views/RegisterStep3Screen';
import { RegisterStep4Screen } from '../views/RegisterStep4Screen';
// import { TabsNavigation } from './TabsNavigation';
import { HomeScreen } from '../views/HomeScreen';
import { DateHistorialScreen } from '../views/DateHistorialScreen';
import { ServicesScreen } from '../views/ServicesScreen';
import { AmbulanceScreen } from '../views/AmbulanceScreen';
import { ClinicScreen } from '../views/ClinicScreen';
import { EnsuranceScreen } from '../views/EnsuranceScreen';
import { DatesScreen } from '../views/DatesScreen';

export type StackParamList = {
    Login: undefined;
    Register: undefined;
    RegisterStep2: undefined;
    RegisterStep3: undefined;
    RegisterStep4: undefined;
    Profile: undefined;
    Home: undefined;
    DatesHistorial: undefined;
    Services: undefined;
    Ambulance: undefined;
    Clinic: undefined;
    Ensurance: undefined;
    Dates: undefined;
}

const Stack = createStackNavigator<StackParamList>();

export const StackNavigations = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle:{
                backgroundColor: 'white',
            }
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RegisterStep2" component={RegisterStep2Screen} />
            <Stack.Screen name="RegisterStep3" component={RegisterStep3Screen} />
            <Stack.Screen name="RegisterStep4" component={RegisterStep4Screen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DatesHistorial" component={DateHistorialScreen} />
            <Stack.Screen name="Services" component={ServicesScreen} />
            <Stack.Screen name="Ambulance" component={AmbulanceScreen} />
            <Stack.Screen name="Clinic" component={ClinicScreen} />
            <Stack.Screen name="Ensurance" component={EnsuranceScreen} />
            <Stack.Screen name="Dates" component={DatesScreen} />
            {/* <Stack.Screen name="Services" component={ServicesScreen} /> */}
        </Stack.Navigator>
    );
}
