import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
function demo() {
  return (
    <SafeAreaView style={styles.box}>
      <View style={styles.subView}>
        <Text style={styles.txt}>hello</Text>
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
