import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  profileImg: {
    borderWidth: 0.9,
    borderColor: 'grey',
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
  },
  userNameTxt: {
    fontFamily: 'RobotoSlab-Bold',
    alignSelf: 'center',
    fontWeight: '600',
    color: 'black',
    fontSize: 24,
    marginBottom: '8%',
  },
  logoutBtn: {
    alignItems: 'center',
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    justifyContent: 'center',
    borderWidth: 0.9,
    borderColor: 'grey',
  },
  Profileimg: {borderRadius: 100 / 2, width: 100, height: 100},
  ProfileimgBtn: {
    alignItems: 'center',
    width: 115,
    height: 115,
    borderRadius: 115 / 2,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  shareBtn: {
    alignItems: 'center',
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    justifyContent: 'center',
    borderWidth: 0.9,
    borderColor: 'grey',
  },
  btnsContainer: {
    marginBottom: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profileTxt: {
    marginLeft: '2%',
    fontWeight: '600',
    color: 'black',
    width: '55%',
    fontSize: 27,
    marginBottom: '10%',
    fontFamily: 'RobotoSlab-Bold',
  },
  MyTxt: {
    fontFamily: 'RobotoSlab-Bold',
    marginLeft: '2%',
    marginTop: '7%',
    color: 'black',
    width: '55%',
    fontWeight: '600',
    fontSize: 29,
    marginBottom: 3,
  },
  backBtn: {marginTop: '2%', marginLeft: '2%'},
  scroll: {
    padding: '2%',
    borderRadius: 33,
    borderWidth: 0.2,
    borderColor: 'black',
  },
  container: {flex: 1, alignItems: 'center', backgroundColor: 'white'},
  btnScreens: {
    alignSelf: 'center',
    marginBottom: 22,
    width: Dimensions.get('window').width - 50,
  },
  btnNavigate: {
    borderRadius: 15,
    paddingVertical: '3%',
    paddingHorizontal: '8%',
    backgroundColor: '#ecf5fb',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 41,
    height: 41,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSize: {width: 26, height: 26},
  screenName: {
    borderRadius: 12,
    marginLeft: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '77%',
    height: 33,
  },
  screenNameTxt: {fontWeight: '500', fontFamily: 'RobotoSlab-Bold'},
});
