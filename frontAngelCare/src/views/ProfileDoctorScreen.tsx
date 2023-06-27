import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, Pressable, Platform, Modal, FlatList} from 'react-native';
import { styles } from '../theme/ThemeApp';
import { styles_modal } from '../theme/Modal_Profile_Doctor';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Actionsheet, ChevronLeftIcon, FormControl, Icon, Radio, Stack, useDisclose} from 'native-base';
import { Images } from '../assets/imgs/imgs';
import { Avatar } from 'react-native-paper';
import DatePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

interface Props extends StackScreenProps<any, any>{}

interface Option {
    label: string;
    value: string;
  }

interface Option2 {
    label: string;
    value: string;
}

export const ProfileDoctorScreen = ({navigation}: Props) => {

    const [date1, setDate1] = useState(new Date());

    const [date2, setDate2] = useState(new Date());

    const [date3, setDate3] = useState(new Date());

    const [date4, setDate4] = useState(new Date());

    const [date5, setDate5] = useState(new Date());

    const [showPicker, setShowPicker] = useState(false);

    const [showPicker2, setShowPicker2] = useState(false);

    const [showPicker3, setShowPicker3] = useState(false);

    const [showPicker4, setShowPicker4] = useState(false);

    const [showPicker5, setShowPicker5] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState("");

    const [dateOfBirth2, setDateOfBirth2] = useState("");

    const [dateOfBirth3, setDateOfBirth3] = useState("");

    const [dateOfBirth4, setDateOfBirth4] = useState("");

    const [dateOfBirth5, setDateOfBirth5] = useState("");

    const { top } = useSafeAreaInsets();

    const [ isEdit, setIsEdit ] = useState(false);

    const { isOpen, onClose, onOpen } = useDisclose();

    const [isFocused, setIsFocused] = useState(false);

    const [isFocused2, setIsFocused2] = useState(false);

    const [isFocused3, setIsFocused3] = useState(false);

    const [isFocused4, setIsFocused4] = useState(false);

    const [isFocused5, setIsFocused5] = useState(false);

    const [isSelectActive, setSelectActive] = useState(false);

    const [selectedValue, setSelectedValue] = useState('');

    const [isSelectActive2, setSelectActive2] = useState(false);

    const [selectedValue2, setSelectedValue2] = useState('');

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

    const toggleDatepicker2 = () => {
        setShowPicker2(!showPicker2);
    };

    const toggleDatepicker3 = () => {
        setShowPicker3(!showPicker3);
    };

    const toggleDatepicker4 = () => {
        setShowPicker4(!showPicker4);
    };

    const toggleDatepicker5 = () => {
        setShowPicker5(!showPicker5);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setShowPicker(true);
    };

    const handleFocus2 = () => {
    setIsFocused2(true);
    setShowPicker2(true);
    };

    const handleFocus3 = () => {
    setIsFocused3(true);
    setShowPicker3(true);
    };

    const handleFocus4 = () => {
    setIsFocused4(true);
    setShowPicker4(true);
    };

    const handleFocus5 = () => {
    setIsFocused5(true);
    setShowPicker5(true);
    };

    const handleBlur = () => {
    setIsFocused(false);
    };

    const handleBlur2 = () => {
    setIsFocused2(false);
    };

    const handleBlur3 = () => {
    setIsFocused3(false);
    };

    const handleBlur4 = () => {
    setIsFocused4(false);
    };

    const handleBlur5 = () => {
    setIsFocused5(false);
    };

    const onChange1 = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate1(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker();
                setDateOfBirth(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker();

        }
    };

    const onChange2 = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker2(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate2(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker2();
                setDateOfBirth2(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker2();

        }
    };

    const onChange3 = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker3(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate3(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker3();
                setDateOfBirth3(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker3();

        }
    };

    const onChange4 = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker4(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate4(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker4();
                setDateOfBirth4(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker4();

        }
    };

    const onChange5 = (event: any, selectedDate?: Date | undefined) => {
        setShowPicker5(false);
        if (event.type === "set" && selectedDate){
        const currentDate = Moment(selectedDate).toDate();
        setDate5(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker5();
                setDateOfBirth5(Moment(currentDate).format('DD/MM/YYYY'));
            }

        } else {

        toggleDatepicker5();

        }
    };

    const options: Option[] = [
        { label: 'Lunes', value: 'Lunes' },
        { label: 'Martes', value: 'Martes' },
        { label: 'Miercoles', value: 'Miercoles' },
        { label: 'Jueves', value: 'Jueves' },
        { label: 'Viernes', value: 'Viernes' },
        { label: 'Sabado', value: 'Sabado' },
        { label: 'Domingo', value: 'Domingo' },
    ];

    const options2: Option2[] = [
        { label: 'Lunes', value: 'Lunes' },
        { label: 'Martes', value: 'Martes' },
        { label: 'Miercoles', value: 'Miercoles' },
        { label: 'Jueves', value: 'Jueves' },
        { label: 'Viernes', value: 'Viernes' },
        { label: 'Sabado', value: 'Sabado' },
        { label: 'Domingo', value: 'Domingo' },
    ];

    const handleTextInputPress = () => {
        setSelectActive(true);
    };

    const handleTextInputPress2 = () => {
        setSelectActive2(true);
    };
    
    const handleOptionPress = (value: string) => {
        setSelectedValue(value);
        setSelectActive(false);
    };

    const handleOptionPress2 = (value: string) => {
        setSelectedValue2(value);
        setSelectActive2(false);
    };

    /*const renderOption = ({ item }: { item: Option }) => (
        <TouchableOpacity onPress={() => handleOptionPress(item.value)}>
            <Text>{item.label}</Text>
        </TouchableOpacity>
    );*/

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
                        <TextInput placeholder="Nombre completo" style={{...styles.input, backgroundColor: 'white'}}  />
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Cedula</Text>
                        <TextInput placeholder="Cedula" style={{...styles.input, backgroundColor: 'white'}} />
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Fecha de nacimiento</Text>
                        <Pressable onPress={toggleDatepicker}>
                        <TextInput placeholder="Fecha de nacimiento" style={{...styles.input, backgroundColor: 'white'}} value={dateOfBirth} onChangeText={setDateOfBirth} onFocus={handleFocus} onBlur={handleBlur} />
                        </Pressable>
                        {showPicker && isFocused && (<DatePicker mode="date" display="calendar" value={date1} onChange={onChange1}/>)}
                    </View>
                    
                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>MPPS</Text>
                        <TextInput placeholder="MPPS" style={{...styles.input, backgroundColor: 'white'}} />
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Especialidad</Text>
                        <TextInput placeholder="Especialidad" style={{...styles.input, backgroundColor: 'white'}} />
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Dirección</Text>
                        <TextInput placeholder="Dirección" style={{...styles.input, backgroundColor: 'white'}} />
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Correo electronico</Text>
                        <TextInput placeholder="Correo electronico" style={{...styles.input, backgroundColor: 'white'}} />
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Telefono</Text>
                        <TextInput placeholder="Telefono" style={{...styles.input, backgroundColor: 'white'}} />
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Genero</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>
                            <Radio.Group name="Genero" defaultValue="1">
                                <Stack direction={{ base: 'row', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }} 
                                space={2} w="75%" maxW="300px">
                                    <Radio value="1" colorScheme="blue" size="sm" my={1} >
                                        Masculino
                                    </Radio>
                                    <Radio value="2" colorScheme="blue" size="sm" my={1} >
                                        Femenino
                                    </Radio>
                                    <Radio value="3" colorScheme="blue" size="sm" my={1} >
                                        Otro
                                    </Radio>
                                </Stack>
                            </Radio.Group>
                        </View>
                    </View>

                    <View style={{width: '95%', alignSelf: 'center', marginTop: 30}}>
                        <Text style={{color: '#0E54BE', fontSize: 15, fontWeight: 'bold', marginHorizontal: 15}}>Universidad</Text>
                        <TextInput placeholder="Universidad" style={{...styles.input, backgroundColor: 'white'}} />
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
                        <View style={{width: '50%', alignItems: 'center'}}>
                            <FormControl style={{width: '90%'}}>
                            <FormControl.Label style={{marginLeft: 10}}>Fecha de inicio</FormControl.Label>
                            <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                            <Pressable onPress={toggleDatepicker2}>
                            <TextInput placeholder="" style={styles.input} value={dateOfBirth2} onChangeText={setDateOfBirth2} onFocus={handleFocus2} onBlur={handleBlur2} />
                            </Pressable>
                            {showPicker2 && isFocused2 && (<DatePicker mode="date" display="calendar" value={date2} onChange={onChange2}/>)}
                            </FormControl>
                        </View>
                        <View style={{width: '50%', alignItems: 'center'}}>
                            <FormControl style={{width: '90%'}}>
                            <FormControl.Label style={{marginLeft: 10}}>Fecha de finalización</FormControl.Label>
                            <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                            <Pressable onPress={toggleDatepicker3}>
                            <TextInput placeholder="" style={styles.input} value={dateOfBirth3} onChangeText={setDateOfBirth3} onFocus={handleFocus3} onBlur={handleBlur3} />
                            </Pressable>
                            {showPicker3 && isFocused3 && (<DatePicker mode="date" display="calendar" value={date3} onChange={onChange3}/>)}
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
                        <TextInput placeholder="Universidad Post-Grado" style={{...styles.input, backgroundColor: 'white'}} />
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
                        <View style={{width: '50%', alignItems: 'center'}}>
                            <FormControl style={{width: '90%'}}>
                            <FormControl.Label style={{marginLeft: 10}}>Fecha de inicio</FormControl.Label>
                            <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                            <Pressable onPress={toggleDatepicker4}>
                            <TextInput placeholder="" style={styles.input} value={dateOfBirth4} onChangeText={setDateOfBirth4} onFocus={handleFocus4} onBlur={handleBlur4} />
                            </Pressable>
                            {showPicker4 && isFocused4 && (<DatePicker mode="date" display="calendar" value={date4} onChange={onChange4}/>)}
                            </FormControl>
                        </View>
                        <View style={{width: '50%', alignItems: 'center'}}>
                            <FormControl style={{width: '90%'}}>
                            <FormControl.Label style={{marginLeft: 10}}>Fecha de finalización</FormControl.Label>
                            <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                            <Pressable onPress={toggleDatepicker5}>
                            <TextInput placeholder="" style={styles.input} value={dateOfBirth5} onChangeText={setDateOfBirth5} onFocus={handleFocus5} onBlur={handleBlur5} />
                            </Pressable>
                            {showPicker5 && isFocused5 && (<DatePicker mode="date" display="calendar" value={date5} onChange={onChange5}/>)}
                            </FormControl>
                        </View>
                    </View>

                    <View>
                        <Text style={{fontSize: 15, fontWeight: 'bold', marginHorizontal: 15, color: '#677294'}}>Dias de Servicio</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 5}}>
                            <View style={{width: '50%', alignItems: 'center'}}>
                            <FormControl style={{width: '90%'}}>
                                <FormControl.ErrorMessage>Este campo es obligatorio</FormControl.ErrorMessage>
                                <TouchableOpacity onPress={handleTextInputPress}>
                                <TextInput value={selectedValue} placeholder="Seleccionar día" style={styles.input}/>
                                </TouchableOpacity>
                                <Modal visible={isSelectActive} animationType="fade" transparent>
                                    <View style={styles_modal.modalContainer}>
                                        <View style={styles_modal.modalContent}>
                                            <FlatList style={{flexGrow: 1}} data={options} renderItem={({ item }) => (<TouchableOpacity style={styles_modal.optionContainer} onPress={() => handleOptionPress(item.value)}><Text style={styles_modal.optionText}>{item.label}</Text></TouchableOpacity>)} keyExtractor={(item) => item.value}/>
                                        </View>
                                    </View>
                                </Modal>
                            </FormControl>
                            </View>
                            <View style={{width: '50%', alignItems: 'center'}}>
                            <FormControl style={{width: '90%'}}>
                                <TouchableOpacity onPress={handleTextInputPress2}>
                                <TextInput value={selectedValue2} placeholder="Seleccionar día" style={styles.input}/>
                                </TouchableOpacity>
                                <Modal visible={isSelectActive2} animationType="fade" transparent>
                                    <View style={styles_modal.modalContainer}>
                                        <View style={styles_modal.modalContent}>
                                            <FlatList style={{flexGrow: 1}} data={options2} renderItem={({ item }) => (<TouchableOpacity style={styles_modal.optionContainer} onPress={() => handleOptionPress2(item.value)}><Text style={styles_modal.optionText}>{item.label}</Text></TouchableOpacity>)} keyExtractor={(item) => item.value}/>
                                        </View>
                                    </View>
                                </Modal>
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

                            <TouchableOpacity style={{...styles.button, width: 260}}
                            onPress={openActionsheet}>
                                <Text style={styles.buttonLoginText}>Guardar</Text>
                            </TouchableOpacity>

                    </View>
                </View>
                        {/* asdasd */}
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
