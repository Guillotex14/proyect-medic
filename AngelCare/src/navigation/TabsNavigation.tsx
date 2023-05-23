import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../views/HomeScreen';
import { ProfileScreen } from '../views/ProfileScreen';
import { ChevronDownIcon } from 'native-base';




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
            // borderRadius: 30,
            // shadowColor: "#000",
            // shadowOffset: {
            //   width: 0,
            //   height: 0,
            // },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,
          },
          tabBarIconStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
          },
          tabBarShowLabel: false,
          // tabBarShowIcon: true,
          // tabBarLabelPosition: 'below-icon',
          // tabBarLabelStyle: {
          //   fontSize: 15,
          //   fontWeight: 'bold',
          // },
        }
      }>
        <Tabs.Screen name="Home" component={HomeScreen} options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <ChevronDownIcon style={{color: 'white'}}/>
          ),
        }}/>
        <Tabs.Screen name="Profile" component={ProfileScreen} options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <ChevronDownIcon style={{color: 'white'}}/>
          ),
        }}/>
      </Tabs.Navigator>
    );
};
