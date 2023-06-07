import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { CardsAmbulance } from '../components/LastDate';
import { ChevronLeftIcon } from 'native-base';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const AmbulanceScreen = ({navigation}:Props) => {
  return (

    <ScrollView>
      <View style={{...styles.container}}>
        <View style={{width: '90%', alignItems: 'center', alignContent: 'center', marginHorizontal: 40, alignSelf: 'center', marginTop: 70, flexDirection: 'row' }}>

          <View style={{width: '30%', marginLeft: 10, }}>
            <TouchableOpacity onPress={()=>{navigation.pop()}}>
                <ChevronLeftIcon style={{color: 'black', fontSize: 20, marginRight: 10}} size="lg" />
            </TouchableOpacity>
          </View>
          <View style={{width: '60%'}}>
            <Text style={{fontSize: 20, textAlign: 'left', marginLeft: -20, color: 'black', fontWeight: 'bold'}}>
              Ambulancias
            </Text>
          </View>
        </View>

        <View style={{width: '100%', alignItems: 'center', alignContent: 'center', marginHorizontal: 40, alignSelf: 'center', marginTop: 30 }}>
          <CardsAmbulance />
          <CardsAmbulance />
          <CardsAmbulance />
          <CardsAmbulance />
          <CardsAmbulance />
        </View>
      </View>

    </ScrollView>

  );
};
