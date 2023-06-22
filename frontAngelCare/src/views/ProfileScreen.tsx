import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Platform, Pressable } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Actionsheet, ChevronLeftIcon, Icon, Radio, Stack, useDisclose } from 'native-base';
import { Images } from '../assets/imgs/imgs';
import { Avatar } from 'react-native-paper';

import DatePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import apiConnection from '../api/Concecction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface Props extends StackScreenProps<any, any>{}

export const ProfileScreen = ({navigation}: Props) => {

    const { top } = useSafeAreaInsets();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [typeDni, setTypeDni] = useState('');
    const [dni, setDni] = useState('');
    const [address, setAddress] = useState('');
    const [ensurancePolicy, setEnsurancePolicy] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [gender, setGender] = useState('');


    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [ isEdit, setIsEdit ] = useState(false);

    const { isOpen, onClose, onOpen } = useDisclose();

    const editProfile = () => {
        setIsEdit(!isEdit);
    }

    const openActionsheet = () => {
        onOpen();
    };

    const updateProfile = async () => {

        await apiConnection.post('/patient/updateProfile', {
            fullName: fullName,
            email: email,
            phone: phone,
            typeDni: typeDni,
            dni: dni,
            address: address,
            ensurancePolicy: ensurancePolicy,
            policyNumber: policyNumber,
            birthdate: dateOfBirth,
            gender: gender
        }).then((response) => {

            if (response.data.status === true) {
                console.log(response.data);
                // AsyncStorage.setItem('me', JSON.stringify(response.data.data));
                setIsEdit(!isEdit);
                onClose();
            }
        });
    }

    const closeActionsheet = () => {
        setIsEdit(!isEdit);
        onClose();
    }

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setShowPicker(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const onChange = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker();
                setDateOfBirth(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker();

        }
    };

    const getLocalStorage = async () => {
        const me = await AsyncStorage.getItem('me');
        let meJson = JSON.parse(me!);
        setFullName(meJson.fullName);
        setEmail(meJson.email);
        setPhone(meJson.phone);
        setTypeDni(meJson.typeDni);
        setDni(meJson.dni);
        setAddress(meJson.address);
        setEnsurancePolicy(meJson.ensurancePolicy);
        setPolicyNumber(meJson.policyNumber);
        setGender(meJson.gender)
        setDateOfBirth(meJson.birthdate);
    }

    useEffect(() => {
        getLocalStorage();
    }, [])

    return (
        <ScrollView>
            <View style={{...styles.container, backgroundColor: '#0E54BE'}}>

                {/* Header */}
                <View style={{ flexDirection: 'row', height: 150,  alignItems: 'center', alignSelf: 'center', marginTop: -30}}>
                    <View style={{width: '20%', alignItems: 'center'}} >
                        <TouchableOpacity onPress={()=>{navigation.pop()}}>
                        {/* <ChevronLeftIcon  color="white" size="lg" style={{alignSelf: 'center', marginTop: 15,marginRight: 20}}/> */}
                        <Ionicons name="chevron-back-outline" size={30} color="white" style={{alignSelf: 'center', marginTop: 25,marginRight: 20}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '70%'}}>
                        <Text style={{...styles.title, color: 'white', fontSize: 18, marginLeft: 10,}}>Perfil</Text>
                    </View>

                </View>

                {/* Card Fecha */}
                <View style={{borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: top+100, alignContent: 'center', alignItems: 'center', width: '95%'}}>
                    <Avatar.Image size={85} source={Images.doctor} style={{backgroundColor: 'white', marginHorizontal: 10}}/>
                </View>

                <View style={{...styles.container, backgroundColor: '#F8F8F8', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 20}}>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 50}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Nombre completo</Text>
                        <TextInput placeholder="" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit} value={fullName} onChangeText={setFullName}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Cedula</Text>
                        <TextInput placeholder="" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit} value={dni} onChangeText={setDni}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Fecha de nacimiento</Text>
                        <Pressable onPress={toggleDatepicker}>
                            <TextInput style={{...styles.input, backgroundColor: 'white'}} value={dateOfBirth} onChangeText={setDateOfBirth} onFocus={handleFocus} onBlur={handleBlur} editable={isEdit}/>
                        </Pressable>
                        {showPicker && isFocused && (<DatePicker mode="date" display="calendar" value={date} onChange={onChange}/>)}
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Dirección</Text>
                        <TextInput style={{...styles.input, backgroundColor: 'white'}} editable={isEdit} value={address} onChangeText={setAddress}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Correo electronico</Text>
                        <TextInput style={{...styles.input, backgroundColor: 'white'}} editable={isEdit} value={email} onChangeText={setEmail}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Telefono</Text>
                        <TextInput style={{...styles.input, backgroundColor: 'white'}} editable={isEdit} value={phone} onChangeText={setPhone}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Genero</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>
                            <Radio.Group name="Genero" defaultValue={gender} onChange={gen => {
                                setGender(gen);
                            }}>
                                <Stack direction={{ base: 'row', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }} 
                                space={2} w="75%" maxW="300px">
                                    <Radio value="masculino" colorScheme="blue" size="sm" my={1} isDisabled={!isEdit}>
                                        Masculino
                                    </Radio>
                                    <Radio value="femenino" colorScheme="blue" size="sm" my={1} isDisabled={!isEdit}>
                                        Femenino
                                    </Radio>
                                    <Radio value="otro" colorScheme="blue" size="sm" my={1} isDisabled={!isEdit}>
                                        Otro
                                    </Radio>
                                </Stack>
                            </Radio.Group>
                        </View>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Póliza de Seguro</Text>
                        <TextInput style={{...styles.input, backgroundColor: 'white'}} editable={isEdit} value={ensurancePolicy} onChangeText={setEnsurancePolicy}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Número de póliza</Text>
                        <TextInput style={{...styles.input, backgroundColor: 'white'}} editable={isEdit} value={policyNumber} onChangeText={setPolicyNumber}/>
                    </View>

                    <View style={
                        {
                            marginTop: 35,
                            marginBottom: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '95%',
                        }}>

                        {
                            !isEdit &&
                                <TouchableOpacity style={{...styles.button, width: 260}}
                                onPress={editProfile}>
                                    <Text style={styles.buttonLoginText}>Editar</Text>
                                </TouchableOpacity>
                                
                        }

                        {
                            isEdit &&
                            <TouchableOpacity style={{...styles.button, width: 260}}
                            onPress={openActionsheet}>
                                <Text style={styles.buttonLoginText}>Guardar</Text>
                            </TouchableOpacity>
                        }

                    </View>

                </View>

                <Actionsheet isOpen={isOpen} onClose={onClose} >
                    <Actionsheet.Content>

                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000', marginBottom: 20, marginLeft: 0}}>Actualizar datos</Text>
                        </View>
                        <View style={{alignContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 13, fontWeight: '500', color: '#000'}}>
                                Confirma para cargar tus datos en la configuración del perfil
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 30}}>
                            <View style={{width: '50%', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                                <TouchableOpacity 
                                style={{ width: '100%',
                                    borderRadius: 12,
                                    height: 50,
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    }}
                                onPress={updateProfile}>
                                    <Text style={{color: 'black', fontWeight: 'bold', marginHorizontal: 20}}>Guardar</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '50%', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                            <TouchableOpacity 
                                style={{ width: '100%',
                                    borderRadius: 12,
                                    height: 50,
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    }}
                                onPress={closeActionsheet}>
                                    <Text style={{color: 'black', fontWeight: 'bold', marginHorizontal: 20}}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Actionsheet.Content>

                </Actionsheet>
            </View>
        </ScrollView>
    );
};
