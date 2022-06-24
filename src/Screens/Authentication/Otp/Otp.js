import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  StatusBar,
  Image,
} from 'react-native';
import style from './style';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect, useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
const Otp = ({navigation}) => {
  const [phonePlace, setPhonePlace] = React.useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const {cartItems, userId} = useSelector(reducers => reducers.cartReducer);

  const signInWithPhoneNumber = async () => {
    try {
      if (code !== '') {
        const confirmation = await auth().signInWithPhoneNumber(code);
        // setConfirm(confirmation);
        console.log(confirmation);

        if (confirmation._auth._authResult) {
          navigation.navigate('SignUpOtpp', {
            confirmation: confirmation,
            code: code,
          });
          setCode('');
        } else {
          alert('Failed');
        }
      } else {
        alert('Please enter valid phone number');
      }
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        alert('Network Error');
      } else {
        alert(
          'Due to too Many requests You have been blocked,Please try again later',
        );
      }
    }
  };

  return (
    <View style={style.container}>
      <StatusBar hidden={true} />

      <ScrollView bounces={false} contentContainerStyle={{flex: 1}}>
        <View
          style={{
            flex: 1.4,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gold',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 95 / 2,
              width: 95,
              height: 95,
              backgroundColor: '#EAC36D',
              marginBottom: '3%',
            }}>
            <Image
              style={{width: 50, tintColor: 'black', height: 50}}
              source={require('./../../../../assets/Images/chat.png')}
            />
          </View>

          <Text style={style.signUpTxt}>Mobile Number</Text>
          <Text
            style={[
              style.txtAlready,
              {marginRight: 0, marginTop: '3%', fontSize: 13},
            ]}>
            We need to send OTP to authenticate your number
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            borderTopStartRadius: 70,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={[style.passwordContainer, {marginTop: '10%'}]}>
            <Feather name="phone" size={20} color={'black'} />
            <TextInput
              style={style.TiName}
              value={code}
              onChangeText={text => {
                setCode(text);
              }}
              onFocus={() => {
                setPhonePlace(true);
              }}
              placeholder={phonePlace ? 'Enter your number' : '+92**********'}
              placeholderTextColor={phonePlace ? 'black' : 'grey'}
            />
          </View>

          <Pressable
            onPress={() => {
              signInWithPhoneNumber();
            }}
            style={style.loginBtn}>
            <Text style={style.sinupBtn}>Next</Text>

            <Ionicons
              style={{marginLeft: '3%'}}
              name={'arrow-forward'}
              size={25}
              color={'white'}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
export default Otp;
