import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  header: {
    marginTop: '4%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  backBtn: {alignItems: 'center', justifyContent: 'center'},
  title: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    fontWeight: '500',
    fontSize: 21,
  },
  bottomLine: {
    alignSelf: 'center',
    width: '33%',
    height: 0.9,
    marginTop: -1,
    backgroundColor: 'black',
  },
  txtPrivacy: {
    fontFamily: 'RobotoSlab-Bold',
    marginTop: '5%',
    color: 'black',
    fontWeight: '600',
    fontSize: 21,
  },
  customer: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    fontWeight: '400',
    marginTop: '2%',
    fontSize: 13,
  },
  detail: {
    color: 'black',
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: '400',
    marginTop: '3%',
    fontSize: 14,
    lineHeight: 18,
  },
});
