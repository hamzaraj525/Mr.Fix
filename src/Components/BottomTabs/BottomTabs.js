import React from 'react';
import {
  View,
  Platform,
  StyleSheet,
  Pressable,
  SafeAreaView,
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
          style={styles.bottomBarItem}>
          <MaterialCommunityIcons
            name="home"
            color={colorId === 1 ? 'orange' : 'white'}
            size={33}
          />
        </Pressable>

        <Pressable
          onPress={() => {
            changeColor(2);
            navigation.navigate('BookingScreen');
          }}
          style={styles.bottomBarItem}>
          <MaterialCommunityIcons
            name="book"
            color={colorId === 2 ? 'orange' : 'white'}
            size={33}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            changeColor(3);
            navigation.navigate('Chat');
          }}
          style={styles.bottomBarItem}>
          <MaterialCommunityIcons
            name="chat"
            color={colorId === 3 ? 'orange' : 'white'}
            size={33}
          />
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
  bottomBarItem: {
    padding: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
