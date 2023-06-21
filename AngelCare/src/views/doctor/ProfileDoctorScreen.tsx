import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Actionsheet, ChevronLeftIcon, Radio, Stack, useDisclose } from 'native-base';
import { Images } from '../assets/imgs/imgs';

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
                <View style={{ flexDirection: 'row', height: 150,  alignItems: 'center', alignSelf: 'center'}}>
                    <View style={{width: '20%', alignItems: 'center'}} >
                        <ChevronLeftIcon onPress={()=>{navigation.navigate('Home')}}/>
                    </View>
                    <View style={{width: '70%'}}>
                        <Text style={{...styles.title, color: 'white', fontSize: 13, width: '60%'}}>Perfil</Text>
                    </View>
                    {/* 
                    {/* <AddIcon onPress={()=>{navigation.navigate('Profile')}}/> */}
                    {/* <Text style={{...styles.title, color: 'white', fontSize: 13, textAlign:'right', width: '30%'}} onPress={()=>{navigation.navigate('Home')}}>Profile</Text> * */}
                </View>

                {/* Card Fecha */}
                <View style={{backgroundColor: '#DEF2FF', flexDirection: 'row', borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: top+130, alignContent: 'center', alignItems: 'center', width: '95%'}}>
                    <Image source={Images.doctor} style={{width: 50, height: 50, marginHorizontal: 10}}/>
                </View>

                <View style={{...styles.container, backgroundColor: '#F8F8F8', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Nombre completo</Text>
                        <TextInput placeholder="Nombre completo" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit} />
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Cedula</Text>
                        <TextInput placeholder="Cedula" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Fecha de nacimiento</Text>
                        <TextInput placeholder="Fecha de nacimiento" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Dirección</Text>
                        <TextInput placeholder="Dirección" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Correo electronico</Text>
                        <TextInput placeholder="Correo electronico" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Telefono</Text>
                        <TextInput placeholder="Telefono" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Genero</Text>
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
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Póliza de Seguro</Text>
                        <TextInput placeholder="Póliza de Seguro" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Número de póliza</Text>
                        <TextInput placeholder="Número de póliza" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={
                        {
                            marginTop: 35,
                            marginBottom: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '95%',
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
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000', marginBottom: 20, marginLeft: 0}}>Actualizar datos</Text>
                        </View>
                        <View style={{alignContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 10, fontWeight: '300', color: '#000'}}>
                                Confirma para cargar tus datos en la configuración del perfil
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 30}}>
                            <View style={{width: '50%', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                                <TouchableOpacity 
                                style={{ width: '100%',
                                    borderRadius: 12,
                                    height: 50,
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    }}
                                onPress={updateProfile}>
                                    <Text style={{color: 'black', fontWeight: 'bold'}}>Guardar</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: '50%', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                            <TouchableOpacity 
                                style={{ width: '100%',
                                    borderRadius: 12,
                                    height: 50,
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    }}
                                onPress={()=>{console.log('holas')}}>
                                    <Text style={{color: 'black', fontWeight: 'bold'}}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Actionsheet.Content>

                </Actionsheet>
            </View>
        </ScrollView>
    );
};
