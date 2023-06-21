import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';

const FooterNavigation = () => {
    
    // const navigation = useNavigation();
    
    // const route = useRoute();
    // const currentRouteName = route.name;
    // const shouldShowFooter = !['Login', 'Signup'].includes(currentRouteName);

    // const shoulShowFooter = !['Login','Register','DatesHistorial','Services','Ambulance','Clinic','Ensurance','Dates','Profile','ChatList','Chat','ChatDate','DoctorList','ProfileMedic','RegisterMedicStep2','RegisterMedicStep3','RegisterMedicStep4','Vizualise','MedicalRecord','MedicalRecordMatch',].includes(navigation?.getState()?.routes?.[0]?.name);

    // if(!shoulShowFooter) return null;

    return (
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.footerButton}>
                <Ionicons name="home-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                <Ionicons name="search-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                <Ionicons name="heart-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                <Ionicons name="person-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        );
    };

    const styles = StyleSheet.create({
        footerContainer: {
            backgroundColor: '#0E54BE',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingBottom: 8,
            borderTopWidth: 1,
            borderTopColor: '#FFFFFF',
        },
        footerButton: {
            padding: 8,
        },
    });

export default FooterNavigation;