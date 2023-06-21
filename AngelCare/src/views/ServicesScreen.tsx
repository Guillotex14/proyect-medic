import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Card } from 'react-native-paper';

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

                <Card style={{backgroundColor: '#fff', width:'90%' ,height: 110, borderRadius: 12, alignContent: 'center', alignItems: 'center', marginVertical: 15, alignSelf: 'center'}} onPress={()=>{navigation.navigate('Dates')}}>
                    <Card.Content>
                        <Text style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginVertical: 25, fontSize: 15, fontWeight: 'bold'}}>
                            Consulta
                        </Text>
                    </Card.Content>
                </Card>

                <Card style={{backgroundColor: '#fff', width:'90%' ,height: 110, borderRadius: 12, alignContent: 'center', alignItems: 'center', marginVertical: 15, alignSelf: 'center'}} onPress={()=>{navigation.navigate('Ambulance')}}>
                    <Card.Content>
                        <Text style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginVertical: 25, fontSize: 15, fontWeight: 'bold'}}>
                            Ambulancia
                        </Text>
                    </Card.Content>
                </Card>

                <Card style={{backgroundColor: '#fff', width:'90%' ,height: 110, borderRadius: 12, alignContent: 'center', alignItems: 'center', marginVertical: 15, alignSelf: 'center'}} onPress={()=>{navigation.navigate('Clinic')}}>
                    <Card.Content>
                        <Text style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginVertical: 25, fontSize: 15, fontWeight: 'bold'}}>
                            Clinica
                        </Text>
                    </Card.Content>
                </Card>

                <Card style={{backgroundColor: '#fff', width:'90%' ,height: 110, borderRadius: 12, alignContent: 'center', alignItems: 'center', marginVertical: 15, alignSelf: 'center'}} onPress={()=>{navigation.navigate('Ensurance')}}>
                {/* onPress={()=>{navigation.navigate('Dates')}} */}
                    <Card.Content>
                        <Text style={{justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginVertical: 25, fontSize: 15, fontWeight: 'bold'}}>
                            Seguro
                        </Text>
                    </Card.Content>
                </Card>
            </View>

            


        </View>

    );
};
