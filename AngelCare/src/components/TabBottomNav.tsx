// import { Box, HStack, Center, Pressable, Text, Icon } from 'native-base';
import React, { useState } from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const TabBottomNav = () => {

    // const [selected, setSelected] = useState(0);

    return (
        <View style={{width: '90%', backgroundColor: '#0E54BE', flexDirection: 'row', alignSelf: 'center', borderRadius: 12, height: 50, justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 1000, bottom: 0, }}>
            <Ionicons name="grid-outline" size={30} color="#900" />
            <Ionicons name="rocket" size={30} color="#900" />
            <Ionicons name="search-outline" size={30} color="#900" />
            <Ionicons name="person-outline" size={30} color="#900" />
        </View>

        // <Box flex={1} bg="white" safeAreaTop width="100%" maxW="300px" alignSelf="center">
        //     <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
        //         <Pressable opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
        //             <Center>
        //             {/* <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? 'home' : 'home-outline'} />} color="white" size="sm" /> */}
        //             <Text color="white" fontSize="12">
        //                 Home
        //             </Text>
        //             </Center>
        //         </Pressable>
        //         <Pressable opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
        //             <Center>
        //             {/* <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="sm" /> */}
        //             <Text color="white" fontSize="12">
        //                 Search
        //             </Text>
        //             </Center>
        //         </Pressable>
        //         <Pressable opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
        //             <Center>
        //             {/* <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? 'cart' : 'cart-outline'} />} color="white" size="sm" /> */}
        //             <Text color="white" fontSize="12">
        //                 Cart
        //             </Text>
        //             </Center>
        //         </Pressable>
        //         <Pressable opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)}>
        //             <Center>
        //             {/* <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="sm" /> */}
        //             <Text color="white" fontSize="12">
        //                 Account
        //             </Text>
        //             </Center>
        //         </Pressable>
        //     </HStack>
        // </Box>
    )
}
