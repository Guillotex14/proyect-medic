import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { ChevronLeftIcon, FormControl, Input, Select, Stack } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Radio } from 'native-base';

// eslint-disable-next-line no-extra-semi
interface Props extends StackScreenProps<any, any>{};

export const RegisterMedicStep2Screen = ({navigation}:Props) => {

  const { top } = useSafeAreaInsets();

  //states for radio buttons
  const [isRadio, setIsRadio] = React.useState(false);
  const [isRadio2, setIsRadio2] = React.useState(false);
  const [isRadio3, setIsRadio3] = React.useState(false);

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

  return (

    <View style={{...styles.container}}>
      <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', marginTop: top+50}}>
        <View style={{width: '15%', alignItems: 'center'}} >
          <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
            <ChevronLeftIcon size="6" style={{color: "#000"}}/>
          </TouchableOpacity>
        </View>
        <View style={
          {width: '75%'}}>
          <Text style={{fontSize: 18, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>Datos Personales</Text>
        </View>
      </View>

      <View style={{width: '100%', alignSelf: 'center', marginTop: 15}}>
          <Text style={{marginLeft: 20}}>Nombre completo</Text>
          <TextInput placeholder="Nombre completo" style={{...styles.input, marginLeft:15}}/>
      </View>

      <View style={{width: '100%'}}>

        <View style={{marginLeft: 20, marginTop: 15}}>
          <Text>Cedula</Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>

          <View style={{width: '30%', backgroundColor: 'white', borderColor: '#B3B8C9', borderRadius: 12, marginTop: 15, marginLeft: 20}}>
            <Select 
              style={{height:45, borderColor: '#B3B8C9'}}
              _selectedItem={{
              fontSize: 20,
            }}
            >
              <Select.Item label="V" value="V" />
              <Select.Item label="E" value="E" />
              <Select.Item label="P" value="P" />
            </Select>
          </View>

          <View style={{width: '60%'}}>
              <TextInput placeholder="" style={{...styles.input, width: 230}}/>
          </View>
        </View>

      </View>

      <View style={{width: '100%', marginTop: 20}}>
        <Text style={{marginLeft: 20}}> Fecha de nacimiento</Text>
        <TextInput style={{...styles.input, marginLeft:15}}/>
      </View>

      <View style={{width: '100%', marginTop: 20}}>
        <Text style={{marginLeft: 20}}> Especialidad</Text>
        <TextInput style={{...styles.input, marginLeft:15}}/>
      </View>

      <View style={{width: '100%', marginTop: 20}}>
        <Text style={{marginLeft:20}}> Numero Telefonico</Text>
        <TextInput placeholder="Numero Telefonico" style={{...styles.input,marginLeft:15}}/>
      </View>
      
      <View style={{width: '100%', marginTop: 20}}>
        <Text style={{marginLeft: 20}}> Correo Electronico</Text>
        <TextInput style={{...styles.input, marginLeft:15}}/>
      </View>

      <View style={{width: '100%', marginTop: 20}}>
        <Text style={{marginLeft:20}}> Direccion</Text>
        <TextInput placeholder="Direccion" style={{...styles.input,marginLeft:15}}/>
      </View>

      <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
          <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Genero</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>
              <Radio.Group name="Genero" defaultValue="1" size={10}>
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

      <TouchableOpacity style={{...styles.button, marginTop: 40, marginHorizontal: 40}} onPress={()=> navigation.navigate('RegisterMedicStep3')}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Continuar</Text>
      </TouchableOpacity>
    </View>

  );
};
