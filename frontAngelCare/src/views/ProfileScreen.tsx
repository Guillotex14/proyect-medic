import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Platform, Pressable } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Actionsheet, ChevronLeftIcon, Icon, Radio, Stack, useDisclose } from 'native-base';
import { Images } from '../assets/imgs/imgs';
import { Avatar } from 'react-native-paper';
import DatePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';
// import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<any, any>{}

export const ProfileScreen = ({navigation}: Props) => {

    const [date, setDate] = useState(new Date());

    const [showPicker, setShowPicker] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState("");

    const [isFocused, setIsFocused] = useState(false);

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

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setShowPicker(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const onChange = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker();
                setDateOfBirth(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker();

        }
    };

    return (
        <ScrollView>
            <View style={{...styles.container, backgroundColor: '#0E54BE'}}>

                {/* Header */}
                <View style={{ flexDirection: 'row', height: 150,  alignItems: 'center', alignSelf: 'center', marginTop: -30}}>
                    <View style={{width: '20%', alignItems: 'center'}} >
                        <ChevronLeftIcon onPress={()=>{navigation.navigate('Home')}} color="white" size="lg" style={{alignSelf: 'center', marginTop: 15}}/>
                    </View>
                    <View style={{width: '70%'}}>
                        <Text style={{...styles.title, color: 'white', fontSize: 15, width: '60%', marginLeft: 10}}>Perfil</Text>
                    </View>

                </View>

                {/* Card Fecha */}
                <View style={{borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: top+100, alignContent: 'center', alignItems: 'center', width: '95%'}}>
                    <Avatar.Image size={85} source={Images.doctor} style={{backgroundColor: 'white', marginHorizontal: 10}}/>
                </View>

                <View style={{...styles.container, backgroundColor: '#F8F8F8', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 20}}>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 50}}>
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Nombre completo</Text>
                        <TextInput placeholder="Nombre completo" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit} />
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 11, fontWeight: 'bold', marginHorizontal: 15}}>Cedula</Text>
                        <TextInput placeholder="Cedula" style={{...styles.input, backgroundColor: 'white'}} editable={isEdit}/>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Fecha de nacimiento</Text>
                        <Pressable onPress={toggleDatepicker}>
                        <TextInput placeholder="Fecha de nacimiento" style={{...styles.input, backgroundColor: 'white'}} value={dateOfBirth} onChangeText={setDateOfBirth} onFocus={handleFocus} onBlur={handleBlur} editable={isEdit}/>
                        </Pressable>
                        {showPicker && isFocused && (<DatePicker mode="date" display="calendar" value={date} onChange={onChange}/>)}
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
