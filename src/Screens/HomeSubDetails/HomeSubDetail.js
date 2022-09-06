import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
  Linking,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import database from '@react-native-firebase/database';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SearchModal from './../../Components/Modal/SearchModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Animations} from '../../../assets/Animations/Animation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {addToCart, emptyCart} from '../../../src/Redux/Action/actions';
import Constraints from '../../Constraints/Constraints';
import Fontisto from 'react-native-vector-icons/Fontisto';
const animations = Animations[Math.floor(Math.random() * Animations.length)];

function HomeSubDetail({navigation, route}, props) {
  const dispatch = useDispatch();
  const [realTime, setRealTime] = useState([]);
  const [list, setList] = useState([]);
  const [add, setAdd] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchModal, setSearchModal] = useState(false);

  const {cartItems} = useSelector(reducers => reducers.cartReducer);

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

  const closeModal = () => {
    setSearchModal(false);
  };

  useEffect(() => {
    servicesData();

    database()
      .ref('/cartItems')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          li.push({
            key: child.key,
            Order: child.val().Order,
            OrderTime: child.val().OrderTime,
            TotalPrice: child.val().TotalPrice,
            reservation: child.val().reservation,
            message: child.val().message,
          });
        });

        setRealTime(li);
      });
  }, []);

  const servicesData = () => {
    var newArray = [];

    firestore()
      .collection('Services')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        setList(newArray);
        setLoader(false);
      })
      .catch(error => {
        alert('Your Network Connection Is Not Good');
      });
  };

  const renderHomeServiceDetail = ({item, index}) => {
    const {Item} = route.params;

    return (
      <>
        {item.type === 'AC Services' && Item.title === 'AC Services' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={'bounceInUp'}
            delay={index * 50}>
            <Pressable style={style.cartItemsContainer}>
              <View style={style.cartItemsSubContain}>
                <View style={style.img}>
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
              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text style={style.doneBtn}>{Constraints.DONE_BTN}</Text>

                  <View onPress={() => {}} style={style.plusbtn}>
                    <MaterialIcons name={'done'} size={17} color={'white'} />
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(addToCart(item));
                    setAdd(true);
                  }}
                  style={style.plusContainer}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Bold',
                      marginLeft: '12%',
                      fontWeight: '400',
                      fontSize: 14,
                      color: 'black',
                    }}>
                    {Constraints.ADD_TO_CART}
                  </Text>

                  <AntDesign
                    style={{marginRight: '6%'}}
                    name={'plus'}
                    size={17}
                    color={'black'}
                  />
                </Pressable>
              )}
            </Pressable>
          </Animatable.View>
        ) : item.type === 'Car Services' && Item.title === 'Car Services' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={'bounceInUp'}
            delay={index * 50}>
            <Pressable style={style.cartItemsContainer}>
              <View style={style.cartItemsSubContain}>
                <View style={style.img}>
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

              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text style={style.doneBtn}>{Constraints.DONE_BTN}</Text>

                  <View onPress={() => {}} style={style.plusbtn}>
                    <MaterialIcons name={'done'} size={17} color={'white'} />
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(addToCart(item));
                    setAdd(true);
                  }}
                  style={style.plusContainer}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Bold',
                      marginLeft: '12%',
                      fontWeight: '400',
                      fontSize: 14,
                      color: 'black',
                    }}>
                    {Constraints.ADD_TO_CART}
                  </Text>

                  <AntDesign
                    style={{marginRight: '6%'}}
                    name={'plus'}
                    size={17}
                    color={'black'}
                  />
                </Pressable>
              )}
            </Pressable>
          </Animatable.View>
        ) : item.type === 'Geyser' && Item.title === 'Geyser' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={'bounceInUp'}
            delay={index * 50}>
            <Pressable style={style.cartItemsContainer}>
              <View style={style.cartItemsSubContain}>
                <View style={style.img}>
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

              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text style={style.doneBtn}>{Constraints.DONE_BTN}</Text>

                  <View onPress={() => {}} style={style.plusbtn}>
                    <MaterialIcons name={'done'} size={17} color={'white'} />
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(addToCart(item));
                    setAdd(true);
                  }}
                  style={style.plusContainer}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Bold',
                      marginLeft: '12%',
                      fontWeight: '400',
                      fontSize: 14,
                      color: 'black',
                    }}>
                    {Constraints.ADD_TO_CART}
                  </Text>

                  <AntDesign
                    style={{marginRight: '6%'}}
                    name={'plus'}
                    size={17}
                    color={'black'}
                  />
                </Pressable>
              )}
            </Pressable>
          </Animatable.View>
        ) : item.type === 'Cleaning' && Item.title === 'Cleaning' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={'bounceInUp'}
            delay={index * 50}>
            <Pressable style={style.cartItemsContainer}>
              <View style={style.cartItemsSubContain}>
                <View style={style.img}>
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
              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text style={style.doneBtn}>{Constraints.DONE_BTN}</Text>

                  <View onPress={() => {}} style={style.plusbtn}>
                    <MaterialIcons name={'done'} size={17} color={'white'} />
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(addToCart(item));
                    setAdd(true);
                  }}
                  style={style.plusContainer}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Bold',
                      marginLeft: '12%',
                      fontWeight: '400',
                      fontSize: 14,
                      color: 'black',
                    }}>
                    {Constraints.ADD_TO_CART}
                  </Text>

                  <AntDesign
                    style={{marginRight: '6%'}}
                    name={'plus'}
                    size={17}
                    color={'black'}
                  />
                </Pressable>
              )}
            </Pressable>
          </Animatable.View>
        ) : item.type === 'Electrition' && Item.title === 'Electrition' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={'bounceInUp'}
            delay={index * 50}>
            <Pressable style={style.cartItemsContainer}>
              <View style={style.cartItemsSubContain}>
                <View style={style.img}>
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
              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text style={style.doneBtn}>{Constraints.DONE_BTN}</Text>

                  <View onPress={() => {}} style={style.plusbtn}>
                    <MaterialIcons name={'done'} size={17} color={'white'} />
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(addToCart(item));
                    setAdd(true);
                  }}
                  style={style.plusContainer}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Bold',
                      marginLeft: '12%',
                      fontWeight: '400',
                      fontSize: 14,
                      color: 'black',
                    }}>
                    {Constraints.ADD_TO_CART}
                  </Text>

                  <AntDesign
                    style={{marginRight: '6%'}}
                    name={'plus'}
                    size={17}
                    color={'black'}
                  />
                </Pressable>
              )}
            </Pressable>
          </Animatable.View>
        ) : item.type === 'Home Appliances' &&
          Item.title === 'Home Appliances' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            delay={index * 50}>
            <Pressable style={style.cartItemsContainer}>
              <View style={style.cartItemsSubContain}>
                <View style={style.img}>
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

              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text style={style.doneBtn}>{Constraints.DONE_BTN}</Text>

                  <View onPress={() => {}} style={style.plusbtn}>
                    <MaterialIcons name={'done'} size={17} color={'white'} />
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(addToCart(item));
                    setAdd(true);
                  }}
                  style={style.plusContainer}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Bold',
                      marginLeft: '12%',
                      fontWeight: '400',
                      fontSize: 14,
                      color: 'black',
                    }}>
                    {Constraints.ADD_TO_CART}
                  </Text>

                  <AntDesign
                    style={{marginRight: '6%'}}
                    name={'plus'}
                    size={17}
                    color={'black'}
                  />
                </Pressable>
              )}
            </Pressable>
          </Animatable.View>
        ) : item.type === 'Painter' && Item.title === 'Painter' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={'bounceInUp'}
            delay={index * 50}>
            <Pressable style={style.cartItemsContainer}>
              <View style={style.cartItemsSubContain}>
                <View style={style.img}>
                  {' '}
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
              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text style={style.doneBtn}>{Constraints.DONE_BTN}</Text>

                  <View onPress={() => {}} style={style.plusbtn}>
                    <MaterialIcons name={'done'} size={17} color={'white'} />
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(addToCart(item));
                    setAdd(true);
                  }}
                  style={style.plusContainer}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Bold',
                      marginLeft: '12%',
                      fontWeight: '400',
                      fontSize: 14,
                      color: 'black',
                    }}>
                    {Constraints.ADD_TO_CART}
                  </Text>

                  <AntDesign
                    style={{marginRight: '6%'}}
                    name={'plus'}
                    size={17}
                    color={'black'}
                  />
                </Pressable>
              )}
            </Pressable>
          </Animatable.View>
        ) : item.type === 'Plumber' && Item.title === 'Plumber' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={'bounceInUp'}
            delay={index * 50}>
            <Pressable style={style.cartItemsContainer}>
              <View style={style.cartItemsSubContain}>
                <View style={style.img}>
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
              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text style={style.doneBtn}>{Constraints.DONE_BTN}</Text>

                  <View onPress={() => {}} style={style.plusbtn}>
                    <MaterialIcons name={'done'} size={17} color={'white'} />
                  </View>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(addToCart(item));
                    setAdd(true);
                  }}
                  style={style.plusContainer}>
                  <Text
                    style={{
                      fontFamily: 'RobotoSlab-Bold',
                      marginLeft: '12%',
                      fontWeight: '400',
                      fontSize: 14,
                      color: 'black',
                    }}>
                    {Constraints.ADD_TO_CART}
                  </Text>

                  <AntDesign
                    style={{marginRight: '6%'}}
                    name={'plus'}
                    size={17}
                    color={'black'}
                  />
                </Pressable>
              )}
            </Pressable>
          </Animatable.View>
        ) : null}
      </>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator style={{}} size="large" color="#0000ff" />
          <Text style={style.loadTxt}>Loading</Text>
        </View>
      ) : (
        <>
          <View style={style.headerContainer}>
            <View style={style.subContain}>
              <Pressable
                style={{}}
                onPress={() => {
                  dispatch(emptyCart());
                  navigation.goBack();
                }}>
                <Ionicons
                  name={'arrow-back-outline'}
                  size={30}
                  color={'black'}
                />
              </Pressable>

              <Text style={style.titleTxt}>{Constraints.HOME_SERVICES}</Text>

              <Pressable
                onPress={() => {
                  Linking.openURL(`tel:${'03164558585'}`);
                }}>
                <FontAwesome name={'phone'} size={30} color={'magenta'} />
              </Pressable>
              {/* <Pressable
                  onPress={() => {
                    navigation.navigate('NotificationScreen');
                  }}>
                  <FontAwesome name={'bell'} size={30} color={'#E9967A'} />
                </Pressable> */}
            </View>
            <Pressable
              style={style.sectionStyle}
              onPress={() => {
                setSearchModal(true);
                dispatch(emptyCart());
              }}>
              <View pointerEvents="none">
                <Text style={style.searchTxt}>{Constraints.SEARCH}</Text>
              </View>
              <FontAwesome name={'filter'} size={22} color={'black'} />
            </Pressable>
          </View>
          <View style={{paddingHorizontal: '5%', flex: 1}}>
            <FlatList
              contentContainerStyle={{paddingBottom: '33%'}}
              data={list}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={renderHomeServiceDetail}
              ListHeaderComponent={({item, index}) => {
                return (
                  <Text style={style.listHeaderTxt}>
                    {Constraints.CHOOSE_FROM_LISTING}
                  </Text>
                );
              }}
              keyExtractor={item => item.key}
            />
          </View>
        </>
      )}
      {cartItems.length > 0 ? (
        <Animatable.View
          iterationCount={1}
          useNativeDriver
          animation={'bounceIn'}
          delay={0}>
          <Pressable
            style={style.contiBtn}
            onPress={() => {
              navigation.navigate('Schedule');
            }}>
            <View style={style.cartItemsConatin}>
              <Text style={style.cartLength}>{cartItems.length}</Text>
            </View>
            <Text style={style.cartTxtTotal}>Rs.{total}</Text>
            <View style={style.cartBtnArrow}>
              <Fontisto
                style={{marginLeft: 5}}
                name={'arrow-right-l'}
                size={30}
                color={'white'}
              />
            </View>
          </Pressable>
        </Animatable.View>
      ) : null}
      <SearchModal
        navigation={navigation}
        searchModal={searchModal}
        hideModal={closeModal}
      />
    </SafeAreaView>
  );
}

export default HomeSubDetail;
