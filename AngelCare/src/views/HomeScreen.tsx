import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardHome } from '../components/CardHome';
import { AddIcon} from 'native-base';
import { LastDate } from '../components/LastDate';
import { CardMedicsHome } from '../components/CardMedicsHome';
import { StackScreenProps } from '@react-navigation/stack';
import { Images } from '../assets/imgs/imgs';
// import { CardDateHome } from '../components/CardDateHome';

// import Carousel from 'react-native-snap-carousel';

interface Props extends StackScreenProps<any, any>{}
export const HomeScreen = ({navigation}: Props) => {

    const { top } = useSafeAreaInsets();

    // const [isDate, setIsDate] = useState('');
    // const [isHour, setIsHour] = useState('');

    // useEffect(() => {
    //     let date = new Date();
    //     let day = date.getDate();
    //     let month = date.getMonth()+1;
    //     let year = date.getFullYear();

    //     let hour = date.getHours();
    //     let minutes = date.getMinutes();


    //     setIsDate(`${day}/${month}/${year}`);
    //     setIsHour(`${hour}:${minutes}`);
    // }, []);

    return (
        <ScrollView>
            <View style={{...styles.container, backgroundColor: '#0E54BE'}}>

                {/* Header */}
                <View style={{ flexDirection: 'row', height: 150}}>

                    <View style={{width: '70%', marginTop: top+30, }}>
                        <Text style={{...styles.title, color: 'white', fontSize: 13,}} onPress={()=>{navigation.navigate('Profile')}}>Bienvenido, Usuario</Text>
                    </View>
                    <View style={{width: '30%', marginTop: top+50 }}>
                        <Image source={Images.chat} style={{width: 25, height: 25, alignSelf: 'center'}}/>
                    </View>
                </View>

                {/* Card Fecha */}
                <View style={{backgroundColor: '#DEF2FF', flexDirection: 'row', borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: top+130, alignContent: 'center', alignItems: 'center', width: '95%'}}>
                    {/* <CardDateHome /> */}
                    <Text style={{...styles.title, color: 'black', fontSize: 13, width: '50%', fontWeight: '400'}} />
                    <Text style={{...styles.title, color: 'black', fontSize: 13, width: '50%', fontWeight: '400'}} />
                </View>

                <View style={{...styles.container, backgroundColor: '#F8F8F8', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>

                    {/* Card de metricas */}
                    <CardHome/>

                    {/* Card comenzar servicio medico */}
                    <View style={{width: '90%', height: 80 , borderRadius: 12, backgroundColor: '#0E54BE', flexDirection: 'row', alignSelf: 'center', marginTop: 25}}>
                        <View style={{width: '80%', alignSelf: 'center'}}>
                            <Text style={{color: 'white', fontSize: 15,textAlign: 'left', marginHorizontal: 10}}>Comenzar</Text>
                            <Text style={{color: 'white', fontSize: 8, textAlign: 'left', marginHorizontal: 10}}>Presione aquí para solicitar un nuevo servicio</Text>
                        </View>
                        <View style={{width: '20%', alignSelf: 'center'}} >
                            <View style={{backgroundColor: 'white', borderRadius: 10, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                <AddIcon color="blue.500" size="4" onPress={()=>{navigation.navigate('Services')}}/>
                            </View>
                        </View>
                    </View>

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
    );
};
