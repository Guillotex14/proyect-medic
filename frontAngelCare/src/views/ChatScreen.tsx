import React from 'react'
import { TouchableOpacity, View, Text, TextInput } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { StackScreenProps } from '@react-navigation/stack';
import { ChevronLeftIcon, ChevronRightIcon } from 'native-base';
import { Avatar } from 'react-native-paper';
import { Images } from '../assets/imgs/imgs';

interface Props extends StackScreenProps<any, any>{};
export const ChatScreen = ({navigation}:Props) => {
    return (
        <View style={styles.container}>
            <View style={{zIndex: 1, backgroundColor: "#0E54BE", flexDirection: 'row', height: 150, borderRadius: 20 }}>
                <View style={{width: '10%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20}} >
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <ChevronLeftIcon size="6" style={{color: "#fff", marginLeft: 20}}/>
                    </TouchableOpacity>
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
                    <TouchableOpacity style={{borderRadius: 15, backgroundColor: "#0E54BE",width: 45, height: 45}} onPress={()=>{navigation.navigate('')}}>
                        <ChevronRightIcon size="7" style={{color: "#fff", alignSelf: 'center', marginTop: 8, fontWeight: 'bold'}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
