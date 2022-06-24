import React, {useState, useEffect} from 'react';
import {
  Text,
  Dimensions,
  View,
  Modal,
  FlatList,
  ScrollView,
  Pressable,
  SafeAreaView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import {
  addToCart,
  removeFromCart,
  emptyCart,
} from '../../../src/Redux/Action/actions';
import {connect, useDispatch, useSelector} from 'react-redux';
// import * as actionCreators from '../../../src/Redux/slice/cartSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Animations} from '../../../assets/Animations/Animation';
import SearchModal from './../../Components/Modal/SearchModal';
import BottomTabs from '../../Components/BottomTabs/BottomTabs';
const animations = Animations[Math.floor(Math.random() * Animations.length)];

function HomeSubDetail({navigation, route}, props) {
  const [realTime, setRealTime] = useState([]);
  const [list, setList] = useState([]);
  const [add, setAdd] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchModal, setSearchModal] = useState(false);

  const {cartItems} = useSelector(reducers => reducers.cartReducer);

  const items = cartItems;
  // const total = 200;
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

  const closeModal = () => {
    setSearchModal(false);
  };
  console.log(cartItems, 'cart items');
  useEffect(() => {
    servicesData();

    database()
      .ref('/cartItems')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          console.log(child.val());
          li.push({
            key: child.key,
            // Title: child.val().title,
            // Price: child.val().Price,
            // items: child.val().items,
            // SubTitle: child.val().SubTitle,
            Order: child.val().Order,
            OrderTime: child.val().OrderTime,
            TotalPrice: child.val().TotalPrice,
            reservation: child.val().reservation,
            message: child.val().message,
          });
          //   if (child.val().age > 6) {
          //     this.notifyHost();
          //   } else {
          //     this.handleNotification();
          //   }
        });
        console.log('done');
        setRealTime(li);
      });
  }, []);

  const servicesData = () => {
    var newArray = [];

    firestore()
      .collection('Services')
      .get()
      .then(querySnapshot => {
        console.log('Total services: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New Array Push is =', newArray);
        setList(newArray);
        setLoader(false);
      })
      .catch(error => {
        console.log(error);
        alert('Your Network Connection Is Not Good');
      });
  };
  const dispatch = useDispatch();

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
            <Pressable onPress={() => {}} style={style.cartItemsContainer}>
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
                    width: 120,
                    height: 190,
                    backgroundColor: '#F0F8FF',
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
              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text
                    style={{
                      marginLeft: '22%',
                      fontWeight: '400',
                      fontSize: 13,
                      color: 'black',
                    }}>
                    Done
                  </Text>

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
                    Add To Cart
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
            <Pressable onPress={() => {}} style={style.cartItemsContainer}>
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
                    width: 120,
                    height: 190,
                    backgroundColor: '#F0F8FF',
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

              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text
                    style={{
                      marginLeft: '22%',
                      fontWeight: '400',
                      fontSize: 13,
                      color: 'black',
                    }}>
                    Done
                  </Text>

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
                    Add To Cart
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
            <Pressable onPress={() => {}} style={style.cartItemsContainer}>
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
                    width: 120,
                    height: 190,
                    backgroundColor: '#F0F8FF',
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

              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text
                    style={{
                      marginLeft: '22%',
                      fontWeight: '400',
                      fontSize: 13,
                      color: 'black',
                    }}>
                    Done
                  </Text>

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
                    Add To Cart
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
            <Pressable onPress={() => {}} style={style.cartItemsContainer}>
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
                    width: 120,
                    height: 190,
                    backgroundColor: '#F0F8FF',
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
              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text
                    style={{
                      marginLeft: '22%',
                      fontWeight: '400',
                      fontSize: 13,
                      color: 'black',
                    }}>
                    Done
                  </Text>

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
                    Add To Cart
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
            <Pressable onPress={() => {}} style={style.cartItemsContainer}>
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
                    width: 120,
                    height: 190,
                    backgroundColor: '#F0F8FF',
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
              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text
                    style={{
                      marginLeft: '22%',
                      fontWeight: '400',
                      fontSize: 13,
                      color: 'black',
                    }}>
                    Done
                  </Text>

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
                    Add To Cart
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
            <Pressable onPress={() => {}} style={style.cartItemsContainer}>
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
                    width: 120,
                    height: 190,
                    backgroundColor: '#F0F8FF',
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

              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text
                    style={{
                      marginLeft: '22%',
                      fontWeight: '400',
                      fontSize: 13,
                      color: 'black',
                    }}>
                    Done
                  </Text>

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
                    Add To Cart
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
            <Pressable onPress={() => {}} style={style.cartItemsContainer}>
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
                    width: 120,
                    height: 190,
                    backgroundColor: '#F0F8FF',
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
              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text
                    style={{
                      marginLeft: '22%',
                      fontWeight: '400',
                      fontSize: 13,
                      color: 'black',
                    }}>
                    Done
                  </Text>

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
                    Add To Cart
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
            <Pressable onPress={() => {}} style={style.cartItemsContainer}>
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
                    width: 120,
                    height: 190,
                    backgroundColor: '#F0F8FF',
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
              {cartItems !== undefined &&
              cartItems.find(index => index.key === item.key) ? (
                <Pressable onPress={() => {}} style={style.plusContainer}>
                  <Text
                    style={{
                      marginLeft: '22%',
                      fontWeight: '400',
                      fontSize: 13,
                      color: 'black',
                    }}>
                    Done
                  </Text>

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
                    Add To Cart
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator style={{}} size="large" color="#0000ff" />
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              fontSize: 16,
              color: '#0000ff',
              marginTop: 10,
            }}>
            Loading
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{
              paddingVertical: 15,
              borderBottomRightRadius: 70,
              backgroundColor: '#F0F8FF',
            }}>
            <View
              style={{
                paddingHorizontal: '2%',
                width: Dimensions.get('window').width,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
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
              <Ionicons
                name={'arrow-back-outline'}
                size={30}
                color={'#F0F8FF'}
              />
              <Text
                style={{
                  width: '42%',
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 22,
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                Home Services
              </Text>

              <View
                style={{
                  width: '20%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Pressable
                  onPress={() => {
                    Linking.openURL(`tel:${'03164558585'}`);
                  }}>
                  <FontAwesome name={'phone'} size={30} color={'magenta'} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate('NotificationScreen');
                  }}>
                  <FontAwesome name={'bell'} size={30} color={'#E9967A'} />
                </Pressable>
              </View>
            </View>
            <Pressable
              style={style.sectionStyle}
              onPress={() => {
                setSearchModal(true);
                dispatch(emptyCart());
              }}>
              <View pointerEvents="none">
                <Text style={style.searchTxt}>Search...</Text>
              </View>
              <FontAwesome name={'filter'} size={22} color={'black'} />
            </Pressable>
          </View>
          <View style={{paddingHorizontal: '5%', flex: 1}}>
            <FlatList
              data={list}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={renderHomeServiceDetail}
              ListHeaderComponent={({item, index}) => {
                return (
                  <Text style={style.listHeaderTxt}>Choose from Listing</Text>
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
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 30,
                height: 30,
                borderWidth: 1.3,
                borderColor: 'white',
                borderRadius: 30 / 2,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 19,
                  fontWeight: '600',
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                {cartItems.length}
              </Text>
            </View>

            <Text
              style={{
                color: 'white',
                fontFamily: 'RobotoSlab-Bold',
                fontSize: 19,
                fontWeight: '600',
              }}>
              Rs.{total}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/* <Text style={{color: 'white', fontSize: 19, fontWeight: '500'}}>
              Continue
            </Text> */}
              <Ionicons
                style={{marginLeft: 5}}
                name={'arrow-forward-outline'}
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
      {/* <BottomTabs navigation={navigation} /> */}
    </SafeAreaView>
  );
}

export default HomeSubDetail;
