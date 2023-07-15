import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { Images } from '../assets/imgs/imgs';
import { Card,Avatar } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

interface Props extends StackScreenProps<any, any>{};
export const CardDateSearch = () => {
    // eslint-disable-next-line react/no-unstable-nested-components
    // const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    const nav = useNavigation();

    const cardMedics = (name: any,speciality: any,city: any) => {
        
        return (

            <View>

            <Card style={{width: 170, height: 250, marginTop: 20, marginBottom: 90, marginHorizontal: 20, backgroundColor: '#fff'}}>
                <Card.Content>
                    <Avatar.Image source={Images.doctor} size={100} style={{
                        alignSelf: 'center',
                        height: 100,
                    }}/>

                <Text style={{fontSize: 14, textAlign: 'center', marginTop: 15}}>{name}</Text>
                <Text style={{fontSize: 12, color: '#0E54BE',textAlign: 'center', marginTop: 5}}>{speciality}</Text>
                <Text style={{fontSize: 12, color: '#0E54BE',textAlign: 'center', marginTop: 5}}>{city}</Text>
                </Card.Content>
            </Card>
        </View>

        );
    }

    return (
        <View>

            {/* <Carousel 
                data={[1,2,3]}
                renderItem={({item}) => cardMedics('Dr. Juan Perez','Medico General','Bogotá')}
                sliderWidth={400}
                itemWidth={200}
            /> */}

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
