import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

export const FooterNavigation = (props: { currentRouteName: string; animatedStyle: any; navigation: any }) => {
  const { currentRouteName, animatedStyle, navigation } = props;

  const shouldShowFooter = ![
    'Login',
    'Register',
    'DatesHistorial',
    'Services',
    'Ambulance',
    'Clinic',
    'Ensurance',
    'Dates',
    'Profile',
    'ChatList',
    'Chat',
    'ChatDate',
    'DoctorList',
    'ProfileMedic',
    'RegisterMedicStep2',
    'RegisterMedicStep3',
    'RegisterMedicStep4',
    'Vizualise',
    'MedicalRecord',
    'MedicalRecordMatch',
  ].includes(currentRouteName);

  const handleIconPress = (route: string) => {
    navigation.navigate(route);
  };

  if (!shouldShowFooter) {
    return null;
  }

  const isPatientView = currentRouteName === 'Home'; // Verifica si es la vista del paciente

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.footerContainer, animatedStyle]}>
        {isPatientView ? ( // Si es la vista del paciente
          <>
            <TouchableOpacity style={styles.footerButton}>
              <Ionicons name="md-grid-outline" size={24} color="#FFFFFF" onPress={() => handleIconPress('Services')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
              <Ionicons name="clipboard-outline" size={24} color="#FFFFFF" onPress={() => handleIconPress('ChatList')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
              <Ionicons name="search-outline" size={24} color="#FFFFFF" onPress={() => handleIconPress('DoctorList')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => handleIconPress('Profile')}>
              <Ionicons name="person-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </>
        ) : ( // Si es la vista del doctor
          <>
            <TouchableOpacity style={styles.footerButton}>
              <Ionicons name="md-grid-outline" size={24} color="#FFFFFF" onPress={() => handleIconPress('ChatList')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
              <Ionicons name="clipboard-outline" size={24} color="#FFFFFF" onPress={() => handleIconPress('DatesHistorial')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
              <Ionicons name="search-outline" size={24} color="#FFFFFF" onPress={() => handleIconPress('Vizualise')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton} onPress={() => handleIconPress('ProfileMedic')}>
              <Ionicons name="person-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 10,
    backgroundColor: '#0E54BE',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
  },
  footerButton: {
    padding: 8,
  },
  
});