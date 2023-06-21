import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const DateHistorial = () => {

    const { top } = useSafeAreaInsets();

    return (
        <View style={{width:'90%', marginTop: top + 10, alignSelf: 'center'}}>
            <View style={{marginHorizontal: 8, marginVertical: 5}}>
                <Text style={{fontSize: 10}}>27 febrero 2023 hpra 1:00pm</Text>
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
