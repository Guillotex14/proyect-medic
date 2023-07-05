import React, { useEffect, useState } from 'react';
import { authorize, refresh } from 'react-native-app-auth';
import { View, Text, Button, TouchableOpacity } from 'react-native';

const config = {
    clientId: '23R7C6',
    redirectUrl: 'YOUR_REDIRECT_URI',
    scopes: ['heartrate'],
    serviceConfiguration: {
        authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
        tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
        revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
    },
};

const FitbitAuthorization = () => {
    const [accessToken, setAccessToken] = useState('');
    const [heartRateData, setHeartRateData] = useState(null);

    useEffect(() => {
    // Verificar si ya se tiene un access token almacenado

    // ...

    }, []);

    const handleLogin = async () => {
        try {
        const result = await authorize(config);
        setAccessToken(result.accessToken);

        // Almacenar el access token en el almacenamiento local

        // ...

        // Obtener los datos de frecuencia cardíaca del usuario
        fetchHeartRateData(result.accessToken);

        } catch (error) {
        console.error('Error de autorización:', error);
        }
    };

    const fetchHeartRateData = (token:any) => {
        const heartRateUrl = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json';
        const requestOptions = {
        headers: {
            Authorization: `Bearer ${token}`
        }
        };

        fetch(heartRateUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Manejar los datos de frecuencia cardíaca
            setHeartRateData(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos de frecuencia cardíaca:', error);
        });
    };

    const handleLogout = async () => {
        try {
        await refresh(config, { refreshToken: accessToken });

        // Eliminar el access token del almacenamiento local

        // ...

        setAccessToken('');
        setHeartRateData(null);
        } catch (error) {
        console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <View>
            {accessToken ? (
                <View>
                <Text>¡Inicio de sesión exitoso!</Text>
                <Button title="Cerrar sesión" onPress={handleLogout} />
                {heartRateData && (
                    <View>
                    <Text>Última frecuencia cardíaca registrada: {heartRateData['activities-heart'][0].value.restingHeartRate}</Text>
                    {/* Mostrar más datos de frecuencia cardíaca según sea necesario */}
                    </View>
                )}
                </View>
            ) : (
                <Button title="Iniciar sesión con Fitbit" onPress={handleLogin} />
            )}
        </View>
    )
}

export default FitbitAuthorization;