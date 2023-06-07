import React from 'react';
import { View, Text} from 'react-native';
import { Images } from '../assets/imgs/imgs';
import { Card,Avatar } from 'react-native-paper';

export const CardMedicsHome = () => {
    // eslint-disable-next-line react/no-unstable-nested-components
    // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    return (
        <View>
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
