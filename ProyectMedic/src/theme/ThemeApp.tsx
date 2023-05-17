
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6F1FF',
        overflow: 'visible',
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: '#0E54BE'
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#B3B8C9',
        borderRadius: 12,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginTop: 12,
    },
    buttonGoogleLogin: {
        width: '40%',
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    buttonFBLogin: {
        width: '40%',
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    buttonGoogleText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#000000',
    },
    buttonFBText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#000000',
    },
    button: {
        width: '80%',
        backgroundColor: '#0E54BE',
        borderRadius: 10,
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        color: '#fff',
    },
    buttonLoginText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    underlineStyleBase: {
        width: 60,
        height: 60,
        borderWidth: 0,
        color: '#0E54BE',
        fontSize: 24,
        fontWeight: 'bold',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 10,
    },
    underlineStyleHighLighted: {
        borderColor: '#0E54BE',
    },

});