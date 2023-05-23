import { Text, TextInput, TouchableOpacity, View,ScrollView, SafeAreaView, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../theme/ThemeApp';
import { ChevronLeftIcon, Select, Radio, Stack, Modal } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { Images } from '../assets/imgs/imgs';

interface Props extends StackScreenProps<any, any> {}

export const ClinicScreen = ({navigation}: Props) => {

  const [isOpen, setIsOpen] = useState(false)

  return (

    <SafeAreaView>
      <ScrollView>
        <View style={{...styles.container}}>

          {/* header */}
          <View style={{width: '100%', marginHorizontal: 40, alignSelf: 'center', marginTop: 50, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
            <View style={{width: 70}}>
              <TouchableOpacity onPress={()=>{ navigation.pop}}
              style={{marginLeft: 18}}>
                <ChevronLeftIcon size={6} color={'black'} />
              </TouchableOpacity>
            </View>
            <View style={{width: 300}}>
              <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                Completar Formulario
              </Text>
            </View>
          </View>

          {/* nombre completo */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 11, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
              Nombre Completo
            </Text>
            <TextInput style={{...styles.input}} />
          </View>

            {/* cedula */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center' }}>
            <View>
              <Text style={{fontSize: 11, marginHorizontal: 10, color: 'black', fontWeight: '300', marginLeft: 35}}>
                Cedula
              </Text>
              <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                <View style={{width: '20%', backgroundColor: 'white', marginLeft: 35, marginTop: 10}}>
                  <Select >
                    <Select.Item label="V" value="1" />
                    <Select.Item label="E" value="2" />
                  </Select>
                </View>
                <View style={{width: '80%'}}>
                  <TextInput style={{...styles.input, width: '83%'}} />
                </View>
              </View>
            </View>
          </View>

          {/* genero */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 50, alignSelf: 'center', marginTop: 10, alignItems: 'center' }}>
            <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a choice">
              <Stack space={2} direction="row" my={2} alignItems="center">
                <Radio value="1" colorScheme="blue" size="sm" my={1}>
                  <Text style={{fontSize: 11, textAlign: 'left',  color: 'black', fontWeight: '300'}}>
                    Masculino
                  </Text>
                </Radio>
                <Radio value="2" colorScheme="blue" size="sm" my={1}>
                  <Text style={{fontSize: 11, textAlign: 'left', color: 'black', fontWeight: '300'}}>
                    Femenino
                  </Text>
                </Radio>
                <Radio value="3" colorScheme="blue" size="sm" my={1}>
                  <Text style={{fontSize: 11, textAlign: 'left',color: 'black', fontWeight: '300'}}>
                    Otro
                  </Text>
                </Radio>
              </Stack>
            </Radio.Group>
          </View>

          {/* Peso y altura */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 11, marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
              Nombre Completo
            </Text>
            <TextInput style={{...styles.input}} />
          </View>

            {/* direccion */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 11, marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
              Dirección
            </Text>
            <TextInput style={{...styles.input}} />
          </View>
          {/* condicion */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 11,marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
              Condición
            </Text>
            <TextInput style={{...styles.input}} />
          </View>
          {/* enfermedad */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 11,marginHorizontal: 10, color: 'black', fontWeight: '300',alignSelf:'flex-start', marginLeft: 20}}>
              Enfermedad
            </Text>
            <TextInput style={{...styles.input}} />
          </View>
          {/* Radios */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 50, alignSelf: 'center', marginTop: 10, alignItems: 'center' }}>
            <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a choice">
              <Stack space={2} direction="row" my={2} alignItems="center">
                <Radio value="1" colorScheme="blue" size="sm" my={1}>
                  <Text style={{fontSize: 11, textAlign: 'left',  color: 'black', fontWeight: '300'}}>
                  Internarte
                  </Text>
                </Radio>
                <Radio value="2" colorScheme="blue" size="sm" my={1}>
                  <Text style={{fontSize: 11, textAlign: 'left', color: 'black', fontWeight: '300'}}>
                  Examenes
                  </Text>
                </Radio>
                <Radio value="3" colorScheme="blue" size="sm" my={1}>
                  <Text style={{fontSize: 11, textAlign: 'left',color: 'black', fontWeight: '300'}}>
                    Operación
                  </Text>
                </Radio>
              </Stack>
            </Radio.Group>
          </View>
          {/* fechas tentativas*/}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 11,marginHorizontal: 10, color: 'black', fontWeight: '300',alignSelf:'flex-start', marginLeft: 20}}>
              Fecha de tentativa
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <TextInput style={{...styles.input}} />
              </View>
              <View style={{width: '50%'}}>
                <TextInput style={{...styles.input}} />
              </View>
          </View>
        </View>

        {/* Diagnóstico detallado del paciente (Alergias o algo importante) */}

          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 20, alignItems: 'center'}}>
            <Text style={{fontSize: 8,marginHorizontal: 10, color: 'black', fontWeight: '300',alignSelf:'flex-start', marginLeft: 20}}>
              Diagnóstico detallado del paciente (Alergias o algo importante)
            </Text>
            <TextInput style={{ 
              width: '90%',
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#B3B8C9',
              borderRadius: 12,
              marginHorizontal: 10,
            }}
            multiline={true}
            numberOfLines={6}
            />
          </View>

          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 20, alignItems: 'center'}}>
            <TouchableOpacity style={{...styles.button, width: '80%', alignSelf: 'center', marginVertical: 20}} onPress={()=>{setIsOpen(true)}}>
              <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>Guardar</Text>
            </TouchableOpacity>
          </View>

          <Modal isOpen={isOpen} onClose={!isOpen}>
            <Modal.Content width="350">
              <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 20, alignItems: 'center'}}>
                <Image source={Images.thumbUp} style={{width: 150, height: 150}}/>
                <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold', alignSelf: 'center', marginVertical: 10}}>¡Gracias!</Text>
                <Text style={{fontSize: 10, color: 'black', fontWeight: '300', alignSelf: 'center', marginVertical: 10}}>Tu formulario se a enviado
                </Text>
                <Text style={{fontSize: 10, color: 'black', fontWeight: '300', alignSelf: 'center', marginVertical: 20, textAlign: 'center'}}>Tomara unos minutos revisar su solicitud, en caso de ser aprobada le llegará un mensaje al chat.
                </Text>

                <TouchableOpacity style={{...styles.button, width: '80%', alignSelf: 'center', marginVertical: 20}} onPress={()=>{setIsOpen(false)}}>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </Modal.Content>
          </Modal>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
