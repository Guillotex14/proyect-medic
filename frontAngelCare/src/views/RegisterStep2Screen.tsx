import React, { useEffect, useState } from 'react';
import { AddIcon, ChevronLeftIcon, CloseIcon, FormControl,Radio, Stack, Spinner, useToast } from 'native-base';
import { View, TextInput, Text, TouchableOpacity, Modal, FlatList, Image, Pressable, Platform, ScrollView, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles_modal } from '../theme/Modal_Profile_Doctor';
import { StackScreenProps } from '@react-navigation/stack';
import { TypeDni } from '../interfaces/registerModels';
import apiConnection from '../api/Concecction';
import { Images } from '../assets/imgs/imgs';
import { styles } from '../theme/ThemeApp';
import { Ionicons } from '@expo/vector-icons';
import DatePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

interface Props extends StackScreenProps<any, any>{};

interface Option {
  label: string;
  value: string;
}

export const RegisterStep2Screen = ({navigation, route}:Props) => {

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

  const [showTypeDNI, setShowTypeDNI] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [nextStep2, setNextStep2] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validFullname, setValidFullname] = useState(false);
  const [validDNI, setValidDNI] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [validCity, setValidCity] = useState(false);
  const [validGender, setValidGender] = useState(false);
  const [validCondition, setValidCondition] = useState(false);
  const [validAditional, setValidAditional] = useState(false);
  const [validBirthDate, setValidBirthDate] = useState(false);
  const [validTypeDni, setValidTypeDni] = useState(false);

  
  const [fullName, setFullName] = useState('');
  const [typeDNISelected, setTypeDNISelected] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [disease, setDisease] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [arrayDisease, setArrayDisease] = useState<string[]>([]);
  const [alergy, setAlergy] = useState('');
  const [arrayAlergies, setArrayAlergies] = useState<string[]>([]);
  const [condition, setCondition] = useState('');
  const [aditional, setAditional] = useState('');

  const [date1, setDate1] = useState(new Date());

  const onPressModal = (typedni:string) => {
    setTypeDNISelected(typedni)
    setShowTypeDNI(!showTypeDNI);
  }

  useEffect(() => {

    params.fullName === undefined ? setFullName('') : setFullName(params.fullName);
    params.email === undefined ? setEmail('') : setEmail(params.email);
    params.password === undefined ? setPassword('') : setPassword(params.password);

    // setFullName(params.fullName );
    // setEmail(params.email );
    // setPassword(params.password );
  }, [])

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  
  const onNextStep = async () => {
    
    const api = await apiConnection.post('/auth/emailExist', {
        email: email
    }).then((response) => {
        if (response.data.status === true) {
            return false;
        }else{
            return true;
        }
    }).catch((error) => {
        console.log(error);
    });

    if (fullName === '')  {
      presentToast('El nombre no puede estar vacio');
      setValidFullname(true);
      return;
    }else{
      setValidFullname(false);
    }


    if (typeDNISelected === '') {
      presentToast('El tipo de documento no puede estar vacio');
      setValidTypeDni(true);
      return;
    }else{
      setValidTypeDni(false);
    }

    if (dni === '') {
      presentToast('El documento no puede estar vacio');
      setValidDNI(true);
      return;
    }else{
      setValidDNI(false);
    }

    if (birthDate === '') {
      presentToast('La fecha de nacimiento no puede estar vacia');
      setValidBirthDate(true);
      return;
    }else{
      setValidBirthDate(false);
    }

    if (phone === '') {
      presentToast('El telefono no puede estar vacio');
      setValidPhone(true);
      return;
    }else{
      setValidPhone(false);
    }

    if (email === '') {
      presentToast('El email no puede estar vacio');
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
    presentToast('La ciudad no puede estar vacia');
    setValidCity(true);
    return;
  }else{
    setValidCity(false);
  }

    if (address === '') {
      presentToast('La direccion no puede estar vacia');
      setValidAddress(true);
      return;
    }else{
      setValidAddress(false);
    }
    
    if (gender === '') {
      presentToast('El genero no puede estar vacio');
      setValidGender(true);
      return; 
    }else{
      setValidGender(false);
    }

    if (api === false) {
      presentToast('El email ya esta registrado');
      setValidEmail(true);
      return;
    }else{
      setNextStep(true);
    }


  }

  const onNextStep2 = () => {

    if (arrayDisease.length === 0) {
      presentToast('Debe seleccionar al menos una enfermedad');
      return;
    }
  
    if (arrayAlergies.length === 0) {
      presentToast('Debe seleccionar al menos una alergia');
      return;
    }

    if (condition === '') {
      presentToast('Debe seleccionar una condicion');
      setValidCondition(true);
      return;
    }else{
      setValidCondition(false);
    }
  
    if (aditional === '') {
      presentToast('Debe seleccionar una condicion');
      setValidAditional(true);
      return;
    }else{
      setValidAditional(false);
    }

    setNextStep(false);
    setNextStep2(true);
  }

  const onBackStep = () => {
    setNextStep(false);
  }

  const handleNext = async () => {
    setShowSpinner(true);
    const api = await apiConnection.post('auth/registerPatient', {
      fullName: fullName,
      typeDni: typeDNISelected,
      dni: dni,
      email: email,
      password: password,
      phone: phone,
      address: address,
      city: city,
      gender: gender,
      diseases: arrayDisease,
      alergies: arrayAlergies,
      condition: condition,
      aditional: aditional      
    }).then((response) => {
      console.log(response);
      if (response.data.status) {
        setTimeout(() => {
          setShowSpinner(false);
          navigation.navigate('Home');
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

  const addDisease = () => {
    if (disease !== '') {
      setArrayDisease([...arrayDisease, disease]);
      setDisease('');
    }
  }

  const removeDisease = (item:string) => {
    const array = arrayDisease.filter((disease) => disease !== item);
    setArrayDisease(array);
  }

  const addAlergy = () => {
    if (alergy !== '') {
      setArrayAlergies([...arrayAlergies, alergy]);
      setAlergy('');
    }
  }

  const removeAlergy = (item:string) => {
    const array = arrayAlergies.filter((alergy) => alergy !== item);
    setArrayAlergies(array);
  }

  const handleFocus = () => {
    setIsFocused(true);
    setShowPicker(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
    <ScrollView style={{backgroundColor: '#E6F1FF'}}>
      <View style={{...styles.container}}>

        {
          !nextStep && !nextStep2 &&(
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
                <TextInput style={{ ...styles.input, marginLeft: 15,borderColor: validFullname ? 'red' : '#aaaaaa' }} value={fullName} onChangeText={setFullName}/>
              </View>

              <View style={{ width: '100%' }}>

                <View style={{ marginLeft: 20, marginTop: 15 }}>
                  <Text>Cedula</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                  <View style={{ ...styles.input ,width: '25%', backgroundColor: 'white', borderColor: '#B3B8C9', borderRadius: 12, marginTop: 15, marginLeft: 20 }}>
                    <TouchableOpacity onPress={() => setShowTypeDNI(true)}>
                      <TextInput value={typeDNISelected} editable={false} style={{width: 80, height: 50, marginLeft: 20, textAlign: 'left', color: '#000', borderColor: validTypeDni ? 'red' : '#aaaaaa'}}/>
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
                    <TextInput placeholder="" style={{ ...styles.input, width: 230,borderColor: validDNI ? 'red' : '#aaaaaa' }} value={dni} onChangeText={setDni}/>
                  </View>
                </View>

              </View>

              <View style={{width: '100%', alignSelf: 'center', marginTop: 30}}>
                <Text style={{marginLeft: 20}}>Fecha de nacimiento</Text>
                <Pressable onPress={toggleDatepicker}>
                <TextInput style={{...styles.input, backgroundColor: 'white', marginLeft: 15,borderColor: validBirthDate ? 'red' : '#aaaaaa'}} value={birthDate} onChangeText={setBirthDate} onFocus={handleFocus} onBlur={handleBlur}/>
                </Pressable>
                {showPicker && isFocused && (<DatePicker mode="date" display="calendar" value={date1} onChange={onChange1}/>)}
              </View>
              
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ marginLeft: 20 }}> Numero Telefonico</Text>
                <TextInput style={{ ...styles.input, marginLeft: 15,borderColor: validPhone ? 'red' : '#aaaaaa'}} onChangeText={setPhone} value={phone}/>
              </View>

              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ marginLeft: 20 }}> Correo Electronico</Text>
                <TextInput style={{ ...styles.input, marginLeft: 15,borderColor: validEmail ? 'red' : '#aaaaaa' }} value={email} onChangeText={setEmail}/>
              </View>
              
              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ marginLeft: 20 }}> Ciudad</Text>
                <TextInput style={{ ...styles.input, marginLeft: 15,borderColor: validCity ? 'red' : '#aaaaaa',fontWeight: "500" }} onChangeText={setCity} value={city}/>
              </View>

              <View style={{ width: '100%', marginTop: 20 }}>
                <Text style={{ marginLeft: 20 }}> Direccion</Text>
                <TextInput style={{ ...styles.input, marginLeft: 15,borderColor: validAddress ? 'red' : '#aaaaaa' }} onChangeText={setAddress} value={address}/>
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

          nextStep &&(
            <>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: top+50, justifyContent: 'center'}}>
                  <View style={{width: '15%', alignItems: 'center'}} >
                  <TouchableOpacity onPress={onBackStep}>
                    <ChevronLeftIcon size="6" style={{color: "#000", marginLeft: 20}}/>
                  </TouchableOpacity>
                  </View>
                  <View style={
                    {width: '75%'}}>
                    <Text style={{fontSize: 20, textAlign: 'center', marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>Ficha Medica</Text>
                  </View>
                  <View style={
                    {width: '15%', alignItems: 'center'}}>
                  </View>
              </View>
                
                {/*enfermedades  */}
                <View style={{ marginHorizontal: 10, marginTop: top+50}}>
                  <Text style={{fontSize: 14, marginHorizontal: 15, color: '#737373'}}>Enfermedades</Text>
                  <View style={{flexDirection:'row', marginTop: 10, width:"100%"}}>
                    <View style={{width:'75%'}}>
                      <TextInput style={styles.input} value={disease} onChangeText={setDisease}/>
                    </View>
                    <View style={{width: "20%", alignItems: 'center', alignContent: 'center',}}>
                      <TouchableOpacity style={{...styles.button, alignSelf: 'center', marginTop: 10}} onPress={()=>addDisease()}>
                        <AddIcon size="7" style={{color: "#fff",alignSelf: 'center'}}/>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {
                    arrayDisease.length > 0 && (
                      
                      <View style={{ marginHorizontal: 25, marginTop: 15}}>
                        <FlatList data={arrayDisease} scrollEnabled={false}
                        renderItem={({item}) => (
                          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5,alignSelf: 'center', alignContent: 'center', width: "100%"}}>
                            <View style={{width: "70%"}}>
                              <Text style={{fontSize: 20, marginHorizontal: 15, color: '#737373', fontWeight: 'bold'}}>{item}</Text>
                            </View>
                            <View style={{width: "20%"}}>
                              <TouchableOpacity style={{...styles.button, marginRight: 50, width: 40, height: 40}} onPress={()=>removeDisease(item)}>
                                <CloseIcon size="4" style={{color: "#fff",alignSelf: 'center'}}/>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )} 
                        keyExtractor={(item) => item}/>
                      </View>
                    )
                  }

                </View>
                
                {/* alergias */}
                <View style={{ marginHorizontal: 10, marginTop: top+50}}>
                  <Text style={{fontSize: 14, marginHorizontal: 15, color: '#737373'}}>Alergias</Text>
                  <View style={{flexDirection:'row', marginTop: 10, width:"100%"}}>
                    <View style={{width:'75%'}}>
                      <TextInput style={styles.input} value={alergy} onChangeText={setAlergy}/>
                    </View>
                    <View style={{width: "20%", alignItems: 'center', alignContent: 'center',}}>
                      <TouchableOpacity style={{...styles.button, alignSelf: 'center', marginTop: 10}} onPress={()=>addAlergy()}>
                        <AddIcon size="7" style={{color: "#fff",alignSelf: 'center'}}/>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {
                    arrayAlergies.length > 0 && (
                      
                      <View style={{ marginHorizontal: 25, marginTop: 15}}>
                        <FlatList data={arrayAlergies} scrollEnabled={false}
                        renderItem={({item}) => (
                          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5,alignSelf: 'center', alignContent: 'center', width: "100%"}}>
                            <View style={{width: "70%"}}>
                              <Text style={{fontSize: 20, marginHorizontal: 15, color: '#737373', fontWeight: 'bold'}}>{item}</Text>
                            </View>
                            <View style={{width: "20%"}}>
                              <TouchableOpacity style={{...styles.button, marginRight: 50, width: 40, height: 40}} onPress={()=>removeAlergy(item)}>
                                <CloseIcon size="4" style={{color: "#fff",alignSelf: 'center'}}/>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )} 
                        keyExtractor={(item) => item}/>
                      </View>
                    )
                  }

                </View>
                  
                {/* Condicion */}
                <View style={{alignItems: 'center', alignContent: 'center', marginHorizontal: 10, marginTop: top+20}}>

                  <FormControl style={{marginVertical: 5}}>
                    <FormControl.Label style={{marginLeft: 10}}>Condicion</FormControl.Label>
                    <TextInput style={{...styles.input, borderColor: validCondition ? 'red' : '#aaaaaa'}} value={condition} onChangeText={setCondition}/>
                  </FormControl>
                  {/*
                  */}

                </View>
                  
                {/* Adicional */}
                <View style={{alignItems: 'center', marginHorizontal: 10, marginTop: top+20, marginBottom: 30}}>
                  <FormControl style={{marginVertical: 5}}>
                      <FormControl.Label style={{marginLeft: 10}}>Adicional</FormControl.Label>
                      <TextInput
                    multiline
                    numberOfLines={6}
                    maxLength={240}
                    style={{padding: 10, backgroundColor: 'white', borderRadius: 10, width: '90%', borderWidth: 1, marginHorizontal: 10, marginVertical: 5, textAlignVertical: 'top', borderColor: validAditional ? 'red' : '#aaaaaa'}}
                      value={aditional} onChangeText={setAditional}/>
                    </FormControl>
                </View>

                <View style={{width: '80%', alignItems: 'center', marginHorizontal: 40, marginTop: top+10, marginBottom: 30}}>
                  <TouchableOpacity style={{...styles.button, width: 270}} onPress={onNextStep2}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Continuar</Text>
                  </TouchableOpacity>
                </View>
            </>
          )
        }

        {
          nextStep2 && (
            <>
              <View style={{...styles.container, justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: top+50}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000',  marginBottom: 120 }}>Permitir ubicación</Text>
                <Image source={Images.pin_mapa} alt="step4" style={{width: 250, height: 250, marginTop: top-50}} />
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000',marginTop: top+30}}>Ubicación</Text>
                <Text style={{fontSize: 15, fontWeight: '300', color: '#000', marginTop: top+10}}>Permite que el dispositivo acceda a tu ubicación</Text>
                <TouchableOpacity style={{...styles.button, marginTop: 50}} onPress={()=>{handleNext()}}>
                  <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}} >Permitir</Text>
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

      </View>
    </ScrollView>

  );
};
