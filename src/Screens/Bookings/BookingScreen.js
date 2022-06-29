import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  FlatList,
  View,
  Pressable,
  SafeAreaView,
  Animated,
  ScrollView,
} from 'react-native';
import style from './style';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import {Transition, Transitioning} from 'react-native-reanimated';
import BottomTabs from '../../Components/BottomTabs/BottomTabs';
import {connect, useDispatch, useSelector} from 'react-redux';
import {addUserid, logoutUser} from '../../Redux/Action/actions';
import {useId} from 'react';

function BookingScreen({navigation, route}) {
  const [color, setColor] = useState(0);
  const [list, setList] = useState([]);

  const dispatch = useDispatch();
  const {cartItems, userId, userName, userMail} = useSelector(
    reducers => reducers.cartReducer,
  );

  useEffect(() => {
    database()
      .ref('/cartItems')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          // console.log(child.val());
          li.push({
            TotalPrice: child.val().TotalPrice,
            reservation: child.val().reservation,
            message: child.val().message,
            OrderTime: child.val().OrderTime,
            Order: child.val().Order,
            type: child.val().type,
            userName: child.val().userName,
            userIdd: child.val().userId,
            key: child.val().key,
          });
        });

        setList(li);
      });
  }, []);
  const changeColor = id => {
    setColor(id);
  };
  //   <View key={item.id} style={style.cartItemsContainer}>
  //   <View style={style.subContainerCartItems}>
  //     <View style={style.subContainerCartItemsTwo}>
  //       <Ionicons name="mail-outline" size={40} color={'black'} />
  //     </View>
  //     <Text
  //       style={[
  //         style.subTitxt,
  //         {fontSize: 17, marginRight: '20%', fontWeight: '500'},
  //       ]}>
  //       {item.userName}
  //     </Text>
  //   </View>

  //   <View
  //     style={{
  //       marginBottom: 5,
  //       alignItems: 'center',
  //       justifyContent: 'space-between',
  //       flexDirection: 'row',
  //     }}>
  //     <Text style={style.subTitxt}>Schedule</Text>
  //     <Text style={style.subTitxt}>{item.reservation}</Text>
  //   </View>

  //   <View
  //     style={{
  //       marginBottom: 5,
  //       alignItems: 'center',
  //       justifyContent: 'space-between',
  //       flexDirection: 'row',
  //     }}>
  //     <Text style={style.subTitxt}>Status</Text>
  //     <Text style={style.cartItemTitle}>{item.message}</Text>
  //   </View>

  //   <View
  //     style={{
  //       alignItems: 'center',
  //       justifyContent: 'space-between',
  //       flexDirection: 'row',
  //     }}>
  //     <Text style={style.subTitxt}>Order Number</Text>
  //     <Text style={style.subTitxt}>{item.OrderTime}</Text>
  //   </View>
  // </View>
  const previousOrders = () => {
    return list.map(item => {
      return (
        <View key={item.key}>
          {item.userIdd === userId ? (
            <>
              {console.log('elemts Order----' + JSON.stringify(item.Order))}
              {item.Order.map(element => {
                return (
                  <View key={element.key} style={style.cartItemsContainer}>
                    {/* <View style={style.subContainerCartItems}>
                      <View style={style.subContainerCartItemsTwo}>
                        <FastImage
                          style={{width: 60, height: 60}}
                          priority={FastImage.priority.high}
                          source={{uri: element.img}}
                        />
                      </View>
                      <Text
                        style={[
                          style.subTitxt,
                          {fontSize: 17, fontWeight: '500'},
                        ]}>
                        {element.type}
                      </Text>
                    </View> */}

                    <View
                      style={{
                        marginBottom: 5,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text style={[style.subTitxt, {color: 'grey'}]}>
                        {item.reservation}
                      </Text>
                      <Text style={[style.subTitxt, {color: 'white'}]}>
                        {item.reservation}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginTop: 5,
                      }}>
                      <Text style={style.subTitxt}>#12323</Text>
                      <Text style={[style.subTitxt, {color: '#FB336B'}]}>
                        Pending
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: 5,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text style={style.subTitxt}>
                        {item.Order.length} Items(s)
                      </Text>
                      <Text style={[style.subTitxt, {}]}>
                        {item.TotalPrice}
                      </Text>
                    </View>
                    <Pressable
                      style={style.contiBtn}
                      onPress={() => {
                        navigation.navigate('OrderDetail', {
                          items: item,
                          item2: element,
                        });
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'RobotoSlab-Bold',
                          fontSize: 19,
                          fontWeight: '600',
                        }}>
                        View Details
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </>
          ) : null}
        </View>
      );
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontFamily: 'RobotoSlab-Bold',
          fontSize: 20,
          color: 'black',
          fontWeight: '600',
          marginTop: '2%',
          alignSelf: 'center',
        }}>
        My Orders
      </Text>

      <View style={style.btnContainer}>
        <Pressable
          style={color === 1 ? style.btnColor : style.btnColorPink}
          onPress={() => {
            changeColor(1);
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 16,
              fontFamily: 'RobotoSlab-Bold',
            }}>
            Pending
          </Text>
        </Pressable>
        <Pressable
          style={color === 2 ? style.btnColor : style.btnColorPink}
          onPress={() => {
            changeColor(2);
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'RobotoSlab-Bold',
              fontSize: 16,
            }}>
            Confirmed
          </Text>
        </Pressable>
        <Pressable
          style={color === 3 ? style.btnColor : style.btnColorPink}
          onPress={() => {
            changeColor(3);
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'RobotoSlab-Bold',
              fontSize: 16,
            }}>
            Previous
          </Text>
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '35%'}}
        style={{marginTop: '2%'}}>
        {color === 3 ? <View style={{flex: 1}}>{previousOrders()}</View> : null}
      </ScrollView>
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}

export default BookingScreen;
