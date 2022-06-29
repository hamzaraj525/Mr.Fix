import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StatusBar,
  Platform,
  Image,
  PermissionsAndroid,
  Pressable,
} from 'react-native';
import LottieView from 'lottie-react-native';
import style from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabs from '../../Components/BottomTabs/BottomTabs';
import * as Animatable from 'react-native-animatable';
import servicesList from './../../DataStore/HomeDataa';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import CominSoonModal from '../../Components/Modal/CominSoonModal';
import {connect, useDispatch, useSelector} from 'react-redux';
import {addUserid, logoutUser} from '../../Redux/Action/actions';
import FastImage from 'react-native-fast-image';

function HomeScreen({navigation, route}) {
  // const [state, setCords] = useState({
  //   pickupCords: {
  //     latitude: 30.7046,
  //     longitude: 76.7179,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   },
  //   dropLocation: {
  //     latitude: 30.7333,
  //     longitude: 76.7794,
  //     latitudeDelta: 0.0922,
  //     longitudeDelta: 0.0421,
  //   },
  // });

  const GOOGLE_MAPS_APIKEY = 'AIzaSyDAhaR1U_-EQJZu4Ckm0iUQ4gxSWqIMOvY';
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [url, setUrl] = useState('');
  const [CSmodal, setMoal] = useState(false);
  const [locationText, setLocationText] = useState('');
  const dispatch = useDispatch();
  const {cartItems, userId, userName, userMail} = useSelector(
    reducers => reducers.cartReducer,
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      _getCurrentLocation();
    }
  }, [lat, long]);
  // useEffect(() => {
  //   locationText !== '' ? dispatch(addUserid(locationText)) : null;
  // }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Mr.Fix needs access to your location',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        _getCurrentLocation();
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const _getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        // console.log('location:' + lat, long);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000},
    );

    Geocoder.init(GOOGLE_MAPS_APIKEY, {language: 'en'});
    Geocoder.from(lat, long)
      .then(json => {
        var addressComponent = json.results[0].formatted_address;
        console.log('address is  here', addressComponent);
        setLocationText(addressComponent);
      })
      .catch(error => console.log(error));
  };

  const servicesHeader = ({item, index}) => {
    return (
      <>
        <View style={style.welcomeTxtBody}>
          <View
            style={{
              marginLeft: '5%',
              marginTop: Platform.OS === 'ios' ? '14%' : '3%',
              marginRight: '5%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={style.txt}>
              <Text
                style={{
                  fontSize: 31,
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                Welcome
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: 'RobotoSlab-Bold',
                  }}>
                  to{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: 'RobotoSlab-Bold',
                  }}>
                  Mr.Fix
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <FastImage
                resizeMode="cover"
                style={style.profileImg}
                source={require('../../../assets/Images/h.jpeg')}
              />
            </Pressable>
          </View>

          <View
            style={{
              alignSelf: 'center',
              marginTop: '2%',
              width: '89%',
              borderRadius: 12,
              height: 57,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              style={{marginLeft: 10}}
              name="location-sharp"
              size={22}
              color={'black'}
            />
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 8,
                width: '80%',
              }}>
              {/* <Text
                style={{
                  fontWeight: '800',
                  color: 'black',
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                Lahore
              </Text> */}
              {locationText !== '' ? (
                <Text
                  style={{
                    fontFamily: 'RobotoSlab-Bold',
                    color: 'grey',
                    marginTop: 3,
                    fontSize: 14,
                  }}>
                  {locationText}
                </Text>
              ) : (
                <LottieView
                  style={{width: 45, height: 45}}
                  source={require('./../../../assets/Animations/load.json')}
                  autoPlay
                  loop={true}
                />
              )}
            </View>
          </View>
        </View>

        <View
          style={{
            marginLeft: 28,
            marginTop: 20,
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'RobotoSlab-Bold',
                color: 'grey',
                fontSize: 21,
                fontWeight: '700',
              }}>
              Hello {userName}
            </Text>
            <Animatable.View
              iterationCount={1}
              useNativeDriver
              animation={'bounceIn'}
              delay={500}>
              <Image
                style={{
                  marginLeft: 7,
                  width: 32,
                  height: 32,
                }}
                source={require('../../../assets/Images/waving-hand.png')}
              />
            </Animatable.View>
          </View>
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              color: 'grey',
              fontSize: 11,
            }}>
            Need a helping hand today ?
          </Text>
        </View>
      </>
    );
  };

  const renderServicesList = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          if (item.key == '1') {
            navigation.navigate('PersonalSub');
          } else if (item.key == '2') {
            navigation.navigate('HomeSub');
          } else if (item.key == '3') {
            setMoal(true);
          }
        }}
        style={{
          marginTop: 5,
          alignSelf: 'center',
        }}>
        <View style={[style.card, {backgroundColor: item.color}]}>
          <View
            style={{
              flexDirection: 'column',
              width: '53%',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'RobotoSlab-Bold',
                fontSize: 26,
                fontWeight: '600',
                color: 'white',
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 26,
                fontWeight: '600',
                marginTop: -4,
                color: 'white',
              }}>
              {item.title2}
            </Text>
            <Text
              style={{
                marginTop: 2,
                fontFamily: 'RobotoSlab-Bold',
                fontSize: 11,
                color: 'white',
              }}>
              {item.subtitle}
            </Text>
          </View>
          <Image
            resizeMode="contain"
            style={{width: '28%', height: 100}}
            source={item.img}
          />
        </View>
      </Pressable>
    );
  };
  const closeModal = () => {
    setMoal(false);
  };
  const date = new Date();
  //date num
  const d = date.getDate();
  const reading = 7000;
  const change = 1000;
  const km = 50;

  const datee = change * km;
  // //month name
  // const month = date.toLocaleString('default', {month: 'long'});
  // //week
  // const dayy = date.toLocaleString('en-us', {weekday: 'long'});
  // console.log(dayy, month, d);

  return (
    <View style={{flex: 1}}>
      <StatusBar hidden barStyle="light-content" backgroundColor={'#FED116'} />

      <FlatList
        data={servicesList}
        renderItem={renderServicesList}
        ListHeaderComponent={servicesHeader}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
        keyExtractor={item => item.key}
      />

      <CominSoonModal
        navigation={navigation}
        showModal={CSmodal}
        hideModal={closeModal}
      />
      <BottomTabs navigation={navigation} />
    </View>
  );
}
export default HomeScreen;
