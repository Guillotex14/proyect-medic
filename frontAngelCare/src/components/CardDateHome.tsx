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

        let current_day = "";
        let current_month = "";
        let current_year = "";
        let current_hour = "";
        let current_minutes = "";

        if(day < 10){
            current_day = `0${day}`;
        }
        if(month < 10){
            current_month = `0${month}`;
        }
        if(hour < 10){
            current_hour = `0${hour}`;
        }else{
            current_hour = `${hour}`;
        }

        if(minutes < 10){
            current_minutes = `0${minutes}`;
        }else{
            current_minutes = `${minutes}`;
        }

        //if AM or PM
        if(hour < 12){
            current_hour = `${current_hour}:${current_minutes} AM`;
        }else{
            current_hour = `${current_hour}:${current_minutes} PM`;
        }
        

        setIsDate(`${current_day}/${current_month}/${year}`);
        setIsHour(current_hour);
    }, []);

    return (
        <View style={{backgroundColor: '#DEF2FF', flexDirection: 'row', borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: 130, alignContent: 'center', alignItems: 'center', width: '95%', height: 50}}>
            <Text style={{...styles.title, color: 'black', fontSize: 15, width: '50%', fontWeight: '500', alignSelf: 'center', marginTop: -2}}>{isDate}</Text>
            <Text style={{...styles.title, color: 'black', fontSize: 15, width: '50%', fontWeight: '500', alignSelf: 'center', marginTop: -2}}>{isHour}</Text>
        </View>
    );
}
