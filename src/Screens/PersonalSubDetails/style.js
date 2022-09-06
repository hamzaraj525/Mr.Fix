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
  parent: {backgroundColor: 'red', width: Dimensions.get('window').width},
  subPraent: {
    paddingHorizontal: '4%',
    paddingVertical: '4%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'pink',
    marginBottom: '5%',
  },
  productContainer: {
    borderRadius: 30,
    backgroundColor: '#2C2C2C',
    marginTop: '5%',
    width: '90%',
    height: 290,
  },
  productImg: {
    width: 110,
    marginBottom: 5,
    height: 110,
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
    fontFamily: 'RobotoSlab-Bold',
    color: 'grey',
    fontWeight: '600',
    fontSize: 18,
  },
  productSub: {
    color: 'grey',
    fontSize: 17,
    paddingHorizontal: '8%',
  },
  productPrice: {
    paddingHorizontal: '8%',
    color: 'white',
    fontSize: 21,
  },
  productTitle: {
    color: 'white',
    fontSize: 21,
    marginBottom: '7%',
    paddingHorizontal: '8%',
  },
  cartBtnContainer: {
    bottom: 0,
    right: 0,
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#1A1E21',
    height: 57,
    width: 57,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBtnSub: {
    flexDirection: null,
    borderRadius: 100,
    backgroundColor: '#DA2328',
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBtnBlue: {
    alignSelf: 'flex-end',
    width: '10%',
    borderRadius: 12,
    width: '10%',
    height: 37,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemsContainer: {
    borderWidth: 0.4,
    borderColor: 'grey',
    borderRadius: 30,
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '97%',
    paddingHorizontal: '2%',
    paddingVertical: '4%',
  },
  cartItemImage: {
    width: 120,
    height: 190,
    borderRadius: 10,
  },
  cartItemTitle: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'black',
    width: 170,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'blue',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  subTitxt: {
    fontFamily: 'RobotoSlab-Bold',
    color: 'grey',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
  },
  plusContainer: {
    marginLeft: '30%',
    backgroundColor: '#F0F8FF',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '40%',
    height: 34,
  },
  plusbtn: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35 / 2,
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
  showminimumModal: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  showminimumModalInner: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1E21',
  },
  showconfirmOrderModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  showconfirmOrderModalInner: {
    alignItems: 'center',
    width: '90%',
    padding: 3,
    borderRadius: 33,
    backgroundColor: '#FDD10E',
  },
  showdeleteConfirm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  showdeleteConfirmInner: {
    width: '80%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 13,
    backgroundColor: '#1A1E21',
  },
  totalContainer: {
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 150,
    backgroundColor: '#2C2C2C',
    width: Dimensions.get('window').width,
  },
  subtotalContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  gstContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  TotalContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  checkoutbtn: {
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#DFBC50',
  },
  proceedtxt: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
  },

  containerrr: {
    alignSelf: 'center',
    overflow: 'hidden', // for hide the not important parts from circle
    width: 500,
    height: 270,
  },
  background: {
    // this shape is a circle
    borderRadius: 800, // border borderRadius same as width and height
    width: 700,
    height: 700,
    marginLeft: -100, // reposition the circle inside parent view
    position: 'absolute',
    bottom: 0, // show the bottom part of circle
    overflow: 'hidden', // hide not important part of image
  },
  image: {
    height: 270, // same width and height for the container
    width: 500,
    position: 'absolute', // position it in circle
    bottom: 0, // position it in circle
    marginLeft: 100, // center it in main view same value as marginLeft for circle but positive
  },

  textHeader: {
    fontWeight: '600',
    color: 'black',
    fontSize: 17,
  },
  MenuBtn: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  containerr: {
    width: '75%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },
  cartBtnBlue: {
    flexDirection: 'row',
    width: '10%',
    borderRadius: 12,
    width: '10%',
    height: 37,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flexDirection: 'column'},
  plusBtn: {
    width: 25,
    height: 25,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textLinksBold: {
    paddingHorizontal: '5%',
    color: 'black',
    fontWeight: '700',
    marginTop: '8%',
    fontSize: 14,
  },

  loginBtn: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  loginBtnBlue: {
    width: '18%',
    height: 35,
    marginRight: '3%',
    borderRadius: 10,
    backgroundColor: '#F1EEFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {fontWeight: '600', color: 'grey', fontSize: 13},
  titlee: {fontWeight: '700', color: 'black', fontSize: 14},
  Modal: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: '110%',
    backgroundColor: 'white',
  },
  containerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreSection: {
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  exploreHeader: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
  },
  exploreContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  contiBtn: {
    alignSelf: 'center',
    width: '65%',
    position: 'absolute',
    bottom: 10,
    height: 55,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'magenta',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  listHeaderTxt: {
    fontFamily: 'RobotoSlab-Bold',
    marginTop: 20,
    marginBottom: 6,
    color: 'black',
    paddingHorizontal: '3%',
    fontWeight: '600',
    fontSize: 17,
  },
  cartItemsConatin: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderWidth: 1.3,
    borderColor: 'white',
    borderRadius: 30 / 2,
  },
  cartLength: {
    color: 'white',
    fontSize: 19,
    fontWeight: '600',
    fontFamily: 'RobotoSlab-Bold',
  },
  cartTxtTotal: {
    color: 'white',
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 19,
    fontWeight: '600',
  },
  cartBtnArrow: {flexDirection: 'row', alignItems: 'center'},

  loadTxt: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 16,
    color: '#0000ff',
    marginTop: 10,
  },
  iconContain: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContainer: {
    paddingVertical: 15,
    borderBottomRightRadius: 70,
    backgroundColor: '#F0F8FF',
  },
  subContain: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  titleTxt: {
    width: '42%',
    color: 'black',
    fontWeight: '500',
    fontSize: 22,
    fontFamily: 'RobotoSlab-Bold',
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 190,
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
  },
  cartItemsSubContain: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  doneBtn: {
    fontFamily: 'RobotoSlab-Bold',
    marginLeft: '22%',
    fontWeight: '400',
    fontSize: 13,
    color: 'black',
  },
});
