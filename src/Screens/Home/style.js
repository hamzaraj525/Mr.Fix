import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  profileImg: {
    borderWidth: 3,
    borderColor: 'white',
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
  },
  welcomeTxtBody: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 16,
    shadowOpacity: 0.3,
    shadowRadius: 6.5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    backgroundColor: '#FED116',
    padding: 18,
  },
  txt: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: Dimensions.get('window').width - 38,
    borderRadius: 12,
    marginTop: 14,
    height: 155,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '3%',
  },
});
