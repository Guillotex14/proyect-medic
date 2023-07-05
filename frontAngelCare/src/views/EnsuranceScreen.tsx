import { Text, TextInput, TouchableOpacity, View,ScrollView, SafeAreaView, Image, Platform, Modal, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../theme/ThemeApp';
import { ChevronLeftIcon, Select, Radio, Stack, useToast, AddIcon, CloseIcon } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { Images } from '../assets/imgs/imgs';
import { Card } from 'react-native-paper';
import { TypeDni } from '../interfaces/registerModels';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import DatePicker from '@react-native-community/datetimepicker';
import { styles_modal } from '../theme/Modal_Profile_Doctor';

interface Props extends StackScreenProps<any, any>{};

export const EnsuranceScreen = ({navigation}:Props) => {

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

  const { top, bottom } = useSafeAreaInsets();
  const toast = useToast();

  const [isSend, setIsSend] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTypeDNI, setShowTypeDNI] = useState(false);
  const [validDate1, setValidDate1] = useState(false);
  const [validDate2, setValidDate2] = useState(false);
  const [validTypeDni, setValidTypeDni] = useState(false);
  const [validDni, setValidDni] = useState(false);
  const [validaFullname, setValidFullname] = useState(false);
  const [validWeight, setValidWeight] = useState(false);
  const [validHeight, setValidHeight] = useState(false);
  const [validGender, setValidGender] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [validCondition, setValidCondition] = useState(false);
  const [validReason, setValidReason] = useState(false);
  const [validTypeDate, setValidTypeDate] = useState(false);

  const [fullname, setFullname] = useState('');
  const [typeDni, setTypeDni] = useState('');
  const [dni, setDni] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [condition, setCondition] = useState('');
  const [pickerDate, setPickerDate] = useState(new Date());
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [reason, setReason] = useState('');
  const [typeDate, setTypeDate] = useState('');
  const [disease, setDisease] = useState('');
  const [arrayDisease, setArrayDisease] = useState<string[]>([]);

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const toggleDatepicker2 = () => {
    setShowPicker(!showPicker);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowPicker(true);
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
    setShowPicker2(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setPickerDate(new Date());
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
    setPickerDate(new Date());
  };

  const onChange1 = (event: any, selectedDate?: Date | undefined) => {
    setShowPicker(false);
    if (event.type === "set" && selectedDate){
    const currentDate = moment(selectedDate).toDate();
    setPickerDate(currentDate);

        if (Platform.OS === 'android') {
            toggleDatepicker();
            setDate1(moment(currentDate).format('DD/MM/YYYY'));
        }

    } else {

    toggleDatepicker();

    }
  };

  const onChange2 = (event: any, selectedDate?: Date | undefined) => {
    setShowPicker2(false);
    if (event.type === "set" && selectedDate){
      const currentDate = moment(selectedDate).toDate();
      setPickerDate(currentDate);
    
      if (Platform.OS === 'android') {
        toggleDatepicker2();
        setDate2(moment(currentDate).format('DD/MM/YYYY'));
      }
    }else{
      toggleDatepicker2();
    }
  };

  const onPressModal = (typedni:string) => {
    setTypeDni(typedni)
    setShowTypeDNI(!showTypeDNI);
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

  if (isSend) {

    return (
      <View style={{...styles.container, alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
        <Card style={{width: '90%', alignItems: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor: 'white'}}>

          <Card.Content>

          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 20, alignItems: 'center'}}>
            <Image source={Images.thumbUp} style={{width: 150, height: 150}}/>
            <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold', alignSelf: 'center', marginVertical: 10}}>¡Gracias!</Text>
            <Text style={{fontSize: 10, color: 'black', fontWeight: '300', alignSelf: 'center', marginVertical: 10}}>Tu formulario se a enviado
            </Text>
            <Text style={{fontSize: 10, color: 'black', fontWeight: '300', alignSelf: 'center', marginVertical: 20, textAlign: 'center'}}>Tomara unos minutos revisar su solicitud, en caso de ser aprobada le llegará un mensaje al chat.
            </Text>

            <TouchableOpacity style={{...styles.button, width: '80%', alignSelf: 'center', marginVertical: 20}} onPress={()=>{navigation.pop()}}>
              <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>Aceptar</Text>
            </TouchableOpacity>
          </View>

          </Card.Content>

        </Card>
      </View>
    );

  }

  return (
    // <SafeAreaView>
    //   <ScrollView>
    //     <View style={{...styles.container}}>

    //       {/* header */}
    //       <View style={{width: '100%', marginHorizontal: 40, alignSelf: 'center', marginTop: 50, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
    //         <View style={{width: 70}}>
    //           <TouchableOpacity onPress={()=>{ navigation.pop}}
    //           style={{marginLeft: 18}}>
    //             <ChevronLeftIcon size={6} color={'black'} />
    //           </TouchableOpacity>
    //         </View>
    //         <View style={{width: 300}}>
    //           <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
    //             Completar Formulario
    //           </Text>
    //         </View>
    //       </View>

    //       {/* nombre completo */}
    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
    //         <Text style={{fontSize: 11, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
    //           Nombre Completo
    //         </Text>
    //         <TextInput style={{...styles.input}} />
    //       </View>

    //         {/* cedula */}
    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center' }}>
    //         <View>
    //           <Text style={{fontSize: 11, marginHorizontal: 10, color: 'black', fontWeight: '300', marginLeft: 35}}>
    //             Cedula
    //           </Text>
    //           <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
    //             <View style={{width: '20%', backgroundColor: 'white', marginLeft: 35, marginTop: 10}}>
    //               <Select >
    //                 <Select.Item label="V" value="1" />
    //                 <Select.Item label="E" value="2" />
    //               </Select>
    //             </View>
    //             <View style={{width: '80%'}}>
    //               <TextInput style={{...styles.input, width: '83%'}} />
    //             </View>
    //           </View>
    //         </View>
    //       </View>

    //       {/* genero */}
    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 50, alignSelf: 'center', marginTop: 10, alignItems: 'center' }}>
    //         <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a choice">
    //           <Stack space={2} direction="row" my={2} alignItems="center">
    //             <Radio value="1" colorScheme="blue" size="sm" my={1}>
    //               <Text style={{fontSize: 11, textAlign: 'left',  color: 'black', fontWeight: '300'}}>
    //                 Masculino
    //               </Text>
    //             </Radio>
    //             <Radio value="2" colorScheme="blue" size="sm" my={1}>
    //               <Text style={{fontSize: 11, textAlign: 'left', color: 'black', fontWeight: '300'}}>
    //                 Femenino
    //               </Text>
    //             </Radio>
    //             <Radio value="3" colorScheme="blue" size="sm" my={1}>
    //               <Text style={{fontSize: 11, textAlign: 'left',color: 'black', fontWeight: '300'}}>
    //                 Otro
    //               </Text>
    //             </Radio>
    //           </Stack>
    //         </Radio.Group>
    //       </View>

    //       {/* Peso y altura */}
    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
    //         <Text style={{fontSize: 11, marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
    //           Nombre Completo
    //         </Text>
    //         <TextInput style={{...styles.input}} />
    //       </View>

    //         {/* direccion */}
    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
    //         <Text style={{fontSize: 11, marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
    //           Dirección
    //         </Text>
    //         <TextInput style={{...styles.input}} />
    //       </View>
    //       {/* condicion */}
    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
    //         <Text style={{fontSize: 11,marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
    //           Condición
    //         </Text>
    //         <TextInput style={{...styles.input}} />
    //       </View>
    //       {/* enfermedad */}
    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
    //         <Text style={{fontSize: 11,marginHorizontal: 10, color: 'black', fontWeight: '300',alignSelf:'flex-start', marginLeft: 20}}>
    //           Enfermedad
    //         </Text>
    //         <TextInput style={{...styles.input}} />
    //       </View>
    //       {/* Radios */}
    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 50, alignSelf: 'center', marginTop: 10, alignItems: 'center' }}>
    //         <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a choice">
    //           <Stack space={2} direction="row" my={2} alignItems="center">
    //             <Radio value="1" colorScheme="blue" size="sm" my={1}>
    //               <Text style={{fontSize: 11, textAlign: 'left',  color: 'black', fontWeight: '300'}}>
    //               Internarte
    //               </Text>
    //             </Radio>
    //             <Radio value="2" colorScheme="blue" size="sm" my={1}>
    //               <Text style={{fontSize: 11, textAlign: 'left', color: 'black', fontWeight: '300'}}>
    //               Examenes
    //               </Text>
    //             </Radio>
    //             <Radio value="3" colorScheme="blue" size="sm" my={1}>
    //               <Text style={{fontSize: 11, textAlign: 'left',color: 'black', fontWeight: '300'}}>
    //                 Operación
    //               </Text>
    //             </Radio>
    //           </Stack>
    //         </Radio.Group>
    //       </View>
    //       {/* fechas tentativas*/}
    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
    //         <Text style={{fontSize: 11,marginHorizontal: 10, color: 'black', fontWeight: '300',alignSelf:'flex-start', marginLeft: 20}}>
    //           Fecha de tentativa
    //         </Text>
    //         <View style={{flexDirection: 'row'}}>
    //           <View style={{width: '50%'}}>
    //             <TextInput style={{...styles.input}} />
    //           </View>
    //           <View style={{width: '50%'}}>
    //             <TextInput style={{...styles.input}} />
    //           </View>
    //       </View>
    //     </View>

    //     {/* Diagnóstico detallado del paciente (Alergias o algo importante) */}

    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 20, alignItems: 'center'}}>
    //         <Text style={{fontSize: 8,marginHorizontal: 10, color: 'black', fontWeight: '300',alignSelf:'flex-start', marginLeft: 20}}>
    //           Diagnóstico detallado del paciente (Alergias o algo importante)
    //         </Text>
    //         <TextInput style={{ 
    //           width: '90%',
    //           backgroundColor: '#fff',
    //           borderWidth: 1,
    //           borderColor: '#B3B8C9',
    //           borderRadius: 12,
    //           marginHorizontal: 10,
    //         }}
    //         multiline={true}
    //         numberOfLines={6}
    //         />
    //       </View>

    //       <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 20, alignItems: 'center'}}>
    //         <TouchableOpacity style={{...styles.button, width: '80%', alignSelf: 'center', marginVertical: 20}} onPress={()=>{setIsSend(true)}}>
    //           <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>Guardar</Text>
    //         </TouchableOpacity>
    //       </View>
          
    //     </View>

    //   </ScrollView>
    // </SafeAreaView>

<SafeAreaView>
<ScrollView>
  <View style={{...styles.container}}>

    {/* header */}
    <View style={{width: '100%', marginHorizontal: 40, alignSelf: 'center', marginTop: 50, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
      <View style={{width: '20%'}}>
        <TouchableOpacity onPress={()=>{ navigation.pop()}}
        style={{marginLeft: 18}}>
          <ChevronLeftIcon size={6} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={{width: '75%'}}>
        <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
          Completar Formulario
        </Text>
      </View>
    </View>

    {/* nombre completo */}
    <View style={{width: '100%', alignContent: 'center', marginTop: top + 80, alignSelf: 'center',alignItems: 'center'}}>
      <Text style={{color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20, borderColor: validaFullname ? "red" : "#aaaaaa"}}>
        Nombre Completo
      </Text>
      <TextInput style={{...styles.input, borderColor: validaFullname ? "red": "#aaaaaa"}} value={fullname} onChangeText={setFullname}/>
    </View>

    {/* cedula */}
    <View style={{ width: '100%',}}>

      <View style={{ marginLeft: 20, marginTop: top+20 }}>
        <Text>Cedula</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        <View style={{ ...styles.input ,width: '25%', backgroundColor: 'white', borderColor: '#B3B8C9', borderRadius: 12, marginTop: 15, marginLeft: 20 }}>
          <TouchableOpacity onPress={() => setShowTypeDNI(true)}>
            <TextInput value={typeDni} editable={false} style={{width: 80, height: 50, marginLeft: 20, textAlign: 'left', color: '#000', borderColor: validTypeDni ? 'red' : '#aaaaaa'}}/>
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
          <TextInput placeholder="" style={{ ...styles.input, width: 230,borderColor: validDni ? 'red' : '#aaaaaa' }} value={dni} onChangeText={setDni}/>
        </View>
      </View>

    </View>

    {/* genero */}
    <View style={{ width: '95%', alignSelf: 'center', }}>
      <Text style={{ color: '#000', fontSize: 13, marginTop: top+20, marginBottom: 10, marginLeft: 15 }}>Genero</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignContent: "center", alignItems: "center", alignSelf: "center" }}>
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

    {/* Peso y altura */}
    <View style={{width: '93%', justifyContent: 'space-between', marginHorizontal: 20, alignSelf: 'center', marginTop: top+10, alignItems: 'center', alignContent: "center",flexDirection: 'row'}}>

      <View style={{width: '50%', marginTop: top+20}}>
        <Text style={{alignSelf: 'flex-start', marginLeft: 15}}>Peso</Text>
        <TextInput style={{...styles.input, borderColor: validWeight ? "red" : "#aaaaaa"}} value={weight} onChangeText={setWeight}></TextInput>
      </View>

      <View style={{width: '50%',marginTop: top+20}}>
        <Text style={{alignSelf: 'flex-start', marginLeft: 15}}>Altura</Text>
        <TextInput style={{...styles.input, borderColor: validHeight ? "red" : "#aaaaaa"}} value={height} onChangeText={setHeight}></TextInput>
      </View>
    </View>

    {/* direccion */}
    <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: top+20, alignItems: 'center'}}>
      <Text style={{marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20, marginTop: top+20,}}>
        Dirección
      </Text>
      <TextInput style={{...styles.input, borderColor: validAddress ? "red" : "#aaaaaa"}} value={address} onChangeText={setAddress}/>
    </View>

    {/* condicion */}
    <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: top+20, alignItems: 'center'}}>
      <Text style={{marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20,marginTop: top+20,}}>
        Condición
      </Text>
      <TextInput style={{...styles.input,borderColor: validCondition ? "red" : "#aaaaaa"}} value={condition} onChangeText={setCondition}/>
    </View>

    {/* enfermedad */}
    <View style={{ marginHorizontal: 10, marginTop: top+10}}>
      <Text style={{fontSize: 14, marginHorizontal: 15,marginTop: top+20,}}>Enfermedades</Text>
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

    {/* Radios */}

    <View style={{ width: '95%', alignSelf: 'center', marginTop: top+10 }}>
      {/* <Text style={{ color: '#000', fontSize: 13, marginHorizontal: 15, marginBottom: 10 }}>Genero</Text> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignContent: "center", alignItems: "center", alignSelf: "center",marginTop: top+20 }}>
        <Radio.Group name="Genero" defaultValue="1" size={10} onChange={valueSelected =>{ 
          setGender(valueSelected);
        }} value={typeDate}>
          <Stack direction={{ base: 'row', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}
            space={7} w="85%" maxW="300px">
            <Radio value="internar" colorScheme="blue" size="sm" my={1}>
              Internar
            </Radio>
            <Radio value="examenes" colorScheme="blue" size="sm" my={1}>
              Examenes
            </Radio>
            <Radio value="operacion" colorScheme="blue" size="sm" my={1}>
              Operación
            </Radio>
          </Stack>
        </Radio.Group>
      </View>
    </View>

    {/* fechas tentativas*/}
    <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: top+10, alignItems: 'center'}}>
      <Text style={{marginLeft: 25, color: 'black', fontWeight: '300',marginTop: top+20,alignSelf:'flex-start'}}>
        Fecha de tentativa
      </Text>
      <View style={{width: '93%', justifyContent: 'space-between', marginHorizontal: 20, alignSelf: 'center',  alignItems: 'center', alignContent: "center",flexDirection: 'row'}}>
        <View style={{width: '50%'}}>
          <Pressable onPress={toggleDatepicker}>
          <TextInput placeholder="" style={{...styles.input, borderColor: validDate1 ? 'red' : '#aaaaaa', width: 150}} value={date1} onChangeText={setDate1} onFocus={handleFocus} onBlur={handleBlur}/>
          </Pressable>
          {showPicker && isFocused && (<DatePicker mode="date" display="calendar" value={pickerDate} onChange={onChange1}/>)}
        </View>

        <View style={{width: '50%'}}>
          <Pressable onPress={toggleDatepicker2}>
          <TextInput placeholder="" style={{...styles.input, borderColor: validDate2 ? 'red' : '#aaaaaa', width: 155}} value={date2} onChangeText={setDate2} onFocus={handleFocus2} onBlur={handleBlur2}/>
          </Pressable>
          {showPicker2 && isFocused2 && (<DatePicker mode="date" display="calendar" value={pickerDate} onChange={onChange2}/>)}
        </View>
      </View>
    </View>

  {/* Diagnóstico detallado del paciente (Alergias o algo importante) */}

    <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center',marginTop: top+20, alignItems: 'center'}}>
      <Text style={{marginHorizontal: 10, color: 'black', fontWeight: '300',alignSelf:'flex-start', marginLeft: 20}}>
        Diagnóstico detallado del paciente (Alergias o algo importante)
      </Text>
      <TextInput style={{ 
        width: '90%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 12,
        marginHorizontal: 10,
        borderColor: validReason ? "red" : "#B3B8C9"
      }}
      multiline={true}
      numberOfLines={6}
      value={reason}
      onChangeText={setReason}
      />
    </View>

    <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 20, alignItems: 'center'}}>
      <TouchableOpacity style={{...styles.button, width: '80%', alignSelf: 'center', marginVertical: 20}} onPress={()=>{setIsSend(true)}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Guardar</Text>
      </TouchableOpacity>
    </View>

  </View>

</ScrollView>
</SafeAreaView>
  );
};
