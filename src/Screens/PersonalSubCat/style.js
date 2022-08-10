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
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ecf5fb',
    marginTop: '5%',
    width: '75%',
    height: 150,
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
  titleTxt: {
    fontWeight: '600',
    fontFamily: 'RobotoSlab-Bold',
    color: '#004379',
  },
  header: {paddingHorizontal: '7%', marginBottom: '5%', marginTop: '10%'},
  headerTxtone: {
    color: 'black',
    lineHeight: 37,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: '500',
    fontSize: 32,
  },
  headerTxttwo: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'red',
    fontWeight: '700',
    fontSize: 30,
  },
  headerTxtthree: {
    fontSize: 30,
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: '700',
    color: 'magenta',
  },
});
