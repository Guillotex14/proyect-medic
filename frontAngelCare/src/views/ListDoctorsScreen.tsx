import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { styles } from '../theme/ThemeApp'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon, FavouriteIcon } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';
import { Avatar, Card } from 'react-native-paper';
import { Images } from '../assets/imgs/imgs';

interface Props extends StackScreenProps<any, any>{};
export const ListDoctorsScreen = ({navigation}:Props) => {
    const {top} = useSafeAreaInsets();
    return (
        <View style={{...styles.container}}>
            <View style={{width: '100%',flexDirection: 'row', alignItems: 'center', marginTop: top+50}}>
                <View style={{width: '15%', alignItems: 'center'}} >
                <TouchableOpacity onPress={()=> navigation.pop()}>
                    <ChevronLeftIcon size="6" style={{color: "#000", marginLeft: 20}}/>
                </TouchableOpacity>
                </View>
                <View style={
                {width: '75%'}}>
                <Text style={{fontSize: 20, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>Doctores</Text>
                </View>
            </View>
        
            <View style={{width: '100%', marginTop: 15}}>

                <Card style={{ height: 120, marginTop: 20, borderRadius: 1, backgroundColor: '#fff', marginHorizontal: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <View style={{width: '25%', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                            <Avatar.Image size={80} source={Images.doctor} style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 10, marginLeft: 10}}/>
                        </View>
                        <View style={{width: '60%'}}>
                            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 10}}>Dr. Eduardo Medina</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold', marginLeft: 10}}>Especialidad</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold', marginLeft: 10}}>7 años de experiencia</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold', marginLeft: 10}}>XX casos clinicos</Text>
                        </View>
                        <View style={{width: '10%'}}>
                            <FavouriteIcon size="6" style={{color: "red", marginLeft: 5, marginTop: -35}}/>
                        </View>
                    </View>
                </Card>

                <Card style={{ height: 120, marginTop: 20, borderRadius: 1, backgroundColor: '#fff', marginHorizontal: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <View style={{width: '25%', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                            <Avatar.Image size={80} source={Images.doctor} style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 10}}/>
                        </View>
                        <View style={{width: '60%'}}>
                            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 10}}>Dr. Eduardo Medina</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold', marginLeft: 10}}>Especialidad</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold', marginLeft: 10}}>7 años de experiencia</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold', marginLeft: 10}}>XX casos clinicos</Text>
                        </View>
                        <View style={{width: '10%'}}>
                            <FavouriteIcon size="6" style={{color: "red", marginLeft: 5, marginTop: -35}}/>
                        </View>
                    </View>
                </Card>

                <Card style={{ height: 120, marginTop: 20, borderRadius: 1, backgroundColor: '#fff', marginHorizontal: 20}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <View style={{width: '25%', alignItems: 'center', alignContent: 'center', alignSelf: 'center'}}>
                            <Avatar.Image size={80} source={Images.doctor} style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 10}}/>
                        </View>
                        <View style={{width: '60%'}}>
                            <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold', marginLeft: 10}}>Dr. Eduardo Medina</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold', marginLeft: 10}}>Especialidad</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold', marginLeft: 10}}>7 años de experiencia</Text>
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold', marginLeft: 10}}>XX casos clinicos</Text>
                        </View>
                        <View style={{width: '10%'}}>
                            <FavouriteIcon size="6" style={{color: "red", marginLeft: 5, marginTop: -35}}/>
                        </View>
                    </View>
                </Card>
            
            </View>



        </View>
    )
}
