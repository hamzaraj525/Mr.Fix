import style from './style';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import Images from './../../Constraints/Images';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import servicesList from './../../DataStore/HomeDataa';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import BottomTabs from '../../Components/BottomTabs/BottomTabs';
import Constraints from './../../../src/Constraints/Constraints';
import CominSoonModal from '../../Components/Modal/CominSoonModal';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {
  addUserLcation,
  logoutUser,
  addLatitude,
  addLontitude,
} from '../../Redux/Action/actions';
import {
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  StatusBar,
  Platform,
  ActivityIndicator,
  ImageBackground,
  PermissionsAndroid,
} from 'react-native';

function HomeScreen({navigation, route}) {
  const [locationText, setLocationText] = useState('');
  const dispatch = useDispatch();
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [url, setUrl] = useState('');
  const [CSmodal, setMoal] = useState(false);
  const {userlocation, userName, userPic} = useSelector(
    reducers => reducers.cartReducer,
  );
  const placeHolerImg =
    'https://firebasestorage.googleapis.com/v0/b/mrfix-55775.appspot.com/o/MrFixProfilePics%2Fman-2.png?alt=media&token=68735a41-7ffe-4082-bc00-2b88c8f9e22a';

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      _getCurrentLocation();
    }
  }, [long, lat]);

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
      } else {
      }
    } catch (err) {}
  };

  const _getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      error => {},
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000,
      },
    );

    Geocoder.init(GOOGLE_MAPS_APIKEY, {language: 'en'});
    Geocoder.from(lat, long)
      .then(json => {
        var addressComponent = json.results[3].formatted_address;

        setLocationText(addressComponent);
        dispatch(addUserLcation(addressComponent));
        dispatch(addLatitude(lat));
        dispatch(addLontitude(long));
      })
      .catch(error => {});
  };

  const servicesHeader = ({item, index}) => {
    return (
      <>
        <View style={style.welcomeTxtBody}>
          <View style={style.welcomeTxtBodyLeft}>
            <View style={style.txt}>
              <Text style={style.txt}>{Constraints.WELCOME}</Text>
              <View style={style.txtHeaderContainer}>
                <Text style={style.txtTo}>{Constraints.TO} </Text>
                <Text style={style.txtTitle}>{Constraints.MR_FIX}</Text>
              </View>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                priority={FastImage.priority.high}
                style={style.profileImg}
                source={{
                  uri: userPic ? userPic : placeHolerImg,
                }}
              />
            </Pressable>
          </View>

          <View style={style.locContain}>
            <Ionicons
              style={{marginLeft: 10}}
              name="location-sharp"
              size={22}
              color={'black'}
            />
            <View style={style.locContainSub}>
              {/* <Text
                style={{
                  fontWeight: '800',
                  color: 'black',
                  fontFamily: 'RobotoSlab-Bold',
                }}>
                Lahore
              </Text> */}
              {userlocation ? (
                <Text style={style.locTxt}>{userlocation}</Text>
              ) : (
                <LottieView
                  style={{width: 45, height: 45}}
                  source={Images.loaderHome}
                  autoPlay
                  loop={true}
                />
              )}
            </View>
          </View>
        </View>

        <View style={style.nameContain}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={style.userNameTxt}>Hello {userName}</Text>
            <Animatable.View
              iterationCount={1}
              useNativeDriver
              animation={'bounceIn'}
              delay={500}>
              <Image style={style.waveImg} source={Images.WAVE_IMG} />
            </Animatable.View>
          </View>
          <Text style={style.helpTxt}>{Constraints.HELPING_HAND}</Text>
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
        style={style.servicesContain}>
        <View style={[style.card, {backgroundColor: item.color}]}>
          <View style={style.cardImgContain}>
            <Text style={style.cardImgContainTxt}>{item.title}</Text>
            <Text style={style.cardSubTitleTxt}>{item.title2}</Text>
            <Text style={style.cardSubTitleTwoTxt}>{item.subtitle}</Text>
          </View>
          <Image resizeMode="contain" style={style.cardImg} source={item.img} />
        </View>
      </Pressable>
    );
  };
  const closeModal = () => {
    setMoal(false);
  };

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
