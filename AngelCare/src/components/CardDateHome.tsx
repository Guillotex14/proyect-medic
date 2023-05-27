import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import { styles } from '../theme/ThemeApp';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';s

export const CardDateHome = () => {

    // const { top } = useSafeAreaInsets();

    const [isDate, setIsDate] = useState('');
    const [isHour, setIsHour] = useState('');

    useEffect(() => {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();

        let hour = date.getHours();
        let minutes = date.getMinutes();


        setIsDate(`${day}/${month}/${year}`);
        setIsHour(`${hour}:${minutes}`);
    }, []);

    return (
        <View style={{backgroundColor: '#DEF2FF', flexDirection: 'row', borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: 130, alignContent: 'center', alignItems: 'center', width: '95%', height: 50}}>
            <Text style={{...styles.title, color: 'black', fontSize: 13, width: '50%', fontWeight: '400', alignSelf: 'center', marginTop: -2}}>{isDate}</Text>
            <Text style={{...styles.title, color: 'black', fontSize: 13, width: '50%', fontWeight: '400', alignSelf: 'center', marginTop: -2}}>{isHour}</Text>
        </View>
    );
}
