import React, {useEffect, useState} from 'react';
import style from './style';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  ScrollView,
  Text,
  Pressable,
  TextInput,
  StatusBar,
} from 'react-native';

const SignUp = ({navigation}) => {
  const [person, setPerson] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [mailPlaceHolder, setMailPlace] = React.useState(false);
  const [passwordPlaceHolder, setPasswordPlace] = React.useState(false);
  const [contactPlaceHolder, setContactPlace] = React.useState(false);
  const [personPlaceHolder, setPersonPlace] = React.useState(false);

  const signUp = (email, password) => {
    if (email.length > 0) {
      if (password.length > 0) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            alert(' Succesfully signed Up!');
          })
          .then(() => {
            setEmail('');
            setPassword('');
          })
          .catch(error => {
            if (error.code === 'auth/weak-password') {
              alert('The password is too weak.');
            }
            if (error.code === 'auth/email-already-in-use') {
              alert('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
              alert('That email address is invalid!');
            }
            if (error.code === 'auth/wrong-password') {
              alert('That password is weak!');
            }
          });
      } else {
        alert('Password is required');
      }
    } else {
      alert('Email is  required');
    }
  };

  return (
    <View style={style.container}>
      <StatusBar hidden={true} />
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'gold',
          }}>
          <Text style={style.signUpTxt}>SIGN UP</Text>
        </View>

        <View
          style={{
            flex: 1.9,
            borderTopStartRadius: 60,
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={style.passwordContainer}>
            <Ionicons name="person" size={20} color={'black'} />
            <TextInput
              style={style.TiName}
              value={person}
              onChangeText={text => {
                setPerson(text);
              }}
              onFocus={() => {
                setPersonPlace(true);
                setMailPlace(false);
                setPasswordPlace(false);
                setContactPlace(false);
              }}
              placeholder={personPlaceHolder ? 'Enter your name' : 'Name'}
              placeholderTextColor={personPlaceHolder ? 'black' : 'grey'}
            />
          </View>

          <View style={[style.passwordContainer, {marginTop: '4%'}]}>
            <Ionicons name="mail-outline" size={20} color={'black'} />
            <TextInput
              onFocus={() => {
                setPersonPlace(false);
                setMailPlace(true);
                setPasswordPlace(false);
                setContactPlace(false);
              }}
              style={style.TiName}
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
              placeholder={mailPlaceHolder ? 'Enter your email' : 'Email'}
              placeholderTextColor={mailPlaceHolder ? 'black' : 'grey'}
            />
          </View>

          <View style={[style.passwordContainer, {marginTop: '4%'}]}>
            <Feather name="lock" size={20} color={'black'} />
            <TextInput
              secureTextEntry
              onFocus={() => {
                setPasswordPlace(true);
                setMailPlace(false);
                setContactPlace(false);
                setPersonPlace(false);
              }}
              style={style.TiName}
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              placeholder={
                passwordPlaceHolder ? 'Enter your password' : 'Password'
              }
              placeholderTextColor={passwordPlaceHolder ? 'black' : 'grey'}
            />
          </View>

          <View style={[style.passwordContainer, {marginTop: '4%'}]}>
            <Ionicons name="call-outline" size={20} color={'black'} />
            <TextInput
              onFocus={() => {
                setContactPlace(true);
                setMailPlace(false);
                setPasswordPlace(false);
                setPersonPlace(false);
              }}
              style={style.TiName}
              value={contact}
              onChangeText={text => {
                setContact(text);
              }}
              placeholder={
                contactPlaceHolder ? 'Enter your contact' : 'Contact'
              }
              placeholderTextColor={contactPlaceHolder ? 'black' : 'grey'}
            />
          </View>

          <Pressable
            onPress={() => {
              signUp(email, password);
            }}
            style={style.loginBtn}>
            <Text style={style.sinupBtn}>SIGN UP</Text>

            <Ionicons
              style={{marginLeft: '3%'}}
              name={'arrow-forward'}
              size={22}
              color={'white'}
            />
          </Pressable>
          <View style={style.alreadytxtContainer}>
            <Text style={style.txtAlready}>Already have an account?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={style.logintXT}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignUp;
