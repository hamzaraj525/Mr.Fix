import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';

function demo() {
  const [text, setText] = useState('');
  const [Password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.box}>
      <View style={styles.loginView}>
        <Text style={styles.txt}>lOGIN</Text>
        <TextInput
          value={text}
          onChangeText={txt => {
            setText(txt);
          }}
          placeholder="Email"
          placeholderTextColor={'grey'}
          style={{
            width: '50%',
            height: 50,
            borderWidth: 1,
            borderColor: 'black',
            fontSize: 30,
            fontFamily: 'RobotoSlab-Bold',
          }}
        />
        <TextInput
          secureTextEntry={false}
          style={styles.PasswordStyle}
          value={Password}
          onChangeText={psd => {
            setPassword(psd);
          }}
          placeholder="Password"
          placeholderTextColor={'grey'}
        />
        <TouchableOpacity
          onPress={() => {
            alert('Email:' + text + ' \n' + 'Password:' + Password);
          }}>
          <Text style={styles.txt}> press me</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default demo;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  txt: {
    color: 'orange',
    fontSize: 30,
    fontFamily: 'RobotoSlab-Bold',
  },
  loginView: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '30%',
    backgroundColor: 'red',
  },
  PasswordStyle: {
    borderWidth: 1,
    fontSize: 30,
    fontFamily: 'RobotoSlab-Bold',
    color: 'grey',
    height: 50,
    width: '50%',
  },
});
