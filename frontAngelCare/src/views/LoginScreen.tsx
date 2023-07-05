import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView, Platform, Keyboard, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboard } from '@react-native-community/hooks';
import { styles } from '../theme/ThemeApp';

import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Actionsheet, useDisclose,useToast } from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Clipboard from '@react-native-community/clipboard';
import { Images } from '../assets/imgs/imgs';
import { RadioButton } from 'react-native-paper';

import apiConnection from '../api/Concecction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color, set } from 'react-native-reanimated';
import FitbitAuthorization from '../components/FitbitAuthorization';

interface Props extends StackScreenProps<any, any>{}

export const LoginScreen = ({navigation}: Props) => {

    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const keyboard = useKeyboard();
    //state of window for margins
    const { top } = useSafeAreaInsets();

    const toast = useToast();

    //state for login;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //recovery password
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    //mensajes de validacion
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [validTypeUser, setValidTypeUser] = useState(false);

    const [msgValidTypeUser, setMsgValidTypeUser] = useState('');

    //states for radioButtons
    const [isRadio, setIsRadio] = useState(false);
    const [isRadio2, setIsRadio2] = useState(false);

    //open first data actionsheet
    const [isContent, setIsContent] = useState(false);
    //open second actionsheet
    const [isSecondContent, setIsSecondContent] = useState(false);
    //open third actionsheet
    const [isThirdContent, setIsThirdContent] = useState(false);

    //platform 
    const [isAndroid, setIsAndroid] = useState(false);
    const [isIos, setIsIos] = useState(false);
    const [isWeb, setIsWeb] = useState(false);

    //state for actionsheet
    const {isOpen, onOpen, onClose} = useDisclose();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };

    }, []);

    //functions for login
    const Login = async () => {

        if (email === '') {
            setValidEmail(true);
            presentToast('El campo email es obligatorio');
            return;
        }

        if (password === '') {
            setValidPassword(true);
            presentToast('El campo contraseña es obligatorio');
            return;
        }

        if (email !== '') {
            if (!setEmailValid(email)){
                setValidEmail(true);
                presentToast('El email no es valido');
                console.log(setEmailValid(email))
                return;
            }else{
                setValidEmail(false);
            }
        }

        if (password !== '') {
            setValidPassword(false);
        }

        if (!isRadio && !isRadio2) {
            setValidTypeUser(true);
            presentToast('Seleccione un tipo de usuario');
            return;
        }


        if (isRadio && !isRadio2) {
            
            await apiConnection.post('/auth/loginPatient', {
                email: email,
                password: password
            }).then((response) => {
                if (response.data.status == true) {

                    AsyncStorage.setItem('me', JSON.stringify(response.data.data));
                    navigation.navigate('Home');
                }else{
                    presentToast2(response.data.message);
                    return;
                }
                    
            }).catch((error) => {
                console.log(error);
            });
        }

        if (!isRadio && isRadio2) {
            await apiConnection.post('/auth/loginMedic', {
                email: email,
                password: password
            }).then((response) => {
                if (response.data.status == true) {
                    AsyncStorage.setItem('me', JSON.stringify(response.data.data));
                    navigation.navigate('HomeMedic');
                }else{
                    presentToast2(response.data.message);
                    return;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    //functions for recovery password
    const recoveryPassword = async () => {
        
        await apiConnection.post('/auth/forgotPassword', {
            email: recoveryEmail,
        }).then((response) => {
            if (response.data.status == true) {
                console.log(response.data);
                opeContent2();
            }
        
        }
        ).catch((error) => {
            console.log(error);
        });
        
    };

    const verifyCode = async () => {
        await apiConnection.post('/auth/verifyCode', {
            email: recoveryEmail,
            code: code,
        }).then((response) => {
            if (response.data.status == true) {
                console.log(response.data);
                opeContent3();
            }
        
        }
        ).catch((error) => {
            console.log(error);
        });
    };

    const changePassword = async () => {
        await apiConnection.post('/auth/resetPassword', {
            email: recoveryEmail,
            password: newPassword,
            password2: newPassword2,
        }).then((response) => {
            if (response.data.status == true) {
                console.log(response.data);
                onClose();
            }
        
        }
        ).catch((error) => {
            console.log(error);
        });
    };

    //functions for actionsheet
    const openActionSheet = () => {
        onOpen();
        setIsContent(true);
    };

    const opeContent2 = () => {
        setIsSecondContent(true);
        setIsContent(false);
    };

    const opeContent3 = () => {
        setIsThirdContent(true);
        setIsSecondContent(false);
    };

    const platform = () => {
        if (Platform.OS === 'android') {
            setIsAndroid(true);
            setIsIos(false);
            setIsWeb(false);
        }

        if (Platform.OS === 'ios') {
            setIsAndroid(false);
            setIsIos(true);
            setIsWeb(false);
        }

        if (Platform.OS === 'web') {
            setIsAndroid(false);
            setIsIos(false);
            setIsWeb(true);
        }

    };

    useEffect(() => {
        platform();
    }, [])
    

    //function for RadioButtons
    const onRadioButtons = (radio: string) => {
        
        if (radio === 'paciente') {
            setIsRadio(true);
            setIsRadio2(false);
            setValidTypeUser(false);
            setMsgValidTypeUser('');
        }
        
        if (radio === 'medico') {
            setIsRadio(false);
            setIsRadio2(true);
            setValidTypeUser(false);
            setMsgValidTypeUser('');
        }

    };

    const setEmailValid = (dataEmail:string) => {

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (reg.test(dataEmail) === false) {
            // setValidEmail(true);
            // presentToast('El email no es válido');
            return false;
        }else{
            // setValidEmail(false);
            // setMsgValidEmail('');
            // setEmail(dataEmail);
            return true;
        }
    }

    if (isOpen==false)   {
        if (isSecondContent){
            setIsSecondContent(false);
        }
        if (isThirdContent){
            setIsThirdContent(false);
        }
    }

    const presentToast = (message: string) => {

        toast.show({
            render: () => (
                <View style={{backgroundColor: '#ea868f', padding: 15, borderRadius: 50}}>
                    <Text style={{color: 'white', fontSize: 20}}>{message}</Text>
                </View>
            ),
            placement: 'top',
            duration: 2000,
        });

    };

    const presentToast2 = (message: string) => {
        toast.show({
            render: () => (
                <View style={{backgroundColor: '#0d6efd', padding: 15, borderRadius: 50}}>
                    <Text style={{color: '#000', fontSize: 20}}>{message}</Text>
                </View>
            ),
            placement: 'top',
            duration: 2000,
        });
    }

    return (
        <ScrollView style={{backgroundColor: '#E6F1FF'}}>
            <View style={styles.container}>

                <View style={
                    {
                    marginTop: top + 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image source={Images.logo_blue} style={{width: 250, height:50, marginVertical: 20}}/>
                </View>

                <View style={
                    {marginTop: 35,
                    alignItems: 'center',
                    justifyContent: 'center'}

                }>

                    <Text style={
                        {
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: 'black',
                    }}>Bienvenido de nuevo</Text>
                </View>

                <View style={
                    {marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center'}
                }>
                    <Text style={
                        {
                        fontSize: 13,
                        fontWeight: '300',
                        color: 'black',
                    }}>Inicia sesión para comenzar con la aventura</Text>
                </View>

                <View style={
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // flexDirection: 'row',
                    }
                }>
                    <FitbitAuthorization />
                    {/* <TouchableOpacity style={styles.buttonGoogleLogin}
                    onPress={() => console.log('Hola')}>

                        <View style={{flexDirection: 'row'}}>
                            <Image source={Images.logogoogle} style={{width:20, height:20}}/>
                            <Text style={{...styles.buttonGoogleText, marginHorizontal: 10, fontSize: 13}}>Google</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGoogleLogin}
                    onPress={() => console.log('Hola')}>

                        <View style={{flexDirection: 'row'}}>
                            <Image source={Images.logofb} style={{width:20, height:20}}/>
                            <Text style={{...styles.buttonFBText,  marginHorizontal: 10, fontSize: 13}}>Facebook </Text>
                        </View>
                    </TouchableOpacity> */}

                </View>

                <View style={
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }
                }>
                    <View style={{width: '50%', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                        <RadioButton.Item
                            label="Paciente"
                            value="paciente"
                            status={ isRadio ? 'checked' : 'unchecked' }
                            onPress={(e) => onRadioButtons('paciente')}
                        />
                    </View>

                    <View style={{width: '50%', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                        <RadioButton.Item
                            label="Medico"
                            value="medico"
                            status={ isRadio2 ? 'checked' : 'unchecked' }
                            onPress={(e) => onRadioButtons('medico')}
                        />
                    </View>
                </View>

                <View style={
                    {
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                }>
                <KeyboardAwareScrollView style={{ width: '90%' }}>
                    <TextInput style={{...styles.input, borderColor: !validEmail ? '#aaaaaa' : '#dc3545'}}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                    />
                </KeyboardAwareScrollView>
                <KeyboardAwareScrollView style={{ width: '90%' }}>
                    <TextInput style={{...styles.input, borderColor: !validPassword ? '#aaaaaa' : '#dc3545'}}
                        placeholder="Contraseña"
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </KeyboardAwareScrollView>
                </View>

                <View style={
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <TouchableOpacity style={styles.button}
                    onPress={() => {
                        Login();
                    }}>
                        <Text style={styles.buttonLoginText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>

                <View style={
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={
                        {
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#0E54BE',
                        }}
                        onPress={openActionSheet}
                        >
                            ¿Olvidaste tu contraseña?
                    </Text>

                    <Text style={
                        {
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#0E54BE',
                            marginTop: 15,
                            marginBottom: 35,
                        }}>
                        ¿No tienes una cuenta?
                        &nbsp;
                        <Text style={
                                {
                                fontWeight: 'bold',
                            }} onPress={()=> navigation.navigate('Register')}>
                            Unete a nosotros
                        </Text>
                    </Text>
                </View>

                <Actionsheet isOpen={isOpen} onClose={onClose} style={keyboardHeight > 0 ? { bottom: keyboardHeight } : null}>
                    <Actionsheet.Content>
                        {
                            isContent && (
                                <>
                                    <View style={
                                        // eslint-disable-next-line react-native/no-inline-styles
                                        {
                                        marginTop: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                    }}>
                                        <Text style={
                                            {
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                color: 'black',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                            }}>
                                            Olvide mi contraseña
                                        </Text>
                                        <Text style={
                                            {
                                                fontSize: 13,
                                                fontWeight: '400',
                                                color: '#B3B8C9',
                                                marginTop: 5,
                                                alignSelf: 'center',
                                            }}>
                                            Ingresa tu correo electrónico para el proceso de verificación
                                        </Text>
                                        <Text style={
                                            {
                                                fontSize: 13,
                                                fontWeight: '400',
                                                color: '#B3B8C9',
                                                marginTop: 5,
                                            }}>
                                            Le enviaremos un codigo de 4 digitos a su correo electrónico
                                        </Text>
                                        <TextInput
                                            value={recoveryEmail}
                                            placeholder="Correo electrónico"
                                            onChangeText={setRecoveryEmail}
                                            style={{ ...styles.input, alignSelf: 'center', width: '80%' }} />
                                    </View>
                                    <TouchableOpacity
                                        style={{ ...styles.button, alignItems: 'center', alignSelf: 'center' }}
                                        onPress={recoveryPassword}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                                                Continuar
                                            </Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }

                        { isSecondContent && (
                            <>
                                <View>
                                    <Text style={
                                        {
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: 'black',
                                            textAlign: 'center',
                                        }}>
                                        Introduzca el código de 4 digitos
                                    </Text>
                                    <Text style={
                                        {
                                            fontSize: 13,
                                            fontWeight: '500',
                                            color: '#B3B8C9',
                                            marginTop: 5,
                                        }}>
                                        Introduce los 4 digitos que te enviamos a tu correo electrónico
                                    </Text>
                                </View>

                                <View style={
                                    {
                                        marginTop: 30,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>

                                    {/* {
                                        isAndroid && (
                                        <OTPInputView
                                        pinCount={4}
                                        autoFocusOnLoad
                                        codeInputFieldStyle={styles.underlineStyleBase}
                                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                        onCodeFilled={(code: string) => setCode(code)}
                                        style={{width: '80%', height: 60, marginHorizontal: 15}}
                                    />
                                        )
                                    }
                                    
                                    {
                                        isIos && (
                                        <OTPInputView
                                        pinCount={4}
                                        autoFocusOnLoad
                                        codeInputFieldStyle={styles.underlineStyleBase}
                                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                        onCodeFilled={(code: string) => setCode(code)}
                                        style={{width: '80%', height: 60, marginHorizontal: 15}}
                                    />
                                        )
                                    }  */}

                                    {
                                        isWeb && (
                                            <TextInput
                                            value={code}
                                            placeholder="Correo electrónico"
                                            onChangeText={setCode}
                                            style={{ ...styles.input, alignSelf: 'center', width: '90%' }} />
                                        )
                                    }


                                    {/*  */}
                                </View>
                                <TouchableOpacity
                                    style={{...styles.button, alignItems: 'center', alignSelf: 'center'}}
                                    onPress={verifyCode}>
                                        <Text style={
                                            {color: 'white', fontWeight: 'bold', fontSize: 20}}>
                                        Continuar
                                    </Text>
                                </TouchableOpacity>
                            </>
                            )
                        }

                        { isThirdContent && (
                            <>
                                <View style={
                                    {
                                    width: '100%',
                                    marginTop: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={
                                        {
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            color: 'black',
                                            textAlign: 'center',
                                            alignSelf: 'center',
                                        }}>
                                        Nueva contraseña
                                    </Text>
                                    <Text style={
                                        {
                                            fontSize: 13,
                                            fontWeight: '500',
                                            color: '#B3B8C9',
                                            marginTop: 5,
                                            textAlign: 'center',
                                            alignSelf: 'center',
                                        }
                                    }>
                                        Establezca la nueva contraseña para su cuenta para poder iniciar sesión
                                    </Text>

                                    <TextInput
                                        value={newPassword}
                                        placeholder="Nueva contraseña"
                                        secureTextEntry={true}
                                        onChangeText={setNewPassword}
                                        style={{...styles.input, alignSelf: 'center'}}
                                    />

                                    <TextInput
                                        value={newPassword2}
                                        placeholder="Repetir nueva contraseña"
                                        onChangeText={setNewPassword2}
                                        style={{...styles.input, alignSelf: 'center'}}
                                        secureTextEntry={true}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={{...styles.button, alignItems: 'center', alignSelf: 'center'}}
                                    onPress={changePassword}
                                    >
                                        <Text style={
                                            {color: 'white',fontWeight: 'bold', fontSize: 20}
                                            }>
                                            Cambiar
                                        </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Actionsheet.Content>
                </Actionsheet>
            </View>
        </ScrollView>
    );
};

