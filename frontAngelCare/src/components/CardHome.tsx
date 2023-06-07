import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Images } from '../assets/imgs/imgs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modal } from 'native-base';
import { Button, Card } from 'react-native-paper';
import { styles } from '../theme/ThemeApp';



export const CardHome = () => {
    const { top } = useSafeAreaInsets();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
            <View style={{...stylesCard.container, marginTop: top +30}}>

                <View style={{marginBottom: 10}}>
                    <Text style={{color: '#000', fontSize: 13, fontWeight: '500'}}>
                        Mediciones
                    </Text>
                </View>

                <Card style={stylesCard.cardContainer}>
                    <Card.Content>
                        <View style={{flexDirection: 'row', width: 310}}>
                            <View style={{...stylesCard.cardRectangle, flexDirection: 'row'}}>
                                <View style={{alignSelf: 'center', width: '50%'}}>
                                    <Text style={{color: '#0E54BE', fontSize: 13, marginLeft: 10, fontWeight: '400'}}>Sensor Ritmo Cardíaco</Text>
                                    <Text style={{ color: '#0E54BE', fontSize: 13, marginLeft: 10, fontWeight: '400'}}>
                                        <Text style={{fontWeight: 'bold', fontSize: 25}}>90</Text>&nbsp;
                                        bpm
                                    </Text>
                                </View>
                                <View style={{alignSelf: 'center', alignContent: 'center', alignItems: 'center' ,width: '50%'}}>
                                    <Image source={Images.sensor_cardiaco} style={{width: 70,height: 60}}/>
                                </View>
                            </View>
                            <View style={{marginLeft: 5, marginTop: -10}}>
                                <TouchableOpacity onPress={toggleModal}>
                                    <Text style={{color: '#0E54BE', fontSize: 20, fontWeight: 'bold', marginTop: -10}}>.</Text>
                                    <Text style={{color: '#0E54BE', fontSize: 20, fontWeight: 'bold', marginTop: -18}}>.</Text>
                                    <Text style={{color: '#0E54BE', fontSize: 20, fontWeight: 'bold', marginTop: -18}}>.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0}}>
                            <View style={{width: '45%', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                    <Image source={Images.oxigen_blood} style={{width: 20, height: 25}}/>
                                    <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>92</Text>
                                </View>
                                <Text style={{ color: '#0E54BE', fontSize: 11, textAlign: 'center', fontWeight: '600'}}>Presión sanguinea</Text>
                            </View>
                            <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                            <View style={{width: '45%', alignSelf: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                    <Image source={Images.ritmo_cardiaco} style={{width: 35, height: 25}}/>
                                    <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>76</Text>
                                </View>
                                <Text style={{ color: '#0E54BE', fontSize: 11, textAlign: 'center', fontWeight: '600'}}>Presión sanguinea</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                <Modal isOpen={isModalVisible} onClose={!isModalVisible}>
                    <Modal.Content width="340px" height="550px">
                        <Modal.CloseButton onPress={toggleModal}/>
                        <Modal.Body>

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

                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </View>
        );
};

export const CardHomeMedic = () => {
    const { top } = useSafeAreaInsets();
    return (
        <View style={{...stylesCard.container, marginTop: top+30, marginBottom: 20}}>
            <Card>
                <Card.Content>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: '20%', height: 65, alignItems: 'center', alignContent: 'center', backgroundColor: '#25CC41', marginHorizontal: 5, borderRadius: 12, marginTop: 15}}>
                        
                            <Text style={{color: '#fff', marginTop: 10, fontSize: 13, fontWeight: 'bold'}}>12</Text>
                            <Text style={{color: '#fff',fontSize: 13, fontWeight: 'bold' }}>Enero</Text>
                        </View>
                        <View style={{width: '70%', alignSelf: 'center'}}>
                            <Text style={{color: '##545454', fontSize: 18, fontWeight: 'bold', marginTop: 5}}>
                                Solicitud de Consulta
                            </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: '400', marginTop: 5}}>
                                Detalle de la consulta
                            </Text>
                            <Text style={{color: '#545454', fontSize: 13, fontWeight: 'bold', marginTop: 5}}>
                                Paciente
                            </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: '400', marginTop: 5}}>
                                Alexis Grande
                            </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold', marginTop: 5}}>
                                Sintomas
                            </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: '400', marginTop: 5}}>
                                Fiebre, dolor de cabeza, tos...
                            </Text>
                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <View style={{width: '50%', alignSelf: 'center'}}>
                                    <Button style={{backgroundColor: '#25CC41', borderRadius: 12, width: '90%', alignSelf: 'center'}}>
                                        <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>Aceptar</Text>
                                    </Button>
                                </View>
                                <View style={{width: '50%', alignSelf: 'center'}}>
                                    <Button style={{backgroundColor: '#D9D9D9', borderRadius: 12, width: '90%', alignSelf: 'center'}}>
                                        <Text style={{color: '#000', fontSize: 13, fontWeight: 'bold'}}>Posponer</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Card.Content>
            </Card>
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
