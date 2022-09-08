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
import Images from '../../Constraints/Images';
import FastImage from 'react-native-fast-image';
import storage from '@react-native-firebase/storage';
import {useDispatch, useSelector} from 'react-redux';
import Constraints from '../../Constraints/Constraints';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import NameEditModal from '../../Components/Modal/NameEditModal';
import MailEditModal from '../../Components/Modal/MailEditModal';
import {userProfilePic} from './../../Redux/Action/actions';

function ProfileEditt({navigation, props, route}) {
  const dispatch = useDispatch();
  const [listt, setList] = useState([]);
  const [image, setImage] = useState(null);
  const [idEdit, setId] = React.useState('');
  const [mailEdit, setMailEdit] = React.useState();
  const [nameEdit, setNameEdit] = React.useState();
  const [loader, setLoader] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [showNameModal, setNameModal] = React.useState(false);
  const [showMailModal, setMailModal] = React.useState(false);
  const {userId, userName} = useSelector(reducers => reducers.cartReducer);
  const filteredList = listt.filter(e => e.userIdd === userId);
  const placeHolerImg =
    'https://firebasestorage.googleapis.com/v0/b/mrfix-55775.appspot.com/o/MrFixProfilePics%2Fman-2.png?alt=media&token=68735a41-7ffe-4082-bc00-2b88c8f9e22a';

  const updateProfilePic = (url, e) => {
    database()
      .ref('users/' + e.key)
      .update({
        userProfilePic: url,
      })
      .then(() => {
        dispatch(userProfilePic(url));
      })
      .catch(() => {
        alert('Some error occured');
      });
  };

  const uploadImage = async (uploadUri, e) => {
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    setUploading(true);
    setTransferred(0);
    const storageRef = storage().ref(`MrFixProfilePics/${filename}`);
    const task = storageRef.putFile(uploadUri);
    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);

      setImage(url);
      updateProfilePic(url, e);

      return url;
    } catch (e) {
      return null;
    }
  };

  const choosePhotoFromLibrary = async e => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(img => {
        const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
        uploadImage(imageUri, e);
      })
      .catch(error => {});
  };

  const hideNameModal = () => {
    setNameModal(false);
  };
  const hideMailModal = () => {
    setMailModal(false);
  };

  useEffect(() => {
    setLoader(true);
    database()
      .ref('/users')
      .on('value', snapshot => {
        var li = [];
        snapshot.forEach(child => {
          li.push({
            key: child.key,
            userIdd: child.val().userId,
            userNamee: child.val().userName,
            userMaill: child.val().userMail,
            userPhone: child.val().userPhone,
            userProfilePic: child.val().userProfilePic,
            Ratings: child.val().Ratings,
          });
        });
        setLoader(false);
        setList(li);
      });
  }, []);

  const list = () => {
    return listt.map(element => {
      if (element.userIdd === userId) {
        return (
          <View key={element.key} style={{}}>
            <Pressable
              onPress={() => {
                setNameModal(true);
                setNameEdit(element.key);
              }}
              style={style.subContainers}>
              <View>
                <Text style={style.titleTxt}>{Constraints.NAME}</Text>
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
                <Text style={style.titleTxt}>{Constraints.EMAIL_ADDRESS}</Text>
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
              <View>
                <Text style={style.titleTxt}>{Constraints.CONTACT}</Text>
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

  return (
    <SafeAreaView style={style.container}>
      {uploading ? (
        <View style={style.loaderStyle}>
          <ActivityIndicator style={{}} size="large" color="#0000ff" />
          <Text style={style.uploadTxt}>
            {transferred}% {Constraints.UPLOADING}
          </Text>
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={style.scrolViewStyle}>
          <Pressable
            style={style.backArrow}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name={'arrow-back-outline'} size={30} color={'black'} />
          </Pressable>
          <Text style={style.ediTxt}>{Constraints.EDIT}</Text>
          <Text style={style.prfileTxt}>{Constraints.PROFILE} 😃</Text>
          <View style={style.imgContainer}>
            <Pressable style={style.emtyContainer}></Pressable>
            {filteredList.map(e => {
              return (
                <Pressable
                  style={style.imgSubContainer}
                  onPress={() => {
                    choosePhotoFromLibrary(e);
                  }}>
                  <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    priority={FastImage.priority.high}
                    style={style.editImgStyle}
                    source={{
                      uri: e.userProfilePic ? e.userProfilePic : placeHolerImg,
                    }}
                  />
                </Pressable>
              );
            })}

            <Pressable style={style.usrnmeContainer}></Pressable>
          </View>

          {listt.map(element => {
            if (element.userIdd === userId) {
              return (
                <>
                  {console.log(element.Ratings)}
                  <Text style={style.userNmeStyle}>{element.userNamee}</Text>
                  {/* {element.Ratings.map((i, index) => {
                    return (
                      <Text key={index} style={style.userNmeStyle}>
                        {i}
                      </Text>
                    );
                  })} */}
                </>
              );
            } else {
              return null;
            }
          })}
          {loader ? (
            <ActivityIndicator
              style={{marginTop: 50}}
              size="large"
              color="#0000ff"
            />
          ) : (
            list()
          )}
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
