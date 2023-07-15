import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Modal, FlatList, Image, Platform, Pressable, ScrollView } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { ChevronLeftIcon, FormControl,Stack, Spinner,Radio, useToast } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { TypeDni } from '../interfaces/registerModels';
import { styles_modal } from '../theme/Modal_Profile_Doctor';
import { Images } from '../assets/imgs/imgs';
import { Ionicons } from '@expo/vector-icons';
import apiConection from '../api/Concecction';
import DatePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackScreenProps<any, any>{};

interface Option {
  label: string;
  value: string;
}

export const RegisterMedicStep2Screen = ({navigation, route}:Props) => {

  const params = route.params || {};

  const { top } = useSafeAreaInsets();

  const toast = useToast();

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

  //states for radio buttons
  const [isRadio, setIsRadio] = useState(false);
  const [isRadio2, setIsRadio2] = useState(false);
  const [isRadio3, setIsRadio3] = useState(false);
  const [showTypeDNI, setShowTypeDNI] = useState(false);
  const [showDayService, setShowDayService] = useState(false);
  const [showDayService2, setShowDayService2] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [nextStep2, setNextStep2] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);
  const [showPicker4, setShowPicker4] = useState(false);
  const [showPicker5, setShowPicker5] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);
  const [isFocused5, setIsFocused5] = useState(false);

  const [validFullname, setValidFullname] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validDNI, setValidDNI] = useState(false);
  const [validTypeDni, setValidTypeDni] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [validCity, setValidCity] = useState(false);
  const [validSpeciality, setValidSpeciality] = useState(false);
  const [validGender, setValidGender] = useState(false);
  const [validBirthDate, setValidBirthDate] = useState(false);
  const [validUniversity, setValidUniversity] = useState(false);
  const [validUniAdmissionDate, setValidUniAdmissionDate] = useState(false);
  const [validUniGraduationDate, setValidUniGraduationDate] = useState(false);
  const [validMpps, setValidMpps] = useState(false);
  const [validPostgrade, setValidPostgrade] = useState(false);
  const [validPostgradeUniversity, setValidPostgradeUniversity] = useState(false);
  const [validPostgradeGraduationDate, setValidPostgradeGraduationDate] = useState(false);
  const [validDayService, setValidDayService] = useState(false);
  const [validDayService2, setValidDayService2] = useState(false);
  const [validAdditional, setValidAdditional] = useState(false);
  const [validePostgradeDateAdmission, setValidePostgradeDateAdmission] = useState(false);
  const [validePostgradeDateGraduation, setValidePostgradeDateGraduation] = useState(false);

  const [fullName, setFullName] = useState('');
  const [typeDNISelected, setTypeDNISelected] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');

  //data professional
  const [university, setUniversity] = useState('');
  const [uniAdmissionDate, setuniAdmissionDate ] = useState('');
  const [uniGraduationDate, setuniGraduationDate] = useState('');
  const [mpps, setMpps] = useState('');
  const [postgrade, setpostgrade] = useState('');
  const [postgradeUniversity, setpostgradeUniversity] = useState('');
  const [postgradeGraduationDate, setPostgradeGraduationDate] = useState('');
  const [postgradeAdmissionDate, setPostgradeAdmissionDate] = useState('');
  const [additional, setAdditional] = useState('');
  const [dayService, setDayService] = useState('');
  const [dayService2, setDayService2] = useState('');
  
  const [date1, setDate1] = useState(new Date());


  useEffect(() => {

    params.fullName === undefined ? setFullName('') : setFullName(params.fullName);
    params.email === undefined ? setEmail('') : setEmail(params.email);
    params.password === undefined ? setPassword('') : setPassword(params.password); 

    // setFullName(params.fullName);
    // setEmail(params.email);
    // setPassword(params.password);
  }, [])
  
  const toggleDatepicker = () => {
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

  const onPressModal = (typedni:string) => {
    setTypeDNISelected(typedni)
    setShowTypeDNI(!showTypeDNI);
  }

  const onModalDayservice = (day:string) => {
    setDayService(day)
    setShowDayService(!showDayService);
  }

  const onModalDayservice2 = (day:string) => {
    setDayService2(day)
    setShowDayService2(!showDayService2);  
  }

  const showModalService = () => {
    setShowDayService(true);
  }

  const showModalService2 = () => {
    setShowDayService2(true);
  }

  const onNextStep = () => {

    if(fullName === ''){
      presentToast('el campo nombre completo es requerido')
      setValidFullname(true);
      return;
    }else{
      setValidFullname(false);
    }

    if(typeDNISelected === ''){
      presentToast('el campo tipo de documento es requerido')
      setValidTypeDni(true);
      return;
    }else{
      setValidTypeDni(false);
    }

    if(dni === ''){
      presentToast('el campo cedula es requerido')
      setValidDNI(true);
      return;
    }else{
      setValidDNI(false);
    }

    if(birthDate === ''){
      presentToast('el campo fecha de nacimiento es requerido')
      setValidBirthDate(true);
      return;
    }else{
      setValidBirthDate(false);
    }

    if(speciality === ''){
      presentToast('el campo especialidad es requerido')
      setValidSpeciality(true);
      return;
    }else{
      setValidSpeciality(false);
    }

    if (phone === '') {
      presentToast('el campo telefono es requerido');
      setValidPhone(true);
      return;
    }else{
      setValidPhone(false); 
    }

    if (email === '') {
      presentToast('el campo correo electronico es requerido');
      setValidEmail(true);
      return;
    }else{
      if (setEmailValid(email) === false) {
        presentToast('El email no es valido');
        setValidEmail(true);
        return;
      }else{
        setValidEmail(false);
      }
    }

    if (city === '') {
      presentToast('el campo ciudad es requerido');
      setValidCity(true);
      return;
    }else{
      setValidCity(false);
    }

    if ( address === '') {
      presentToast('el campo direccion es requerido');
      setValidAddress(true);
      return;
    } else{
      setValidEmail(false);
    }

    if (gender === '') {
      presentToast('el campo genero es requerido');
      setValidGender(true);
      return;
    }else{
      setValidGender(false);
    }

    setNextStep(true);
  }

  const onNextStep2 = () => {

    if (university === '') {
      presentToast('el campo universidad es requerido');
      setValidUniversity(true);
      return;
    }else{
      setValidUniversity(false);
    }

    if (uniAdmissionDate === '') {
      presentToast('el campo fecha de ingreso es requerido');
      setValidUniAdmissionDate(true);
      return;
    }else{
      setValidUniAdmissionDate(false);
    }

    if (uniGraduationDate === '') {
      presentToast('el campo fecha de egreso es requerido');
      setValidUniGraduationDate(true);
      return;
    }else{
      setValidUniGraduationDate(false);
    }

    if (mpps === '') {
      presentToast('el campo mpps es requerido');
      setValidMpps(true);
      return;
    }else{
      setValidMpps(false);
    }

    if (postgrade === '') {
      presentToast('el campo postgrado es requerido');
      setValidPostgrade(true);
      return;
    }else{
      setValidPostgrade(false);
    }

    if (postgradeUniversity === '') {
      presentToast('el campo universidad de postgrado es requerido');
      setValidPostgradeUniversity(true);
      return;
    }else{
      setValidPostgradeUniversity(false);
    }

  if (postgradeAdmissionDate === '') {
      presentToast('el campo fecha de ingreso de postgrado es requerido');
      setValidePostgradeDateAdmission(true);
      return;
    }else{
      setValidePostgradeDateAdmission(false);
    }

    if (postgradeGraduationDate === '') {
      presentToast('el campo fecha de egreso de postgrado es requerido');
      setValidPostgradeGraduationDate(true);
      return;
    }else{
      setValidPostgradeGraduationDate(false);
    }

    if(dayService === ''){
      presentToast('el campo dia de consulta es requerido');
      setValidDayService(true);
      return;
    }else{
      setValidDayService(false);
    }

    if(dayService2 === ''){
      presentToast('el campo dia de consulta es requerido');
      setValidDayService2(true);
      return;
    }else{
      setValidDayService2(false);
    }
    
    setNextStep(false);
    setNextStep2(true);
  }

  const onBackStep = () => {
    setNextStep(false);
  }

  const handleNext = async () => {
    setShowSpinner(true);
    await apiConection.post('auth/registerMedic', {
      fullName: fullName,
      typeDNISelected: typeDNISelected,
      dni: dni,
      email: email,
      password: password,
      phone: phone,
      address: address,
      city: city,
      speciality: speciality,
      gender: gender,
      university: university,
      uniAdmissionDate: uniAdmissionDate,
      uniGraduationDate: uniGraduationDate,
      mpps: mpps,
      postgrade: postgrade,
      postgradeUniversity: postgradeUniversity,
      postgradeGraduationDate: postgradeGraduationDate,
      postgradeAdmissionDate: postgradeAdmissionDate,
      additional: additional,
      dayService: dayService,
      dayService2:dayService2 
    }).then((response) => {
      console.log(response);
      if (response.data.status) {
        AsyncStorage.setItem('me',JSON.stringify(response.data.data));
        setTimeout(() => {
          setShowSpinner(false);
          navigation.navigate('HomeMedic');
        }, 3000);
      }
    }).catch((error) => {
      console.log(error);
      setShowSpinner(false);
    });

  }

  const getLatLong = () => {
    console.log('get lat long');
    const lat = navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
        return position.coords.latitude;
      }, (error) => {
        console.log(error);
      }
    );

    const long = navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
        return position.coords.longitude;
      }, (error) => {
        console.log(error);
      }
    );

  }

  const handleFocus = () => {
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

  const handleBlur = () => {
    setIsFocused(false);
    setDate1(new Date());
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
    setDate1(new Date());
  };

  const handleBlur3 = () => {
    setIsFocused3(false);
    setDate1(new Date());
  };

  const handleBlur4 = () => {
    setIsFocused4(false);
    setDate1(new Date());
  };

  const handleBlur5 = () => {
    setIsFocused5(false);
    setDate1(new Date());
  };

  const onChange1 = (event: any, selectedDate?: Date | undefined) => {
    setShowPicker(false);
    if (event.type === "set" && selectedDate){
    const currentDate = Moment(selectedDate).toDate();
    setDate1(currentDate);

        if (Platform.OS === 'android') {
            toggleDatepicker();
            setBirthDate(Moment(currentDate).format('DD/MM/YYYY'));
        }

    } else {

    toggleDatepicker();

    }
  };

  const onChange2 = (event: any, selectedDate?: Date | undefined) => {
    setShowPicker2(false);
    if (event.type === "set" && selectedDate){
      const currentDate = Moment(selectedDate).toDate();
      setDate1(currentDate);
    
      if (Platform.OS === 'android') {
        toggleDatepicker2();
        setuniAdmissionDate(Moment(currentDate).format('DD/MM/YYYY'));
      }
    }else{
      toggleDatepicker2();
    }
  };

  const onChange3 = (event: any, selectedDate?: Date | undefined) => {
    setShowPicker3(false);
    if (event.type === "set" && selectedDate){
      const currentDate = Moment(selectedDate).toDate();
      setDate1(currentDate);
      if (Platform.OS === 'android') {
        toggleDatepicker3();
        setuniGraduationDate(Moment(currentDate).format('DD/MM/YYYY'));
      }
    }else{
      toggleDatepicker3();
    }
  };

  const onChange4 = (event: any, selectedDate?: Date | undefined) => {
    setShowPicker4(false);
    if (event.type === "set" && selectedDate){
      const currentDate = Moment(selectedDate).toDate();
      setDate1(currentDate);
      if (Platform.OS === 'android') {
        toggleDatepicker4();
        setPostgradeAdmissionDate(Moment(currentDate).format('DD/MM/YYYY'));
      }
    }else{
      toggleDatepicker4();
    }
  };

  const onChange5 = (event: any, selectedDate?: Date | undefined) => {
    setShowPicker5(false);
    if (event.type === "set" && selectedDate){
      const currentDate = Moment(selectedDate).toDate();
      setDate1(currentDate);
      if (Platform.OS === 'android') {
        toggleDatepicker5();
        setPostgradeGraduationDate(Moment(currentDate).format('DD/MM/YYYY'));
      }
    }else{
      toggleDatepicker5();
    }
  };

  const setEmailValid = (dataEmail:string) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(dataEmail) === false) {
        return false;
    }else{
        return true;
    }
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
    <ScrollView style={
      {
        backgroundColor: '#E6F1FF',
      }
    }>
      <View style={{...styles.container}}>

        {
          !nextStep && !nextStep2 && (
            
            <>
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: top + 50, justifyContent: 'center', marginBottom: 25 }}>
                <View style={{ width: '15%', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => navigation.pop()}>
                    <ChevronLeftIcon size="6" style={{ color: "#000", marginLeft: 20 }} />
                  </TouchableOpacity>
                </View>
                <View style={{ width: '75%' }}>
                  <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Datos Personales</Text>
                </View>
                <View style={{ width: '15%', alignItems: 'center' }}>
                </View>
              </View>

              <View style={{ width: '100%', alignSelf: 'center', marginTop: 15 }}>
                <Text style={{ marginLeft: 20 }}>Nombre completo</Text>
                <TextInput style={{ ...styles.input,  marginLeft: 15,borderColor: validFullname ? 'red' : '#aaaaaa',fontWeight: "500" }} value={fullName} onChangeText={setFullName}/>
              </View>

              <View style={{ width: '100%' }}>

                <View style={{ marginLeft: 20, marginTop: 15 }}>
                  <Text>Cedula</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <View style={{ ...styles.input ,width: '25%', backgroundColor: 'white', borderColor: '#B3B8C9', borderRadius: 12, marginTop: 15, marginLeft: 20 }}>
                    <TouchableOpacity onPress={() => setShowTypeDNI(true)}>
                      <TextInput value={typeDNISelected} editable={false} style={{width: 80, height: 50, marginLeft: 20, textAlign: 'left', color: '#000', borderColor: validTypeDni ? 'red' : '#aaaaaa',fontWeight: "500"}}/>
                      <Ionicons style={{position: 'absolute', right: 10, marginTop: 12}} name="md-arrow-down-sharp" size={24} color="#818181" />
                    </TouchableOpacity>
                    {showTypeDNI && (

                      <Modal visible={showTypeDNI} animationType="fade" transparent>
                        <View style={styles_modal.modalContainer}>
                          <View style={styles_modal.modalContent}>
                            <FlatList style={{ flexGrow: 1 }} data={typeDNI} scrollEnabled={false} renderItem={({ item }) => (<TouchableOpacity style={styles_modal.optionContainer} onPress={() => onPressModal(item.value)}><Text style={styles_modal.optionText}>{item.label}</Text></TouchableOpacity>)} keyExtractor={(item) => item.value} />
                          </View>
                        </View>
                      </Modal>
                    )}
                  </View>

                  <View style={{ width: '60%' }}>
                    <TextInput placeholder="" style={{ ...styles.input, width: 230,borderColor: validDNI ? 'red' : '#aaaaaa',fontWeight: "500" }} value={dni} onChangeText={setDni}/>
                  </View>
                </View>

              </View>

              <View style={{width: '100%', alignSelf: 'center', marginTop: 30}}>
                <Text style={{marginLeft: 20}}>Fecha de nacimiento</Text>
                <Pressable onPress={toggleDatepicker}>
                <TextInput style={{...styles.input, backgroundColor: 'white', marginLeft: 15,borderColor: validBirthDate ? 'red' : '#aaaaaa',fontWeight: "500"}} value={birthDate} onChangeText={setBirthDate} onFocus={handleFocus} onBlur={handleBlur}/>
                </Pressable>
                {showPicker && isFocused && (<DatePicker mode="date" display="calendar" value={date1} onChange={onChange1}/>)}
              </View>
              
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ marginLeft: 20 }}>Especialidad</Text>
                <TextInput style={{ ...styles.input, marginLeft: 15,borderColor: validSpeciality ? 'red' : '#aaaaaa',fontWeight: "500"}} onChangeText={setSpeciality} value={speciality}/>
              </View>

              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ marginLeft: 20 }}> Numero Telefonico</Text>
                <TextInput style={{ ...styles.input, marginLeft: 15,borderColor: validPhone ? 'red' : '#aaaaaa',fontWeight: "500"}} onChangeText={setPhone} value={phone}/>
              </View>

              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ marginLeft: 20 }}> Correo Electronico</Text>
                <TextInput style={{ ...styles.input, marginLeft: 15,borderColor: validEmail ? 'red' : '#aaaaaa',fontWeight: "500" }} value={email} onChangeText={setEmail}/>
              </View>
                      
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ marginLeft: 20 }}> Ciudad</Text>
                <TextInput style={{ ...styles.input, marginLeft: 15,borderColor: validCity ? 'red' : '#aaaaaa',fontWeight: "500" }} onChangeText={setCity} value={city}/>
              </View>

              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ marginLeft: 20 }}> Direccion</Text>
                <TextInput style={{ ...styles.input, marginLeft: 15,borderColor: validAddress ? 'red' : '#aaaaaa',fontWeight: "500" }} onChangeText={setAddress} value={address}/>
              </View>

              <View style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
                <Text style={{ color: '#000', fontSize: 13, marginHorizontal: 15, marginBottom: 10 }}>Genero</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                  <Radio.Group name="Genero" defaultValue="1" size={10} onChange={valueSelected =>{ 
                    setGender(valueSelected);
                  }} value={gender}>
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

              <TouchableOpacity style={{...styles.button, marginTop: 40, marginHorizontal: 40, marginBottom: 24}} onPress={onNextStep}>
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Continuar</Text>
              </TouchableOpacity>
            </>
          )
        }

        {
          nextStep && (
            
              <>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: top+50}}>
                  <View style={{width: '20%', alignItems: 'center'}} >
                  <TouchableOpacity onPress={onBackStep}>
                    <ChevronLeftIcon size="6" style={{color: "#000", marginLeft: 20}}/>
                  </TouchableOpacity>
                  </View>
                  <View style={
                    {width: '70%'}}>
                    <Text style={{fontSize: 20, textAlign: 'center', marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>Datos Profesionales</Text>
                  </View>
                </View>
                  
                <View style={{ width: '100%', alignSelf: 'center', marginTop: 15 }}>
                  <Text style={{ marginLeft: 20 }}>Universidad</Text>
                  <TextInput placeholder="" style={{...styles.input, borderColor: validUniversity ? 'red' : '#aaaaaa',fontWeight: "500", alignSelf: 'center', justifyContent: 'center', alignContent: 'center'}} value={university} onChangeText={setUniversity}/>
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginLeft: 15}}>

                  <View style={{width: '50%'}}>
                      <Text style={{marginLeft: 10}}>Fecha de ingreso</Text>
                      <Pressable onPress={toggleDatepicker2}>
                      <TextInput placeholder="" style={{...styles.input, borderColor: validUniAdmissionDate ? 'red' : '#aaaaaa', width: 150}} value={uniAdmissionDate} onChangeText={setuniAdmissionDate} onFocus={handleFocus2} onBlur={handleBlur2}/>
                      </Pressable>
                      {showPicker2 && isFocused2 && (<DatePicker mode="date" display="calendar" value={date1} onChange={onChange2}/>)}
                  </View>

                  <View style={{width: '50%'}}>
                      <Text style={{marginLeft: 10}}>Fecha de Egreso</Text>
                      <Pressable onPress={toggleDatepicker3}>
                      <TextInput placeholder="" style={{...styles.input, borderColor: validUniGraduationDate ? 'red' : '#aaaaaa', width: 155}} value={uniGraduationDate} onChangeText={setuniGraduationDate} onFocus={handleFocus3} onBlur={handleBlur3}/>
                      </Pressable>
                      {showPicker3 && isFocused3 && (<DatePicker mode="date" display="calendar" value={date1} onChange={onChange3}/>)}
                  </View>
                </View>

                <View style={{ width: '100%', alignSelf: 'center', marginTop: 20 }}>
                  <Text style={{ marginLeft: 20 }}>MPPS</Text>
                  <TextInput placeholder="" style={{...styles.input, borderColor: validMpps ? 'red' : '#aaaaaa', alignSelf: 'center', justifyContent: 'center', alignContent: 'center'}} value={mpps} onChangeText={setMpps}/>
                </View>
                
                <View style={{width: '95%', alignSelf: 'center', marginTop: 15, marginVertical: 10, marginLeft: 15}}>
                    <Text style={{fontSize: 15, marginHorizontal: 5, marginBottom: 10, color: '#000'
                  }}>Post-grado</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>
                        <Radio.Group name="Genero" defaultValue="si" size={10} value={postgrade} onChange={setpostgrade}>
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
                  <TextInput placeholder="" style={{...styles.input, borderColor: validPostgradeUniversity ? 'red' : '#aaaaaa', alignSelf: 'center', justifyContent: 'center', alignContent: 'center'}} value={postgradeUniversity} onChangeText={setpostgradeUniversity}/>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10, marginLeft: 15}}>
                  <View style={{width: '50%'}}>
                      <Text style={{marginLeft: 10}}>Fecha de ingreso</Text>
                      <Pressable onPress={toggleDatepicker4}>
                      <TextInput placeholder="" style={{...styles.input, borderColor: validePostgradeDateAdmission ? 'red' : '#aaaaaa',width: 150}} value={postgradeAdmissionDate} onChangeText={setPostgradeAdmissionDate} onFocus={handleFocus4} onBlur={handleBlur4}/>
                      </Pressable>
                      {showPicker4 && isFocused4 && (<DatePicker mode="date" display="calendar" value={date1} onChange={onChange4}/>)}
                  </View>
                  <View style={{width: '50%'}}>
                      <Text style={{marginLeft: 10}}>Fecha de Egreso</Text>
                      <Pressable onPress={toggleDatepicker5}>
                      <TextInput placeholder="" style={{...styles.input, borderColor: validePostgradeDateGraduation ? 'red' : '#aaaaaa',width: 155}} value={postgradeGraduationDate} onChangeText={setPostgradeGraduationDate} onFocus={handleFocus5} onBlur={handleBlur5}/>
                      </Pressable>
                      {showPicker5 && isFocused5 && (<DatePicker mode="date" display="calendar" value={date1} onChange={onChange5}/>)}
                  </View>
                </View>

                <View style={{width: '100%'}}>

                  <View style={{ marginLeft: 25, marginTop: 15 }}>
                    <Text>Dias de Servicio</Text>
                  </View>

                  <View style={{ width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: '50%', alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=>{setShowDayService(true)}}>
                        <TextInput placeholder="" style={{...styles.input, borderColor: validDayService ? 'red' : '#aaaaaa',width: 150}} value={dayService}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '50%', alignItems: 'center'}} >
                        <TouchableOpacity onPress={()=>{setShowDayService2(true)}}>
                          <TextInput placeholder="" style={{...styles.input, borderColor: validDayService2 ? 'red' : '#aaaaaa',width: 150}} value={dayService2}/>
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
                  style={{padding: 10, backgroundColor: 'white', borderRadius: 10, width: '90%', borderWidth: 1, marginHorizontal: 10, marginVertical: 10, borderColor: validAdditional ? 'red' : '#aaaaaa', alignSelf: 'center', justifyContent: 'center', alignContent: 'center'}}
                  value={additional}
                  onChangeText={setAdditional}
                  />
                </View>

                <View style={{width: '80%', alignItems: 'center', marginHorizontal: 40, marginTop: top+10, marginBottom: 30}}>
                  <TouchableOpacity style={{...styles.button, width: 270}} onPress={onNextStep2}>
                    <Text style={{color: 'white'}}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              </>
          )
        } 

        {
          nextStep2 && (
            <>
              <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: top+150}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000',  marginBottom: 120 }}>Permitir ubicación</Text>
                <Image source={Images.pin_mapa} alt="step4" style={{width: 250, height: 250, marginTop: top-50}} />
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000',marginTop: top+30}}>Ubicación</Text>
                <Text style={{fontSize: 15, fontWeight: '500', color: '#000', marginTop: top+10}}>Permite que el dispositivo acceda a tu ubicación</Text>
                <TouchableOpacity style={{...styles.button, marginTop: 50}} onPress={()=>{handleNext()}}>
                  <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}} >Permitir</Text>
                </TouchableOpacity>

                <Modal visible={showSpinner} animationType="fade" transparent>
                  <View style={styles_modal.modalContainer}>
                    <View style={styles_modal.modalContent}>
                      <Spinner color="blue.500" size="lg"/>
                      
                    </View>
                  </View>
                </Modal>
              </View>
            </>
          )
        }

      {/* <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 15, color: '#677294'}}>Adjuntar Archivo</Text>
        
        <Image style={{width: 100, height: 100, alignSelf: 'center', marginVertical: 10}} source={Images.files}/>
        
      </View> */}

      </View>
    </ScrollView>

  );

};
