import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from '../theme/ThemeApp';

import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Portal, Modal, Checkbox  } from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input';

interface Props extends StackScreenProps<any, any>{}

export const LoginScreen = ({navigation}: Props) => {

    //state of window for margins
    const { top } = useSafeAreaInsets();

    //state for modal
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    //state for checkbox
    // const [checked, setChecked] = React.useState(false);
    // const [checked2, setChecked2] = React.useState(false);
    // const [checked3, setChecked3] = React.useState(false);
    // const [checked4, setChecked4] = React.useState(false);

    //functions for modal
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const showModal2 = () => {setVisible2(true); setVisible(false)};
    const hideModal2 = () => setVisible2(false);
    const showModal3 = () => {setVisible3(true); setVisible2(false)};
    const hideModal3 = () => setVisible3(false);

    //functions for checkbox
    // const onToggleCheckbox = () => setChecked(!checked);

    //styles for modal
    const containerStyle = {backgroundColor: 'white', padding: 15, marginTop: top + 500, borderRadius: 20, height: 350};

    //inputText
    const [text, setText] = React.useState('');

    //setText
    const onChangeText = (data: string) => setText(data);

    return (

        <ScrollView>
            <View style={styles.container}>
                <View style={
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                    marginTop: top + 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={styles.title}>Angel2Care</Text>
                </View>

                <View style={
                    // eslint-disable-next-line react-native/no-inline-styles
                    {marginTop: 35,
                    alignItems: 'center',
                    justifyContent: 'center'}

                }>

                    <Text style={
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'black',
                    }}>Bienvenido de nuevo</Text>
                </View>

                <View style={
                    // eslint-disable-next-line react-native/no-inline-styles
                    {marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center'}
                }>
                    <Text style={
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'black',
                    }}>Inicia sesión para comenzar con la aventura</Text>
                </View>

                <View style={
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }
                }>
                    <TouchableOpacity style={styles.buttonGoogleLogin}
                    onPress={() => console.log('Hola')}>
                        <Text style={styles.buttonGoogleText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGoogleLogin}
                    onPress={() => console.log('Hola')}>
                        <Text style={styles.buttonFBText}>Facebook </Text>
                    </TouchableOpacity>

                </View>

                {/* <View style={
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }
                }>
                    <Checkbox.Item
                        status={checked ? 'checked' : 'unchecked' }
                        onPress={(event) => console.log(event)}
                        label="Paciente"
                        testID="Paciente"
                        style={styles.checkbox}
                    />
                    <Checkbox.Item
                        status={checked ? 'checked' : 'unchecked' }
                        onPress={(event) => console.log(event.target)}
                        label="Medico"
                        testID="Medico"
                        style
                    />
                    <Checkbox.Item
                        status={checked ? 'checked' : 'unchecked' }
                        onPress={(event) => console.log(event.target)}
                        label="Clinica"
                        testID="Clinica"
                        style
                    />
                    <Checkbox.Item
                        status={checked ? 'checked' : 'unchecked' }
                        onPress={(event) => console.log(event.target)}
                        label="Seguro"
                        testID="Seguro"
                        style
                    />
                </View> */}

                <View style={
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                }>
                    <TextInput style={styles.input}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#aaaaaa"
                    />

                    <TextInput style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry={true}
                    />
                </View>

                <View style={
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.buttonLoginText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>

                <View style={
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                        marginTop: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text style={
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                            fontSize: 15,
                            fontWeight: '400',
                            color: '#0E54BE',
                        }}
                        onPress={showModal}
                        >
                            ¿Olvidaste tu contraseña?
                    </Text>

                    <Text style={
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                            fontSize: 15,
                            fontWeight: '400',
                            color: '#0E54BE',
                            marginTop: 15,
                        }}>
                        ¿No tienes una cuenta?
                        &nbsp;
                        <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                fontWeight: 'bold',
                            }} onPress={()=> navigation.navigate('Register')}>
                            Unete a nosotros
                        </Text>
                    </Text>
                </View>

                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>

                        <View>
                            <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textAlign: 'center',
                                }}>
                                Olvide mi contraseña
                            </Text>
                            <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    fontSize: 15,
                                    fontWeight: '400',
                                    color: 'black',
                                    marginTop: 5,
                                }
                            }>
                                Ingresa tu correo electrónico para el proceso de verificación
                            </Text>
                            <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    fontSize: 15,
                                    fontWeight: '400',
                                    color: 'black',
                                    marginTop: 5,
                                }
                            }>
                                Le enviaremos un codigo de 4 digitos a su correo electrónico
                            </Text>
                            <TextInput
                                value={text}
                                // placeholder="Correo electrónico"s
                                // right={<TextInput.Affix text={text} />}
                                onChangeText={onChangeText}
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{...styles.input, alignSelf: 'center'}}
                            />
                        </View>

                        <TouchableOpacity
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{...styles.button, alignItems: 'center', alignSelf: 'center'}}
                            onPress={showModal2}>
                                <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                    {color: 'white',fontWeight: 'bold', fontSize: 20}
                                    }>
                                    Continuar
                                </Text>
                        </TouchableOpacity>
                    </Modal>

                    <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={containerStyle}>
                        <View>
                            <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textAlign: 'center',
                                }}>
                                Introduzca el código de 4 digitos
                            </Text>
                            <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    fontSize: 15,
                                    fontWeight: '400',
                                    color: 'black',
                                    marginTop: 5,
                                }}>
                                Introduce los 4 digitos que te enviamos a tu correo electrónico
                            </Text>
                        </View>

                        <View style={
                            // eslint-disable-next-line react-native/no-inline-styles
                            {
                                marginTop: 10,
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
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    style={{width: '80%', height: 80}}
                                />

                                <TouchableOpacity
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    style={{...styles.button, alignItems: 'center', alignSelf: 'center'}}
                                    onPress={showModal3}>
                                        <Text style={
                                            // eslint-disable-next-line react-native/no-inline-styles
                                            {color: 'white', fontWeight: 'bold', fontSize: 20}}>
                                        Continuar
                                    </Text>
                                </TouchableOpacity>

                        </View>
                    </Modal>

                    <Modal visible={visible3} onDismiss={hideModal3} contentContainerStyle={containerStyle}>

                        <View>
                            <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: 'black',
                                    textAlign: 'center',
                                }}>
                                Nueva contraseña
                            </Text>
                            <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    fontSize: 15,
                                    fontWeight: '400',
                                    color: 'black',
                                    marginTop: 5,
                                }
                            }>
                                Establezca la nueva contraseña para su cuenta para poder iniciar sesión
                            </Text>
                            {/* <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    fontSize: 15,
                                    fontWeight: '400',
                                    color: 'black',
                                    marginTop: 5,
                                }
                            }>
                                Le enviaremos un codigo de 4 digitos a su correo electrónico
                            </Text> */}
                            <TextInput
                                value={text}
                                placeholder="Nueva contraseña"
                                // right={<TextInput.Affix text={text} />}
                                onChangeText={onChangeText}
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{...styles.input, alignSelf: 'center'}}
                            />

                            <TextInput
                                value={text}
                                placeholder="Repetir nueva contraseña"
                                // right={<TextInput.Affix text={text} />}
                                onChangeText={onChangeText}
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{...styles.input, alignSelf: 'center'}}
                            />
                        </View>

                        <TouchableOpacity
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{...styles.button, alignItems: 'center', alignSelf: 'center'}}
                            onPress={showModal2}>
                                <Text style={
                                // eslint-disable-next-line react-native/no-inline-styles
                                    {color: 'white',fontWeight: 'bold', fontSize: 20}
                                    }>
                                    Cambiar
                                </Text>
                        </TouchableOpacity>
                    </Modal>
                </Portal>
            </View>
        </ScrollView>
    );
};
