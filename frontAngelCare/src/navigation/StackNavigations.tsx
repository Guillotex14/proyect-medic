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
import { HomeDoctorScreen } from '../views/HomeDoctorScreen';
import { ProfileDoctorScreen } from '../views/ProfileDoctorScreen';
import { RegisterMedicStep2Screen } from '../views/RegisterMedicStep2Screen';
import { RegisterMedicStep3Screen } from '../views/RegisterMedicStep3Screen';
import { RegisterMedicStep4Screen } from '../views/RegisterMedicStep4Screen';
import { VisualizeScreen } from '../views/VisualizeScreen';
import { MedicalRecordScreen } from '../views/MedicalRecordScreen';
import { VizualiseMatchScreen } from '../views/VizualiseMatchScreen';
import { TabsNavigation } from './TabsNavigation';
import { ChatScreen } from '../views/ChatScreen';
import { ListachatScreen } from '../views/ListachatScreen';
import { ListDoctorsScreen } from '../views/ListDoctorsScreen';
import { ChatDateScreen } from '../views/ChatDateScreen';


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
    HomeMedic: undefined;
    ProfileMedic: undefined;
    RegisterMedicStep2: undefined;
    RegisterMedicStep3: undefined;
    RegisterMedicStep4: undefined;
    Vizualise: undefined;
    MedicalRecord: undefined;
    MedicalRecordMatch: undefined;
    Chat: undefined;
    ChatList: undefined;
    DoctorList: undefined;
    ChatDate: undefined;
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
            {/* <Stack.Screen name="RegisterMedicStep2" component={RegisterMedicStep2Screen} /> */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="RegisterStep2" component={RegisterStep2Screen} />
            <Stack.Screen name="RegisterStep3" component={RegisterStep3Screen} />
            <Stack.Screen name="RegisterStep4" component={RegisterStep4Screen} />
            
            {/* navigation of pactients */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DatesHistorial" component={DateHistorialScreen} />
            <Stack.Screen name="Services" component={ServicesScreen} />
            <Stack.Screen name="Ambulance" component={AmbulanceScreen} />
            <Stack.Screen name="Clinic" component={ClinicScreen} />
            <Stack.Screen name="Ensurance" component={EnsuranceScreen} />
            <Stack.Screen name="Dates" component={DatesScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="ChatList" component={ListachatScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="ChatDate" component={ChatDateScreen} />
            <Stack.Screen name="DoctorList" component={ListDoctorsScreen} />

            {/* navigation of doctors */}
            <Stack.Screen name="HomeMedic" component={HomeDoctorScreen} />
            <Stack.Screen name="ProfileMedic" component={ProfileDoctorScreen} />
            <Stack.Screen name="RegisterMedicStep2" component={RegisterMedicStep2Screen} />
            <Stack.Screen name="RegisterMedicStep3" component={RegisterMedicStep3Screen} />
            <Stack.Screen name="RegisterMedicStep4" component={RegisterMedicStep4Screen} />
            <Stack.Screen name="Vizualise" component={VisualizeScreen} />
            <Stack.Screen name="MedicalRecord" component={MedicalRecordScreen} />
            <Stack.Screen name="MedicalRecordMatch" component={VizualiseMatchScreen} />
        </Stack.Navigator>
    );
};

export const StackProfile = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle:{
                backgroundColor: 'white',
            },
        }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}

export const StackProfileMedic = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle:{
                backgroundColor: 'white',
            },
        }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}

export const StackServices = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle:{
                backgroundColor: 'white',
            },
        }}>
            <Stack.Screen name="Services" component={ServicesScreen} />
        </Stack.Navigator>
    );
}

export const StackDatesHistorial = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            cardStyle:{
                backgroundColor: 'white',
            },
        }}>
            <Stack.Screen name="DatesHistorial" component={DateHistorialScreen} />
        </Stack.Navigator>
    );
}
