import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal, FlatList} from 'react-native';
import { styles } from '../theme/ThemeApp';
import { Images } from '../assets/imgs/imgs';
import { Card } from 'react-native-paper';
import { useToast} from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { styles_modal } from '../theme/Modal_Profile_Doctor';
import { TypeDni } from '../interfaces/registerModels';
import apiConnection from '../api/Concecction';


interface Props extends StackScreenProps<any, any>{};

export const VisualizeScreen = ({navigation}:Props) => {
    
    const toast = useToast();
    const { top, bottom } = useSafeAreaInsets();
    const [search, setSearch] = useState(false);
    const [showTypeDNI, setShowTypeDNI] = useState(false);
    const [validDNI, setValidDNI] = useState(false);
    const [validTypeDni, setValidTypeDni] = useState(false);
    
    const [dni, setDni] = useState('');
    const [typeDNISelected, setTypeDNISelected] = useState('');
    const [dataPatient, setDataPatient] = useState<any>({});

    const typeDNI: TypeDni[] = [
    {
        label: 'V',
        value: 'V'
    },
    {
        label: 'E',
        value: 'E'
    },
    {
        label: 'P',
        value: 'P'
    }
    ];

    const onSearch = async () => {
        if (dni === '') {
            presentToast('Debe ingresar un número de cédula');
            setValidDNI(true);
            return;
        }else{
            setValidDNI(false);
        }

        if (typeDNISelected === '') {
            presentToast('Debe seleccionar un tipo de cédula');
            setValidTypeDni(true);
            return;
        }else{
            setValidTypeDni(false);
        }
        
        await apiConnection.post('/doctor/getPatientByDni', {
            typeDni: typeDNISelected,
            dni: dni

        }).then((response) => {
            console.log(response.data);
            if (response.data.status) {
                setDataPatient(response.data.data);
                setSearch(true);
            }else{
                presentToast("El paciente no se encuentra registrado");
            }

        }).catch((error) => {
            console.log(error);
        });



    }

    const onPressModal = (value: string) => {
        setTypeDNISelected(value);
        setShowTypeDNI(!showTypeDNI);
    }

    const presentToast = (message: string) => {

        toast.show({
            render: () => (
                <View style={{backgroundColor: '#ea868f', padding: 15, borderRadius: 50}}>
                    <Text style={{color: 'white', fontSize: 20, textAlign: message.length > 25 ? 'center' : 'justify' }}>{message}</Text>
                </View>
            ),
            placement: 'top',
            duration: 2000,
        });
    
    };

    return (
        <View style={{...styles.container}}>

            {/* header */}
            <View style={{width: '100%', marginHorizontal: 40, alignSelf: 'center', marginTop: 50, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <View style={{width: 70}}>

                    {
                        !search && (
                            <TouchableOpacity onPress={()=>{ navigation.pop()}}
                            style={{marginLeft: 18}}>
                                <Ionicons name="chevron-back" size={35} color="black" />
                            </TouchableOpacity>
                        )
                    }

                    {
                        search && (
                            <TouchableOpacity onPress={()=>{ setSearch(false)}}
                            style={{marginLeft: 18}}>
                                <Ionicons name="chevron-back" size={35} color="black" />
                            </TouchableOpacity>
                        )
                    }


                </View>
                <View style={{width: 300}}>
                    <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                        Visualizar datos de pacientes
                    </Text>
                </View>
            </View>

        {
            !search && (
            <Card style={{width: '90%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: top+60}}>
                <Card.Content>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 25 }}>

                        <View style={{ ...styles.input ,width: '30%', backgroundColor: 'white', borderColor: '#B3B8C9', borderRadius: 12, marginTop: 15, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => setShowTypeDNI(true)}>
                                <TextInput value={typeDNISelected} editable={false} style={{width: 80, height: 50, marginLeft: 20, textAlign: 'left', color: '#000', borderColor: validTypeDni ? 'red' : '#aaaaaa'}}/>
                                <Ionicons style={{position: 'absolute', right: 10, marginTop: 12}} name="md-arrow-down-sharp" size={24} color="#818181" />
                            </TouchableOpacity>
                            {showTypeDNI && (
                                <Modal visible={showTypeDNI} animationType="fade" transparent>
                                    <View style={styles_modal.modalContainer}>
                                        <View style={styles_modal.modalContent}>
                                            <FlatList style={{ flexGrow: 1 }} data={typeDNI} scrollEnabled={false} renderItem={({ item }) => (
                                            <TouchableOpacity style={styles_modal.optionContainer} onPress={() => onPressModal(item.value)}>
                                                <Text style={styles_modal.optionText}>{item.label}</Text>
                                            </TouchableOpacity>)} keyExtractor={(item) => item.value} />
                                        </View>
                                    </View>
                                </Modal>
                            )}
                        </View>

                        <View style={{ width: '60%' }}>
                            <TextInput placeholder="" style={{ ...styles.input, borderColor: validDNI ? 'red' : '#aaaaaa' }} value={dni} onChangeText={setDni}/>
                        </View>
                    </View>

                    <TouchableOpacity style={{...styles.button, width: '70%', alignSelf: 'center', marginTop: 40, marginBottom: 25}} onPress={()=>{
                        onSearch()
                    }}>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', alignContent: 'center', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>Buscar</Text>
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
                                <Text style={{color: '#545454', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginLeft: 20}}>{dataPatient.fullName}</Text>
                            </View>
                        </View>
    
                        <View style={{flexDirection: 'row', alignSelf: 'center' ,width: '100%', marginLeft: 25}}>
                            <View style={{width: '50%', marginVertical: 10, alignSelf: 'center'}}>
                                <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Cedula </Text>
                                <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>{dataPatient.typeDni+"-"+dataPatient.dni}</Text>
                            </View>
                            <View style={{width: '50%', marginVertical: 10, alignSelf: 'center'}}>
                                <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Telefono </Text>
                                <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>123456</Text>
                            </View>
                        </View>
                        
                        <View style={{alignSelf: 'center' ,width: '100%', marginVertical: 5, marginLeft: 25}}>
                            <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Direccion </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>{dataPatient.address}</Text>
                        </View>
                        
                        <View style={{alignSelf: 'center' ,width: '100%', marginVertical: 5, marginLeft: 25}}>
                            <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Correo Electronico </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>
                                {dataPatient.email}
                            </Text>
                        </View>
    
                        <View style={{flexDirection: 'row', alignSelf: 'center' ,width: '100%', marginLeft: 25}}>
                            <View style={{width: '50%', alignSelf: 'center', marginTop: 10}}>
                                <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Fecha de nacimiento </Text>
                                <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>{dataPatient.birthdate}</Text>
                            </View>
                            <View style={{width: '50%', alignSelf: 'center', marginTop: 10}}>
                                <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Sexo </Text>
                                <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>{dataPatient.gender}</Text>
                            </View>
                        </View>
    
                        <View style={{alignSelf: 'center' ,width: '100%',marginVertical: 10, marginLeft: 25}}>
                            <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Poliza de seguro </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>{dataPatient.ensurancePolicy}</Text>
                        </View>
                        
                        <View style={{alignSelf: 'center' ,width: '100%',marginVertical: 10, marginLeft: 25}}>
                            <Text style={{color: '#677294', fontSize: 15, fontWeight: 'bold'}}>Numero de poliza </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold'}}>{dataPatient.policyNumber}</Text>
                        </View>
    
                        <TouchableOpacity style={{ alignSelf: 'center', marginVertical: 20}} onPress={()=>{navigation.navigate('MedicalRecord',{
                            id_patient: dataPatient.id_patient
                        })}}>
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
                                    {/* <Image source={Images.sensor_cardiaco} style={{width: 70,height: 60}}/> */}
                                    <Ionicons name="pulse" color="blue" style={{fontSize: 65}}/>
                                </View>
                            </View>
                        </View>
    
                        <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0}}>
                            <View style={{width: '45%', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                    <Ionicons name="water" size={30} color="red" />
                                    <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>92</Text>
                                </View>
                                <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600',textAlign: 'center'}}>Oxigeno en la sangre</Text>
                            </View>
                            <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                            <View style={{width: '45%', alignSelf: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                    {/* <Image source={Images.ritmo_cardiaco} style={{width: 30, height: 25}}/> */}
                                    <Ionicons name="heart" size={30} color="red" />
                                    <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>76</Text>
                            </View>
                            <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center'}}>Sensor Ritmo Cardiaco</Text>
                            </View>
                        </View>
    
                        <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0}}>
                            <View style={{width: '45%', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                    {/* <Image source={Images.temper} style={{width: 12, height: 20}}/> */}
                                    <Ionicons name="thermometer" size={30} color="yellow" />
                                    <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>36°</Text>
                                </View>
                                <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center'}}>Temperatura</Text>
                            </View>
                            <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                            <View style={{width: '45%', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                    {/* <Image source={Images.presion_arterial} style={{width: 20, height: 25}}/> */}
                                    <Ionicons name="git-network" size={30} color="blue" />
                                    <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>120/80</Text>
                                </View>
                                <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center'}}>
                                    Presión Arterial
                                </Text>
                            </View>
                        </View>
    
                        <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0}}>
                            <View style={{width: '45%', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                    {/* <Image source={Images.ciclo_menstrual} style={{width: 30, height: 28}}/> */}
                                    <Ionicons name="flower-outline" size={30} color="purple"/>
                                    <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>96</Text>
                                </View>
                                <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center'}}>Clico menstrual</Text>
                            </View>
                            <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                            <View style={{width: '45%', alignSelf: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                    {/* <Image source={Images.sueño} style={{width: 30, height: 28}}/> */}
                                    <Ionicons name="moon" size={30} color="blue"/>
                                    <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>8</Text>
                                </View>
                                <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center'}}>Seguimiento del sueño</Text>
                            </View>
                        </View>
    
                        <View style={{...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0}}>
                            <View style={{width: '45%', alignSelf: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                    {/* <Image source={Images.estres} style={{width: 22, height: 25}}/> */}
                                    <Ionicons name="ellipse" size={30} color="yellow"/>
                                    <Text style={{color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5}}>50</Text>
                                </View>
                                <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600',textAlign: 'center'}}>Niveles de estrés</Text>
                            </View>
                            <View style={{width: '0%', height: 50,borderWidth: 0.3, borderColor: '#0E54B',alignSelf: 'center'}} />
                            <View style={{width: '45%', alignSelf: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                                    {/* <Image source={Images.presion_sanguinea} style={{width: 20, height: 25}}/> */}
                                    <Ionicons name="body-outline" size={30} color="green"/>
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
