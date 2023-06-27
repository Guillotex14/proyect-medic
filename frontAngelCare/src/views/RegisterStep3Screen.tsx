import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon, FormControl } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { Images } from '../assets/imgs/imgs';
interface Props extends StackScreenProps<any, any>{};
export const RegisterStep3Screen = ({navigation}: Props) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView >
        <View style={{...styles.container}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: top+50}}>
            <View style={{width: '30%', alignItems: 'center'}} >
              <ChevronLeftIcon size="6" onPress={()=> navigation.navigate('RegisterStep2')} />
            </View>
            <View style={
              {width: '60%'}}>
              <Text style={{fontSize: 20, textAlign: 'left', marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>Ficha Medica</Text>
            </View>
          </View>

          <View style={{alignItems: 'center', alignContent: 'center', marginHorizontal: 10, marginTop: top+50}}>

            <FormControl style={{marginVertical: 5}}>
              <FormControl.Label style={{marginLeft: 10}}>Enfermedad</FormControl.Label>
              <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
              <TextInput placeholder="" style={styles.input}/>
            </FormControl>

            <FormControl style={{marginVertical: 5}}>
              <FormControl.Label style={{marginLeft: 10}}>Alergias</FormControl.Label>
              <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
              <TextInput placeholder="" style={styles.input}/>
            </FormControl>

            <FormControl style={{marginVertical: 5}}>
              <FormControl.Label style={{marginLeft: 10}}>Condicion</FormControl.Label>
              <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
              <TextInput placeholder="" style={styles.input}/>
            </FormControl>

            <FormControl style={{marginVertical: 5}}>
              <FormControl.Label style={{marginLeft: 10}}>Adicional</FormControl.Label>
              <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
              <TextInput
            editable
            multiline
            numberOfLines={6}
            maxLength={40}
            style={{padding: 10, backgroundColor: 'white', borderRadius: 10, width: '90%', borderColor: 'gray', borderWidth: 1, marginHorizontal: 10, marginVertical: 5}}
            />
            </FormControl>

          </View>

          <View style={{width: '80%', alignItems: 'center', marginHorizontal: 40, marginTop: top+10, marginBottom: bottom + 30}}>
            <TouchableOpacity style={{...styles.button, width: 270}} onPress={()=>{
              navigation.navigate('RegisterStep4');
            }}>
              <Text style={{color: 'white'}}>Continuar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
