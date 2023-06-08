import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Actionsheet, ChevronLeftIcon, FormControl, Icon, Radio, Stack, useDisclose } from 'native-base';
import { Images } from '../assets/imgs/imgs';
import { Avatar } from 'react-native-paper';
// import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<any, any>{}

export const ProfileDoctorScreen = ({navigation}: Props) => {

    const { top } = useSafeAreaInsets();

    const [ isEdit, setIsEdit ] = useState(false);

    const { isOpen, onClose, onOpen } = useDisclose();

    const editProfile = () => {
        setIsEdit(!isEdit);
    }

    const openActionsheet = () => {
        onOpen();
    };

    const updateProfile = () => {
        console.log('holas')
        setIsEdit(!isEdit);
        onClose();
    }

    return (
        <ScrollView>
            <View style={{...styles.container, backgroundColor: '#0E54BE'}}>

                {/* Header */}
                <View style={{ flexDirection: 'row', height: 150,  alignItems: 'center', alignSelf: 'center', marginTop: -30, justifyContent: 'space-between'}}>
                    <View style={{width: 0}} >
                        <TouchableOpacity onPress={()=>{navigation.navigate('HomeMedic')}}>
                            <ChevronLeftIcon color="white" size="lg" style={{alignSelf: 'center', marginTop: 15, marginRight: 40 }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '80%'}}>
                        <Text style={{...styles.title, color: 'white', fontSize: 18, marginLeft: 10}}>Perfil</Text>
                    </View>

                </View>

                {/* Card Fecha */}
                <View style={{borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: top+100, alignContent: 'center', alignItems: 'center', width: '95%'}}>
                    <Avatar.Image size={85} source={Images.doctor} style={{backgroundColor: 'white', marginHorizontal: 10}}/>
                </View>

                <View style={{...styles.container, backgroundColor: '#F8F8F8', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 20}}>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 50}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Nombre completo</Text>
                        <TextInput placeholder="Nombre completo" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit} />
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Cedula</Text>
                        <TextInput placeholder="Cedula" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Fecha de nacimiento</Text>
                        <TextInput placeholder="Fecha de nacimiento" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>
                    
                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>MPPS</Text>
                        <TextInput placeholder="MPPS" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Especialidad</Text>
                        <TextInput placeholder="Especialidad" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Dirección</Text>
                        <TextInput placeholder="Dirección" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Correo electronico</Text>
                        <TextInput placeholder="Correo electronico" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Telefono</Text>
                        <TextInput placeholder="Telefono" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Genero</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>
                            <Radio.Group name="Genero" defaultValue="1">
                                <Stack direction={{ base: 'row', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }} 
                                space={2} w="75%" maxW="300px">
                                    <Radio value="1" colorScheme="blue" size="sm" my={1} isDisabled={!isEdit}>
                                        Masculino
                                    </Radio>
                                    <Radio value="2" colorScheme="blue" size="sm" my={1} isDisabled={!isEdit}>
                                        Femenino
                                    </Radio>
                                    <Radio value="3" colorScheme="blue" size="sm" my={1} isDisabled={!isEdit}>
                                        Otro
                                    </Radio>
                                </Stack>
                            </Radio.Group>
                        </View>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Universidad</Text>
                        <TextInput placeholder="Universidad" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

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

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Post-Grado Universidad</Text>
                        <TextInput placeholder="Número de póliza" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

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

                    <View>
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
                        
                        <Image style={{width: 100, height: 100, alignSelf: 'center', marginVertical: 10}} source={Images.files}/>
                        
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

                    <View style={
                        {
                            marginTop: 35,
                            marginBottom: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                        }}>

                        {
                            !isEdit &&
                                <TouchableOpacity style={{...styles.button, width: 260}}
                                onPress={editProfile}>
                                    <Text style={styles.buttonLoginText}>Editar</Text>
                                </TouchableOpacity>
                                
                        }

                        {
                            isEdit &&
                            <TouchableOpacity style={{...styles.button, width: 260}}
                            onPress={openActionsheet}>
                                <Text style={styles.buttonLoginText}>Guardar</Text>
                            </TouchableOpacity>
                        }

                    </View>
                </View>

                <Actionsheet isOpen={isOpen} onClose={onClose} >
                    <Actionsheet.Content>

                        <View style={{marginTop: 20}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000', marginBottom: 20, marginLeft: 0}}>Actualizar datos</Text>
                        </View>
                        <View style={{alignContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 14, fontWeight: '300', color: '#000'}}>
                                Confirma para cargar tus datos en la configuración del perfil
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 30, alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                            <View style={{width: '50%'}}>
                                <TouchableOpacity 
                                style={{ width: '100%',
                                    borderRadius: 12,
                                    height: 50,
                                    marginTop: 10,
                                    alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                                    marginRight: 40
                                    }}
                                onPress={updateProfile}>
                                    <Text style={{color: 'black', fontWeight: 'bold',alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                                fontSize:20}}>Guardar</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '50%'}}>
                            <TouchableOpacity 
                                style={{ width: '100%',
                                    borderRadius: 12,
                                    height: 50,
                                    marginTop: 10,
                                    alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                                    marginLeft: 40 
                                    }}
                                onPress={()=>{console.log('holas')}}>
                                    <Text style={{color: 'black', fontWeight: 'bold',alignContent: 'center', alignItems: 'center', alignSelf: 'center',
                                fontSize:20}}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Actionsheet.Content>

                </Actionsheet>
            </View>
        </ScrollView>
    );
};
