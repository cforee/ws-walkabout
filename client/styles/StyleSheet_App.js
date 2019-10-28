import { StyleSheet } from 'react-native';

export default function StyleSheet_App() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginTop: 55,
      color: '#fff',
    },
    touchable: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 13,
      paddingRight: 13,
      borderColor: '#888',
      borderWidth: 1,
      width: 89,
      textAlign: 'center',
      marginTop: 21,
      color: '#fff',
    }
  });

}
