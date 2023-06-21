import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../theme/ThemeApp';
import { AddIcon, ChevronLeftIcon, Modal } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { Images } from '../assets/imgs/imgs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Card, Button } from 'react-native-paper';

interface Props extends StackScreenProps<any, any> {}

export const DatesScreen = ({navigation}:Props) => {

  const [isOpen, setIsOpen ] = useState(false);

  const [isSend, setIsSend ] = useState(false);

  const [isSeach, setIsSeach ] = useState(false);

  const { top, bottom } = useSafeAreaInsets();

  const searchDoctor = () => {
    setIsSeach(true);
    setIsSend(false);
  }

  const sendDates = () => {
    setIsSend(true);
    setIsSeach(false);
    setTimeout(() => {
      searchDoctor();
    }, 2000);
  }

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

  return (
          <View style={{...styles.container, flex: 1}}>

          {/* header */}
          <View style={{width: '100%', marginHorizontal: 40, alignSelf: 'center', marginTop: 70, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
            <View style={{width: 70}}>
              <TouchableOpacity onPress={()=>{ navigation.pop;}}
              style={{marginLeft: 25}}>
                <ChevronLeftIcon size={6} color={'black'} />
              </TouchableOpacity>
            </View>
            <View style={{width: 300}}>
              <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>
                Completar Formulario
              </Text>
            </View>
          </View>

          {/* nombre completo */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 50, alignItems: 'center'}}>
            <Text style={{fontSize: 15, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
              Razón por la cual acude a la consulta
            </Text>
            <TextInput style={{...styles.input}} />
          </View>

            {/* direccion */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 15, marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
              Sintomas
            </Text>
            <TextInput style={{...styles.input}} />
          </View>

          {/* condicion */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 15,marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
              Sintomas
            </Text>
            <TextInput style={{...styles.input}} />
          </View>

          {/* enfermedad */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 15,marginHorizontal: 10, color: 'black', fontWeight: '300',alignSelf:'flex-start', marginLeft: 20}}>
              Sintomas
            </Text>
            <TextInput style={{...styles.input}} />
          </View>

          {/* enfermedad */}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 15,marginHorizontal: 10, color: 'black', fontWeight: '300',alignSelf:'flex-start', marginLeft: 20}}>
              Sintomas
            </Text>
            <TextInput style={{...styles.input}} />
          </View>

          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginVertical: 40, alignItems: 'center'}}>
            <TouchableOpacity style={{...styles.button, width: '80%', alignSelf: 'center', marginVertical: 20}} onPress={sendDates}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>Guardar</Text>
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

                <TouchableOpacity style={{...styles.button, width: '80%', alignSelf: 'center', marginVertical: 20}} onPress={()=>{setIsOpen(false);}}>
                  <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>Aceptar</Text>
                </TouchableOpacity>
              </View>

            </Modal.Content>
          </Modal>
        </View>
    );

};
