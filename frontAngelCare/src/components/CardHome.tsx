import { useAuthRequest, AuthRequestPromptOptions } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-native-paper';
import * as AuthSession from 'expo-auth-session';
import apiConnection from '../api/Concecction';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../theme/ThemeApp';
import { Modal } from 'native-base';
import axios from 'axios';

const config = {
    clientId: '23R7C6', // Reemplaza con tu cliente ID de Fitbit
    clientSecret: '0017003c1ad27fba89b724a16c4716d5', // Reemplaza con tu cliente secreto de Fitbit
    scopes: ['profile', 'heartrate', 'oxygen_saturation', 'temperature', 'sleep', 'respiratory_rate'], // Agrega los alcances requeridos
};

const authorizationEndpoint = 'https://www.fitbit.com/oauth2/authorize';
const tokenEndpoint = 'https://api.fitbit.com/oauth2/token';

export const CardHome = () => {
    const { top } = useSafeAreaInsets();
    const [dataFitbit, setDataFitbit] = useState(false);
    const [fitbitJson, setFitbitJson] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [id_patient, setId_patient] = useState<any>(null);


    const [accessToken, setAccessToken] = useState<any>('');
    const [profileData, setProfileData] = useState<any>(null);
    const [heartRateData, setHeartRateData] = useState<any>({});
    const [spo2Data, setSpo2Data] = useState<any>(null);
    const [skinTemperatureData, setSkinTemperatureData] = useState<any>(null);
    const [respirationData, setRespirationData] = useState<any>(null);
    const [sleepData, setSleepData] = useState<any>(null);

    // Configuración de descubrimiento para el proveedor de autorización (Fitbit)
    const discovery = {
        authorizationEndpoint,
    };

    // Inicializa la solicitud de autorización
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: config.clientId,
            scopes: config.scopes,
            redirectUri: 'com.mujica93.frontAngelCare://*', // Reemplaza con tu URL de redirección válida
            usePKCE: false, // Desactiva PKCE ya que Fitbit no lo requiere
        },
            discovery
    );

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // const verifyAccessToken = async() => {

    //     await apiConnection.post('patient/verifyAccessToken',{
    //         id_patient: id_patient
    //     }).then((response) => {
    //         console.log(response.data)
    //         if(response.data.status){
    //             if (response.data.data.fitbitAccessToken !== '') {
    //                 setDataFitbit(true);
    //                 setFitbitJson(response.data.data.fitbitAccessToken);
    //             }else{
    //                 setDataFitbit(false);
    //             }
    //         }

    //     }, (error) => {
    //         console.log(error);
    //     });
    // }

    const saveAccessToken = async(accessToken1:any) => {
        await apiConnection.post('patient/saveAccessToken',{
            id_patient: id_patient,
            accessToken: accessToken1
        }).then(async(response) => {
            if(response.data.status){
                setFitbitJson(accessToken1);

                let me = await AsyncStorage.getItem('me');
                let meJson = JSON.parse(me!);

                let mee = {
                    ...meJson,
                    fitbitAccessToken: accessToken1
                }

                await AsyncStorage.setItem('me', JSON.stringify(mee));

            }
        }, (error) => {
            console.log(error);
        });
    }

    const fetchProfileAndHeartRateData = async (accessToken: string) => {
        console.log('fetchProfileAndHeartRateData', accessToken)
        try {
            const profileResponse = await axios.get('https://api.fitbit.com/1/user/-/profile.json', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
            });

            setProfileData(profileResponse.data);
    
            const today = new Date().toISOString().slice(0, 10); // Obtén la fecha actual en el formato 'YYYY-MM-DD'
            const heartRateResponse = await axios.get(`https://api.fitbit.com/1/user/-/activities/heart/date/${today}/1d/1min.json`,{
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                },
            });

            console.log('******************************')
            console.log('heartRateResponse',heartRateResponse.data['activities-heart'][0].value)
            console.log('******************************')

            const heartRateValues = heartRateResponse.data['activities-heart'][0].value;
            setHeartRateData(heartRateValues);
        } catch (error: any) {
            handleAuthButtonPress();
            setHeartRateData({});
            setAccessToken('');
            console.error('Error al obtener los datos de frecuencia cardíaca:', error.response.data);
        }
    };

    const fetchSpo2Data = async (accessToken: string) => {
        console.log('fetchSpo2Data', accessToken)
    try {
        const today = new Date().toISOString().slice(0, 10);
        const spo2Response = await axios.get(`https://api.fitbit.com/1/user/-/spo2/date/${today}.json`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
        });

        console.log('******************************')
        console.log('spo2Response',spo2Response.data)
        console.log('******************************')

        const spo2Value = spo2Response.data.summary?.oxygenSaturation;
        setSpo2Data(spo2Value);
    } catch (error: any) {
        setSpo2Data(null);
        setAccessToken('');
        console.error('Error al obtener los datos de SpO2:', error.response?.data || error.message);
    }
    };

    const fetchSkinTemperatureData = async (accessToken: string) => {

        console.log('fetchSkinTemperatureData', accessToken)

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

        console.log('******************************')
        console.log('skinTemperatureResponse',skinTemperatureResponse.data)
        console.log('******************************')

        if (skinTemperatureResponse.data && skinTemperatureResponse.data['body-temperature'] && skinTemperatureResponse.data['body-temperature'].length > 0) {
        const skinTemperatureValue = skinTemperatureResponse.data['body-temperature'][0].value;
        setSkinTemperatureData(skinTemperatureValue);
        } else {
        setSkinTemperatureData(null);
        }
    } catch (error: any) {
        setSkinTemperatureData(null);
        setAccessToken('');
        console.error('Error al obtener los datos de temperatura de la piel:', error.response?.data || error.message);
    }
    };

    const fetchRespirationData = async (accessToken: string) => {
        console.log('fetchRespirationData', accessToken)
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
        console.log('******************************')
        console.log('respirationResponse',respirationResponse.data)
        console.log('******************************')
        if (respirationResponse.data && respirationResponse.data['activities-respiration'] && respirationResponse.data['activities-respiration'].length > 0) {
        const respirationValue = respirationResponse.data['activities-respiration'][0].value;
        setRespirationData(respirationValue);
        } else {
        setRespirationData(null);
        }
    } catch (error: any) {
        setRespirationData(null);
        setAccessToken('');
        console.error('Error al obtener los datos de respiración:', error.response?.data || error.message);
    }
    };

    const fetchSleepData = async (accessToken: string) => {
        console.log('fetchSleepData', accessToken)
    try {
        const today = new Date().toISOString().slice(0, 10);
        const sleepResponse = await axios.get(`https://api.fitbit.com/1.2/user/-/sleep/date/${today}.json`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
        });

        console.log('******************************')
        console.log('sleepResponse',sleepResponse.data)
        console.log('******************************')

        if (sleepResponse.data && sleepResponse.data.sleep && sleepResponse.data.sleep.length > 0) {
        const sleepValue = sleepResponse.data.sleep[0];
        setSleepData(sleepValue);
        } else {
        setSleepData(null);
        }
    } catch (error: any) {
        setSleepData(null);
        setAccessToken('');
        console.error('Error al obtener los datos de sueño:', error.response?.data || error.message);
    }
    };
    
    const handleAuthButtonPress = async () => {
        // // Configura el redirectUri con una URL válida
        // const redirectUri = 'com.mujica93.frontAngelCare://*';

        // // Inicia la solicitud de autorización
        // const authUrl = `${authorizationEndpoint}?client_id=${config.clientId}&response_type=code&scope=${encodeURIComponent(
        //     config.scopes.join(' ')
        // )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
        // const response = await AuthSession.startAsync({ authUrl, returnUrl: redirectUri });

        // if (response.type === 'success') {
        //     // Extrae el código de autorización de la respuesta
        //     const { code } = response.params;

        //     // Intercambia el código de autorización por un token de acceso
        //     const requestBody = {
        //     code,
        //     grant_type: 'authorization_code',
        //     redirect_uri: redirectUri,
        //     client_id: config.clientId,
        //     client_secret: config.clientSecret,
        //     expires_in: '31536000',
        //     };

        //     try {
        //     const tokenResponse = await axios.post(
        //         tokenEndpoint,
        //         new URLSearchParams(requestBody).toString(),
        //         {
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //             'Authorization': 'Basic ' + 'MjNSN0M2OjAwMTcwMDNjMWFkMjdmYmE4OWI3MjRhMTZjNDcxNmQ1',
        //         },
        //         }
        //     );

        //         const { access_token } = tokenResponse.data;
        //         console.log('Token de acceso:', access_token);
        //         saveAccessToken(access_token);
        //         setFitbitJson(access_token);
        //         setAccessToken(access_token);
        //         fetchProfileAndHeartRateData(access_token);
        //         fetchSpo2Data(access_token);
        //         fetchSkinTemperatureData(access_token);
        //         fetchRespirationData(access_token);
        //         fetchSleepData(access_token);
        //     } catch (error: any) {
        //     console.error('Error al obtener el token de acceso:', error.response.data);
        //     }
        // }
        
        try {
            const result = await promptAsync();
            // promptAsync abrirá la ventana de inicio de sesión/autorización
            console.log('PromptAsync Result:', result);
        } catch (error) {
            console.error('Error al iniciar la autorización:', error);
        }

        if (response?.type === 'success') {
            const { code } = response.params;
            // Intercambia el código de autorización por un token de acceso
            const handleTokenExchange = async () => {
                const requestBody = {
                    code,
                    grant_type: 'authorization_code',
                    redirect_uri: 'com.mujica93.frontAngelCare://*',
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
                                'Authorization': 'Basic MjNSN0M2OjAwMTcwMDNjMWFkMjdmYmE4OWI3MjRhMTZjNDcxNmQ1',
                            },
                        }
                    );
                    const { access_token } = tokenResponse.data;

                    setAccessToken(access_token);
                    saveAccessToken(access_token);
                    fetchProfileAndHeartRateData(access_token);
                    fetchSpo2Data(access_token);
                    fetchSkinTemperatureData(access_token);
                    fetchRespirationData(access_token);
                    fetchSleepData(access_token);
                } catch (error: any) {
                    console.error('Error al obtener el token de acceso:', error.response?.data || error.message);
                }
            };

            handleTokenExchange();
        }

    };

    //   const handleAuthButtonPress = async () => {
    //     try {
    //         const result = await promptAsync();
    //         // promptAsync abrirá la ventana de inicio de sesión/autorización
    //         console.log('PromptAsync Result:', result);
    //     } catch (error) {
    //         console.error('Error al iniciar la autorización:', error);
    //     }
    // };

    const getIdPatient = async () => {
        const me = await AsyncStorage.getItem('me')
        console.log(me)
        let meJson = JSON.parse(me!)
        console.log(meJson)
        if (meJson.fitbitAccessToken !== '') {
            setFitbitJson(meJson.fitbitAccessToken)
            setAccessToken(meJson.fitbitAccessToken)
            fetchProfileAndHeartRateData(meJson.fitbitAccessToken);
            fetchSpo2Data(meJson.fitbitAccessToken);
            fetchSkinTemperatureData(meJson.fitbitAccessToken);
            fetchRespirationData(meJson.fitbitAccessToken);
            fetchSleepData(meJson.fitbitAccessToken);
            setDataFitbit(true)
        }else{
            setId_patient(meJson.id_patient)
            setDataFitbit(false)
        }
    }

    useEffect(() => {
        getIdPatient()
    } , 
    []
    // [response]
    )

    return (

        <View style={{...stylesCard.container, marginTop: top +30}}>

            {
                accessToken ? (
                    <>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ color: '#000', fontSize: 13, fontWeight: '500' }}>
                                Mediciones
                            </Text>
                        </View>

                        <Card style={stylesCard.cardContainer}>
                            <Card.Content>
                                <View style={{ flexDirection: 'row', width: 310 }}>
                                    <View style={{ ...stylesCard.cardRectangle, flexDirection: 'row' }}>
                                        <View style={{ alignSelf: 'center', width: '50%' }}>
                                            <Text style={{ color: '#0E54BE', fontSize: 13, marginLeft: 10, fontWeight: '400' }}>Sensor Ritmo Cardíaco</Text>
                                            <Text style={{ color: '#0E54BE', fontSize: 13, marginLeft: 10, fontWeight: '400' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                                                {Object.keys(heartRateData).length > 0 && (Math.round(heartRateData.heartRateZones[0].max/heartRateData.heartRateZones[0].min*20))}
                                                {Object.keys(heartRateData).length === 0 && (0)}
                                                </Text>&nbsp;
                                                bpm
                                            </Text>
                                        </View>
                                        <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', width: '50%' }}>
                                            <Ionicons name="pulse" color="#0E54BE" style={{ fontSize: 65 }} />
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: -6, marginTop: 0 }}>
                                        <TouchableOpacity onPress={toggleModal}>
                                            <Ionicons name="ellipsis-vertical" color="#0E54BE" size={35} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ ...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0 }}>
                                    <View style={{ width: '45%', alignSelf: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                            <Ionicons name="water" color="red" size={35} />
                                            <Text style={{ color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5 }}>
                                                {spo2Data && (spo2Data.avg)}
                                                {!spo2Data && (0)}
                                            </Text>
                                        </View>
                                        <Text style={{ color: '#0E54BE', fontSize: 11, textAlign: 'center', fontWeight: '600' }}>Presión sanguinea</Text>
                                    </View>
                                    <View style={{ width: '0%', height: 50, borderWidth: 0.3, borderColor: '#0E54B', alignSelf: 'center' }} />
                                    <View style={{ width: '45%', alignSelf: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>

                                            <Ionicons name="heart" color="red" size={35} />
                                            <Text style={{ color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5 }}>
                                                {Object.keys(heartRateData).length > 0 && (Math.round(heartRateData.heartRateZones[0].max/heartRateData.heartRateZones[0].min*20))}
                                                {Object.keys(heartRateData).length === 0 && (0)}
                                            </Text>
                                        </View>
                                        <Text style={{ color: '#0E54BE', fontSize: 11, textAlign: 'center', fontWeight: '600' }}>Ritmo Cardiaco</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                        
                        <Modal isOpen={isModalVisible} onClose={!isModalVisible}>
                            <Modal.Content width="340px" height="550px">
                                <Modal.CloseButton onPress={toggleModal} />
                                <Modal.Body>

                                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 35 }}>
                                        <View style={{ ...stylesCard.cardRectangle, flexDirection: 'row' }}>
                                            <View style={{ alignSelf: 'center', width: '50%' }}>
                                                <Text style={{ color: '#0E54BE', fontSize: 12.5, marginLeft: 10 }}>Sensor Ritmo Cardíaco</Text>
                                                <Text style={{ color: '#0E54BE', fontSize: 12.5, marginLeft: 10 }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 25 }}>    {Object.keys(heartRateData).length > 0 && (heartRateData.restingHeartRate)}
                                                {Object.keys(heartRateData).length == 0 && (0)}</Text>&nbsp;
                                                    bpm
                                                </Text>
                                            </View>
                                            <View style={{ alignSelf: 'center', alignContent: 'center', alignItems: 'center', width: '50%' }}>
                                                <Ionicons name="pulse" color="#0E54BE" style={{ fontSize: 65 }} />
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ ...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0 }}>
                                        <View style={{ width: '45%', alignSelf: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                                <Ionicons name="water" color="red" size={35} />
                                                <Text style={{ color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5 }}>
                                                    {spo2Data&&(spo2Data.avg)}
                                                    {!spo2Data&&(0)}
                                                </Text>
                                            </View>
                                            <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center' }}>Oxigeno en la sangre</Text>
                                        </View>
                                        <View style={{ width: '0%', height: 50, borderWidth: 0.3, borderColor: '#0E54B', alignSelf: 'center' }} />
                                        <View style={{ width: '45%', alignSelf: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                                <Ionicons name="heart" color="red" size={35} />
                                                <Text style={{ color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5 }}>
                                                {Object.keys(heartRateData).length > 0 && (heartRateData.restingHeartRate)}
                                                {Object.keys(heartRateData).length == 0 && (0)}
                                                </Text>
                                            </View>
                                            <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center' }}>Sensor Ritmo Cardiaco</Text>
                                        </View>
                                    </View>

                                    <View style={{ ...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0 }}>
                                        <View style={{ width: '45%', alignSelf: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                                <Ionicons name="thermometer" color="orange" size={35} />
                                                <Text style={{ color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5 }}>
                                                    {skinTemperatureData&&(
                                                        skinTemperatureData
                                                    )}
                                                    {!skinTemperatureData&&(
                                                        0
                                                    )}
                                                °</Text>
                                            </View>
                                            <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center' }}>Temperatura</Text>
                                        </View>
                                        <View style={{ width: '0%', height: 50, borderWidth: 0.3, borderColor: '#0E54B', alignSelf: 'center' }} />
                                        <View style={{ width: '45%', alignSelf: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                                <Ionicons name="moon" color="blue" size={35} />
                                                <Text style={{ color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5 }}>
                                                {sleepData && (sleepData.efficiency)}
                                                {!sleepData && (0)}
                                                %</Text>
                                            </View>
                                            <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center' }}>Seguimiento del sueño</Text>
                                        </View>
                                    </View>

                                    <View style={{ ...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0 }}>
                                        <View style={{ width: '45%', alignSelf: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                                <Ionicons name="body-outline" color="green" size={35} />
                                                <Text style={{ color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5 }}> 
                                                    {respirationData && (respirationData)}
                                                    {!respirationData && (0)}
                                                </Text>
                                            </View>
                                            <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center' }}>Respiración</Text>
                                        </View>
                                        <View style={{ width: '0%', height: 50, borderWidth: 0.3, borderColor: '#0E54B', alignSelf: 'center' }} />

                                    </View>
                                        {/* <View style={{ width: '45%', alignSelf: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                                <Ionicons name="flower-outline" color="purple" size={35} />
                                                <Text style={{ color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5 }}>96</Text>
                                            </View>
                                            <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center' }}>Clico menstrual</Text>
                                        </View> */}
                                    {/* <View style={{ ...stylesCard.cardRectangle, flexDirection: 'row', borderWidth: 0, marginTop: 0 }}>
                                        <View style={{ width: '45%', alignSelf: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                                <Ionicons name="ellipse" color="orange" size={35} />
                                                <Text style={{ color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5 }}>50</Text>
                                            </View>
                                            <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center' }}>Niveles de estrés</Text>
                                        </View>
                                        <View style={{ width: '0%', height: 50, borderWidth: 0.3, borderColor: '#0E54B', alignSelf: 'center' }} />
                                        <View style={{ width: '45%', alignSelf: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                                <Ionicons name="body-outline" size={35} color="green" />
                                                <Text style={{ color: '#0E54BE', fontSize: 22, textAlign: 'center', fontWeight: 'bold', marginHorizontal: 5 }}>76</Text>
                                            </View>
                                            <Text style={{ color: '#0E54BE', fontSize: 11, fontWeight: '600', textAlign: 'center' }}>Presión sanguinea</Text>
                                        </View>
                                    </View> */}

                                </Modal.Body>
                            </Modal.Content>
                        </Modal>
                    </>
                ) : (
                    <>

                        <Card style={stylesCard.cardContainer}>
                            <Card.Content>
                                {/* <Button title="Authorize Fitbit" onPress={handleAuthButtonPress} /> */}
                                <TouchableOpacity style={{...styles.button, width: 300}} onPress={handleAuthButtonPress}>
                                    <Text style={{fontSize: 20, fontWeight: '500', color: '#fff'}}>
                                        Authorize Fitbit
                                    </Text>
                                </TouchableOpacity>

                                <Text style={{fontSize: 15, fontWeight: '500', color: '#000', textAlign: 'center', marginTop: 15}}>
                                    Para poder ver tus datos de Fitbit, debes autorizar la aplicación.
                                </Text>
                                <Text style={{fontSize: 15, fontWeight: '500', color: '#000', textAlign: 'center', marginTop: 15}}>
                                    Oprime el botón de arriba para autorizar.
                                </Text>
                            </Card.Content>
                        </Card>

                    </>
                )
            }

        </View>
    );
};

export const CardHomeMedic = () => {
    const { top } = useSafeAreaInsets();
    return (
        <View style={{...stylesCard.container, marginTop: top+30, marginBottom: 20}}>
            <Card>
                <Card.Content>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: '20%', height: 65, alignItems: 'center', alignContent: 'center', backgroundColor: '#25CC41', marginHorizontal: 5, borderRadius: 12, marginTop: 15}}>
                        
                            <Text style={{color: '#fff', marginTop: 10, fontSize: 13, fontWeight: 'bold'}}>12</Text>
                            <Text style={{color: '#fff',fontSize: 13, fontWeight: 'bold' }}>Enero</Text>
                        </View>
                        <View style={{width: '70%', alignSelf: 'center'}}>
                            <Text style={{color: '#545454', fontSize: 18, fontWeight: 'bold', marginTop: 5}}>
                                Solicitud de Consulta
                            </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: '400', marginTop: 5}}>
                                Detalle de la consulta
                            </Text>
                            <Text style={{color: '#545454', fontSize: 13, fontWeight: 'bold', marginTop: 5}}>
                                Paciente
                            </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: '400', marginTop: 5}}>
                                Alexis Grande
                            </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: 'bold', marginTop: 5}}>
                                Sintomas
                            </Text>
                            <Text style={{color: '#545454', fontSize: 15, fontWeight: '400', marginTop: 5}}>
                                Fiebre, dolor de cabeza, tos...
                            </Text>
                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <View style={{width: '50%', alignSelf: 'center'}}>
                                    <Button style={{backgroundColor: '#25CC41', borderRadius: 12, width: '90%', alignSelf: 'center'}}>
                                        <Text style={{color: '#fff', fontSize: 13, fontWeight: 'bold'}}>Aceptar</Text>
                                    </Button>
                                </View>
                                <View style={{width: '50%', alignSelf: 'center'}}>
                                    <Button style={{backgroundColor: '#D9D9D9', borderRadius: 12, width: '90%', alignSelf: 'center'}}>
                                        <Text style={{color: '#000', fontSize: 13, fontWeight: 'bold'}}>Posponer</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );


}


const stylesCard = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '90%',
        height: 220,
    },
    image: {
        flex: 1,
    },
    cardContainer: {
        flex: 1,
        borderRadius: 10,
        borderColor: '#000',
        alignContent: 'center',
        overflow: 'hidden',
        alignItems: 'center',
    },
    cardRectangle: {
        width: '100%',
        height: 100,
        borderWidth: 0.4,
        borderColor: 'rgba(14, 84, 190, 0.5)',
        borderRadius: 12,
        padding: 10,
        justifyContent: 'space-between',
    },
    });
