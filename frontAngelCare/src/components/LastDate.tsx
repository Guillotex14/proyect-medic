import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LastDate = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={{marginTop: top + 10}}>
            <Text style={{marginLeft: 20}}>Ultima cita</Text>
            <Card style={{
                width:'90%', marginTop: top + 10, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 12
            }}>
                <Card.Content>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: '20%', height: 65, alignItems: 'center', alignContent: 'center', backgroundColor: '#0E54BE', marginHorizontal: 12, borderRadius: 12, marginTop: 10}}>
                            <Text style={{color: '#fff', marginTop: 15, fontSize: 13, fontWeight: 'bold'}}>12</Text>
                            <Text style={{color: '#fff',fontSize: 11, fontWeight: 'bold' }}>Enero</Text>
                        </View>
                        <View style={{width: '80%', alignContent: 'center', marginTop: 10}}>
                            <Text style={{color: '#0E54BE', fontWeight: 'bold', fontSize: 14}}>Consulta internista</Text>
                            <Text style={{color: '#0E54BE', fontSize: 13, fontWeight: '500'}}>Detalle de la consulta</Text>
                            {/* <br/> */}
                            <Text style={{color: '#0E54BE', fontSize: 13, fontWeight: '500', marginTop: 5}}>1 diagnostico</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
};

export const CardsAmbulance = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={{marginTop: top + 10, width:'100%',}}>
            <Card style={{
                marginTop: top + 10, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 12, width: '90%'
            }}>
                <Card.Content>
                <Text style={{fontWeight: 'bold', fontSize: 14, marginTop: 5, marginHorizontal: 15}}>Ambulancias BETA</Text>
                <Text style={{fontSize: 13, marginHorizontal: 15, fontWeight:'300'}}>Caracas</Text>
                <Text style={{fontSize: 13, marginHorizontal: 15, fontWeight:'300'}}>0414-2783892</Text>
                <View style={{ marginHorizontal: 15, marginTop: 15, backgroundColor: '#E2F8E3', width: 100, height: 30, borderRadius: 10, alignContent: 'center', alignItems: 'center', marginVertical: 15}}>
                    <Text style={{color: '#04AD01', fontSize: 13, fontWeight: '300', marginTop: 5}}>Disponible</Text>
                </View>
                </Card.Content>
            </Card>
        </View>
    );
};

export const LastDateMedic = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={{marginTop: top + 10}}>
            <Text style={{marginLeft: 20}}>Ultima cita</Text>
            <Card style={{
                width:'90%', marginTop: top + 10, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 12
            }}>
                <Card.Content>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: '20%', height: 65, alignItems: 'center', alignContent: 'center', backgroundColor: '#0E54BE', marginHorizontal: 12, borderRadius: 12, marginTop: 10}}>
                            <Text style={{color: '#fff', marginTop: 15, fontSize: 13, fontWeight: 'bold'}}>12</Text>
                            <Text style={{color: '#fff',fontSize: 11, fontWeight: 'bold' }}>Enero</Text>
                        </View>
                        <View style={{width: '80%', alignContent: 'center', marginTop: 10}}>
                            <Text style={{color: '#0E54BE', fontWeight: 'bold', fontSize: 14}}>Px. José Gonzales</Text>
                            <Text style={{color: '#0E54BE', fontSize: 13, fontWeight: '500'}}>Detalle de la consulta</Text>
                            {/* <br/> */}
                            <Text style={{color: '#0E54BE', fontSize: 13, fontWeight: '500', marginTop: 5}}>1 diagnostico</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}
