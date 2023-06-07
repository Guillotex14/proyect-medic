import React from 'react'
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Images } from '../assets/imgs/imgs';
import { RadioButton } from 'react-native-paper';

interface Props extends StackScreenProps<any, any>{};

export const RegisterScreen = ({navigation}:Props) => {

    const { top } = useSafeAreaInsets();

    //states for radio buttons
    const [isRadio, setIsRadio] = React.useState(false);
    const [isRadio2, setIsRadio2] = React.useState(false);
    
    //function for radio buttons
    const onRadioButtons = (radio: string) => {
        if(radio == 'paciente'){
            setIsRadio(true);
            setIsRadio2(false);
        }

        if (radio == 'medico') {
            setIsRadio(false);
            setIsRadio2(true);
        }
    }

    const nextStep = () => {
        
        if (isRadio && !isRadio2) {
            navigation.navigate('RegisterStep2');
        }

        if (!isRadio && isRadio2) {
            navigation.navigate('RegisterMedicStep2');
        }

    }

    return (
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
            {
                marginTop: 35,
                alignItems: 'center',
                justifyContent: 'center'}
            }>
            <Text style={

                {
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'black',
                }}>
                Registrate
            </Text>
            </View>

            <View style={
                    {marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center'}
                }>
                    <Text style={

                        {
                        fontSize: 15,
                        fontWeight: 'bold',
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
                            <Image source={Images.logogoogle}  style={{width: 20, height: 20 }}/>
                            <Text style={{...styles.buttonGoogleText, marginHorizontal: 10}}>Google</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGoogleLogin}
                    onPress={() => console.log('Hola')}>

                        <View style={{flexDirection: 'row'}}>
                            <Image source={Images.logofb} style={{width: 20, height: 20 }}/>
                            <Text style={{...styles.buttonFBText,  marginHorizontal: 10}}>Facebook </Text>
                        </View>
                    </TouchableOpacity>

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
                        label="Patiente"
                        value="paciente"
                        status={ isRadio ? 'checked' : 'unchecked' }
                        onPress={() => onRadioButtons('paciente')}
                    />
                </View>

                <View style={{width: '50%', alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                    <RadioButton.Item
                        label="Medico"
                        value="medico"
                        status={ isRadio2 ? 'checked' : 'unchecked' }
                        onPress={() => onRadioButtons('medico')}
                    />
                </View>
            </View>

            <View style={
                {
                    marginTop: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            }>
                <TextInput style={styles.input}
                    placeholder="Nombre completo"
                    placeholderTextColor="#aaaaaa"
                />
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
                {
                    marginTop: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity style={styles.button}
                onPress={nextStep}>
                    <Text style={styles.buttonLoginText}>Regístrate</Text>
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
                        fontSize: 15,
                        fontWeight: '400',
                        color: '#0E54BE',
                    }}>
                        ya tienes una cuenta?
                        &nbsp;
                        <Text
                            onPress={() => navigation.navigate('Login')}
                            style={
                            {
                                fontWeight: 'bold',
                                color: '#0E54BE',
                            }}>Inicia sesión
                        </Text>
                </Text>
            </View>
        </View>
        );
    };
