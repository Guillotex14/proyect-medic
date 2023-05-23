import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// import { styles } from '../theme/ThemeApp';
import { Images } from '../assets/imgs/imgs';
import Icon from 'react-native-vector-icons/Ionicons';


export const CardMedicsHome = () => {

    return (
        <View style={stylesCardMedicsHome.container}>
            <View style={stylesCardMedicsHome.cardContainer}>
                <View style={{ justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row', marginTop: 20 }}>
                <View style={{width: '50%'}}>
                    <Text style={{fontSize: 12, textAlign: 'right'}}>Conexion</Text>
                </View>
                <View style={{width: '10%'}}>

                </View>
                    <Icon name="ellipse-sharp" size={30} color="#900" />
                    <Icon name="ellipse-sharp" size={30} color="#100" />
                </View>
                <Image source={Images.doctor}/>
                <View style={{alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 15}}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold'}}>Dr. Juan Perez</Text>
                    <Text style={{ fontSize: 10, color: '#0E54BE'}}>Medico General</Text>
                </View>
            </View>
        </View>
    );
};

const stylesCardMedicsHome = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '50%',
        height: 250,
        marginTop: 20,
        marginBottom: 20,
    },
    image: {
        flex: 1,
    },
    cardContainer: {
        flex: 1,
        borderRadius: 10,
        // borderColor: '#',
        alignContent: 'center',
        alignItems: 'center',
        shadowColor: '#b0b0b0',  
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.20,
        shadowRadius: 3,
        elevation: 5,
    },
    cardRectangle: {
        width: '85%',
        height: 100,
        borderWidth: 0.4,
        borderColor: 'rgba(14, 84, 190, 0.5)',
        borderRadius: 12,
        padding: 10,
        justifyContent: 'space-between',
    },
});
