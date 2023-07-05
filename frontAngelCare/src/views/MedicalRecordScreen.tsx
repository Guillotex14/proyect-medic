import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { StackScreenProps } from '@react-navigation/stack';
import { ChevronLeftIcon } from 'native-base';
import apiConnection from '../api/Concecction';


interface Props extends StackScreenProps<any, any>{}

export const MedicalRecordScreen = ({navigation, route}:Props) => {
    
    const params = route.params;
    // console.log(id_patient)
    const [diseases, setDiseases] = useState('');
    const [allergies, setAllergies] = useState('');
    const [condition, setCondition] = useState('');
    const [additional, setAdditional] = useState('');
    

    const getMedicalFile = async () => {

        await apiConnection.post('/doctor/getMedicalFile', {id_patient: params!.id_patient}).
        then((response) => {
            console.log(response.data);
            setDiseases(response.data.data.disease);
            setAllergies(response.data.data.allergy);
            setCondition(response.data.data.condiction);
            setAdditional(response.data.data.additional);
        }).catch((error) => {
            console.log(error);
        });

    }

    useEffect(() => {
        getMedicalFile();
    }, [])
    

    return (
        <View style={{...styles.container}}>

            <View style={{width: '100%', marginHorizontal: 40, alignSelf: 'center', marginTop: 50, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                <View style={{width: '20%', marginLeft: 20}}>
                    <TouchableOpacity onPress={()=>{ navigation.pop()}}
                    style={{marginLeft: 18}}>
                        <ChevronLeftIcon size={6} color={'black'} />
                    </TouchableOpacity>
                </View>
                <View style={{width: '70%'}}>
                    <Text style={{fontSize: 20, marginHorizontal: 10, color: 'black', fontWeight: 'bold', marginLeft: 40}}>
                        Ficha Médica
                    </Text>
                </View>
            </View>

            <View style={{width: '100%', marginHorizontal: 15, marginTop: 50, marginBottom: 20 }}>
                <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                    Enfermedades
                </Text>
                <Text style={{fontSize: 17, marginHorizontal: 10,  marginVertical: 5}}>
                    {diseases}
                </Text>
            </View>

            <View style={{width: '100%', marginHorizontal: 15, marginVertical: 20,  }}>
                <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                    Alergias
                </Text>
                <Text style={{fontSize: 17, marginHorizontal: 10,  marginVertical: 5}}>
                    {allergies}
                </Text>
            </View>

            <View style={{width: '100%', marginHorizontal: 15,  marginVertical: 20,  }}>
                <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                    Condición
                </Text>
                <Text style={{fontSize: 17, marginHorizontal: 10, marginVertical: 5}}>
                    {condition}
                </Text>
            </View>

            <View style={{width: '100%', marginHorizontal: 15, marginVertical: 20,  }}>
                <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                    Adicional
                </Text>
                <Text style={{fontSize: 17, marginHorizontal: 10, marginVertical: 5}}>
                    {additional}
                </Text>
            </View>

            <View style={{width: '100%', marginHorizontal: 15, marginTop: 10,  }}>
                
                <View style={{width: '100%', marginHorizontal: 10, alignSelf: 'center', flexDirection: 'row'}}> 
                    <View style={{width: '50%', marginHorizontal: 10, alignSelf: 'center' }}>
                        <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                            Archivos adjuntos
                        </Text>
                    </View>
                    <View style={{width: '50%', marginHorizontal: 10, alignSelf: 'center' }}>
                        <Text style={{fontSize: 17, marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                            ver todo
                        </Text>
                    </View>
                </View>

                <View style={{width: '100%', marginHorizontal: 10, alignSelf: 'center', flexDirection: 'row'}}>
                    <View style={{width: '40%', marginHorizontal: 5, alignSelf: 'center', marginTop: 15 }}>
                        <View style={{backgroundColor: '#D9D9D9', borderRadius: 12, width: '70%', height: 100}}>

                        </View>
                    </View>

                    <View style={{width: '40%', marginHorizontal: 5, alignSelf: 'center', marginTop: 15 }}>
                        <View style={{backgroundColor: '#D9D9D9', borderRadius: 12, width: '70%', height: 100}}>

                        </View>
                    </View>

                    {/* <View style={{width: '40%', marginHorizontal: 5, alignSelf: 'center', marginTop: 15 }}>
                        <View style={{backgroundColor: '#D9D9D9', borderRadius: 12, width: '70%', height: 100}}>

                        </View>
                    </View> */}
                    
                </View>
            </View>
        </View>
    )
}
