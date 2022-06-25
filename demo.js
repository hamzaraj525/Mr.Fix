import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  SafeAreaView,
} from 'react-native';

const showAlert = () => {
  Alert.alert('Confirmation', 'Are you sure you want to sign out ?', [
    {
      text: 'Cancel',
      onPress: () => alert('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: () => {
        alert('Sign Out');
      },
    },
  ]);
};
function demo() {
  return (
    <SafeAreaView style={styles.box}>
      <View style={styles.subView}>
        <Text style={styles.txt}>hello</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Confirmation', 'Are you sure you want to sign out ?', [
              {
                text: 'Cancel',
                onPress: () => alert('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  alert('Sign Out');
                },
              },
            ]);
          }}>
          <Text style={styles.txt}> press me</Text>
        </TouchableOpacity>

        <View style={{backgroundColor: 'red', width: 44, height: 44}} />
      </View>
    </SafeAreaView>
  );
}
export default demo;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'brown',
  },
  txt: {
    color: 'orange',
    fontSize: 50,
    fontFamily: 'RobotoSlab-Bold',
  },
  subView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
});
