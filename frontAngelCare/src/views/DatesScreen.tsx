import { Text, TextInput, TouchableOpacity, View, Image, FlatList, Modal, ScrollView, Platform} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from '../theme/ThemeApp';
import { useToast } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { Images } from '../assets/imgs/imgs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { styles_modal } from '../theme/Modal_Profile_Doctor';
import apiConnection from '../api/Concecction';
import { CardDateSearch } from '../components/CardDateSearch';
import Carousel from 'react-native-snap-carousel';
import DatePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Props extends StackScreenProps<any, any> {}

export const DatesScreen = ({navigation}:Props) => {

  const [reason, setReason] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [arraySymptoms, setArraySymptoms] = useState<String[]>([]);

  const [isOpen, setIsOpen ] = useState(false);
  const [isSend, setIsSend ] = useState(false);
  const [isSeach, setIsSeach ] = useState(false);
  const [selectMedic, setSelectMedic ] = useState(false);
  const [validReason, setValidReason] = useState(false);
  const [validSymptom, setValidSymptom] = useState(false);
  const [validArraySymptoms, setValidArraySymptoms] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showDateAvailable, setShowDateAvailable] = useState(false);
  const [idMedic, setIdMedic] = useState('')
  const [idPatient, setIdPatient] = useState('')
  const [dates, setDates] = useState('')
  const [date, setDate] = useState(new Date());
  const [city, setCity] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [arrayMedics, setArrayMedics] = useState<any[]>([]);
  const [auxMedics, setAuxMedics] = useState<any[]>([]);
  const { top, bottom } = useSafeAreaInsets();

  const toast = useToast();

  const searchMedic = async () => {
    await apiConnection.post('/patient/searchDoctor', {
      city: city,
      speciality: speciality,
    }).then(resp=>{
      
    }).catch(error=>{
      console.log(error)
    })

  }

  const allMedics = async () => {
    await apiConnection.get('/patient/allMedics').then(resp=>{
      if (resp.data.status) {
        console.log(resp.data.data)
        setArrayMedics(resp.data.data)
        setAuxMedics(resp.data.data)
      }
        
    }).catch(error=>{
      console.log(error)
    })
  }

  const createDate = async () => {

    console.log(idMedic)
    console.log(idPatient)
    console.log(reason)
    console.log(arraySymptoms)
    console.log(dates)

    await apiConnection.post('/patient/createDate', {
      id_medic: idMedic,
      id_patient: idPatient,
      reason: reason,
      symptoms: arraySymptoms,
      date: dates,

    }).then(resp=>{
      console.log(resp.data)
      if (resp.data.status) {
        presentToast('Cita creada con exito');
        // navigation.navigate('Home');
      }else{
        presentToast('Error al crear la cita');
      }
    }).catch(error=>{
      console.log(error)
    })

    setIsSeach(true);
    setIsSend(false);
  }

  const sendDates = () => {

    if (reason === '') {
      setValidReason(true);
      presentToast('Ingrese un motivo de la cita');
      setIsOpen(false);
      return;
    }else{
      setValidReason(false);
    }

    if (arraySymptoms.length === 0) {
      setValidArraySymptoms(true);
      presentToast('Ingrese un sintoma');
      setIsOpen(false);
      return;
    }else{
      setValidArraySymptoms(false);
    }


    setIsSend(true);
    setIsSeach(false);
    setIsOpen(false);
    setTimeout(() => {
      createDate();
    }, 2000);
  }

  const addSymptoms = () => {
    let exist = false;
    if (symptoms !== ''){
      const exist1 = arraySymptoms.find((item) => item === symptoms);
      if (exist1){
        exist = true;
      }

      if (exist){
        presentToast('Ya existe este sintoma');
        return;
      }else{
        setArraySymptoms([...arraySymptoms, symptoms]);
        setSymptoms('');
      }
  
    }else{
      presentToast('Ingrese un sintoma');
      return;
    }
  }

  const deleteSymptoms = (symp: any) => {
    console.log(symp)
    const newArray = arraySymptoms.filter((item) => item !== symp);
    setArraySymptoms(newArray);
  }

  const presentToast = (message: string) => {

    toast.show({
        render: () => (
            <View style={{backgroundColor: '#ea868f', padding: 15, borderRadius: 50}}>
                <Text style={{color: 'white', fontSize: 20}}>{message}</Text>
            </View>
        ),
        placement: 'top',
        duration: 2000,
    });

  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowPicker(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setDate(new Date());
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  
  const onChange = (event: any, selectedDate?: Date | undefined) => {
    setShowPicker(false);
    if (event.type === "set" && selectedDate){
    const currentDate = Moment(selectedDate).toDate();
    setDate(currentDate);

        if (Platform.OS === 'android') {
            toggleDatepicker();
            setDates(Moment(currentDate).format('DD/MM/YYYY'));
        }

        if (Platform.OS === 'ios') {
          toggleDatepicker();
          setDates(Moment(currentDate).format('DD/MM/YYYY'));
        }

    } else {

      toggleDatepicker();

    }
  };

  const getStorage = async () => {
    const me = await AsyncStorage.getItem('me');
    let meJson = JSON.parse(me!);
    
    console.log("asdsadasdasdasdas", me)
    setIdPatient(meJson.id_patient);

  }

  const nextStep = () => {
    if (idMedic === '') {
      presentToast('Debe seleccionar un medico para continuar');
      return;
    }

    if (dates === '') {
      presentToast('campo fecha vacio, seleccione una fecha por favor');
      return;
    }

    setSelectMedic(true);
  }

  useEffect(() => {
    allMedics();
    getStorage();
  }, [])
  

  if (isSend && !isSeach){
    return (
      <View style={{...styles.container, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
        <Image source={Images.clipboard} alt="step4" style={{width: 250, height: 250, marginTop: top + 50}} />
        <Text style={{fontSize: 17, fontWeight: 'bold', color: '#000',marginTop: top + 30, textAlign: 'center'}}>
          Estamos buscando un medico internista disponible
        </Text>
        <Text style={{fontSize: 14, fontWeight: '500', color: '#000', marginTop: top + 10, }}>Este proceso puede demorar unos minutos...</Text>
        {/* <TouchableOpacity style={{...styles.button, marginTop: 50}} onPress={searchDoctor}>
          <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}} >Permitir</Text>
        </TouchableOpacity> */}
      </View>
      );
  }

  if (isSeach && !isSend){
    return (
      <View style={{...styles.container, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
        <Card style={{
            width: '90%',
            marginTop: 70,
            backgroundColor: '#fff',
            borderRadius: 12,
            height: 550
          }}>
          <Card.Content style={{
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>

            <Avatar.Image size={120} source={Images.doctor} style={{marginTop: 50}}/>

            <Text style={{fontSize: 17, fontWeight: 'bold', color: '#000',marginTop: top + 30}}>Dr. Eduardo Medina</Text>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#0E54BE'}}>Internista</Text>
            <Text style={{fontSize: 13, fontWeight: '500', color: '#000', marginTop: top + 10, textAlign: 'center', marginHorizontal: 25}}>
              El dr Eduardo Medina será el especialista que atenderá tu consulta</Text>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#000', marginTop: top + 10}}>
                Activo
              </Text>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#000', marginTop: top + 10}}>2001 - 2008</Text>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#000', marginTop: top + 10}}>Universidad Central Lisandro Alvarado</Text>

            <Button  mode="contained" onPress={()=>{ navigation.navigate('ChatDate')}} style={{
              backgroundColor: '#0E54BE',
              borderRadius: 12,
              marginTop: 50,
              width: 230,
            }}>
              Continuar
            </Button>

          </Card.Content>
        </Card>

      </View>
    );
  }

  const filterMeds = () => {

    if (city === '' && speciality === '' ) {
      allMedics(); 
    }

    if (city !== '' && speciality !== ''){
      const filter = arrayMedics.filter((item) => item.city === city && item.speciality === speciality);

      if (filter.length > 0){
        setArrayMedics(filter);
      }else{
        allMedics();
        presentToast('No se encontraron medicos con estos filtros');
      }

    }

    if (city !== '' && speciality === '' ) {
      const filter = arrayMedics.filter((item) => item.city === city);
      if (filter.length > 0){
        setArrayMedics(filter);
      }else{
        allMedics();
        presentToast('No se encontraron medicos con estos filtros');
      }
    }

    if (city === '' && speciality !== '' ) {
      const filter = arrayMedics.filter((item) => item.speciality === speciality);
      if (filter.length > 0){
        setArrayMedics(filter);
      }else{
        allMedics();
        presentToast('No se encontraron medicos con estos filtros');
      }

    }

  }

  const showCalendar = (day1:any,day2:any) => {
    setShowDateAvailable(true);
  }

  const cardMedics = (item:any) => {
        console.log(item)
    return (

      <View>
        <TouchableOpacity onPress={()=>{showCalendar(item.dayService,item.dayService2);setIdMedic(item.id_medic)}}>
          <Card style={{width: 170, height: 250, marginTop: 20, marginBottom: 90, marginHorizontal: 20, backgroundColor: '#fff'}}>
            <Card.Content>
              <Avatar.Image source={Images.doctor} size={100} style={{
                  alignSelf: 'center',
                  height: 100,
              }}/>
              <Text style={{fontSize: 18, textAlign: 'center', marginTop: 25}}>{item.fullName}</Text>
              <Text style={{fontSize: 16, color: '#0E54BE',textAlign: 'center', marginTop: 5}}>{item.speciality}</Text>
              <Text style={{fontSize: 16, color: '#0E54BE',textAlign: 'center', marginTop: 5}}>{item.city}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>

    );
}

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#E6F1FF'}}>
      <View style={{...styles.container, flex: 1}}>

        
        <View style={{width: '100%', marginHorizontal: 40, alignSelf: 'center', marginTop: 70, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{width: '15%'}}>
            {
              !selectMedic && (
                <TouchableOpacity onPress={()=>{navigation.pop()}}
                style={{marginLeft: 25}}>
                  <Ionicons name='chevron-back' size={40} color={"#000"}/>
                </TouchableOpacity>
              )
            }
            {
              selectMedic && (
                <TouchableOpacity onPress={()=>{setSelectMedic(false)}}
                style={{marginLeft: 25}}>
                  <Ionicons name='chevron-back' size={40} color={"#000"}/>
                </TouchableOpacity>
              )
            }
          </View>
          <View style={{width: '75%'}}>
            <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>
              Completar Formulario
            </Text>
          </View>
          <View style={{width: '15%'}}>
          </View>
        </View>

        {
          !selectMedic && (
            <>
              <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 50, alignItems: 'center'}}>
                <Carousel
                  data={arrayMedics}
                  renderItem={(item) =>cardMedics(item.item)}
                  sliderWidth={350}
                  itemWidth={170}
                  layout={'default'}
                />

                {
                  arrayMedics.length > 0 && (<Text>
                    {arrayMedics.length} Medicos encontrados
                  </Text>
                  )
                }
              </View>

              <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', alignItems: 'center' }}>

                <View style={{width: "80%"}}>
                  <TextInput value={city} onChangeText={setCity} style={{...styles.input,}} />
                  <Ionicons style={{position: 'absolute', right: 30, marginTop: 25}} name="md-arrow-down-sharp" size={24} color="#818181" />
                </View>
                <View style={{width: "80%"}}>
                  <TextInput value={speciality} onChangeText={setSpeciality} style={{...styles.input,}}/>
                  <Ionicons style={{position: 'absolute', right: 30, marginTop: 25}} name="md-search" size={24} color="#818181" />
                </View>
                <TouchableOpacity style={{...styles.button}} onPress={filterMeds}>
                  <Text style={{fontSize: 20, color: "#fff", fontWeight: '500'}}>Buscar</Text>
                </TouchableOpacity>

              </View>
              
              {
                showDateAvailable && (
                  <>
                  
                    <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 50, alignItems: 'center'}}>
                      <Text>Fecha de la consulta</Text>
                      <TouchableOpacity style={{width: "80%"}} onPress={toggleDatepicker}>
                        <TextInput value={dates} style={{...styles.input}} onFocus={handleFocus} onBlur={handleBlur} onChangeText={setDates}/>
                        <Ionicons style={{position: 'absolute', right: 30, marginTop: 25}} name="md-calendar" size={24} color="#818181" />
                        { showPicker && (<DatePicker mode="date" display="calendar" value={date} minimumDate={new Date()} onChange={onChange}/>) }
                      </TouchableOpacity>
                    </View>

                    <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 50, alignItems: 'center'}}>
                      <TouchableOpacity style={{...styles.button}} onPress={nextStep}>
                        <Text style={{fontSize: 20, fontWeight: '500', color: '#fff'}}> Continuar</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )
              }


            </>
          )
        }

        {
          selectMedic && (
            <>
              <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 50, alignItems: 'center'}}>
                <Text style={{fontSize: 17, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
                  Razón por la cual acude a la consulta
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={6}
                  maxLength={240}
                  style={{padding: 10, backgroundColor: 'white', borderRadius: 10, width: '90%', borderWidth: 1, marginHorizontal: 10, marginVertical: 5, textAlignVertical: 'top',height: 150, borderColor: validReason ? 'red' : '#0E54BE'}}
                  value={reason}
                  onChangeText={setReason}
                />
              </View>
        
              <View style={{flexDirection: 'row'}}>
        
                <View style={{alignContent: 'center', marginHorizontal: 10, alignSelf: 'center', marginTop: 10, alignItems: 'center',width: "72%" }}>
                  <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
                    Sintomas
                  </Text>
                  <TextInput style={{...styles.input, borderColor: validSymptom ? 'red': '#0E54BE' }} value={symptoms} onChangeText={setSymptoms}/>
                </View>
                <View style={{alignContent: 'center', alignSelf: 'center', marginTop: 10,width: "20%" }}>
                  <TouchableOpacity style={{...styles.button, marginTop: 30, width: 45, height:45}} onPress={()=>addSymptoms()}>
                    <Ionicons name='add' size={35} color={"#fff"} style={{alignContent: 'center', alignSelf: 'center',}}/>
                  </TouchableOpacity>
                </View>
              </View>
        
              {
                arraySymptoms.length > 0 && (
                  <>
                    <View style={{ marginHorizontal: 25, marginTop: 15}}>
                          <FlatList data={arraySymptoms} 
                          renderItem={({item}) => (
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5,alignSelf: 'center', alignContent: 'center', width: "100%"}}>
                              <View style={{width: "70%"}}>
                                <Text style={{fontSize: 20, marginHorizontal: 15, color: '#737373', fontWeight: 'bold'}}>{item}</Text>
                              </View>
                              <View style={{width: "20%"}}>
                                <TouchableOpacity style={{...styles.button, marginRight: 50, width: 40, height: 40}} onPress={()=>deleteSymptoms(item)}>
                                  <Ionicons size={35} style={{color: "#fff",alignSelf: 'center'}} name='close'/>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )} 
                          keyExtractor={(item, index) => index.toString()}/>
                        </View>
                  </>
                )
              }
        
              <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 40, alignItems: 'center'}}>
                <TouchableOpacity style={{...styles.button, width: '80%', alignSelf: 'center', marginVertical: 20}} onPress={()=>{setIsOpen(true)}}>
                  <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Guardar</Text>
                </TouchableOpacity>
              </View>
        
              {
                isOpen && (
                  <Modal visible={isOpen} animationType="fade" transparent>
                    <View style={styles_modal.modalContainer}>
                      <View style={styles_modal.modalContent}>
                        <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 20, alignItems: 'center'}}>
                          <Text style={{fontSize:17, color:"#000", fontWeight:"500", textAlign: 'center'}}>
                            ¿Esta seguro que la informacion suministrada es la correcta para ser enviada al medico?
                          </Text>
                        </View>
                        <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 20, alignItems: 'center'}}>
                          <Text style={{fontSize: 17, color: "#000", textAlign: 'center'}}>
                            Antes de enviar la informacion, por favor verifique que la informacion suministrada es la correcta.
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: 'space-between', alignContent: 'center' }}>
                          <TouchableOpacity style={{
                            width: "40%",
                            backgroundColor: '#0E54BE',
                            borderRadius: 10,
                            height: 50,
                            marginTop: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 5,
                            }}
                            onPress={()=>{setIsOpen(false)}}>
                            <Text style={{fontSize: 17, color: "#fff", textAlign: 'center', fontWeight: 'bold'}}>
                              Cancelar
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{
                            width: '40%',
                            backgroundColor: '#0E54BE',
                            borderRadius: 10,
                            height: 50,
                            marginTop: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 5,
                            }}
                            onPress={sendDates}
                            >
                            <Text style={{fontSize: 17, color: "#fff", textAlign: 'center', fontWeight: 'bold'}}>
                              Aceptar
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                )
              }
            </>
          )
        }

      </View>
    </ScrollView>

  );

};
