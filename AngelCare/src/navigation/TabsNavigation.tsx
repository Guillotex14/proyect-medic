import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../views/HomeScreen';
import { ProfileScreen } from '../views/ProfileScreen';
// import { ChevronDownIcon } from 'native-base';
import { Image } from 'react-native';
import { Images } from '../assets/imgs/imgs';
// import { StackNavigations } from './StackNavigations';
import { DateHistorialScreen } from '../views/DateHistorialScreen';
import { ServicesScreen } from '../views/ServicesScreen';




export const TabsNavigation = () => {
    
    const Tabs = createBottomTabNavigator();
    return (
      <Tabs.Navigator screenOptions={
        {
          headerShown: false,
          tabBarActiveTintColor: '#BDBDBD',
          tabBarInactiveTintColor: '#BDBDBD',
          tabBarActiveBackgroundColor: '#0E54BE',
          tabBarInactiveBackgroundColor: '#0E54BE',
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'white',
            elevation: 0,
            marginBottom: 5,
            marginHorizontal: 10,
            height: 60,
            width: '95%',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          },
          tabBarIconStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
          },
          tabBarShowLabel: false,
        }
      }>
        <Tabs.Screen name="Home" component={HomeScreen} options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <Image source={Images.grids} style={{width: 25, height: 25, alignSelf: 'center'}}/>
          ),
        }}/>
        <Tabs.Screen name="DatesHistorial" component={DateHistorialScreen} options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <Image source={Images.historial} style={{width: 25, height: 25, alignSelf: 'center'}}/>
          ),
        }}/>

        <Tabs.Screen name="Search" component={ServicesScreen} options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <Image source={Images.search} style={{width: 25, height: 25, alignSelf: 'center'}}/>
          ),
        }}/>

        <Tabs.Screen name="Profile" component={ProfileScreen} options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <Image source={Images.profile} style={{width: 25, height: 25, alignSelf: 'center'}}/>
          ),
        }}/>

      </Tabs.Navigator>
    );
};
