import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { ChevronLeftIcon, FormControl,Stack, Spinner,Radio } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { TypeDni } from '../interfaces/registerModels';
import { styles_modal } from '../theme/Modal_Profile_Doctor';
import { Images } from '../assets/imgs/imgs';
import apiConection from '../api/Concecction';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props extends StackScreenProps<any, any>{};

interface Option {
  label: string;
  value: string;
}

export const RegisterMedicStep2Screen = ({navigation, route}:Props) => {

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
  const [nextStep3, setNextStep3] = useState(false);
  
  
  const [fullName, setFullName] = useState('');
  const [typeDNISelected, setTypeDNISelected] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [gender, setGender] = useState('');

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

  useEffect(() => {
    setFullName(params.fullName);
    setEmail(params.email);
    setPassword(params.password);
  }, [])
  

  //function for radio buttons
  const onRadioButtons = (radio: string) => {
      if(radio == 'masculino'){
          setIsRadio(true);
          setIsRadio2(false);
          setIsRadio3(false);
      }

      if (radio == 'femenino') {
          setIsRadio(false);
          setIsRadio2(true);
          setIsRadio3(false);
      }

      if (radio == 'otro') {
          setIsRadio(false);
          setIsRadio2(false);
          setIsRadio3(true);
      }
  }

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
    const api = await apiConection.post('auth/registerMedic', {
      fullName: fullName,
      typeDNISelected: typeDNISelected,
      dni: dni,
      email: email,
      password: password,
      phone: phone,
      address: address,
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

  return (

    <View style={{...styles.container}}>

    {
      !nextStep && !nextStep2 && (
        
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

          <View style={{ width: '100%', marginTop: 20 }}>
            <Text style={{ marginLeft: 20 }}> Fecha de nacimiento</Text>
            <TextInput style={{ ...styles.input, marginLeft: 15 }} />
          </View>

          <View style={{ width: '100%', marginTop: 20 }}>
            <Text style={{ marginLeft: 20 }}> Especialidad</Text>
            <TextInput style={{ ...styles.input, marginLeft: 15 }} onChangeText={setSpeciality} value={speciality}/>
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

          <TouchableOpacity style={{ ...styles.button, marginTop: 40, marginHorizontal: 40 }} onPress={onNextStep}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Continuar</Text>
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

              <View style={{alignItems: 'center', alignContent: 'center', marginHorizontal: 10, marginTop: top+50}}>

                <FormControl style={{marginVertical: 5}}>
                  <FormControl.Label style={{marginLeft: 10}}>Universidad</FormControl.Label>
                  <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                  <TextInput placeholder="" style={styles.input} value={university} onChangeText={setUniversity}/>
                </FormControl>
              
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
                  <View style={{width: '50%', alignItems: 'center'}}>
                    <FormControl style={{width: '90%'}}>
                      <FormControl.Label style={{marginLeft: 10}}>Fecha de ingreso</FormControl.Label>
                      <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                      <TextInput placeholder="" style={styles.input} value={uniAdmissionDate} onChangeText={setuniAdmissionDate}/>
                    </FormControl>
                  </View>
                  <View style={{width: '50%', alignItems: 'center'}}>
                    <FormControl style={{width: '90%'}}>
                      <FormControl.Label style={{marginLeft: 10}}>Fecha de Egreso</FormControl.Label>
                      <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                      <TextInput placeholder="" style={styles.input} value={uniGraduationDate} onChangeText={setuniGraduationDate}/>
                    </FormControl>
                  </View>
                </View>

                <FormControl style={{marginVertical: 5}}>
                  <FormControl.Label style={{marginLeft: 10}}>MPPS</FormControl.Label>
                  <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                  <TextInput placeholder="" style={styles.input} value={mpps} onChangeText={setMpps}/>
                </FormControl>

                <View style={{width: '95%', alignSelf: 'center', marginTop: 15}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 15, marginBottom: 10, color: '#677294'
                  }}>Post-grado</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>
                        <Radio.Group name="Genero" defaultValue="1" size={10} value={postgrade} onChange={setpostgrade}>
                            <Stack direction={{ base: 'row', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }} 
                            space={12} w="85%" maxW="300px">
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

                <FormControl style={{marginVertical: 5}}>
                  <FormControl.Label style={{marginLeft: 10}}>Post-grado Universidad</FormControl.Label>
                  <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                  <TextInput placeholder="" style={styles.input} value={postgradeUniversity} onChangeText={setpostgradeUniversity}/>
                </FormControl>

                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
                  <View style={{width: '50%', alignItems: 'center'}}>
                    <FormControl style={{width: '90%'}}>
                      <FormControl.Label style={{marginLeft: 10}}>Fecha de ingreso</FormControl.Label>
                      <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                      <TextInput placeholder="" style={styles.input} value={postgradeAdmissionDate} onChangeText={setPostgradeAdmissionDate}/>
                    </FormControl>
                  </View>
                  <View style={{width: '50%', alignItems: 'center'}}>
                    <FormControl style={{width: '90%'}}>
                      <FormControl.Label style={{marginLeft: 10}}>Fecha de Egreso</FormControl.Label>
                      <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                      <TextInput placeholder="" style={styles.input} value={postgradeGraduationDate} onChangeText={setPostgradeGraduationDate}/>
                    </FormControl>
                  </View>
                </View>

                <View >
                  <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 15, color: '#677294'}}>Dias de Servicio</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
                    <View style={{width: '50%', alignItems: 'center'}}>
                      <FormControl style={{width: '90%'}}>
                        <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                        <TouchableOpacity onPress={()=>setShowDayService(true)}>
                        <TextInput placeholder="" style={styles.input} value={dayService}/>
                        </TouchableOpacity>
                      </FormControl>
                    </View>
                    <View style={{width: '50%', alignItems: 'center'}}>
                      <FormControl style={{width: '90%'}}>
                        <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                        <TouchableOpacity onPress={()=>setShowDayService2(true)}>
                          <TextInput placeholder="" style={styles.input} value={dayService2}/>
                        </TouchableOpacity>
                      </FormControl>
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

                <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 15, color: '#677294'}}>Adjuntar Archivo</Text>
                  
                  <Image style={{width: 100, height: 100, alignSelf: 'center', marginVertical: 10}} source={Images.files}/>
                  
                </View>

                <FormControl style={{marginVertical: 5}}>
                  <FormControl.Label style={{marginLeft: 10}}>Adicional</FormControl.Label>
                  <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                  <TextInput
                editable
                multiline
                numberOfLines={6}
                maxLength={240}
                style={{padding: 10, backgroundColor: 'white', borderRadius: 10, width: '90%', borderColor: 'gray', borderWidth: 1, marginHorizontal: 10, marginVertical: 5}}
                value={additional}
                onChangeText={setAdditional}
                />
                </FormControl>

              </View>

              <View style={{width: '80%', alignItems: 'center', marginHorizontal: 40, marginTop: top+10, marginBottom: 30}}>
                <TouchableOpacity style={{...styles.button, width: 270}} onPress={onNextStep2}>
                  <Text style={{color: 'white'}}>Continuar</Text>
                </TouchableOpacity>
              </View>
              {/* <DateTimePicker mode="date" value={date}/> */}
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
