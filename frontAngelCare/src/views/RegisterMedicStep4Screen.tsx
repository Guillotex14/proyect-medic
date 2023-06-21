import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react'
import { styles } from '../theme/ThemeApp';
import { Image, Modal, Spinner } from 'native-base';
import { Images } from '../assets/imgs/imgs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any>{};

export const RegisterMedicStep4Screen = ({navigation}: Props) => {
  // state of screen
  const { top, bottom } = useSafeAreaInsets();  

  //state of modal
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNext = () => {
    console.log('next step 4');
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      navigation.navigate('HomeMedic');
    }, 3000);
  }


  return (
    <View style={{...styles.container, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000',  marginBottom: bottom+120 }}>Permitir ubicación</Text>
      <Image source={Images.pin_mapa} alt="step4" style={{width: 250, height: 250, marginTop: top-50}} />
      <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000',marginTop: top+30}}>Ubicación</Text>
      <Text style={{fontSize: 12, fontWeight: '300', color: '#000', marginTop: top+10}}>Permite que el dispositivo acceda a tu ubicación</Text>
      <TouchableOpacity style={{...styles.button, marginTop: 50}} onPress={()=>{handleNext()}}>
        <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}} >Permitir</Text>
      </TouchableOpacity>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content maxWidth="80px" style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
          <Modal.Body>
            <Spinner color="blue.500" size="lg"/>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  )
}
