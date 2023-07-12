import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

const config = {
  clientId: '23R7C6', // Reemplaza con tu cliente ID de Fitbit
  clientSecret: '0017003c1ad27fba89b724a16c4716d5', // Reemplaza con tu cliente secreto de Fitbit
  scopes: ['profile', 'heartrate', 'oxygen_saturation', 'temperature', 'sleep', 'respiratory_rate'], // Agrega los alcances requeridos
};

const authorizationEndpoint = 'https://www.fitbit.com/oauth2/authorize';
const tokenEndpoint = 'https://api.fitbit.com/oauth2/token';

function FitbitAuthorization() {
    const [accessToken, setAccessToken] = useState<any>('');
    const [profileData, setProfileData] = useState<any>(null);
    const [heartRateData, setHeartRateData] = useState<any>({});
    const [spo2Data, setSpo2Data] = useState<any>(null);
    const [skinTemperatureData, setSkinTemperatureData] = useState<any>(null);
    const [respirationData, setRespirationData] = useState<any>(null);
    const [sleepData, setSleepData] = useState<any>(null);

    const handleAuthButtonPress = async () => {
        // Configura el redirectUri con una URL válida
        const redirectUri = 'exp://192.168.0.12:19000/--/*';

        // Inicia la solicitud de autorización
        const authUrl = `${authorizationEndpoint}?client_id=${config.clientId}&response_type=code&scope=${encodeURIComponent(
        config.scopes.join(' ')
        )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        const response = await AuthSession.startAsync({ authUrl, returnUrl: redirectUri });

        if (response.type === 'success') {
        // Extrae el código de autorización de la respuesta
        const { code } = response.params;

        // Intercambia el código de autorización por un token de acceso
        const requestBody = {
            code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            client_id: config.clientId,
            client_secret: config.clientSecret,
            expires_in: '31536000',
        };

        try {
            const tokenResponse = await axios.post(
            tokenEndpoint,
            new URLSearchParams(requestBody).toString(),
            {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + 'MjNSN0M2OjAwMTcwMDNjMWFkMjdmYmE4OWI3MjRhMTZjNDcxNmQ1',
                },
            }
            );
            const { access_token } = tokenResponse.data;
            setAccessToken(access_token);
            fetchProfileAndHeartRateData(access_token);
            fetchSpo2Data(access_token);
            fetchSkinTemperatureData(access_token);
            fetchRespirationData(access_token);
            fetchSleepData(access_token);
        } catch (error: any) {
            console.error('Error al obtener el token de acceso:', error.response.data);
        }
        }
    };

    const fetchProfileAndHeartRateData = async (accessToken: string) => {
        try {
        const profileResponse = await axios.get('https://api.fitbit.com/1/user/-/profile.json', {
            headers: {
            'Authorization': 'Bearer ' + accessToken,
            },
        });
        setProfileData(profileResponse.data);

        const today = new Date().toISOString().slice(0, 10); // Obtén la fecha actual en el formato 'YYYY-MM-DD'
        const heartRateResponse = await axios.get(
            `https://api.fitbit.com/1/user/-/activities/heart/date/${today}/1d/1min.json`,
            {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            }
        );
        const heartRateValues = heartRateResponse.data['activities-heart'][0].value;
        setHeartRateData(heartRateValues);
        } catch (error: any) {
        console.error('Error al obtener los datos de frecuencia cardíaca:', error.response.data);
        }
    };

    const fetchSpo2Data = async (accessToken: string) => {
        try {
        const today = new Date().toISOString().slice(0, 10);
        const spo2Response = await axios.get(`https://api.fitbit.com/1/user/-/spo2/date/${today}.json`, {
            headers: {
            'Authorization': 'Bearer ' + accessToken,
            },
        });
        const spo2Value = spo2Response.data.summary?.oxygenSaturation;
        setSpo2Data(spo2Value);
        } catch (error: any) {
        console.error('Error al obtener los datos de SpO2:', error.response?.data || error.message);
        }
    };

    const fetchSkinTemperatureData = async (accessToken: string) => {
        try {
        const today = new Date().toISOString().slice(0, 10);
        const skinTemperatureResponse = await axios.get(
            `https://api.fitbit.com/1/user/-/temp/skin/date/${today}.json`,
            {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            }
        );
        if (skinTemperatureResponse.data && skinTemperatureResponse.data['body-temperature'] && skinTemperatureResponse.data['body-temperature'].length > 0) {
            const skinTemperatureValue = skinTemperatureResponse.data['body-temperature'][0].value;
            setSkinTemperatureData(skinTemperatureValue);
        } else {
            setSkinTemperatureData(null);
        }
        } catch (error: any) {
        console.error('Error al obtener los datos de temperatura de la piel:', error.response?.data || error.message);
        }
    };

    const fetchRespirationData = async (accessToken: string) => {
        try {
        const today = new Date().toISOString().slice(0, 10);
        const respirationResponse = await axios.get(
            `https://api.fitbit.com/1/user/-/br/date/${today}.json`,
            {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
            }
        );
        if (respirationResponse.data && respirationResponse.data['activities-respiration'] && respirationResponse.data['activities-respiration'].length > 0) {
            const respirationValue = respirationResponse.data['activities-respiration'][0].value;
            setRespirationData(respirationValue);
        } else {
            setRespirationData(null);
        }
        } catch (error: any) {
        console.error('Error al obtener los datos de respiración:', error.response?.data || error.message);
        }
    };

    const fetchSleepData = async (accessToken: string) => {
        try {
        const today = new Date().toISOString().slice(0, 10);
        const sleepResponse = await axios.get(`https://api.fitbit.com/1.2/user/-/sleep/date/${today}.json`, {
            headers: {
            'Authorization': 'Bearer ' + accessToken,
            },
        });

        if (sleepResponse.data && sleepResponse.data.sleep && sleepResponse.data.sleep.length > 0) {
            const sleepValue = sleepResponse.data.sleep[0];
            setSleepData(sleepValue);
        } else {
            setSleepData(null);
        }
        } catch (error: any) {
        console.error('Error al obtener los datos de sueño:', error.response?.data || error.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {accessToken ? (
            <>
            <Text>Access Token: {accessToken}</Text>
            {profileData && (
                <View>
                <Text>Profile Data:</Text>
                <Text>Name: {profileData.user.fullName}</Text>
                <Text>Gender: {profileData.user.gender}</Text>
                <Text>Age: {profileData.user.age}</Text>
                </View>
            )}
            {Object.keys(heartRateData).length > 0 && (
                <View>
                <Text>Frecuencia cardíaca:</Text>
                <Text>Frecuencia cardíaca mínima: {heartRateData.heartRateZones[0].min}</Text>
                <Text>Frecuencia cardíaca máxima: {heartRateData.heartRateZones[0].max}</Text>
                <Text>Latidos totales: {heartRateData.heartRateZones[0].minutes}</Text>
                </View>
            )}
            {spo2Data && (
                <View>
                <Text>sO2:</Text>
                <Text>Promedio de sO2: {spo2Data.avg}</Text>
                </View>
            )}
            {skinTemperatureData && (
                <View>
                <Text>Temperatura de la piel:</Text>
                <Text>Valor: {skinTemperatureData}</Text>
                </View>
            )}
            {respirationData && (
                <View>
                <Text>Respiración:</Text>
                <Text>Valor: {respirationData}</Text>
                </View>
            )}
            {sleepData && (
                <View>
                <Text>Sueño:</Text>
                <Text>Duración: {sleepData.duration} minutos</Text>
                <Text>Calidad: {sleepData.quality}</Text>
                </View>
            )}
            </>
        ) : (
            <Button title="Authorize Fitbit" onPress={handleAuthButtonPress} />
        )}
        </View>
    );
    }

export default FitbitAuthorization;