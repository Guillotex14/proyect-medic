import React from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any>{};

export const RegisterScreen = ({navigation}:Props) => {

  const { top } = useSafeAreaInsets();

  return (
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
        {
          marginTop: 35,
          alignItems: 'center',
          justifyContent: 'center'}
        }>
        <Text style={
          // eslint-disable-next-line react-native/no-inline-styles
          {
            fontSize: 30,
            fontWeight: 'bold',
            color: 'black',
          }}>
            Registrate
        </Text>
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

            <View style={
                // eslint-disable-next-line react-native/no-inline-styles
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
                // eslint-disable-next-line react-native/no-inline-styles
                {
                    marginTop: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TouchableOpacity style={styles.button}
                onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonLoginText}>Regístrate</Text>
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
                    }}>
                        ya tienes una cuenta?
                        &nbsp;
                        <Text 
                          onPress={() => navigation.navigate('Login')}
                          style={
                            // eslint-disable-next-line react-native/no-inline-styles
                            {
                                fontWeight: 'bold',
                                color: '#0E54BE',
                            }}>Inicia sesión
                      </Text>
                </Text>

            </View>
    </View>
  )
}
