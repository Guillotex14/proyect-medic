import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const ServicesScreen = ({navigation}:Props) => {

    const { top } = useSafeAreaInsets();
    
    return (

        <View style={{...styles.container}}>
            <View style={{width: '100%', alignItems: 'center', alignContent: 'center', marginHorizontal: 40, alignSelf: 'center', marginTop: 90 }}>
                <Text style={{fontSize: 15, textAlign: 'left', marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                    ¿Qué servicio necesitás?
                </Text>
            </View>

            <View style={{width:'90%', marginTop: top + 20, alignSelf: 'center' }}>
                <View style={{backgroundColor: '#fff', width:'80%' ,height: 110, borderRadius: 12, alignContent: 'center', alignItems: 'center', marginVertical: 15, alignSelf: 'center'}}>
                    <TouchableOpacity 
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }} 
                    onPress={()=>{ navigation.navigate('Dates')}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, alignSelf: 'center'}}>Consulta</Text>
                    </TouchableOpacity>
                </View>

                <View style={{backgroundColor: '#fff', width:'80%' ,height: 110, borderRadius: 12, alignContent: 'center', alignItems: 'center', marginVertical: 15, alignSelf: 'center'}}>
                    <TouchableOpacity 
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }} 
                    onPress={()=>{ navigation.navigate('Ambulance')}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, alignSelf: 'center'}}>Ambulacia</Text>
                    </TouchableOpacity>

                </View>

                <View style={{backgroundColor: '#fff', width:'80%' ,height: 110, borderRadius: 12, alignContent: 'center', alignItems: 'center', marginVertical: 15, alignSelf: 'center'}}>
                    <TouchableOpacity 
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }} 
                    onPress={()=>{ navigation.navigate('Clinic')}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, alignSelf: 'center'}}>Clinica</Text>
                    </TouchableOpacity>
                </View>

                <View style={{backgroundColor: '#fff', width:'80%' ,height: 110, borderRadius: 12, alignContent: 'center', alignItems: 'center', marginVertical: 15, alignSelf: 'center'}}>
                    <TouchableOpacity 
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }} 
                    onPress={()=>{ navigation.navigate('Ensurance')}}>
                        <Text style={{fontWeight: 'bold', fontSize: 15, alignSelf: 'center'}}>Seguro</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
};
