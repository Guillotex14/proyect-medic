import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Pressable, Platform, Modal, FlatList} from 'react-native';
import { styles } from '../theme/ThemeApp';
import { styles_modal } from '../theme/Modal_Profile_Doctor';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Actionsheet, ChevronLeftIcon,Radio, Stack, useDisclose, useToast} from 'native-base';
import { Images } from '../assets/imgs/imgs';
import { Avatar } from 'react-native-paper';
import DatePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { TypeDni } from '../interfaces/registerModels';
import apiConnection from '../api/Concecction';

interface Props extends StackScreenProps<any, any>{}

interface Option {
    label: string;
    value: string;
  }

interface Option2 {
    label: string;
    value: string;
}

export const ProfileDoctorScreen = ({navigation}: Props) => {

    const [email, setEmail] = useState('');
    const [fullName,setFullname] = useState('');
    const [typeDni, setTypeDni] = useState('');
    const [dni, setDni] = useState('');
    const [birthdate, setBirthdate ] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [gender, setGender] = useState('');
    const [university, setUniversity] = useState('');
    const [uniAdmissionDate, setUniAdmissionDate] = useState('');
    const [uniGraduationDate, setUniGraduationDate] = useState('');
    const [mpps, setMpps] = useState('');
    const [postgrade, setPostgrade] = useState('');
    const [postgradeAdmissionDate, setPostgradeAdmissionDate] = useState('');
    const [postgradeGraduationDate, setPostgradeGraduationDate] = useState('');
    const [postgradeUniversity, setPostgradeUniversity] = useState('');
    const [dayService, setDayService] = useState('');
    const [dayService2, setDayService2] = useState('');
    const [additional, setAdditional] = useState('');
    const [id, setId] = useState('');
    const [id_medic, setId_medic] = useState('');
    const [typeUser, setTypeUser] = useState('');

    const [date1, setDate1] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [date3, setDate3] = useState(new Date());
    const [date4, setDate4] = useState(new Date());
    const [date5, setDate5] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showPicker2, setShowPicker2] = useState(false);
    const [showPicker3, setShowPicker3] = useState(false);
    const [showPicker4, setShowPicker4] = useState(false);
    const [showPicker5, setShowPicker5] = useState(false);

    const { top } = useSafeAreaInsets();
    const toast = useToast();
    const [ isEdit, setIsEdit ] = useState(false);
    const { isOpen, onClose, onOpen } = useDisclose();
    const [isFocused, setIsFocused] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isFocused4, setIsFocused4] = useState(false);
    const [isFocused5, setIsFocused5] = useState(false);
    const [showDayService, setShowDayService] = useState(false);
    const [showDayService2, setShowDayService2] = useState(false);
    const [showTypeDni, setShowTypeDni] = useState(false);

    
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

    const options: Option[] = [
        { label: 'Lunes', value: 'Lunes' },
        { label: 'Martes', value: 'Martes' },
        { label: 'Miercoles', value: 'Miercoles' },
        { label: 'Jueves', value: 'Jueves' },
        { label: 'Viernes', value: 'Viernes' },
        { label: 'Sabado', value: 'Sabado' },
        { label: 'Domingo', value: 'Domingo' },
    ];


    useEffect(() => {
        getStorage();
    }, []);

    const openActionsheet = () => {
        onOpen();
    };

    const updateProfile = async () => {

        await apiConnection.post('/doctor/updateProfile', {
            email: email,
            fullName: fullName,
            typeDni: typeDni,
            dni: dni,
            birthdate: birthdate,
            phone: phone,
            address: address,
            speciality: speciality,
            gender: gender,
            university: university,
            uniAdmissionDate: uniAdmissionDate,
            uniGraduationDate: uniGraduationDate,
            mpps: mpps,
            postgrade: postgrade,
            postgradeAdmissionDate: postgradeAdmissionDate,
            postgradeGraduationDate: postgradeGraduationDate,
            postgradeUniversity: postgradeUniversity,
            dayService: dayService,
            dayService2: dayService2,
            additional: additional,
            city: city,
            id: id,
            id_medic: id_medic
        }).then((response) => {
            console.log(response);

            if(response.data.status){
                
                let me = {
                    email: email,
                    fullName: fullName,
                    typeDni: typeDni,
                    dni: dni,
                    birthdate: birthdate,
                    phone: phone,
                    address: address,
                    speciality: speciality,
                    gender: gender,
                    university: university,
                    uniAdmissionDate: uniAdmissionDate,
                    uniGraduationDate: uniGraduationDate,
                    mpps: mpps,
                    postgrade: postgrade,
                    postgradeAdmissionDate: postgradeAdmissionDate,
                    postgradeGraduationDate: postgradeGraduationDate,
                    postgradeUniversity: postgradeUniversity,
                    dayService: dayService,
                    dayService2: dayService2,
                    additional: additional,
                    id: id,
                    id_medic: id_medic,
                    typeUser: typeUser
                    
                }

                AsyncStorage.setItem('me', JSON.stringify(me));
                presentToast('Perfil actualizado con exito');
                setIsEdit(!isEdit);
                onClose();
                
            }else{
                
            }

        }).catch((error) => {
            presentToast('Error al actualizar el perfil');
            console.log(error);
        }); 


    }

    const toggleDatepicker1 = () => {
        setShowPicker(!showPicker);
    };

    const toggleDatepicker2 = () => {
        setShowPicker2(!showPicker2);
    };

    const toggleDatepicker3 = () => {
        setShowPicker3(!showPicker3);
    };

    const toggleDatepicker4 = () => {
        setShowPicker4(!showPicker4);
    };

    const toggleDatepicker5 = () => {
        setShowPicker5(!showPicker5);
    };

    const handleFocus1 = () => {
        setIsFocused(true);
        setShowPicker(true);
    };

    const handleFocus2 = () => {
    setIsFocused2(true);
    setShowPicker2(true);
    };

    const handleFocus3 = () => {
    setIsFocused3(true);
    setShowPicker3(true);
    };

    const handleFocus4 = () => {
    setIsFocused4(true);
    setShowPicker4(true);
    };

    const handleFocus5 = () => {
    setIsFocused5(true);
    setShowPicker5(true);
    };

    const handleBlur1 = () => {
    setIsFocused(false);
    };

    const handleBlur2 = () => {
    setIsFocused2(false);
    };

    const handleBlur3 = () => {
    setIsFocused3(false);
    };

    const handleBlur4 = () => {
    setIsFocused4(false);
    };

    const handleBlur5 = () => {
    setIsFocused5(false);
    };

    const onChange1 = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate1(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker1();
                setBirthdate(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker1();

        }
    };

    const onChange2 = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker2(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate2(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker2();
                setUniAdmissionDate(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker2();

        }
    };

    const onChange3 = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker3(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate3(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker3();
                setUniGraduationDate(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker3();

        }
    };

    const onChange4 = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker4(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate4(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker4();
                setPostgradeAdmissionDate(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker4();

        }
    };

    const onChange5 = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker5(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate5(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker5();
                setPostgradeGraduationDate(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker5();

        }
    };

    const onPressModal = (value:string) => {
        setTypeDni(value);
        setShowTypeDni(false);
    }

    const onModalDayservice = (day:string) => {
        setDayService(day)
        setShowDayService(!showDayService);
    }

    const onModalDayservice2 = (day:string) => {
        setDayService2(day)
        setShowDayService2(!showDayService2);  
    }
    
    const getStorage = async () => {
        const me = await AsyncStorage.getItem('me');

        let meJson = JSON.parse(me!);

        setFullname(meJson.fullName);
        setPhone(meJson.phone);
        setEmail(meJson.email);
        setSpeciality(meJson.speciality);
        setTypeDni(meJson.typeDni);
        setDni(meJson.dni);
        setUniversity(meJson.university);
        setUniAdmissionDate(meJson.uniAdmissionDate);
        setUniGraduationDate(meJson.uniGraduationDate);
        setMpps(meJson.mpps);
        setPostgrade(meJson.postgrade);
        setPostgradeAdmissionDate(meJson.postgradeAdmissionDate);
        setPostgradeGraduationDate(meJson.postgradeGraduationDate);
        setPostgradeUniversity(meJson.postgradeUniversity);
        setDayService(meJson.dayService);
        setDayService2(meJson.dayService2);
        setAdditional(meJson.additional);
        setBirthdate(meJson.birthdate);
        setAddress(meJson.address);
        setId(meJson.id);
        setId_medic(meJson.id_medic);
        setTypeUser(meJson.typeUser);
        setGender(meJson.gender)
        setCity(meJson.city)
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
        <ScrollView>

            <View style={{...styles.container, backgroundColor: '#0E54BE'}}>

                {/* Header */}
                <View style={{ flexDirection: 'row', height: 150,  alignItems: 'center', alignSelf: 'center', marginTop: -30, justifyContent: 'space-between'}}>
                    <View style={{width: 0}} >
                        <TouchableOpacity onPress={()=>{navigation.navigate('HomeMedic')}}>
                            {/* <ChevronLeftIcon color="white" size="lg" style={{alignSelf: 'center', marginTop: 15, marginRight: 40 }}/> */}
                            {/* <Ionicons name="chevron-back" size={24} style={{alignSelf: 'center', marginTop: 15, marginRight: 40, color:"#fff" }} /> */}
                            <Ionicons name='chevron-back' size={40} color={"#000"}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '80%'}}>
                        <Text style={{...styles.title, color: 'white', fontSize: 18, marginLeft: 10}}>Perfil</Text>
                    </View>

                </View>

                {/* Card Fecha */}
                <View style={{borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: top+100, alignContent: 'center', alignItems: 'center', width: '95%'}}>
                    <Avatar.Image size={85} source={Images.doctor} style={{backgroundColor: 'white', marginHorizontal: 10}}/>
                </View>

                <View style={{...styles.container, backgroundColor: '#F8F8F8', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 50}}>
                    <View style={{ width: '100%', alignSelf: 'center', marginTop: 50 }}>
                        <Text style={{ marginLeft: 20 }}>Nombre completo</Text>
                        <TextInput style={{ ...styles.input,  marginLeft: 15,fontWeight: "500" }} value={fullName} onChangeText={setFullname}/>
                    </View>

                    <View style={{ width: '100%' }}>

                        <View style={{ marginLeft: 20, marginTop: 15 }}>
                            <Text>Cedula</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <View style={{ ...styles.input ,width: '25%', backgroundColor: 'white', borderColor: '#B3B8C9', borderRadius: 12, marginTop: 15, marginLeft: 20 }}>
                            <TouchableOpacity onPress={() => setShowTypeDni(true)}>
                                <TextInput value={typeDni} editable={false} style={{width: 80, height: 50, marginLeft: 20, textAlign: 'left', color: '#000', fontWeight: "500"}}/>
                                <Ionicons style={{position: 'absolute', right: 10, marginTop: 12}} name="md-arrow-down-sharp" size={24} color="#818181" />
                            </TouchableOpacity>
                            {showTypeDni && (

                                <Modal visible={showTypeDni} animationType="fade" transparent>
                                <View style={styles_modal.modalContainer}>
                                    <View style={styles_modal.modalContent}>
                                    <FlatList style={{ flexGrow: 1 }} data={typeDNI} scrollEnabled={false} renderItem={({ item }) => (<TouchableOpacity style={styles_modal.optionContainer} onPress={() => onPressModal(item.value)}><Text style={styles_modal.optionText}>{item.label}</Text></TouchableOpacity>)} keyExtractor={(item) => item.value} />
                                    </View>
                                </View>
                                </Modal>
                            )}
                            </View>

                            <View style={{ width: '60%' }}>
                            <TextInput placeholder="" style={{ ...styles.input, width: 230,fontWeight: "500" }} value={dni} onChangeText={setDni}/>
                            </View>
                        </View>

                    </View>

                    <View style={{width: '100%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{marginLeft: 20}}>Fecha de nacimiento</Text>
                        <Pressable onPress={toggleDatepicker1}>
                        <TextInput style={{...styles.input, backgroundColor: 'white', marginLeft: 15,fontWeight: "500"}} value={birthdate} onChangeText={setBirthdate} onFocus={handleFocus1} onBlur={handleBlur1}/>
                        </Pressable>
                        {showPicker && isFocused && (<DatePicker mode="date" display="calendar" value={date1} onChange={onChange1}/>)}
                    </View>

                    <View style={{ width: '100%', marginTop: 20 }}>
                        <Text style={{ marginLeft: 20 }}>Especialidad</Text>
                        <TextInput style={{ ...styles.input, marginLeft: 15,fontWeight: "500"}} onChangeText={setSpeciality} value={speciality}/>
                    </View>

                    <View style={{ width: '100%', marginTop: 20 }}>
                        <Text style={{ marginLeft: 20 }}> Numero Telefonico</Text>
                        <TextInput style={{ ...styles.input, marginLeft: 15,}} onChangeText={setPhone} value={phone}/>
                    </View>

                    <View style={{ width: '100%', marginTop: 20 }}>
                        <Text style={{ marginLeft: 20 }}> Correo Electronico</Text>
                        <TextInput style={{ ...styles.input, marginLeft: 15,}} value={email} onChangeText={setEmail}/>
                    </View>
                    
                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Ciudad</Text>
                        <TextInput style={{...styles.input, backgroundColor: 'white'}} value={city} onChangeText={setCity}/>
                    </View>

                    <View style={{ width: '100%', marginTop: 20 }}>
                        <Text style={{ marginLeft: 20 }}> Direccion</Text>
                        <TextInput style={{ ...styles.input, marginLeft: 15}} onChangeText={setAddress} value={address}/>
                    </View>

                    <View style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#000', fontSize: 13, marginHorizontal: 15, marginBottom: 10 }}>Genero</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                        <Radio.Group name="Genero" value={gender} size={10} onChange={valueSelected =>{ 
                            setGender(valueSelected);
                        }} >
                            <Stack direction={{ base: 'row', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}
                            space={7} w="85%" maxW="300px">
                            <Radio value="masculino" colorScheme="blue" size="sm" my={1}>
                                Masculino
                            </Radio>
                            <Radio value="femenino" colorScheme="blue" size="sm" my={1}>
                                Femenino
                            </Radio>
                            <Radio value="otro" colorScheme="blue" size="sm" my={1}>
                                Otro
                            </Radio>
                            </Stack>
                        </Radio.Group>
                        </View>
                    </View>

                    <View style={{ width: '100%', alignSelf: 'center', marginTop: 15 }}>
                        <Text style={{ marginLeft: 20 }}>Universidad</Text>
                        <TextInput placeholder="" style={{...styles.input,fontWeight: "500", alignSelf: 'center', justifyContent: 'center', alignContent: 'center'}} value={university} onChangeText={setUniversity}/>
                    </View>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginLeft: 15}}>
                        <View style={{width: '50%'}}>
                            <Text style={{marginLeft: 10}}>Fecha de ingreso</Text>
                            <Pressable onPress={toggleDatepicker2}>
                            <TextInput placeholder="" style={{...styles.input, width: 150}} value={uniAdmissionDate} onChangeText={setUniAdmissionDate} onFocus={handleFocus2} onBlur={handleBlur2}/>
                            </Pressable>
                            {showPicker2 && isFocused2 && (<DatePicker mode="date" display="calendar" value={date2} onChange={onChange2}/>)}
                        </View>

                        <View style={{width: '50%'}}>
                            <Text style={{marginLeft: 10}}>Fecha de Egreso</Text>
                            <Pressable onPress={toggleDatepicker3}>
                            <TextInput placeholder="" style={{...styles.input, width: 155}} value={uniGraduationDate} onChangeText={setUniGraduationDate} onFocus={handleFocus3} onBlur={handleBlur3}/>
                            </Pressable>
                            {showPicker3 && isFocused3 && (<DatePicker mode="date" display="calendar" value={date3} onChange={onChange3}/>)}
                        </View>
                    </View>

                    <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ marginLeft: 20 }}>MPPS</Text>
                        <TextInput placeholder="" style={{...styles.input, alignSelf: 'center', justifyContent: 'center', alignContent: 'center'}} value={mpps} onChangeText={setMpps}/>
                    </View>
                    
                    <View style={{width: '95%', alignSelf: 'center', marginTop: 15, marginVertical: 10, marginLeft: 15}}>
                        <Text style={{fontSize: 15, marginHorizontal: 5, marginBottom: 10, color: '#000'
                    }}>Post-grado</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>
                            <Radio.Group name="Post-grado" size={10} value={postgrade} onChange={valueselect=>{
                                setPostgrade(valueselect)
                            }}>
                                <Stack direction={{ base: 'row', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }} 
                                space={12} w="100%" maxW="100%">
                                    <Radio value="si" colorScheme="blue" size="sm" my={1}>
                                        Si
                                    </Radio>
                                    <Radio value="no" colorScheme="blue" size="sm" my={1}>
                                        No
                                    </Radio>
                                    <Radio value="en proceso" colorScheme="blue" size="sm" my={1}>
                                        En Proceso
                                    </Radio>
                                </Stack>
                            </Radio.Group>
                        </View>
                    </View>

                    <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ marginLeft: 20 }}>Universidad/Post-grado</Text>
                        <TextInput placeholder="" style={{...styles.input, alignSelf: 'center', justifyContent: 'center', alignContent: 'center'}} value={postgradeUniversity} onChangeText={setPostgradeUniversity}/>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginLeft: 15}}>
                        <View style={{width: '50%'}}>
                            <Text style={{marginLeft: 10}}>Fecha de ingreso</Text>
                            <Pressable onPress={toggleDatepicker4}>
                            <TextInput placeholder="" style={{...styles.input,width: 150}} value={postgradeAdmissionDate} onChangeText={setPostgradeAdmissionDate} onFocus={handleFocus4} onBlur={handleBlur4}/>
                            </Pressable>
                            {showPicker4 && isFocused4 && (<DatePicker mode="date" display="calendar" value={date4} onChange={onChange4}/>)}
                        </View>
                        <View style={{width: '50%'}}>
                            <Text style={{marginLeft: 10}}>Fecha de Egreso</Text>
                            <Pressable onPress={toggleDatepicker5}>
                            <TextInput placeholder="" style={{...styles.input, width: 155}} value={postgradeGraduationDate} onChangeText={setPostgradeGraduationDate} onFocus={handleFocus5} onBlur={handleBlur5}/>
                            </Pressable>
                            {showPicker5 && isFocused5 && (<DatePicker mode="date" display="calendar" value={date5} onChange={onChange5}/>)}
                        </View>
                    </View>

                    <View style={{width: '100%'}}>

                    <View style={{ marginLeft: 25, marginTop: 15 }}>
                        <Text>Dias de Servicio</Text>
                    </View>

                    <View style={{ width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{width: '50%', alignItems: 'center'}}>
                            <TouchableOpacity onPress={()=>{setShowDayService(true)}}>
                                <TextInput placeholder="" style={{...styles.input, width: 150}} value={dayService}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: '50%', alignItems: 'center'}} >
                            <TouchableOpacity onPress={()=>{setShowDayService2(true)}}>
                                <TextInput placeholder="" style={{...styles.input, width: 150}} value={dayService2}/>
                            </TouchableOpacity>
                            
                        </View>
                    </View>

                            {
                                showDayService && ( 
                                    <Modal visible={showDayService} animationType="fade" transparent>
                                        <View style={styles_modal.modalContainer}>
                                            <View style={styles_modal.modalContent}>
                                            <FlatList style={{ flexGrow: 1 }} data={options} renderItem={({ item }) => (<TouchableOpacity style={styles_modal.optionContainer} onPress={() => onModalDayservice(item.value)}><Text style={styles_modal.optionText}>{item.label}</Text></TouchableOpacity>)} keyExtractor={(item) => item.value} />
                                            </View>
                                        </View>
                                    </Modal>
                                )
                            }
                            {
                                showDayService2 && ( 
                                <Modal visible={showDayService2} animationType="fade" transparent>
                                    <View style={styles_modal.modalContainer}>
                                        <View style={styles_modal.modalContent}>
                                        <FlatList style={{ flexGrow: 1 }} data={options} renderItem={({ item }) => (
                                        <TouchableOpacity style={styles_modal.optionContainer} onPress={() => onModalDayservice2(item.value)}>
                                            <Text style={styles_modal.optionText}>{item.label}</Text>
                                            </TouchableOpacity>)} keyExtractor={(item) => item.value} />
                                        </View>
                                    </View>
                                </Modal>
                            )
                        }
                    </View>

                    <View style={{ width: '100%', alignSelf: 'center', marginTop: 15 }}>
                        <Text style={{ marginLeft: 20 }}>Adicional</Text>
                        <TextInput
                        multiline
                        numberOfLines={6}
                        maxLength={240}
                        style={{padding: 10, backgroundColor: 'white', borderRadius: 10, width: '90%', borderWidth: 1, marginHorizontal: 10, marginVertical: 10, alignSelf: 'center', justifyContent: 'center', alignContent: 'center'}}
                        value={additional}
                        onChangeText={setAdditional}
                        />
                    </View>

                    <View style={
                        {
                            marginTop: 35,
                            marginBottom: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                        }}>

                            <TouchableOpacity style={{...styles.button, width: 260}}
                            onPress={openActionsheet}>
                                <Text style={styles.buttonLoginText}>Guardar</Text>
                            </TouchableOpacity>

                    </View>

                </View>

                <Actionsheet isOpen={isOpen} onClose={onClose} >
                    <Actionsheet.Content>

                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 20, marginLeft: 0}}>Actualizar datos</Text>
                        </View>
                        <View style={{alignContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 14, fontWeight: '300', color: '#000'}}>
                                Confirma para cargar tus datos en la configuración del perfil
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 30, alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                            <View style={{width: '50%'}}>
                                <TouchableOpacity 
                                style={{ width: '100%',
                                    borderRadius: 12,
                                    height: 50,
                                    marginTop: 10,
                                    alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                                    marginRight: 40
                                    }}
                                onPress={updateProfile}>
                                    <Text style={{color: 'black', fontWeight: 'bold',alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                                fontSize:20}}>Guardar</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '50%'}}>
                            <TouchableOpacity 
                                style={{ width: '100%',
                                    borderRadius: 12,
                                    height: 50,
                                    marginTop: 10,
                                    alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                                    marginLeft: 40 
                                    }}
                                onPress={()=>{console.log('holas')}}>
                                    <Text style={{color: 'black', fontWeight: 'bold',alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                                fontSize:20}}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Actionsheet.Content>

                </Actionsheet>

            </View>

        </ScrollView>
    );
};
