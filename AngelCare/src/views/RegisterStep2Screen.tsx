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
        <View style={{width: '20%', alignItems: 'center'}} >
          <ChevronLeftIcon size="6" onPress={()=> navigation.navigate('Register')} />
        </View>
        <View style={
          {width: '70%'}}>
          <Text style={{fontSize: 18, textAlign: 'left', color: 'black', fontWeight: 'bold'}}>Datos Personales</Text>
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

          <View style={{width: '20%', backgroundColor: 'white', borderColor: '#B3B8C9', borderRadius: 12, marginTop: 15, marginLeft: 20}}>
            <Select>
              <Select.Item label="V" value="V" />
              <Select.Item label="E" value="E" />
              <Select.Item label="P" value="P" />
            </Select>
          </View>

          <View style={{width: '70%'}}>
              <TextInput placeholder="" style={{...styles.input, width: 230}}/>

          </View>
        </View>

      </View>

      <View style={{width: '100%', marginTop: 20}}>
        <Text style={{marginLeft: 20}}> Fecha de nacimiento</Text>
        <TextInput placeholder="Fecha de Nacimiento" style={{...styles.input, marginLeft:15}}/>
      </View>

      <View style={{width: '100%', marginTop: 20}}>
        <Text style={{marginLeft:20}}> Direccion</Text>
        <TextInput placeholder="Direccion" style={{...styles.input,marginLeft:15}}/>
      </View>

      <View style={{width: '100%', marginTop: 20}}>
        <Text style={{marginLeft:20}}> Numero Telefonico</Text>
        <TextInput placeholder="Numero Telefonico" style={{...styles.input,marginLeft:15}}/>
      </View>

      <TouchableOpacity style={{...styles.button, marginTop: 40, marginHorizontal: 40}} onPress={()=> navigation.navigate('RegisterStep3')}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Continuar</Text>
      </TouchableOpacity>
    </View>

  );
};
