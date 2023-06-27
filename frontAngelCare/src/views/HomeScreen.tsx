import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardHome } from '../components/CardHome';
import { AddIcon} from 'native-base';
import { LastDate } from '../components/LastDate';
import { CardMedicsHome } from '../components/CardMedicsHome';
import { StackScreenProps } from '@react-navigation/stack';
import { Images } from '../assets/imgs/imgs';

// import Carousel from 'react-native-snap-carousel';
import {  Card } from 'react-native-paper';
import { FooterNavigation } from '../components/Footer';
//import { useFooter } from '../hooks/useFooter';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface Props extends StackScreenProps<any, any>{}
export const HomeScreen = ({navigation}:Props) => {

    const route = useRoute();
    const currentRouteName = route.name;

    const scrollY = useSharedValue(0);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
          opacity: opacity.value,
          transform: [{ translateY: withTiming(scrollY.value, { duration: 250 }) }],
        };
      });

    const { top } = useSafeAreaInsets();

   //const { onShowFooter } = useFooter();

    // useEffect(() => {
    //     onShowFooter(true);
    // }, [])

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
        <>
        <ScrollView onScroll={(event) => {
          const scrollY = event.nativeEvent.contentOffset.y;
          const shouldHideFooter = scrollY > 0;
            opacity.value = withTiming(shouldHideFooter ? 0 : 1, { duration: 500 });
        }}>
            <View style={{...styles.container, backgroundColor: '#0E54BE'}}>
                {/* Header */}
                <View style={{ flexDirection: 'row', height: 150}}>

                    <View style={{width: '70%', marginTop: top+30, }}>
                        <Text style={{...styles.title, color: 'white', fontSize: 18, textAlign: 'left', marginLeft: 25}} onPress={()=>{navigation.navigate('Profile')}}>Bienvenido, Doctor</Text>
                    </View>
                    <View style={{width: '30%', marginTop: top+50 }}>
                        <TouchableOpacity onPress={()=> navigation.navigate('ChatList')}>
                            <Image source={Images.chat} style={{width: 25, height: 25, alignSelf: 'center'}}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Card Fecha */}
                <View style={{backgroundColor: '#DEF2FF', flexDirection: 'row', borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: top+130, alignContent: 'center', alignItems: 'center', width: '95%', height: 45}}>
                    {/* <CardDateHome /> */}
                    <Text style={{...styles.title, color: 'black', fontSize: 13, width: '50%', fontWeight: '400', marginTop: -5}} >{isDate}</Text>
                    <Text style={{...styles.title, color: 'black', fontSize: 13, width: '50%', fontWeight: '400', marginTop: -5}} >{isHour}</Text>
                </View>

                <View style={{...styles.container, backgroundColor: '#F8F8F8', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>

                    {/* Card de metricas */}
                    <CardHome/>

                    {/* Card comenzar servicio medico */}

                    <Card style={{width: '90%', height: 80 , borderRadius: 12, backgroundColor: '#0E54BE', alignSelf: 'center', marginTop: 25}}>
                        <Card.Content>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{width: '80%', alignSelf: 'center'}}>
                                    <Text style={{color: 'white', fontSize: 18,textAlign: 'left', marginHorizontal: 10}}>Comenzar</Text>
                                    <Text style={{color: 'white', fontSize: 11, textAlign: 'left', marginHorizontal: 10}}>Presione aquí para solicitar un nuevo servicio</Text>
                                </View>
                                <View style={{width: '20%', alignSelf: 'center'}} >
                                    <View style={{backgroundColor: 'white', borderRadius: 10, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                        
                                        <TouchableOpacity onPress={()=>{navigation.navigate('Services')}}>
                                            <AddIcon color="blue.500" size="6"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>

                    {/* Card ultima cita */}
                    <LastDate />

                    {/* Cards y Carousel Doctores */}
                    {/* <Carousel
                        data={}
                        renderItem={() => <CardMedicsHome />}
                        sliderWidth={300}
                        itemWidth={300}
                    /> */}
                    
                    <CardMedicsHome />

                </View>

            </View>
        </ScrollView>
        <FooterNavigation currentRouteName={currentRouteName} animatedStyle={animatedStyle} navigation={navigation} />
        </>
    );
};
