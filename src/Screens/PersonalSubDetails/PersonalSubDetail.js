import React, {useState, useEffect} from 'react';
import {
  Text,
  Dimensions,
  View,
  FlatList,
  Pressable,
  SafeAreaView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Animations} from '../../../assets/Animations/Animation';
import BottomTabs from '../../Components/BottomTabs/BottomTabs';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart, emptyCart} from '../../Redux/Action/actions';
import PersonalSearchModal from '../../Components/Modal/PersonalSearchModal';
const animations = Animations[Math.floor(Math.random() * Animations.length)];

function PersonalSubDetail({navigation, route}) {
  const [pList, setPList] = useState([]);
  const [add, setAdd] = useState(false);
  const [loader, setLoader] = useState(true);
  const [PersonModal, setPersonaModal] = useState(false);
  const dispatch = useDispatch();

  const {cartItems} = useSelector(reducers => reducers.cartReducer);
  console.log(cartItems, 'cartItems');

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
  useEffect(() => {
    personalServicesData();
  }, []);

  const closeModal = () => {
    setPersonaModal(false);
  };
  const personalServicesData = () => {
    var newArray = [];

    firestore()
      .collection('PersonalServices')
      .get()
      .then(querySnapshot => {
        console.log('Total services: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New Personal Push is =', newArray);
        setPList(newArray);
        setLoader(false);
      })
      .catch(error => {
        console.log(error);
        alert('Your Network Connection Is Not Good');
      });
  };

  const personalList = ({item, index}) => {
    const {ItemPersonal} = route.params;

    return (
      <>
        {item.type === 'Ban Jao Beautifull' &&
        ItemPersonal.title === 'Ban Jao Beautifull' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
            delay={index * 5}>
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
                    borderRadius: 10,
                    width: 120,
                    height: 190,
                    backgroundColor: '#F0F8FF',
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
                      fontFamily: 'RobotoSlab-Bold',
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
        ) : item.type === 'Facial' && ItemPersonal.title === 'Facial' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
            delay={index * 55}>
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
                      fontFamily: 'RobotoSlab-Bold',
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
        ) : item.type === 'Mehndi Service' &&
          ItemPersonal.title === 'Mehndi Service' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
            delay={index * 5}>
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
                      fontFamily: 'RobotoSlab-Bold',
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
        ) : item.type === 'Makeup' && ItemPersonal.title === 'Makeup' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
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
                      fontFamily: 'RobotoSlab-Bold',
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
        ) : item.type === 'Mani Pedi' && ItemPersonal.title === 'Mani Pedi' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
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
                      fontFamily: 'RobotoSlab-Bold',
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
        ) : item.type === 'Hair Treatment' &&
          ItemPersonal.title === 'Hair Treatment' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
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
                      fontFamily: 'RobotoSlab-Bold',
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
        ) : item.type === 'Waxing' && ItemPersonal.title === 'Waxing' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
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
                      fontFamily: 'RobotoSlab-Bold',
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
        backgroundColor: 'white',
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
                  fontFamily: 'RobotoSlab-Bold',
                  width: '46%',
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 22,
                }}>
                Personal Services
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
                setPersonaModal(true);
              }}>
              <View pointerEvents="none">
                <Text style={style.searchTxt}>Search...</Text>
              </View>
              <FontAwesome name={'filter'} size={22} color={'black'} />
            </Pressable>
          </View>
          <View style={{paddingHorizontal: '5%', flex: 1}}>
            <FlatList
              data={pList}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={personalList}
              ListHeaderComponent={({item, index}) => {
                return (
                  <Text style={style.listHeaderTxt}>Choose from Listing</Text>
                );
              }}
              keyExtractor={(item, index) => 'key' + index}
            />

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
                        fontFamily: 'RobotoSlab-Bold',
                        color: 'white',
                        fontSize: 19,
                        fontWeight: '600',
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
          </View>
        </>
      )}
      {/* <BottomTabs navigation={navigation} /> */}
      <PersonalSearchModal
        navigation={navigation}
        PersonModal={PersonModal}
        hideModal={closeModal}
      />
    </SafeAreaView>
  );
}
export default PersonalSubDetail;
