import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../theme/ThemeApp';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CardHome } from '../components/CardHome';
import { AddIcon } from 'native-base';
import { LastDate } from '../components/LastDate';
import { CardMedicsHome } from '../components/CardMedicsHome';
// import { useModalMeditions } from '../hooks/useModalMeditions';
import { StackScreenProps } from '@react-navigation/stack';
// import { ModalMeditions } from '../components/ModalMeditions';
// import Carousel from 'react-native-snap-carousel';
// import { TabBottomNav } from '../components/TabBottomNav';

interface Props extends StackScreenProps<any, any>{}
export const HomeScreen = ({navigation}: Props) => {

    const { top } = useSafeAreaInsets();
    // const { isOpen, openModal } = useModalMeditions();

    // const [showModal, setShowModal] = useState(false);

    // if (isOpen) {
    //     setShowModal(true);
    // }


    return (
        <ScrollView>
            <View style={{...styles.container, backgroundColor: '#0E54BE'}}>

                {/* Header */}
                <View style={{ flexDirection: 'row', height: 150}}>
                    <Text style={{...styles.title, color: 'white', fontSize: 13, width: '60%'}}>Bienvenido, Usuario</Text>
                    {/* <AddIcon onPress={()=>{navigation.navigate('Profile')}}/> */}
                    <Text style={{...styles.title, color: 'white', fontSize: 13, textAlign:'right', width: '30%'}} onPress={()=>{navigation.navigate('DatesHistorial')}}>Profile</Text>
                </View>

                {/* Card Fecha */}
                <View style={{backgroundColor: '#DEF2FF', flexDirection: 'row', borderRadius: 10, position: 'absolute', alignSelf: 'center', zIndex: 1, marginVertical: top+130, alignContent: 'center', alignItems: 'center', width: '95%'}}>
                    <Text style={{...styles.title, color: 'white', fontSize: 13, width: '60%'}}>Bienvenido, Usuario</Text>
                    <Text style={{...styles.title, color: 'white', fontSize: 13, textAlign:'right', width: '30%'}}>chatIcon</Text>
                </View>

                <View style={{...styles.container, backgroundColor: '#F8F8F8', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>

                    {/* Card de metricas */}
                    <CardHome/>

                    {/* Card comenzar servicio medico */}
                    <View style={{width: '90%', height: 80 , borderRadius: 12, backgroundColor: '#0E54BE', flexDirection: 'row', alignSelf: 'center', marginTop: 25}}>
                        <View style={{width: '80%', alignSelf: 'center'}}>
                            <Text style={{color: 'white', fontSize: 15,textAlign: 'left', marginHorizontal: 10}}>Comenzar</Text>
                            <Text style={{color: 'white', fontSize: 8, textAlign: 'left', marginHorizontal: 10}}>Presione aquí para solicitar un nuevo servicio</Text>
                        </View>
                        <View style={{width: '20%', alignSelf: 'center'}} >
                            <View style={{backgroundColor: 'white', borderRadius: 10, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                <AddIcon color="blue.500" size="4" onPress={()=>{navigation.navigate('Services')}}/>
                            </View>
                        </View>
                    </View>

                    {/* Card ultima cita */}
                    <LastDate />

                    {/* Cards y Carousel Doctores */}
                    {/* <Carousel
                        data={}
                        renderItem={() => <CardMedicsHome />}
                        sliderWidth={300}
                        itemWidth={300}
                    /> */}
                    <CardMedicsHome />

                </View>

                {/* <Modal isOpen={isOpen} onClose={!isOpen}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Modal Title</Modal.Header>
                        <Modal.Body>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                            blanditiis tenetur unde suscipit, quam beatae rerum inventore
                            consectetur, neque doloribus, cupiditate numquam dignissimos
                            laborum fugiat deleniti? Eum quasi quidem quibusdam.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group variant="ghost" space={2}>
                                <Button>Cancel</Button>
                                <Button>Save</Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal> */}


            </View>

        </ScrollView>
    );
};
