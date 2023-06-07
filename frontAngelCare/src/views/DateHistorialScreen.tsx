import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DateHistorial } from '../components/DateHistorial';
import { ChevronLeftIcon, ScrollView } from 'native-base';
import { styles } from '../theme/ThemeApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any>{};

export const DateHistorialScreen = ({navigation}: Props) => {

    const { top } = useSafeAreaInsets();

    return (
        <ScrollView>
            <View style={{...styles.container, }}>
                <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', marginTop: top+50}}>
                    <View style={{width: '30%', alignItems: 'center'}} >
                        <ChevronLeftIcon size="6" onPress={()=> navigation.navigate('Home')} />
                    </View>
                    <View style={
                    // eslint-disable-next-line no-trailing-spaces
                    {width: '60%'}}>
                        <Text style={{fontSize: 15, textAlign: 'left', marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>Historial</Text>
                    </View>
                </View>
                <View style={{width: '100%', alignItems: 'center', alignContent: 'center', marginHorizontal: 40, alignSelf: 'center' }}>
                    <DateHistorial />
                    <DateHistorial />
                    <DateHistorial />
                    <DateHistorial />
                    <DateHistorial />
                    <DateHistorial />
                    <DateHistorial />
                    <DateHistorial />
                    <DateHistorial />
                </View>
            </View>
        </ScrollView>
    )
}
