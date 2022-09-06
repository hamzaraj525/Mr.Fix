import style from './style';
import database from '@react-native-firebase/database';
import React, {useRef, useState, useEffect} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import BottomTabs from '../../Components/BottomTabs/BottomTabs';
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';

function BookingScreen({navigation, route}) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [color, setColor] = useState(0);
  const [list, setList] = useState([]);
  const {cartItems, userId, userName, userMail} = useSelector(
    reducers => reducers.cartReducer,
  );

  useEffect(() => {
    setLoader(true);
    database()
      .ref('/cartItems')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
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
            Status: child.val().Status,
          });
        });

        setLoader(false);
        setList(li);
      });
  }, []);
  const changeColor = id => {
    setColor(id);
  };

  const previousOrders = () => {
    return list.map(item => {
      return (
        <View key={item.key}>
          {item.userIdd === userId && item.Status === 'Completed' ? (
            <>
              {item.Order.map(element => {
                return (
                  <View key={element.key} style={style.cartItemsContainer}>
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
                        {item.Status}
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

  const confirmedOrders = () => {
    return list.map(item => {
      return (
        <View key={item.key}>
          {(item.userIdd === userId && item.Status === 'Confirmed') ||
          (item.Status !== 'Pending' && item.Status !== 'Completed') ? (
            <>
              {item.Order.map(element => {
                return (
                  <View key={element.key} style={style.cartItemsContainer}>
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
                        {item.Status}
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

  const pendingOrders = () => {
    return list.map(item => {
      if (item.userIdd === userId && item.Status === 'Pending') {
        return item.Order.map(element => {
          return (
            <View key={element.key} style={style.cartItemsContainer}>
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

                <Text
                  style={[
                    style.subTitxt,
                    {
                      color: '#FB336B',
                    },
                  ]}>
                  {item.Status}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text style={style.subTitxt}>{item.Order.length} Items(s)</Text>
                <Text style={[style.subTitxt, {}]}>{item.TotalPrice}</Text>
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
        });
      }
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
        {color === 3 ? (
          <View style={{flex: 1}}>
            {loader ? (
              <ActivityIndicator
                style={{marginTop: 50}}
                size="large"
                color="#0000ff"
              />
            ) : (
              previousOrders()
            )}
          </View>
        ) : color === 2 ? (
          <View style={{flex: 1}}>
            {loader ? (
              <ActivityIndicator
                style={{marginTop: 50}}
                size="large"
                color="#0000ff"
              />
            ) : (
              confirmedOrders()
            )}
          </View>
        ) : color === 1 ? (
          <View style={{flex: 1}}>
            {loader ? (
              <ActivityIndicator
                style={{marginTop: 50}}
                size="large"
                color="#0000ff"
              />
            ) : (
              pendingOrders()
            )}
          </View>
        ) : null}
      </ScrollView>
      <BottomTabs navigation={navigation} />
    </SafeAreaView>
  );
}

export default BookingScreen;
