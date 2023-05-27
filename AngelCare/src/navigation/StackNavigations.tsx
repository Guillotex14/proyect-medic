import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../views/LoginScreen';
import { RegisterScreen } from '../views/RegisterScreen';
import { ProfileScreen } from '../views/ProfileScreen';
import { RegisterStep2Screen } from '../views/RegisterStep2Screen';
import { RegisterStep3Screen } from '../views/RegisterStep3Screen';
import { RegisterStep4Screen } from '../views/RegisterStep4Screen';
import { HomeScreen } from '../views/HomeScreen';
import { DateHistorialScreen } from '../views/DateHistorialScreen';
import { ServicesScreen } from '../views/ServicesScreen';
import { AmbulanceScreen } from '../views/AmbulanceScreen';
import { ClinicScreen } from '../views/ClinicScreen';
import { EnsuranceScreen } from '../views/EnsuranceScreen';
import { DatesScreen } from '../views/DatesScreen';
// import { TabsNavigation } from './TabsNavigation';
// import {AsyncStorage} from 'react-native';


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


    const [isTypeUser, setIsTypeUser] = useState('');

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle:{
                backgroundColor: 'white',
            },
        }}>

        {
            isTypeUser === '1' && (

                <Stack.Screen name="Login" component={LoginScreen} />

            )

        }


            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RegisterStep2" component={RegisterStep2Screen} />
            <Stack.Screen name="RegisterStep3" component={RegisterStep3Screen} />
            <Stack.Screen name="RegisterStep4" component={RegisterStep4Screen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DatesHistorial" component={DateHistorialScreen} />
            <Stack.Screen name="Services" component={ServicesScreen} />
            <Stack.Screen name="Ambulance" component={AmbulanceScreen} />
            <Stack.Screen name="Clinic" component={ClinicScreen} />
            <Stack.Screen name="Ensurance" component={EnsuranceScreen} />
            <Stack.Screen name="Dates" component={DatesScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );

    // if(isTypeUser === '1'){
    //     return (
    //         <Stack.Navigator screenOptions={{
    //             headerShown: false,
    //             cardStyle:{
    //                 backgroundColor: 'white',
    //             }
    //         }}>
    //             <Stack.Screen name="Login" component={LoginScreen} />
    //             <Stack.Screen name="Register" component={RegisterScreen} />
    //             <Stack.Screen name="RegisterStep2" component={RegisterStep2Screen} />
    //             <Stack.Screen name="RegisterStep3" component={RegisterStep3Screen} />
    //             <Stack.Screen name="RegisterStep4" component={RegisterStep4Screen} />
    //             <Stack.Screen name="Home" component={HomeScreen} /> 
    //             <Stack.Screen name="DatesHistorial" component={DateHistorialScreen} />
    //             <Stack.Screen name="Services" component={ServicesScreen} />
    //             <Stack.Screen name="Ambulance" component={AmbulanceScreen} />
    //             <Stack.Screen name="Clinic" component={ClinicScreen} />
    //             <Stack.Screen name="Ensurance" component={EnsuranceScreen} />
    //             <Stack.Screen name="Dates" component={DatesScreen} />
    //         </Stack.Navigator>
    //     )
    // }

    // if(isTypeUser === '2'){

    //     return (
    //         <Stack.Navigator screenOptions={{
    //             headerShown: false,
    //             cardStyle:{
    //                 backgroundColor: 'white',
    //             }
    //         }}>
    //             <Stack.Screen name="Login" component={LoginScreen} />
    //             <Stack.Screen name="Register" component={RegisterScreen} />
    //             <Stack.Screen name="RegisterStep2" component={RegisterStep2Screen} />
    //             <Stack.Screen name="RegisterStep3" component={RegisterStep3Screen} />
    //             <Stack.Screen name="RegisterStep4" component={RegisterStep4Screen} />
    //             <Stack.Screen name="Home" component={HomeScreen} /> 
    //             <Stack.Screen name="DatesHistorial" component={DateHistorialScreen} />
    //             <Stack.Screen name="Services" component={ServicesScreen} />
    //             <Stack.Screen name="Ambulance" component={AmbulanceScreen} />
    //             <Stack.Screen name="Clinic" component={ClinicScreen} />
    //             <Stack.Screen name="Ensurance" component={EnsuranceScreen} />
    //             <Stack.Screen name="Dates" component={DatesScreen} />
    //             <Stack.Screen name="Profile" component={ProfileScreen} />
    //         </Stack.Navigator>
    //     );
    // }

    // if (isTypeUser === '3') {
    //     return (
    //         <Stack.Navigator screenOptions={{
    //             headerShown: false,
    //             cardStyle:{
    //                 backgroundColor: 'white',
    //             }
    //         }}>
    //             <Stack.Screen name="Login" component={LoginScreen} />
    //             <Stack.Screen name="Register" component={RegisterScreen} />
    //             <Stack.Screen name="RegisterStep2" component={RegisterStep2Screen} />
    //             <Stack.Screen name="RegisterStep3" component={RegisterStep3Screen} />
    //             <Stack.Screen name="RegisterStep4" component={RegisterStep4Screen} />
    //             <Stack.Screen name="Home" component={HomeScreen} /> 
    //             <Stack.Screen name="DatesHistorial" component={DateHistorialScreen} />
    //             <Stack.Screen name="Services" component={ServicesScreen} />
    //             <Stack.Screen name="Ambulance" component={AmbulanceScreen} />
    //             <Stack.Screen name="Clinic" component={ClinicScreen} />
    //             <Stack.Screen name="Ensurance" component={EnsuranceScreen} />
    //             <Stack.Screen name="Dates" component={DatesScreen} />
    //             <Stack.Screen name="Profile" component={ProfileScreen} />
    //         </Stack.Navigator>
    //     );
    // }


    // if (isTypeUser === '4') {
    //     return (
    //         <Stack.Navigator screenOptions={{
    //             headerShown: false,
    //             cardStyle:{
    //                 backgroundColor: 'white',
    //             }
    //         }}>
    //             <Stack.Screen name="Login" component={LoginScreen} />
    //             <Stack.Screen name="Register" component={RegisterScreen} />
    //             <Stack.Screen name="RegisterStep2" component={RegisterStep2Screen} />
    //             <Stack.Screen name="RegisterStep3" component={RegisterStep3Screen} />
    //             <Stack.Screen name="RegisterStep4" component={RegisterStep4Screen} />
    //             <Stack.Screen name="Home" component={HomeScreen} /> 
    //             <Stack.Screen name="DatesHistorial" component={DateHistorialScreen} />
    //             <Stack.Screen name="Services" component={ServicesScreen} />
    //             <Stack.Screen name="Ambulance" component={AmbulanceScreen} />
    //             <Stack.Screen name="Clinic" component={ClinicScreen} />
    //             <Stack.Screen name="Ensurance" component={EnsuranceScreen} />
    //             <Stack.Screen name="Dates" component={DatesScreen} />
    //             <Stack.Screen name="Profile" component={ProfileScreen} />
    //         </Stack.Navigator>
    //     );
    // }
};
