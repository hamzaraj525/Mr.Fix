import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Pressable,
  StatusBar,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderDone from './../../Components/Modal/OrderDone';
import NetworkModal from '../../Components/Modal/NetworkModal';
import {removeFromCart, emptyCart} from '../../../src/Redux/Action/actions';

function CheckOutScreen({navigation, props, route}) {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [add, setAdd] = useState(false);
  const [colorId, setColorId] = useState(0);
  const [timeTitle, setTimeTitle] = useState('');
  const [input, setInput] = React.useState('');
  const [networkModal, setNetworkModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [postTime, setPostTime] = useState(
    firestore.Timestamp.fromDate(new Date()),
  );
  const {
    lat,
    long,
    userId,
    userName,
    userMail,
    cartItems,
    userContact,
    userlocation,
  } = useSelector(reducers => reducers.cartReducer);

  const items = cartItems;
  const total = items
    .map(item => Number(item.Price))
    .reduce((prev, curr) => prev + curr, 0);
  const TotalPKR = total.toFixed(2);
  var percent = (16 / 100) * TotalPKR;
  const GSTTotal = percent.toFixed(2);
  const Total = (total + percent).toFixed(2);
  const TotalUSD = total.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
  });

  console.log(TotalPKR);
  console.log(cartItems, 'cart items');
  const hideModalNetwork = () => {
    setNetworkModal(false);
  };
  const addToRealTimeDatabase = () => {
    setLoader(true);
    const newReference = database().ref('/cartItems').push();
    const idd = Math.floor(Math.random() * 1999 + 20000);
    newReference
      .set({
        key: newReference.key,
        reservation:
          timee +
          ' :' +
          datee.getDate() +
          '/' +
          (datee.getMonth() + 1) +
          '/' +
          datee.getFullYear(),
        Order: cartItems,
        message: input,
        TotalPrice: total,
        OrderTime: new Date().toLocaleString(),
        userId: userId,
        userName: userName,
        userMail: userMail,
        userContact: userContact,
        userLocation: userlocation,
        latitude: lat,
        longitude: long,
        Status: 'Pending',
      })
      .then(() => {
        setLoader(false);
        setShowOrderModal(true);
      })
      .catch(error => {
        Alert.alert('Something went wrong');
      });
  };

  const onPress = (key, item) => {
    setColorId(key);
    setTimeTitle(item);
  };

  const hideOrderModal = () => {
    setShowOrderModal(false);
  };
  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        addToRealTimeDatabase();
      } else {
        setTimeout(() => {
          setNetworkModal(true);
        }, 2000);
      }
    });
  };
  const renderHomeServices = ({item, index}) => {
    return (
      <View onPress={() => {}} style={style.cartItemsContainer}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 95,
              height: 95,
              borderRadius: 10,
            }}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={style.cartItemImage}
              source={{
                uri: item.img,
                priority: FastImage.priority.high,
              }}
            />
          </View>

          <View
            style={{
              marginLeft: '4%',
              flexDirection: 'column',
            }}>
            <Text style={style.cartItemTitle}>{item.title}</Text>
            <Text style={style.subTitxt}>{item.SubTitle}</Text>
            <Text style={style.cartItemPrice}>PKR {item.Price}</Text>
          </View>
        </View>

        <Pressable
          style={{marginRight: 'auto'}}
          onPress={() => {
            dispatch(removeFromCart(item));
          }}>
          <Text style={style.cartRemoveTxt}>Remove</Text>
          <View
            style={{
              width: 54,
              height: 0.9,
              marginTop: -2,
              backgroundColor: '#DA2328',
            }}
          />
        </Pressable>
      </View>
    );
  };

  const renderList = () => {
    return cartItems.map((item, index) => {
      return (
        <View
          key={item.key}
          onPress={() => {}}
          style={style.cartItemsContainer}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 95,
                height: 95,
                borderRadius: 10,
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={style.cartItemImage}
                source={{
                  uri: item.img,
                  priority: FastImage.priority.high,
                }}
              />
            </View>

            <View
              style={{
                marginLeft: '4%',
                flexDirection: 'column',
              }}>
              <Text style={style.cartItemTitle}>{item.title}</Text>
              <Text style={style.subTitxt}>{item.SubTitle}</Text>
              <Text style={style.cartItemPrice}>PKR {item.Price}</Text>
            </View>
          </View>

          <Pressable
            style={{marginRight: 'auto'}}
            onPress={() => {
              dispatch(removeFromCart(item));
            }}>
            <Text style={style.cartRemoveTxt}>Remove</Text>
            <View
              style={{
                width: 54,
                height: 0.9,
                marginTop: -2,
                backgroundColor: '#DA2328',
              }}
            />
          </Pressable>
        </View>
      );
    });
  };

  const {datee, timee} = route.params;
  return (
    <SafeAreaView style={style.container}>
      <StatusBar barStyle="dark-content" backgroundColor="orange" />

      <View
        style={{
          marginTop: '4%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
        }}>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('Home');
            dispatch(emptyCart());
          }}>
          <Ionicons name="arrow-back-sharp" size={30} color={'black'} />
        </Pressable>
        <Text
          style={{
            fontFamily: 'RobotoSlab-Bold',
            color: 'black',
            fontWeight: '500',
            fontSize: 21,
          }}>
          CheckOut
        </Text>

        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {}}>
          <Ionicons style={{}} name={'share'} size={30} color={'white'} />
        </Pressable>
      </View>
      <View
        style={{
          alignSelf: 'center',
          width: '22%',
          height: 0.9,
          marginTop: -2,
          backgroundColor: '#DA2328',
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '5%'}}>
        <Text
          style={{
            marginTop: '7%',
            fontFamily: 'RobotoSlab-Bold',
            color: 'black',
            fontWeight: '500',
            fontSize: 21,
            alignSelf: 'center',
          }}>
          {datee.getDate() +
            ' / ' +
            (datee.getMonth() + 1) +
            ' / ' +
            datee.getFullYear()}
          :{timee}
        </Text>
        {renderList()}

        <Text
          style={{
            fontFamily: 'RobotoSlab-Bold',
            paddingHorizontal: '9%',
            fontSize: 16,
            color: 'black',
            marginTop: '3%',
          }}>
          Address
        </Text>
        <View
          style={{
            marginTop: '2%',
            color: 'black',
            backgroundColor: '#ecf5fb',
            height: 80,
            width: '82%',
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              paddingHorizontal: '5%',
              fontSize: 14,
              color: 'black',
              marginTop: '3%',
              fontFamily: 'RobotoSlab-Medium',
            }}>
            {userlocation}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'RobotoSlab-Bold',
            paddingHorizontal: '9%',
            marginTop: '3%',
          }}>
          Message{' '}
          <Text
            style={{
              fontFamily: 'VujahdayScript-Regular',
              fontSize: 15,
              color: 'grey',
              marginTop: '3%',
            }}>
            (Optional)
          </Text>
        </Text>

        <View
          style={{
            marginTop: '3%',
            color: 'black',
            backgroundColor: '#ecf5fb',
            height: 104,
            width: '82%',
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <TextInput
            value={input}
            style={{
              fontSize: 15,
              padding: 11,
              color: 'black',
            }}
            onChangeText={text => {
              setInput(text);
            }}
            multiline={true}
            placeholder="Your message"
            placeholderTextColor={'grey'}
          />
        </View>
      </ScrollView>
      <View style={style.checkoutbtnContainer}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: '3%',
            paddingHorizontal: '6%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={[
              style.totalTxt,
              {
                fontWeight: '600',
                fontSize: 21,
              },
            ]}>
            Total
          </Text>
          <Text style={style.totalTxt}>Rs.{total}</Text>
        </View>

        <View style={style.checkoutbtn}>
          <Pressable
            disabled={loader ? true : false}
            style={[
              style.loginBtn,
              {
                width: '80%',
                backgroundColor: '#E9967A',
              },
            ]}
            onPress={() => {
              if (cartItems.length === 0) {
                alert('No item in cart');
                navigation.goBack();
              } else {
                checkConnection();
              }
            }}>
            {loader ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={style.proceedtxt}>Order</Text>
            )}
          </Pressable>
        </View>
      </View>
      <OrderDone
        showOrderModal={showOrderModal}
        hideOrderModal={hideOrderModal}
        navigation={navigation}
      />
      <NetworkModal
        networkModal={networkModal}
        hideModalNetwork={hideModalNetwork}
        checkConnection={checkConnection}
      />
    </SafeAreaView>
  );
}
export default CheckOutScreen;
