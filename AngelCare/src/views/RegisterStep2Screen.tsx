import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { ChevronLeftIcon, FormControl, Input, Select } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

// eslint-disable-next-line no-extra-semi
interface Props extends StackScreenProps<any, any>{};

export const RegisterStep2Screen = ({navigation}:Props) => {

  const { top } = useSafeAreaInsets();

  return (

    <View style={{...styles.container}}>
      <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', marginTop: top+50}}>
        <View style={{width: '30%', alignItems: 'center'}} >
          <ChevronLeftIcon size="6" onPress={()=> navigation.navigate('Register')} />
        </View>
        <View style={
          // eslint-disable-next-line no-trailing-spaces
          {width: '60%'}}>
          <Text style={{fontSize: 25, textAlign: 'left', marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>Datos Personales</Text>
        </View>
      </View>

      <View style={{width: '80%', alignItems: 'center', alignContent: 'center', marginHorizontal: 40}}>
        <Text>Nombre completo</Text>
        {/* <FormControl >
          <FormControl.Label>Nombre completo</FormControl.Label> */}
          <TextInput placeholder="Nombre completo" style={styles.input}/>
          {/* <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage> */}
        {/* </FormControl> */}
      </View>

      <View style={{width: '80%', alignItems: 'center', marginHorizontal: 40, flexDirection: 'row'}}>
        <View style={{width: '20%', backgroundColor: 'white', borderWidth: 1, borderColor: '#B3B8C9', borderRadius: 12, marginTop: 30, marginHorizontal: 10}}>
          <Select>
            <Select.Item label="V" value="V" />
            <Select.Item label="E" value="E" />
            <Select.Item label="P" value="P" />
          </Select>
        </View>

        <View style={{width: '70%'}}>
          <Text>Cedula</Text>
            <TextInput placeholder="" style={styles.input}/>

        </View>

      </View>

      <View style={{width: '80%', marginTop: 20, marginHorizontal: 40}}>
        <Text> Fecha de nacimiento</Text>
        <TextInput placeholder="Fecha de Nacimiento" style={{...styles.input}}/>
      </View>
      <View style={{width: '80%', marginTop: 20, marginHorizontal: 40}}>
        <Text> Direccion</Text>
        <TextInput placeholder="Direccion" style={{...styles.input}}/>
      </View>

      <View style={{width: '80%', marginTop: 20, marginHorizontal: 40}}>
        <Text> Numero Telefonico</Text>
        <TextInput placeholder="Numero Telefonico" style={{...styles.input}}/>
      </View>

      <TouchableOpacity style={{...styles.button, marginTop: 20, marginHorizontal: 40}} onPress={()=> navigation.navigate('RegisterStep3')}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Continuar</Text>
      </TouchableOpacity>
    </View>

  );
};
