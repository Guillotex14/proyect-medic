import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import { styles } from '../theme/ThemeApp';
import { Images } from '../assets/imgs/imgs';
import { Card } from 'react-native-paper';
import {  ChevronLeftIcon, FormControl, Select} from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any>{};

export const VisualizeScreen = ({navigation}:Props) => {

    const { top, bottom } = useSafeAreaInsets();
    const [search, setSearch] = useState(false);

    const onSearch = () => {
        setSearch(true);
    }

    return (
            <View style={{...styles.container}}>

            {/* header */}
            <View style={{width: '100%', marginHorizontal: 40, alignSelf: 'center', marginTop: 50, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <View style={{width: 70}}>
                    <TouchableOpacity onPress={()=>{ navigation.pop()}}
                    style={{marginLeft: 18}}>
                        <ChevronLeftIcon size={6} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={{width: 300}}>
                    <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                        Visualizar datos de pacientes
                    </Text>
                </View>
            </View>

            {
                !search && (
                <Card style={{width: '90%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', margin: top+30, height: 180}}>
                <Card.Content>
                    <FormControl>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',alignSelf: 'center' ,width: '100%'}}>
                            <View style={{width: '25%', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 10, backgroundColor: '#fff'}}>
                                <Select style={{height: 45}}>
                                    <Select.Item label="V" value="V" />
                                    <Select.Item label="P" value="P" />
                                    <Select.Item label="E" value="E" />
                                </Select>
                            </View>
                            <View style={{width: '50%', alignItems: 'center'}}>
                                <TextInput style={styles.input}/>
                            </View>
                        </View>
                    </FormControl>
                    <TouchableOpacity style={{...styles.button, width: '70%', alignSelf: 'center', marginVertical: 20}} onPress={()=>{
                        onSearch()
                    }}>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Buscar</Text>
                    </TouchableOpacity>
                </Card.Content>
                </Card>
                )
            }



            {
                search && (
                    <Card style={{width: '90%', alignSelf: 'center', margin: top+30, backgroundColor: '#fff'}}>
                        <Card.Content>
            
                            <View style={{flexDirection: 'row',alignSelf: 'center' ,width: '100%', marginLeft: 25}}>
                                <View style={{width: '25%', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 10}}>
                                    <Image source={Images.doctor} style={{width: 80, height: 80}}/>
                                </View>
                                <View style={{width: '65%', alignItems: 'center', alignSelf: 'center', alignContent: 'center'}}>
                                    <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginLeft: 20}}>Nombre completo: </Text>
                                    <Text style={{color: '#545454', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginLeft: 20}}>John Doe</Text>
                                </View>
                            </View>
        
                            <View style={{flexDirection: 'row', alignSelf: 'center' ,width: '100%', marginLeft: 25}}>
                                <View style={{width: '50%', marginVertical: 10, alignSelf: 'center'}}>
                                    <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Cedula </Text>
                                    <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>123456</Text>
                                </View>
                                <View style={{width: '50%', marginVertical: 10, alignSelf: 'center'}}>
                                    <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Telefono </Text>
                                    <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>123456</Text>
                                </View>
                            </View>
                            
                            <View style={{alignSelf: 'center' ,width: '100%', marginVertical: 5, marginLeft: 25}}>
                                <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Direccion </Text>
                                <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>Calle 123</Text>
                            </View>
                            
                            <View style={{alignSelf: 'center' ,width: '100%', marginVertical: 5, marginLeft: 25}}>
                                <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Correo Electronico </Text>
                                <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>
                                    Johndoe@johndoe.com
                                </Text>
                            </View>
        
                            <View style={{flexDirection: 'row', alignSelf: 'center' ,width: '100%', marginLeft: 25}}>
                                <View style={{width: '50%', alignSelf: 'center', marginTop: 10}}>
                                    <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Fecha de nacimiento </Text>
                                    <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>20-20-2020</Text>
                                </View>
                                <View style={{width: '50%', alignSelf: 'center', marginTop: 10}}>
                                    <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Sexo </Text>
                                    <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>Masculino</Text>
                                </View>
                            </View>
        
                            <View style={{alignSelf: 'center' ,width: '100%',marginVertical: 10, marginLeft: 25}}>
                                <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Poliza de seguro </Text>
                                <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>Poliza</Text>
                            </View>
                            
                            <View style={{alignSelf: 'center' ,width: '100%',marginVertical: 10, marginLeft: 25}}>
                                <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Numero de poliza </Text>
                                <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>123456</Text>
                            </View>
        
                            <TouchableOpacity style={{ alignSelf: 'center', marginVertical: 20}} onPress={()=>{navigation.navigate('MedicalRecord')}}>
                                <Text style={{color: '#0E54BE', fontSize: 20, fontWeight: 'bold'}}>Ver ficha medica</Text>
                            </TouchableOpacity>
        
                            <View style={{flexDirection: 'row', width: '100%', marginTop: 35}}>
                                        <View style={{...stylesCard.cardRectangle, flexDirection: 'row'}}>
                                            <View style={{alignSelf: 'center', width: '50%'}}>
                                                <Text style={{color: '#0E54BE', fontSize: 12.5, marginLeft: 10}}>Sensor Ritmo Cardíaco</Text>
                                                <Text style={{ color: '#0E54BE', fontSize: 12.5, marginLeft: 10}}>
                                                    <Text style={{fontWeight: 'bold', fontSize: 25}}>90</Text>&nbsp;
                                                    bpm
                                                </Text>
                                            </View>
                                            <View style={{alignSelf: 'center', alignContent: 'center', alignItems: 'center' ,width: '50%'}}>
                                                <Image source={Images.sensor_cardiaco} style={{width: 70,height: 60}}/>
                                            </View>
                                        </View>
                            </View>
        
                            <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0}}>
                                <View style={{width: '45%', alignSelf: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                        <Image source={Images.oxigen_blood} style={{width: 20, height: 25}}/>
                                        <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>92</Text>
                                    </View>
                                    <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600',textAlign: 'center'}}>Oxigeno en la sangre</Text>
                                </View>
                                <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                                <View style={{width: '45%', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                        <Image source={Images.ritmo_cardiaco} style={{width: 30, height: 25}}/>
                                        <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>76</Text>
                                    </View>
                                    <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center'}}>Sensor Ritmo Cardiaco</Text>
                                </View>
                            </View>
        
                            <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0}}>
                                <View style={{width: '45%', alignSelf: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                        <Image source={Images.temper} style={{width: 12, height: 20}}/>
                                        <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>36°</Text>
                                    </View>
                                    <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center'}}>Temperatura</Text>
                                </View>
                                <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                                <View style={{width: '45%', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                        <Image source={Images.presion_arterial} style={{width: 20, height: 25}}/>
                                        <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>120/80</Text>
                                    </View>
                                    <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center'}}>Presión Arterial</Text>
                                </View>
                            </View>
        
                            <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0}}>
                                <View style={{width: '45%', alignSelf: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                        <Image source={Images.ciclo_menstrual} style={{width: 30, height: 28}}/>
                                        <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>96</Text>
                                    </View>
                                    <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center'}}>Clico menstrual</Text>
                                </View>
                                <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                                <View style={{width: '45%', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                        <Image source={Images.sueño} style={{width: 30, height: 28}}/>
                                        <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>8</Text>
                                    </View>
                                    <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center'}}>Seguimiento del sueño</Text>
                                </View>
                            </View>
        
                            <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0}}>
                                <View style={{width: '45%', alignSelf: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                        <Image source={Images.estres} style={{width: 22, height: 25}}/>
                                        <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>50</Text>
                                    </View>
                                    <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600',textAlign: 'center'}}>Niveles de estrés</Text>
                                </View>
                                <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                                <View style={{width: '45%', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                        <Image source={Images.presion_sanguinea} style={{width: 20, height: 25}}/>
                                        <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>76</Text>
                                    </View>
                                    <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600',textAlign: 'center'}}>Presión sanguinea</Text>
                                </View>
                            </View>
        
                        </Card.Content>
        
        
                    </Card>
                )
            }



            </View>

    );
}

const stylesCard = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '90%',
        height: 220,
    },
    image: {
        flex: 1,
    },
    cardContainer: {
        flex: 1,
        borderRadius: 10,
        borderColor: '#000',
        alignContent: 'center',
        overflow: 'hidden',
        alignItems: 'center',
    },
    cardRectangle: {
        width: '100%',
        height: 100,
        borderWidth: 0.4,
        borderColor: 'rgba(14, 84, 190, 0.5)',
        borderRadius: 12,
        padding: 10,
        justifyContent: 'space-between',
    },
    });
