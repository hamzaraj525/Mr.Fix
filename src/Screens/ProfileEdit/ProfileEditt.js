import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import {logoutUser} from '../../Redux/Action/actions';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import BottomTabs from '../../Components/BottomTabs/BottomTabs';
import NameEditModal from '../../Components/Modal/NameEditModal';
import MailEditModal from '../../Components/Modal/MailEditModal';

function ProfileEditt({navigation, props, route}) {
  const dispatch = useDispatch();
  const [listt, setList] = useState([]);
  const [image, setImage] = useState(null);
  const [idEdit, setId] = React.useState('');
  const [mailEdit, setMailEdit] = React.useState();
  const [nameEdit, setNameEdit] = React.useState();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [showNameModal, setNameModal] = React.useState(false);
  const [showMailModal, setMailModal] = React.useState(false);
  const {cartItems, userId, userName, userMail, userContact} = useSelector(
    reducers => reducers.cartReducer,
  );

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
            userPhone: child.val().userPhone,
          });
        });
        setList(li);
      });
  }, []);

  const list = () => {
    return listt.map(element => {
      if (element.userIdd === userId) {
        return (
          <View style={{}}>
            <Pressable
              onPress={() => {
                setNameModal(true);
                setNameEdit(element.key);
              }}
              style={style.subContainers}>
              <View style={{}}>
                <Text style={style.titleTxt}>Name</Text>
                <Text style={style.subTxt}>{element.userNamee}</Text>
              </View>
              <Fontisto
                style={{marginLeft: 5}}
                name={'arrow-right-l'}
                size={27}
                color={'black'}
              />
            </Pressable>

            <Pressable
              onPress={() => {
                setMailModal(true);
                setMailEdit(element.key);
              }}
              style={style.subContainers}>
              <View style={{}}>
                <Text style={style.titleTxt}>Email Adress</Text>
                <Text style={style.subTxt}>{element.userMaill} </Text>
              </View>
              <Fontisto
                style={{marginLeft: 5}}
                name={'arrow-right-l'}
                size={27}
                color={'black'}
              />
            </Pressable>

            <View style={style.subContainers}>
              <View style={{}}>
                <Text style={style.titleTxt}>Contact</Text>
                <Text style={style.subTxt}>{element.userPhone} </Text>
              </View>
              <Fontisto
                style={{marginLeft: 5}}
                name={'arrow-right-l'}
                size={27}
                color={'black'}
              />
            </View>
          </View>
        );
      } else {
        return null;
      }
    });
  };

  const showAlert = () => {
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
  };

  return (
    <SafeAreaView style={style.container}>
      {uploading ? (
        <View style={style.loaderStyle}>
          <ActivityIndicator style={{}} size="large" color="#0000ff" />
          <Text style={style.uploadTxt}>{transferred}% Uplaoding...</Text>
        </View>
      ) : (
        <ScrollView style={style.scrolViewStyle}>
          <Pressable
            style={{marginTop: '2%', marginLeft: '2%'}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name={'arrow-back-outline'} size={30} color={'black'} />
          </Pressable>
          <Text style={style.ediTxt}>Edit</Text>
          <Text style={style.prfileTxt}>Profile 😃</Text>
          <View style={style.imgContainer}>
            <Pressable
              style={style.emtyContainer}
              onPress={() => {}}></Pressable>
            <Pressable
              style={style.imgSubContainer}
              onPress={() => {
                choosePhotoFromLibrary();
              }}>
              {image ? (
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  priority={FastImage.priority.high}
                  style={style.editImgStyle}
                  source={{uri: image}}
                />
              ) : (
                <FastImage
                  resizeMode="cover"
                  priority={FastImage.priority.normal}
                  style={style.editImgStyle}
                  source={require('../../../assets/Images/man.png')}
                />
              )}
            </Pressable>
            <Pressable
              style={style.usrnmeContainer}
              onPress={() => {}}></Pressable>
          </View>

          <Text style={style.userNmeStyle}>{userName}</Text>
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
