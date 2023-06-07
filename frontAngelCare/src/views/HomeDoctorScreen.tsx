import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardHome, CardHomeMedic } from '../components/CardHome';
import { AddIcon} from 'native-base';
import { LastDate, LastDateMedic } from '../components/LastDate';
import { CardMedicsHome } from '../components/CardMedicsHome';
import { StackScreenProps } from '@react-navigation/stack';
import { Images } from '../assets/imgs/imgs';
import { CardDateHome } from '../components/CardDateHome';

// import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<any, any>{}
export const HomeDoctorScreen = ({navigation}: Props) => {

    const { top } = useSafeAreaInsets();

    return (
        <ScrollView>
            <View style={{...styles.container, backgroundColor: '#0E54BE'}}>

                {/* Header */}
                <View style={{ flexDirection: 'row', height: 150}}>

                    <View style={{width: '70%', marginTop: top+30, }}>
                        <Text style={{...styles.title, color: 'white', fontSize: 14, textAlign: 'left', marginLeft: 25}} onPress={()=>{navigation.navigate('ProfileMedic')}}>Bienvenido, Doctor</Text>
                    </View>
                    <View style={{width: '30%', marginTop: top+50 }}>
                        <Image source={Images.chat} style={{width: 25, height: 25, alignSelf: 'center'}}/>
                    </View>
                </View>

                {/* Card Fecha */}
                <View style={{backgroundColor: '#DEF2FF', flexDirection: 'row', borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: top+130, alignContent: 'center', alignItems: 'center', width: '95%', marginLeft: 20}}>
                    <CardDateHome />
                </View>

                <View style={{...styles.container, backgroundColor: '#F8F8F8', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>

                    {/* Card de metricas */}
                    <CardHomeMedic />

                    {/* Card comenzar servicio medico */}
                    <View style={{width: '90%', height: 80 , borderRadius: 12, backgroundColor: '#0E54BE', flexDirection: 'row', alignSelf: 'center', marginTop: 25}}>

                        <View style={{width: '80%', alignSelf: 'center'}}>
                            <Text style={{color: 'white', fontSize: 18, textAlign: 'left', marginHorizontal: 10, fontWeight: '600', marginLeft: 10}}>Visualizar</Text>
                            <Text style={{color: 'white', fontSize: 11, textAlign: 'left', marginHorizontal: 10, fontWeight: '600', marginLeft: 10}}>Presione aquí para visualizar datos de Pacientes</Text>
                        </View>

                        <View style={{width: '20%', alignSelf: 'center'}} >
                            <TouchableOpacity style={{backgroundColor: 'white', borderRadius: 10, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}} onPress={()=>{navigation.navigate('Vizualise')}}>
                                <AddIcon size="6" style={{color: "#0E54BE"}}/>
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* Card ultima cita */}
                    <LastDateMedic />

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
