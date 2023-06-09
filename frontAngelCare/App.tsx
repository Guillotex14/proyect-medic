import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigation } from './stacknavigation';
import { StackNavigations } from './src/navigation/StackNavigations';
import { NativeBaseProvider } from 'native-base';
// import { useFooter } from './src/hooks/useFooter';
import { FooterNavigation } from './src/components/Footer';
// import { useEffect } from 'react';

export default function App() {

  // const { showFooter, onShowFooter } = useFooter();

  // useEffect(() => {
  //   showFooter
  // }, [])

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View> 
    <NavigationContainer>
      <NativeBaseProvider>
        <StackNavigations />
        </NativeBaseProvider>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
