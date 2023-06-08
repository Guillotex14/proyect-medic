import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon, FormControl, Radio, ScrollView, Stack } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Images } from '../assets/imgs/imgs';
import DateTimePicker from '@react-native-community/datetimepicker';


interface Props extends StackScreenProps<any, any>{};
export const RegisterMedicStep3Screen = ({navigation}: Props) => {
  const { top, bottom } = useSafeAreaInsets();

  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);


  const showCalendar = () => {
    setDate(new Date(1598051730000));
    setShow(true);
  };


  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView >
        <View style={{...styles.container}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: top+50}}>
            <View style={{width: '20%', alignItems: 'center'}} >
              <TouchableOpacity onPress={()=> navigation.navigate('RegisterMedicStep2')}>
                <ChevronLeftIcon size="6" style={{color: '#000'}}/>
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
              <TextInput placeholder="" style={styles.input}/>
            </FormControl>
          
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
              <View style={{width: '50%', alignItems: 'center'}}>
                <FormControl style={{width: '90%'}}>
                  <FormControl.Label style={{marginLeft: 10}}>Fecha de ingreso</FormControl.Label>
                  <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                  <TextInput placeholder="" style={styles.input}/>
                </FormControl>
              </View>
              <View style={{width: '50%', alignItems: 'center'}}>
                <FormControl style={{width: '90%'}}>
                  <FormControl.Label style={{marginLeft: 10}}>Fecha de Egreso</FormControl.Label>
                  <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                  <TextInput placeholder="" style={styles.input}/>
                </FormControl>
              </View>
            </View>

            <FormControl style={{marginVertical: 5}}>
              <FormControl.Label style={{marginLeft: 10}}>MPPS</FormControl.Label>
              <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
              <TextInput placeholder="" style={styles.input}/>
            </FormControl>

            <View style={{width: '95%', alignSelf: 'center', marginTop: 15}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 15, marginBottom: 10, color: '#677294'
              }}>Post-grado</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>
                    <Radio.Group name="Genero" defaultValue="1" size={10}>
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
              <TextInput placeholder="" style={styles.input}/>
            </FormControl>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
              <View style={{width: '50%', alignItems: 'center'}}>
                <FormControl style={{width: '90%'}}>
                  <FormControl.Label style={{marginLeft: 10}}>Fecha de ingreso</FormControl.Label>
                  <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                  <TextInput placeholder="" style={styles.input}/>
                </FormControl>
              </View>
              <View style={{width: '50%', alignItems: 'center'}}>
                <FormControl style={{width: '90%'}}>
                  <FormControl.Label style={{marginLeft: 10}}>Fecha de Egreso</FormControl.Label>
                  <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                  <TextInput placeholder="" style={styles.input}/>
                </FormControl>
              </View>
            </View>

            <View >
              <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 15, color: '#677294'}}>Dias de Servicio</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
                <View style={{width: '50%', alignItems: 'center'}}>
                  <FormControl style={{width: '90%'}}>
                    <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                    <TextInput placeholder="" style={styles.input}/>
                  </FormControl>
                </View>
                <View style={{width: '50%', alignItems: 'center'}}>
                  <FormControl style={{width: '90%'}}>
                    <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                    <TextInput placeholder="" style={styles.input}/>
                  </FormControl>
                </View>
              </View>
            </View>

            <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
              <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 15, color: '#677294'}}>Adjuntar Archivo</Text>
              
              <Image style={{width: 100, height: 100, alignSelf: 'center', marginVertical: 10}} source={Images.pin_mapa}/>
              
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
            />
            </FormControl>

          </View>

          <View style={{width: '80%', alignItems: 'center', marginHorizontal: 40, marginTop: top+10, marginBottom: bottom + 30}}>
            <TouchableOpacity style={{...styles.button, width: 270}} onPress={()=>{
              navigation.navigate('RegisterMedicStep4');
            }}>
              <Text style={{color: 'white'}}>Continuar</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker mode="date" value={date}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
