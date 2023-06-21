import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { styles } from '../theme/ThemeApp';

import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Actionsheet, useDisclose } from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Images } from '../assets/imgs/imgs';

interface Props extends StackScreenProps<any, any>{}

export const LoginScreen = ({navigation}: Props) => {

    //state of window for margins
    const { top } = useSafeAreaInsets();

    //state for login;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //state for actionsheet content
    //open first data actionsheet
    const [isContent, setIsContent] = useState(false);
    //open second actionsheet
    const [isSecondContent, setIsSecondContent] = useState(false);
    //open third actionsheet
    const [isThirdContent, setIsThirdContent] = useState(false);


    //state for actionsheet
    const {isOpen, onOpen, onClose} = useDisclose();

    //functions for login
    const Login = () => {
        console.log(email);
        console.log(password);

        if (email === '' ) {
            console.log('email vacio');
            // return;
        }

        if (password === '' ) {
            console.log('password vacio');
            // return;
        }

        navigation.navigate('Home');

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

    if (isOpen==false)   {
        if (isSecondContent){
            setIsSecondContent(false);
        }
        if (isThirdContent){
            setIsThirdContent(false);
        }
    }


    //inputText
    const [text, setText] = useState('');

    //setText
    const onChangeText = (data: string) => setText(data);

    return (

        <ScrollView>
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
                        fontSize: 12,
                        fontWeight: '300',
                        color: 'black',
                    }}>Inicia sesión para comenzar con la aventura</Text>
                </View>

                <View style={
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }
                }>
                    <TouchableOpacity style={styles.buttonGoogleLogin}
                    onPress={() => console.log('Hola')}>

                        <View style={{flexDirection: 'row'}}>
                            <Image source={Images.logogoogle} />
                            <Text style={{...styles.buttonGoogleText, marginHorizontal: 10}}>Google</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGoogleLogin}
                    onPress={() => console.log('Hola')}>

                        <View style={{flexDirection: 'row'}}>
                            <Image source={Images.logofb}/>
                            <Text style={{...styles.buttonFBText,  marginHorizontal: 10}}>Facebook </Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                }>
                    <TextInput style={styles.input}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                    />

                    <TextInput style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
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
                            fontSize: 12,
                            fontWeight: '400',
                            color: '#0E54BE',
                        }}
                        onPress={openActionSheet}
                        >
                            ¿Olvidaste tu contraseña?
                    </Text>

                    <Text style={
                        {
                            fontSize: 12,
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

                <Actionsheet isOpen={isOpen} onClose={onClose}>
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
                                        // eslint-disable-next-line react-native/no-inline-styles
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
                                        // eslint-disable-next-line react-native/no-inline-styles
                                        {
                                            fontSize: 12,
                                            fontWeight: '300',
                                            color: 'black',
                                            marginTop: 5,
                                            alignSelf: 'center',
                                        }}>
                                        Ingresa tu correo electrónico para el proceso de verificación
                                    </Text>
                                    <Text style={
                                        // eslint-disable-next-line react-native/no-inline-styles
                                        {
                                            fontSize: 12,
                                            fontWeight: '300',
                                            color: 'black',
                                            marginTop: 5,
                                        }}>
                                        Le enviaremos un codigo de 4 digitos a su correo electrónico
                                    </Text>
                                    <TextInput
                                        value={text}
                                        placeholder="Correo electrónico"
                                        onChangeText={onChangeText}
                                        // eslint-disable-next-line react-native/no-inline-styles
                                        style={{ ...styles.input, alignSelf: 'center', width: '80%' }} />
                                    </View>
                                <TouchableOpacity
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    style={{ ...styles.button, alignItems: 'center', alignSelf: 'center' }}
                                    onPress={opeContent2}>
                                        <Text style={
                                            // eslint-disable-next-line react-native/no-inline-styles
                                            { color: 'white', fontWeight: 'bold', fontSize: 20 }}>
                                            Continuar
                                        </Text>
                                    </TouchableOpacity></>
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
                                            fontSize: 11,
                                            fontWeight: '400',
                                            color: 'black',
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
                                    <OTPInputView
                                        pinCount={4}
                                        autoFocusOnLoad
                                        codeInputFieldStyle={styles.underlineStyleBase}
                                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                        onCodeFilled={(code => {
                                            console.log(`Code is ${code}, you are good to go!`);
                                        })}
                                        style={{width: '80%', height: 60, marginHorizontal: 15}}
                                    />
                                    <TouchableOpacity
                                        style={{...styles.button, alignItems: 'center', alignSelf: 'center', width: '80%'}}
                                        onPress={opeContent3}>
                                            <Text style={
                                                {color: 'white', fontWeight: 'bold', fontSize: 20}}>
                                            Continuar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>)
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
                                            fontSize: 10,
                                            fontWeight: '300',
                                            color: 'black',
                                            marginTop: 5,
                                            textAlign: 'center',
                                            alignSelf: 'center',
                                        }
                                    }>
                                        Establezca la nueva contraseña para su cuenta para poder iniciar sesión
                                    </Text>

                                    <TextInput
                                        value={text}
                                        placeholder="Nueva contraseña"
                                        // right={<TextInput.Affix text={text} />}
                                        secureTextEntry={true}
                                        onChangeText={onChangeText}
                                        style={{...styles.input, alignSelf: 'center'}}
                                    />

                                    <TextInput
                                        value={text}
                                        placeholder="Repetir nueva contraseña"
                                        // right={<TextInput.Affix text={text} />}
                                        onChangeText={onChangeText}
                                        style={{...styles.input, alignSelf: 'center'}}
                                        secureTextEntry={true}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={{...styles.button, alignItems: 'center', alignSelf: 'center'}}>
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

