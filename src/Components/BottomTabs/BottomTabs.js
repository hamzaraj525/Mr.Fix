import React, {Component, PureComponent} from 'react';
import {
  View,
  Pressable,
  SafeAreaView,
  Platform,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function BottomTabs({navigation, props}) {
  const [colorId, setColorId] = React.useState(0);

  const changeColor = id => {
    setColorId(id);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomBarContainer}>
        <Pressable
          onPress={() => {
            changeColor(1);
            navigation.navigate('Home');
          }}
          style={{
            padding: 8,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <MaterialCommunityIcons
            name="home"
            color={colorId === 1 ? 'orange' : 'white'}
            size={33}
          />
          {/* <Text style={{alignSelf: 'center', color: 'white', fontSize: 12}}>
            Home
          </Text> */}
        </Pressable>

        <Pressable
          onPress={() => {
            changeColor(2);
            navigation.navigate('BookingScreen');
          }}
          style={{
            padding: 8,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <MaterialCommunityIcons
            name="book"
            color={colorId === 2 ? 'orange' : 'white'}
            size={33}
          />
          {/* <Text style={{alignSelf: 'center', color: 'white', fontSize: 12}}>
            Bookings
          </Text> */}
        </Pressable>
        <Pressable
          onPress={() => {
            changeColor(3);
            navigation.navigate('Profile');
          }}
          style={{
            padding: 8,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <MaterialCommunityIcons
            name="account"
            color={colorId === 3 ? 'orange' : 'white'}
            size={33}
          />
          {/* <Text style={{alignSelf: 'center', color: 'white', fontSize: 12}}>
            Profile
          </Text> */}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
export default BottomTabs;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 22 : 13,
    alignItems: 'center',
  },
  bottomBarContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
    borderRadius: 40,
  },
});
