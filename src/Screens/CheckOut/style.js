import {Dimensions, StyleSheet} from 'react-native';
export default StyleSheet.create({
  bottomView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70,
    backgroundColor: 'orange',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },

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
  container: {backgroundColor: 'white', flex: 1},
  cartItemsContainer: {
    borderWidth: 0.8,
    borderColor: 'grey',
    borderRadius: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: '2%',
    paddingVertical: '4%',
  },
  cartItemImage: {
    width: 95,
    height: 95,
    borderRadius: 10,
  },
  cartItemTitle: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    width: 170,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'blue',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  subTitxt: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'grey',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  plusContainer: {
    borderWidth: 0.3,
    padding: 8,
    height: 110,
    borderRadius: 35,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  plusbtn: {
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27 / 2,
    backgroundColor: '#DFBC50',
  },
  minusBtn: {
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27 / 2,
    backgroundColor: '#2C2C2C',
  },
  loginBtn: {
    width: '30%',
    height: '60%',
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
  },
  checkoutbtn: {
    width: '100%',
    height: '49%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 40,
    backgroundColor: '#ecf5fb',
  },
  checkoutbtnContainer: {
    height: '18%',
    borderTopLeftRadius: 50,
    backgroundColor: 'white',
    borderWidth: 0.7,
    borderColor: 'black',
    justifyContent: 'flex-end',
  },
  proceedtxt: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  totalTxt: {
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: '500',
    fontSize: 22,
    color: 'black',
  },

  cartRemoveTxt: {
    fontFamily: 'RobotoSlab-Bold',
    color: '#DA2328',
    fontWeight: '500',
    fontSize: 14,
  },
});
