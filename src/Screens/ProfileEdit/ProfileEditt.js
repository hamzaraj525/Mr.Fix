import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Alert,
  Platform,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import BottomTabs from '../../Components/BottomTabs/BottomTabs';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../Redux/Action/actions';
import NameEditModal from '../../Components/Modal/NameEditModal';
import MailEditModal from '../../Components/Modal/MailEditModal';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

function ProfileEditt({navigation, props, route}) {
  const [listt, setList] = useState([]);
  const [idEdit, setId] = React.useState('');
  const [nameEdit, setEdit] = React.useState();
  const [mailEdit, setMailEdit] = React.useState();
  const [showNameModal, setNameModal] = React.useState(false);
  const [showMailModal, setMailModal] = React.useState(false);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const dispatch = useDispatch();
  const {cartItems, userId, userName, userMail, userContact} = useSelector(
    reducers => reducers.cartReducer,
  );

  const profileList = [
    {
      id: 1,
      name: 'Name',
      subName: userName,
    },
    {id: 2, name: 'Phone Number', subName: userContact},
    {id: 3, name: 'Email Address', subName: userMail},
  ];

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    setUploading(true);
    setTransferred(0);
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);
    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      console.log('url==' + url);
      setImage(url);
      Alert.alert('Image uploaded!');
      return url;
      console.log('url here' + url);
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7,
  //   }).then(image => {
  //     console.log(image.data);
  //     const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
  //     setImage(imageUri);
  //   });
  // };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        console.log('image is here-----' + image.sourceURL);
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
      })
      .finally(() => {
        uploadImage();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const hideNameModal = () => {
    setNameModal(false);
  };
  const hideMailModal = () => {
    setMailModal(false);
  };

  useEffect(() => {
    database()
      .ref('/users')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          // console.log(child.val());
          li.push({
            key: child.key,
            userIdd: child.val().userId,
            userNamee: child.val().userName,
            userMaill: child.val().userMail,
          });
        });
        setList(li);
      });
  }, []);

  const list = () => {
    return listt.map(element => {
      return (
        <View
          style={{
            alignSelf: 'center',
            marginBottom: 22,
            width: Dimensions.get('window').width - 50,
          }}
          key={element.key}>
          <Pressable
            onPress={() => {
              if (element.name === 'Name') {
                setNameModal(true);
                // setEdit(element.key);
              } else if (element.subName === 'Phone Number') {
              } else if (element.name === 'Email Address') {
                setMailModal(true);
                // setMailEdit(element.key);
              }
            }}
            style={{
              borderRadius: 15,
              paddingVertical: '3%',
              paddingHorizontal: '8%',
              backgroundColor: '#ecf5fb',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <Text
                  style={{
                    alignSelf: 'flex-start',
                    fontWeight: '500',
                    fontSize: 16,
                    fontFamily: 'RobotoSlab-Bold',
                  }}>
                  {element.userNamee}
                </Text>

                <Text
                  style={{
                    fontWeight: '500',
                    alignSelf: 'flex-start',
                    fontSize: 14,
                    color: 'grey',
                  }}>
                  {element.userMaill}
                </Text>
              </View>
              <Fontisto
                style={{}}
                name={'arrow-right-l'}
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
    Alert.alert('Log out', 'are you sure?', [
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
                dispatch(logoutUser(userId));
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {uploading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator style={{}} size="large" color="#0000ff" />
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              fontSize: 16,
              color: '#0000ff',
              marginTop: 10,
            }}>
            {transferred}% Uplaoding...
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{
            padding: '2%',
            borderRadius: 33,
            borderWidth: 0.2,
            borderColor: 'black',
          }}>
          <Pressable
            style={{marginTop: '2%', marginLeft: '2%'}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              style={{}}
              name={'arrow-back-outline'}
              size={30}
              color={'black'}
            />
          </Pressable>
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              marginLeft: '2%',
              marginTop: '7%',
              color: 'black',
              width: '55%',
              fontWeight: '600',
              fontSize: 29,
              marginBottom: 3,
            }}>
            Edit
          </Text>

          <Text
            style={{
              marginLeft: '2%',
              fontWeight: '600',
              color: 'black',
              width: '55%',
              fontSize: 27,
              marginBottom: '10%',
              fontFamily: 'RobotoSlab-Bold',
            }}>
            Profile 😃
          </Text>

          <View
            style={{
              marginBottom: '6%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Pressable
              style={{
                alignItems: 'center',
                height: 55,
                width: 55,
                borderRadius: 55 / 2,
                justifyContent: 'center',
              }}
              onPress={() => {}}></Pressable>

            <Pressable
              style={{
                alignItems: 'center',
                width: 115,
                height: 115,
                borderRadius: 115 / 2,
                justifyContent: 'center',
                borderWidth: 0.5,
                borderColor: 'grey',
              }}
              onPress={() => {
                choosePhotoFromLibrary();
              }}>
              {image ? (
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  priority={FastImage.priority.high}
                  style={{
                    borderRadius: 100 / 2,
                    width: 100,
                    height: 100,
                  }}
                  source={{uri: image}}
                />
              ) : (
                <FastImage
                  resizeMode="cover"
                  priority={FastImage.priority.normal}
                  style={{
                    borderRadius: 100 / 2,
                    width: 100,
                    height: 100,
                  }}
                  source={require('../../../assets/Images/man.png')}
                />
              )}
            </Pressable>
            <Pressable
              style={{
                alignItems: 'center',
                height: 55,
                width: 55,
                borderRadius: 55 / 2,
                justifyContent: 'center',
              }}
              onPress={() => {}}></Pressable>
          </View>

          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              alignSelf: 'center',
              fontWeight: '600',
              color: 'black',
              fontSize: 24,
              marginBottom: '8%',
            }}>
            {userName}
          </Text>
          {list()}
        </ScrollView>
      )}
      <NameEditModal
        navigation={navigation}
        showNameModal={showNameModal}
        hideNameModal={hideNameModal}
        nameEdit={nameEdit}
        idEdit={idEdit}
      />
      <MailEditModal
        navigation={navigation}
        showMailModal={showMailModal}
        hideMailModal={hideMailModal}
        mailEdit={mailEdit}
      />
    </SafeAreaView>
  );
}
export default ProfileEditt;
