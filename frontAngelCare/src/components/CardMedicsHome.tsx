import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { Images } from '../assets/imgs/imgs';
import { Card,Avatar } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface Props extends StackScreenProps<any, any>{};
export const CardMedicsHome = () => {
    // eslint-disable-next-line react/no-unstable-nested-components
    // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    const nav = useNavigation();

    return (
        <View>

            <View style={{flexDirection: 'row', marginVertical: 10, marginHorizontal: 30}}>
                <View style={{width: '70%'}}>
                    <Text style={{fontWeight: '900', fontSize: 15}}>Doctores</Text>
                </View>
                <View style={{width: '30%'}}>
                    
                    <TouchableOpacity onPress={()=> nav.navigate('DoctorList')}>
                        <Text style={{fontSize:13, color: "#545454", textAlign: 'right'}}>ver todos </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Card style={{width: 170, height: 250, marginTop: 20, marginBottom: 90, marginHorizontal: 20, backgroundColor: '#fff'}}>
                <Card.Title 
                    title="Conexión"
                    titleStyle={{
                        fontSize: 13,
                        textAlign: 'center',
                    }}
                    />

                <Card.Content>
                <Avatar.Image source={Images.doctor} size={100} style={{
                    alignSelf: 'center',
                    height: 100,
                }}/>

                <Text style={{fontSize: 14, textAlign: 'center', marginTop: 15}}>Dr. Juan Perez</Text>
                <Text style={{fontSize: 12, color: '#0E54BE',textAlign: 'center', marginTop: 5}}>Medico General</Text>
                </Card.Content>
            </Card>
        </View>
    );
};
