import { ChevronLeftIcon, ChevronRightIcon } from 'native-base'
import React, { useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { styles } from '../theme/ThemeApp'
import { StackScreenProps } from '@react-navigation/stack'
import { Avatar, Card } from 'react-native-paper'
import { Images } from '../assets/imgs/imgs'
import { TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props extends StackScreenProps<any, any> {}
export const ChatDateScreen = ({navigation}:Props) => {

    const {top, bottom} = useSafeAreaInsets();
    const [isFinish, setIsFinish] = useState(false);

    return (
        
        <View style={styles.container}>
            {
            !isFinish && (
                <>
                    <View style={{zIndex: 1, backgroundColor: "#0E54BE", flexDirection: 'row', height: 150, borderRadius: 20 }}>
                        <View style={{width: '10%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20}} >
                            {/* <TouchableOpacity onPress={()=> navigation.pop()}>
                                <ChevronLeftIcon size="6" style={{color: "#fff", marginLeft: 20}}/>
                            </TouchableOpacity> */}
                        </View>
                        <View style={{width: '30%', marginTop: 20, alignContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                            <Avatar.Image size={60} source={Images.doctor} />
                        </View>
                        <View style={{width: '50%', alignSelf: 'center', marginTop: 20}} >
                            <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>Dr. Eduardo Medina</Text>
                            <Text style={{fontSize: 14, color: 'white', fontWeight: 'bold'}}>Activo</Text>
                        </View>
                        <View style={{width: '10%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10}}>
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>.</Text>
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: -15}}>.</Text>
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: -15}}>.</Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: "#E6F1FF", flex:1, marginTop: 10}}>
                        <View style={{alignItems: "flex-start", marginVertical: 10}}>
                            <View style={{borderRadius: 30, backgroundColor: "#fff", marginHorizontal: 10, minHeight: 70, minWidth: 100, maxWidth: 330, alignContent: 'center'}}>
                                <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold', marginHorizontal: 20,marginVertical:10 ,alignSelf: 'center', alignContent: 'center', alignItems: 'center'}}>
                                    La conversación será dirigida a un chat de Whatsapp, presiona en el enlace y será dirigido wa.link/Angel2Care
                                </Text>
                            </View>
                        </View>
                        <View style={{alignItems: 'flex-end', marginVertical: 10}}>
                            <View style={{borderRadius: 30, backgroundColor: "#C6EFE5C2", marginHorizontal: 10, minHeight: 70, minWidth: 100, maxWidth: 330, alignContent: 'center'}}>
                                <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold', marginHorizontal: 20,marginVertical:10 ,alignSelf: 'center', alignContent: 'center', alignItems: 'center'}}>Gracias por toda la atencion optenida de parte de AngelCare</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{backgroundColor: "#fff", flexDirection: 'row'}}>
                        <View style={{width: "85%"}}>
                            <TextInput placeholder="Escribe un mensaje" style={{...styles.input, marginLeft:15, marginBottom: 10}}/>
                        </View>
                        <View style={{width: "10%", alignSelf: 'center'}}>
                            <TouchableOpacity style={{borderRadius: 15, backgroundColor: "#0E54BE",width: 45, height: 45}} onPress={()=>setIsFinish(true)}>
                                <ChevronRightIcon size="7" style={{color: "#fff", alignSelf: 'center', marginTop: 8, fontWeight: 'bold'}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
                )
            }
            {
                isFinish && (
            
                    <>
                        <View style={{ flexDirection: 'row',alignSelf: 'center', marginHorizontal: 30, marginTop: top+150 }}>
                            <Avatar.Image size={60} source={Images.doctor} />
                            <Avatar.Image size={60} source={Images.doctor} />
                        </View>

                        <View style={{alignSelf: 'center', marginHorizontal: 30, marginTop: 20}}>
                            <Text style={{ fontSize: 22, fontWeight: '500', color: "#18273B", textAlign: 'center' }}>
                                Tu sesión con Dr. Eduardo fue completada
                            </Text>
                        </View>

                        <Card style={{ marginVertical: 10, borderRadius: 20, marginHorizontal: 30, marginTop: 20 }}>
                            <Card.Content>
                                <Text style={{color: "#18273B", fontSize: 20, marginTop: 10,fontWeight: '500'}}>Dr. Eduardo Madina</Text>
                                <Text style={{color: "#838A93", fontSize: 13, marginTop: 10}}>Internista</Text>
                                <Text style={{color: "#838A93", fontSize: 13, marginTop: 10}}>08:00 am - 08:30 am</Text>
                                <Text style={{color: "#04AD01", fontSize: 13, marginTop: 10}}>Completedo</Text>
                                <TouchableOpacity style={{borderColor: "#0E54BE", marginHorizontal: 30, alignSelf: 'center', borderWidth: 1, width: '100%', height: 50, borderRadius: 15, marginTop: 20}}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0E54BE', textAlign: 'center', marginTop: 10 }}>Ver detalle</Text>
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>

                        <View style={{marginTop: 100+top}}>
                            <TouchableOpacity style={{backgroundColor: "#0E54BE",marginHorizontal: 30, alignSelf: 'center', width: "85%", height: 50, borderRadius: 15,}} onPress={() => { navigation.navigate('Home') }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: 10 }}>Continuar</Text>
                            </TouchableOpacity>
                        </View>
                    </> 
                )
            }
        </View>


)
}
