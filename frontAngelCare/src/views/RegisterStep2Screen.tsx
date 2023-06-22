import React, { useEffect, useState } from 'react';
import { AddIcon, ChevronLeftIcon, CloseIcon, FormControl,Radio, Stack, Spinner } from 'native-base';
import { View, TextInput, Text, TouchableOpacity, Modal, FlatList,Image, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles_modal } from '../theme/Modal_Profile_Doctor';
import { StackScreenProps } from '@react-navigation/stack';
import { TypeDni } from '../interfaces/registerModels';
import apiConnection from '../api/Concecction';
import { Images } from '../assets/imgs/imgs';
import { styles } from '../theme/ThemeApp';
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

  const [isRadio, setIsRadio] = useState(false);
  const [isRadio2, setIsRadio2] = useState(false);
  const [isRadio3, setIsRadio3] = useState(false);
  const [showTypeDNI, setShowTypeDNI] = useState(false);
  const [showDayService, setShowDayService] = useState(false);
  const [showDayService2, setShowDayService2] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [nextStep2, setNextStep2] = useState(false);
  const [nextStep3, setNextStep3] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [typeDNISelected, setTypeDNISelected] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
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
    setFullName(params.fullName);
    setEmail(params.email);
    setPassword(params.password);
  }, [])

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onNextStep = () => {
    setNextStep(true);
  }

  const onNextStep2 = () => {
    setNextStep(false);
    setNextStep2(true);
  }

  const onBackStep = () => {
    setNextStep(false);
  }

  const onBackStep2 = () => {
    setNextStep2(false);
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

  return (

    <View style={{...styles.container}}>

      {
        !nextStep && !nextStep2 &&(
          <>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: top + 50 }}>
              <View style={{ width: '15%', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                  <ChevronLeftIcon size="6" style={{ color: "#000", marginLeft: 20 }} />
                </TouchableOpacity>
              </View>
              <View style={{ width: '75%' }}>
                <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', fontWeight: 'bold' }}>Datos Personales</Text>
              </View>
            </View>

            <View style={{ width: '100%', alignSelf: 'center', marginTop: 15 }}>
              <Text style={{ marginLeft: 20 }}>Nombre completo</Text>
              <TextInput style={{ ...styles.input, marginLeft: 15 }} value={fullName} onChangeText={setFullName}/>
            </View>

            <View style={{ width: '100%' }}>

              <View style={{ marginLeft: 20, marginTop: 15 }}>
                <Text>Cedula</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={{ ...styles.input ,width: '25%', backgroundColor: 'white', borderColor: '#B3B8C9', borderRadius: 12, marginTop: 15, marginLeft: 20 }}>
                  <TouchableOpacity onPress={() => setShowTypeDNI(true)}>
                    <TextInput value={typeDNISelected} editable={false} style={{width: 80, height: 50, marginLeft: 0, textAlign: 'center'}}/>
                  </TouchableOpacity>
                  {showTypeDNI && (

                    <Modal visible={showTypeDNI} animationType="fade" transparent>
                      <View style={styles_modal.modalContainer}>
                        <View style={styles_modal.modalContent}>
                          <FlatList style={{ flexGrow: 1 }} data={typeDNI} renderItem={({ item }) => (<TouchableOpacity style={styles_modal.optionContainer} onPress={() => onPressModal(item.value)}><Text style={styles_modal.optionText}>{item.label}</Text></TouchableOpacity>)} keyExtractor={(item) => item.value} />
                        </View>
                      </View>
                    </Modal>
                  )}
                </View>

                <View style={{ width: '60%' }}>
                  <TextInput placeholder="" style={{ ...styles.input, width: 230 }} value={dni} onChangeText={setDni}/>
                </View>
              </View>

            </View>

            {/* <View style={{ width: '100%', marginTop: 20 }}>
              <Text style={{ marginLeft: 20 }}> Fecha de nacimiento</Text>
              <TextInput style={{ ...styles.input, marginLeft: 15 }} />
            </View> */}

            <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
              <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Fecha de nacimiento</Text>
              <Pressable onPress={toggleDatepicker}>
              <TextInput placeholder="Fecha de nacimiento" style={{...styles.input, backgroundColor: 'white'}} value={birthDate} onChangeText={setBirthDate} onFocus={handleFocus} onBlur={handleBlur}/>
              </Pressable>
              {showPicker && isFocused && (<DatePicker mode="date" display="calendar" value={date1} onChange={onChange1}/>)}
            </View>
            
            <View style={{ width: '100%', marginTop: 20 }}>
              <Text style={{ marginLeft: 20 }}> Numero Telefonico</Text>
              <TextInput style={{ ...styles.input, marginLeft: 15 }} onChangeText={setPhone} value={phone}/>
            </View>

            <View style={{ width: '100%', marginTop: 20 }}>
              <Text style={{ marginLeft: 20 }}> Correo Electronico</Text>
              <TextInput style={{ ...styles.input, marginLeft: 15 }} value={email} onChangeText={setEmail}/>
            </View>

            <View style={{ width: '100%', marginTop: 20 }}>
              <Text style={{ marginLeft: 20 }}> Direccion</Text>
              <TextInput style={{ ...styles.input, marginLeft: 15 }} onChangeText={setAddress} value={address}/>
            </View>

            <View style={{ width: '95%', alignSelf: 'center', marginTop: 30 }}>
              <Text style={{ color: '#000', fontSize: 13, marginHorizontal: 15 }}>Genero</Text>
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

            <TouchableOpacity style={{...styles.button, marginTop: 40, marginHorizontal: 40}} onPress={()=> setNextStep(true)}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Continuar</Text>
            </TouchableOpacity>
          </>

        )
      }

      {

        nextStep &&(
          <>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: top+50}}>
                <View style={{width: '20%', alignItems: 'center'}} >
                <TouchableOpacity onPress={onBackStep}>
                  <ChevronLeftIcon size="6" style={{color: "#000", marginLeft: 20}}/>
                </TouchableOpacity>
                </View>
                <View style={
                  {width: '70%'}}>
                  <Text style={{fontSize: 20, textAlign: 'center', marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>Ficha Medica</Text>
                </View>
            </View>
              
              {/*enfermedades  */}
              <View style={{ marginHorizontal: 10, marginTop: top+50}}>
                <Text style={{fontSize: 14, marginHorizontal: 15, color: '#737373'}}>Enfermedades</Text>
                <View style={{flexDirection:'row', marginTop: 10, width:"100%"}}>
                  <View style={{width:'75%'}}>
                    {/* <FormControl style={{marginVertical: 5}}> */}
                      <TextInput style={styles.input} value={disease} onChangeText={setDisease}/>
                    {/* </FormControl> */}
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
                      <FlatList data={arrayDisease} 
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
                    {/* <FormControl style={{marginVertical: 5}}> */}
                      <TextInput style={styles.input} value={alergy} onChangeText={setAlergy}/>
                    {/* </FormControl> */}
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
                      <FlatList data={arrayAlergies} 
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
                  <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                  <TextInput style={styles.input} value={condition} onChangeText={setCondition}/>
                </FormControl>
                {/*
                 */}

              </View>
                
              {/* Adicional */}
              <View style={{alignItems: 'center', marginHorizontal: 10, marginTop: top+20, marginBottom: 30}}>
                <FormControl style={{marginVertical: 5}}>
                    <FormControl.Label style={{marginLeft: 10}}>Adicional</FormControl.Label>
                    <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                    <TextInput
                  editable
                  multiline
                  numberOfLines={6}
                  maxLength={240}
                  style={{padding: 10, backgroundColor: 'white', borderRadius: 10, width: '90%', borderColor: 'gray', borderWidth: 1, marginHorizontal: 10, marginVertical: 5}}
                    value={aditional} onChangeText={setAditional}/>
                  </FormControl>
              </View>

              <View style={{width: '80%', alignItems: 'center', marginHorizontal: 40, marginTop: top+10, marginBottom:  30}}>
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
            <View style={{...styles.container, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000',  marginBottom: 120 }}>Permitir ubicación</Text>
              <Image source={Images.pin_mapa} alt="step4" style={{width: 250, height: 250, marginTop: top-50}} />
              <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000',marginTop: top+30}}>Ubicación</Text>
              <Text style={{fontSize: 12, fontWeight: '300', color: '#000', marginTop: top+10}}>Permite que el dispositivo acceda a tu ubicación</Text>
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

    </View>

  );
};
