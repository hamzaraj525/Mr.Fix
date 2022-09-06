import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Linking,
  FlatList,
  Pressable,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addToCart, emptyCart} from '../../Redux/Action/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Animations} from '../../../assets/Animations/Animation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PersonalSearchModal from '../../Components/Modal/PersonalSearchModal';
import Constraints from '../../Constraints/Constraints';
const animations = Animations[Math.floor(Math.random() * Animations.length)];

function PersonalSubDetail({navigation, route}) {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [pList, setPList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [PersonModal, setPersonaModal] = useState(false);
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
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        setPList(newArray);
        setLoader(false);
      })
      .catch(error => {
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
        ) : item.type === 'Facial' && ItemPersonal.title === 'Facial' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
            delay={index * 55}>
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
        ) : item.type === 'Mehndi Service' &&
          ItemPersonal.title === 'Mehndi Service' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
            delay={index * 5}>
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
        ) : item.type === 'Makeup' && ItemPersonal.title === 'Makeup' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
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
        ) : item.type === 'Mani Pedi' && ItemPersonal.title === 'Mani Pedi' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
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
        ) : item.type === 'Hair Treatment' &&
          ItemPersonal.title === 'Hair Treatment' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
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
        ) : item.type === 'Waxing' && ItemPersonal.title === 'Waxing' ? (
          <Animatable.View
            iterationCount={1}
            useNativeDriver
            animation={animations}
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
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

              <Text style={style.titleTxt}>
                {Constraints.PERSONAL_SERVICES}
              </Text>
              <View style={style.iconContain}>
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
              contentContainerStyle={{paddingBottom: '33%'}}
              data={pList}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={personalList}
              ListHeaderComponent={({item, index}) => {
                return (
                  <Text style={style.listHeaderTxt}>
                    {Constraints.CHOOSE_FROM_LISTING}
                  </Text>
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
          </View>
        </>
      )}

      <PersonalSearchModal
        navigation={navigation}
        PersonModal={PersonModal}
        hideModal={closeModal}
      />
    </SafeAreaView>
  );
}
export default PersonalSubDetail;
