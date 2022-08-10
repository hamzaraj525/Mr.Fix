import React from 'react';
import {
  Text,
  View,
  Alert,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import style from './style';
import Share from 'react-native-share';
import Images from '../../Constraints/Images';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../Redux/Action/actions';
import files from '../../../assets/Images/fileBase64';
import Constraints from '../../Constraints/Constraints';
import profileList from '../../DataStore/ProfileListData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function ProfileScreen({navigation, props, route}) {
  const dispatch = useDispatch();
  const {userId, userContact, userName} = useSelector(
    reducers => reducers.cartReducer,
  );

  const list = () => {
    return profileList.map((element, index) => {
      return (
        <View style={style.btnScreens} key={index}>
          <Pressable
            onPress={() => {
              if (element.name == 'About Us') {
                navigation.navigate('About');
              } else if (element.name == 'Terms & Conditions') {
                navigation.navigate('TermsCondition');
              } else if (element.name == 'Privacy Policy') {
                navigation.navigate('Privacy');
              } else if (element.name == 'Account') {
                navigation.navigate('ProfileEditt');
              } else if (element.name == 'Address') {
                navigation.navigate('Location');
              }
            }}
            style={style.btnNavigate}>
            <View style={style.icon}>
              <FastImage
                resizeMode="cover"
                priority={FastImage.priority.normal}
                style={style.iconSize}
                source={element.icon}
              />
            </View>
            <View style={style.screenName}>
              <Text style={style.screenNameTxt}>{element.name}</Text>
              <Ionicons
                name={'arrow-forward-outline'}
                size={30}
                color={'black'}
              />
            </View>
          </Pressable>
        </View>
      );
    });
  };

  const showAlert = () =>
    Alert.alert('Confirmation', 'Are you sure you want to sign out ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          try {
            auth()
              .signOut()
              .then(() => {
                dispatch(logoutUser(userId, userContact));
              })
              .then(() => {
                console.log('User signed out!');
                navigation.replace('OtpStack');
              })
              .catch(error => {
                alert('No user is signed in');
              });
          } catch (error) {
            alert(error);
          }
        },
      },
    ]);

  const shareApp = async () => {
    const options = {
      message: 'Mr.Fix App',
      url: files.appLogo,
    };
    try {
      const shareRes = await Share.open(options).then(res => {
        console.log(res);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={style.scroll}>
        <Pressable
          style={style.backBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name={'arrow-back-outline'} size={30} color={'black'} />
        </Pressable>
        <Text style={style.MyTxt}>My</Text>

        <Text style={style.profileTxt}>{Constraints.PROFILE} 😃</Text>

        <View style={style.btnsContainer}>
          <Pressable
            style={style.shareBtn}
            onPress={() => {
              shareApp();
            }}>
            <FontAwesome5 name={'share-alt'} size={25} color={'black'} />
          </Pressable>

          <Pressable
            style={style.ProfileimgBtn}
            onPress={() => {
              navigation.navigate('ProfileEditt');
            }}>
            <FastImage
              resizeMode="cover"
              priority={FastImage.priority.normal}
              style={style.Profileimg}
              source={Images.profileImgHome}
            />
          </Pressable>
          <Pressable
            style={style.logoutBtn}
            onPress={() => {
              showAlert();
            }}>
            <Ionicons name={'log-out'} size={30} color={'black'} />
          </Pressable>
        </View>

        <Text style={style.userNameTxt}>{userName}</Text>
        {list()}
      </ScrollView>
    </SafeAreaView>
  );
}
export default ProfileScreen;
