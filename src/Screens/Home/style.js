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
  mapStyle: {
    alignSelf: 'center',
    height: 200,
    width: Dimensions.get('window').width - 38,
  },
  welcomeTxtBodyLeft: {
    marginLeft: '5%',
    marginTop: Platform.OS === 'ios' ? '14%' : '3%',
    marginRight: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {fontSize: 31, color: 'black', fontFamily: 'RobotoSlab-Bold'},
  txtHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtTo: {color: 'black', fontSize: 30, fontFamily: 'RobotoSlab-Bold'},
  txtTitle: {fontSize: 30, color: 'black', fontFamily: 'RobotoSlab-Bold'},

  locContain: {
    alignSelf: 'center',
    marginTop: '2%',
    width: '89%',
    borderRadius: 12,
    height: 57,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locContainSub: {flexDirection: 'column', marginLeft: 8, width: '80%'},
  locTxt: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'grey',
    marginTop: 3,
    fontSize: 13,
  },
  nameContain: {marginLeft: 28, marginTop: 20},
  userNameTxt: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'grey',
    fontSize: 21,
    fontWeight: '700',
  },
  helpTxt: {fontFamily: 'RobotoSlab-Bold', color: 'grey', fontSize: 11},

  waveImg: {marginLeft: 7, width: 32, height: 32},
  servicesContain: {marginTop: 5, alignSelf: 'center'},
  cardImgContain: {
    flexDirection: 'column',
    width: '50%',
    justifyContent: 'center',
  },
  cardImgContainTxt: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  cardSubTitleTxt: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: -4,
    color: 'white',
  },
  cardSubTitleTwoTxt: {
    marginTop: 2,
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 11,
    color: 'white',
  },

  cardImg: {width: '27%', height: 80},
});
