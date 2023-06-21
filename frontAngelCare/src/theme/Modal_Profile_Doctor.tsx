import { StyleSheet, Dimensions } from 'react-native';

//Estilos para el modal de tipo select

const { width, height } = Dimensions.get('window');

export const styles_modal = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: width * 0.8, // Ajusta el ancho del contenido del modal según tus necesidades
      maxHeight: height * 0.8, // Ajusta la altura máxima del contenido del modal según tus necesidades
      backgroundColor: 'white',
      borderRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    optionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      },
      optionText: {
        fontSize: 16,
    },
  });
