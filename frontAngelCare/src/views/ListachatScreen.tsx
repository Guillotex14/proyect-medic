import { ChevronLeftIcon, ChevronRightIcon } from 'native-base'
import React from 'react'
import { TouchableOpacity, View, Text, TextInput, Pressable } from 'react-native'
import { styles } from '../theme/ThemeApp'
import { StackScreenProps } from '@react-navigation/stack'
import { Avatar, Divider } from 'react-native-paper'
import { Images } from '../assets/imgs/imgs'
import { useNavigation } from '@react-navigation/native'

interface Props extends StackScreenProps<any, any>{};
export const ListachatScreen = ({navigation}:Props) => {

    const nav = useNavigation()


    return (
        <View style={styles.container}>
            <View style={{zIndex: 1, backgroundColor: "#0E54BE", flexDirection: 'row', height: 150, borderRadius: 20 }}>
                <View style={{width: '10%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 20}} >
                    <TouchableOpacity onPress={()=> navigation.pop()}>
                        <ChevronLeftIcon size="6" style={{color: "#fff", marginLeft: 20}}/>
                    </TouchableOpacity>
                </View>

                <View style={{width: '80%', alignSelf: 'center', marginTop: 20}} >
                    <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Chat</Text>
                </View>

                <View style={{width: '10%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10}}>
                    <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>.</Text>
                    <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: -15}}>.</Text>
                    <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: -15}}>.</Text>
                </View>
            </View>

            <View style={{backgroundColor: "#fff", flex:1}}>
                <Pressable onPress={()=> navigation.navigate('Chat')}>
                    <View style={{width: '100%', height: 70, backgroundColor: "#fff", flexDirection: 'row', borderRadius: 10, marginTop: 10}}>
                        <View style={{width: '20%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10}}>
                            <Avatar.Image size={50} source={Images.doctor} />
                        </View>
                        <View style={{width: '80%', alignSelf: 'center', marginTop: 10}} >
                            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Dr. Eduardo Medina</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold'}}>Activo</Text>
                        </View>
                    </View>
                </Pressable>
                <Divider style={{marginTop: 10}}/>
                <Pressable onPress={()=> navigation.navigate('Chat')}>
                    <View style={{width: '100%', height: 70, backgroundColor: "#fff", flexDirection: 'row', borderRadius: 10, marginTop: 10}}>
                        <View style={{width: '20%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10}}>
                            <Avatar.Image size={50} source={Images.doctor} />
                        </View>
                        <View style={{width: '80%', alignSelf: 'center', marginTop: 10}} >
                            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Dr. Eduardo Medina</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold'}}>Activo</Text>
                        </View>
                    </View>
                </Pressable>
                <Divider style={{marginTop: 10}}/>
                <Pressable onPress={()=> navigation.navigate('Chat')}>
                    <View style={{width: '100%', height: 70, backgroundColor: "#fff", flexDirection: 'row', borderRadius: 10, marginTop: 10}}>
                        <View style={{width: '20%', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10}}>
                            <Avatar.Image size={50} source={Images.doctor} />
                        </View>
                        <View style={{width: '80%', alignSelf: 'center', marginTop: 10}} >
                            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>Dr. Eduardo Medina</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold'}}>Activo</Text>
                        </View>
                    </View>
                </Pressable>
            </View>

        </View>
    )
}
