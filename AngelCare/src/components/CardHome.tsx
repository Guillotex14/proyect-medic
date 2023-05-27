import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Images } from '../assets/imgs/imgs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Modal } from 'native-base';
// import { useModalMeditions } from '../hooks/useModalMeditions';


// interface Props {
//     onPress: boolean;
// }

export const CardHome = () => {

    const { top } = useSafeAreaInsets();

    // const { openModal, isOpen } = useModalMeditions();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    return (
            <View style={{...stylesCard.container, marginTop: top +20}}>

                <View style={{...stylesCard.cardContainer}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{...stylesCard.cardRectangle, flexDirection: 'row', marginTop: 25}}>
                            <View style={{alignSelf: 'center', width: '45%'}}>
                                <Text style={{color: '#0E54BE', fontSize: 12.5, marginLeft: 10}}>Sensor Ritmo Cardíaco</Text>
                                <Text style={{ color: '#0E54BE', fontSize: 12.5, marginLeft: 10}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 25}}>90</Text>&nbsp;
                                    bpm
                                </Text>
                            </View>
                            <View style={{alignSelf: 'center', alignContent: 'center', alignItems: 'center' ,width: '55%'}}>
                                <Image source={Images.sensor_cardiaco} />
                            </View>
                        </View>
                        {/* boton de tres puntos */}
                        <View style={{marginTop: 20, marginLeft: 5}}>
                            <TouchableOpacity onPress={toggleModal}>
                            {/* onPress={toggleModal} */}
                                <Text style={{color: '#0E54BE', fontSize: 20, fontWeight: 'bold', marginTop: -10}}>.</Text>
                                <Text style={{color: '#0E54BE', fontSize: 20, fontWeight: 'bold', marginTop: -28}}>.</Text>
                                <Text style={{color: '#0E54BE', fontSize: 20, fontWeight: 'bold', marginTop: -28}}>.</Text>

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 15}}>
                        <View style={{width: '48%', alignSelf: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                <Image source={Images.oxigen_blood} />
                                <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>92</Text>
                            </View>
                            <Text style={{ color: '#0E54BE', fontSize: 9, textAlign: 'center'}}>Presión sanguinea</Text>
                        </View>
                        <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                        <View style={{width: '48%', alignSelf: 'center'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                <Image source={Images.ritmo_cardiaco} />
                                <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>76</Text>
                            </View>
                            <Text style={{ color: '#0E54BE', fontSize: 9, textAlign: 'center'}}>Presión sanguinea</Text>
                        </View>
                    </View>
                </View>

                <Modal isOpen={isModalVisible} onClose={!isModalVisible}>
                    <Modal.Content width="320px" height="500px">
                        <Modal.CloseButton onPress={toggleModal}/>
                        <Modal.Body>
                            <View style={{width: '100%', marginHorizontal:10}}>
                                <View>
                                    <View style={{...stylesCard.cardRectangle, flexDirection: 'row', marginTop: 50}}>
                                        <View style={{alignSelf: 'center', width: '45%'}}>
                                            <Text style={{color: '#0E54BE', fontSize: 12.5, marginLeft: 10}}>Sensor Ritmo Cardíaco</Text>
                                            <Text style={{ color: '#0E54BE', fontSize: 12.5, marginLeft: 10}}>
                                                <Text style={{fontWeight: 'bold', fontSize: 25}}>90</Text>&nbsp;
                                                bpm
                                            </Text>
                                        </View>
                                        <View style={{alignSelf: 'center', alignContent: 'center', alignItems: 'center' ,width: '55%'}}>
                                            <Image source={Images.sensor_cardiaco} />
                                        </View>
                                    </View>
                                </View>
                                <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 15}}>
                                    <View style={{width: '50%', alignSelf: 'center'}}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                            <Image source={Images.oxigen_blood} />
                                            <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>92</Text>
                                        </View>
                                        <Text style={{ color: '#0E54BE', fontSize: 9, textAlign: 'center'}}>Presión sanguinea</Text>
                                    </View>

                                    <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                                    <View style={{width: '50%', alignSelf: 'center'}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                            <Image source={Images.ritmo_cardiaco} />
                                            <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>76</Text>
                                        </View>
                                        <Text style={{ color: '#0E54BE', fontSize: 9, textAlign: 'center'}}>Presión sanguinea</Text>
                                    </View>
                                </View>
                            </View>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </View>
        );
    };

    const stylesCard = StyleSheet.create({
        container: {
            alignSelf: 'center',
            width: '95%',
            height: 250,
        },
        image: {
            flex: 1,
        },
        cardContainer: {
            flex: 1,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            borderColor: '#000',
            alignContent: 'center',
            overflow: 'hidden',
            alignItems: 'center',
        },
        cardRectangle: {
            width: '85%',
            height: 100,
            borderWidth: 0.4,
            borderColor: 'rgba(14, 84, 190, 0.5)',
            borderRadius: 12,
            padding: 10,
            justifyContent: 'space-between',
        },
    });
