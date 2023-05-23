import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { styles } from '../theme/ThemeApp';
import { CardsAmbulance } from '../components/LastDate';

export const AmbulanceScreen = () => {
  return (

    <ScrollView>
      <View style={{...styles.container}}>
        <View style={{width: '100%', alignItems: 'center', alignContent: 'center', marginHorizontal: 40, alignSelf: 'center', marginTop: 70 }}>
            <Text style={{fontSize: 20, textAlign: 'left', marginHorizontal: 10, color: 'black', fontWeight: 'bold'}}>
                Ambulancias
            </Text>
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
