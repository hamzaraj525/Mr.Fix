import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  white: {
    width: 110,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    width: 110,
    height: 40,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2,
  },
});
