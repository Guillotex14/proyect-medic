import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LastDate = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={{width:'90%', marginTop: top + 20, alignSelf: 'center'}}>
            <View>
                <Text>Ultima cita</Text>
            </View>
            <View style={{flexDirection: 'row', backgroundColor: '#fff', height: 125, borderRadius: 12 }}>
                <View style={{width: '20%', height: 65, alignItems: 'center', alignContent: 'center', backgroundColor: '#0E54BE', marginHorizontal: 12, borderRadius: 12, marginTop: 15}}>
                    <Text style={{color: '#fff', marginTop: 10, fontSize: 11, fontWeight: 'bold'}}>12</Text>
                    <Text style={{color: '#fff',fontSize: 11, fontWeight: 'bold' }}>Enero</Text>
                </View>
                <View style={{width: '80%', alignContent: 'center', marginTop: 15}}>
                    <Text style={{color: '#0E54BE', fontWeight: 'bold', fontSize: 14}}>Consulta internista</Text>
                    <Text style={{color: '#0E54BE', fontSize: 11}}>Detalle de la consulta</Text>
                    {/* <br/> */}
                    <Text style={{color: '#0E54BE', fontSize: 11, marginTop: 15}}>1 diagnostico</Text>
                </View>
            </View>
        </View>
    )
}

export const CardsAmbulance = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={{width:'90%', marginTop: top + 20, alignSelf: 'center'}}>

            <View style={{ backgroundColor: '#fff', borderRadius: 12 }}>
                <Text style={{fontWeight: 'bold', fontSize: 14, marginTop: 15, marginHorizontal: 15}}>Ambulancias BETA</Text>
                <Text style={{fontSize: 11, marginHorizontal: 15, fontWeight:'300'}}>Caracas</Text>
                <Text style={{fontSize: 11, marginHorizontal: 15, fontWeight:'300'}}>0414-2783892</Text>
                <View style={{ marginHorizontal: 15, marginTop: 15, backgroundColor: '#E2F8E3', width: 100, height: 30, borderRadius: 10, alignContent: 'center', alignItems: 'center', marginVertical: 15}}>
                    <Text style={{color: '#04AD01', fontSize: 11, fontWeight: '300', marginTop: 5}}>Disponible</Text>
                </View>
            </View>
        </View>
    );
};
