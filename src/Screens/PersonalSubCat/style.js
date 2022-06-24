import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    height: 65,
    width: 65,
    borderRadius: 65 / 2,
    backgroundColor: '#FED116',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2,
  },
  subPraent: {
    marginBottom: '9%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  productContainer: {
    // shadowColor: 'black  ',
    // shadowOffset: {
    //   width: 0,
    //   height: 8,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ecf5fb',
    marginTop: '5%',
    width: '75%',
    height: 155,
    borderRadius: 22,
  },
  img: {
    width: '32%',
    height: '32%',
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '82%',
    padding: '4%',
    height: 55,
    marginBottom: 10,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'black',
    marginTop: 15,
  },
  searchTxt: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 18,
  },
});
