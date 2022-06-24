import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  StatusBar,
} from 'react-native';
import style from './style';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailPlaceHolder, setEmailPlace] = React.useState('');
  const [passwordPlaceHolder, setPasswordPlace] = React.useState('');

  const LogIn = (email, password) => {
    if (email.length > 0) {
      if (password.length > 0) {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setEmail('');
            setPassword('');
          })
          .then(() => {
            alert('succesfully Signes In');
            navigation.replace('Home');
          })

          .catch(error => {
            if (error.code === 'auth/weak-password') {
              alert('The password is too weak.');
            }
            if (error.code === 'auth/invalid-email') {
              alert('That email address is invalid!');
            }
            if (error.code === 'auth/wrong-password') {
              alert('That password is invalid!');
            }
          });
      } else {
        alert('Please enter your password');
      }
    } else {
      alert('Please enter your email');
    }
  };

  // snackbar = () => {
  //   Snackbar.show({
  //     textColor: 'white',
  //     backgroundColor: '#DA2328',
  //     text: 'Select Minimum Required Item',
  //     duration: Snackbar.LENGTH_SHORT,
  //   });
  // };

  return (
    <View style={style.container}>
      <StatusBar hidden={true} />
      {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? `60` : 0}> */}
      <ScrollView bounces={false} contentContainerStyle={{flex: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gold',
          }}>
          <Text style={style.signUpTxt}>LOGIN</Text>
        </View>
        <View
          style={{
            flex: 1.9,
            borderTopStartRadius: 60,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={style.passwordContainer}>
            <Ionicons name="mail-outline" size={20} color={'black'} />
            <TextInput
              style={style.TiName}
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
              onFocus={() => {
                setEmailPlace(true);
                setPasswordPlace(false);
              }}
              placeholder={emailPlaceHolder ? 'Enter your email' : 'Email'}
              placeholderTextColor={emailPlaceHolder ? 'black' : 'grey'}
            />
          </View>

          <View style={[style.passwordContainer, {marginTop: '4%'}]}>
            <Feather name="lock" size={20} color={'black'} />
            <TextInput
              style={style.TiName}
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              onFocus={() => {
                setEmailPlace(false);
                setPasswordPlace(true);
              }}
              placeholder={
                passwordPlaceHolder ? 'Enter your password' : 'Password'
              }
              placeholderTextColor={passwordPlaceHolder ? 'black' : 'grey'}
            />
          </View>

          <Pressable onPress={() => {}}>
            <Text style={style.forpasword}>Forgot Password ?</Text>
            <View style={style.line} />
          </Pressable>

          <Pressable
            onPress={() => {
              LogIn(email, password);
            }}
            style={style.loginBtn}>
            <Text style={style.sinupBtn}>LOGIN</Text>

            <Ionicons
              style={{marginLeft: '3%'}}
              name={'arrow-forward'}
              size={22}
              color={'white'}
            />
          </Pressable>
          <View style={style.alreadytxtContainer}>
            <Text style={style.txtAlready}>Dont have an account?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={style.logintXT}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Login;
