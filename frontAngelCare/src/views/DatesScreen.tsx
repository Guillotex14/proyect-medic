import { Text, TextInput, TouchableOpacity, View, Image, FlatList, Modal} from 'react-native';
import React, { useState } from 'react';
import { styles } from '../theme/ThemeApp';
import { AddIcon, ChevronLeftIcon,  } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { Images } from '../assets/imgs/imgs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { styles_modal } from '../theme/Modal_Profile_Doctor';

interface Props extends StackScreenProps<any, any> {}

export const DatesScreen = ({navigation}:Props) => {

  const [reason, setReason] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [arraySymptoms, setArraySymptoms] = useState<String[]>([]);

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
    setIsOpen(false);
    setTimeout(() => {
      searchDoctor();
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
        alert('Ya existe este sintoma');
      }else{
        setArraySymptoms([...arraySymptoms, symptoms]);
        setSymptoms('');
      }
  
    }
  }

  const deleteSymptoms = (symp: any) => {
    console.log(symp)
    const newArray = arraySymptoms.filter((item) => item !== symp);
    setArraySymptoms(newArray);
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
          <View style={{width: '100%', marginHorizontal: 40, alignSelf: 'center', marginTop: 70, flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{width: '15%'}}>
              <TouchableOpacity onPress={()=>{navigation.pop()}}
              style={{marginLeft: 25}}>
                <Ionicons name='chevron-back' size={40} color={"#000"}/>
              </TouchableOpacity>
            </View>
            <View style={{width: '75%'}}>
              <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold', textAlign: 'center'}}>
                Completar Formulario
              </Text>
            </View>
            <View style={{width: '15%'}}>
            </View>
          </View>

          {/* sintomas*/}
          <View style={{width: '100%', alignContent: 'center', marginHorizontal: 20, alignSelf: 'center', marginTop: 50, alignItems: 'center'}}>
            <Text style={{fontSize: 17, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
              Razón por la cual acude a la consulta
            </Text>
            <TextInput
              editable
              multiline
              numberOfLines={6}
              maxLength={240}
              style={{padding: 10, backgroundColor: 'white', borderRadius: 10, width: '90%', borderColor: 'gray', borderWidth: 1, marginHorizontal: 10, marginVertical: 5}}
              value={reason}
              onChangeText={setReason}
            />
          </View>



            {/* sintoma */}
          <View style={{flexDirection: 'row'}}>

            <View style={{alignContent: 'center', marginHorizontal: 10, alignSelf: 'center', marginTop: 10, alignItems: 'center',width: "72%" }}>
              <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: '300', alignSelf:'flex-start', marginLeft: 20}}>
                Sintomas
              </Text>
              <TextInput style={{...styles.input}} value={symptoms} onChangeText={setSymptoms}/>
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

          {/* <Modal isOpen={isOpen} onClose={!isOpen}>
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
          </Modal> */}
        </View>
    );

};
