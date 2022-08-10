import React, {useRef} from 'react';
import {
  View,
  Text,
  Modal,
  Platform,
  Animated,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Images from '../../Constraints/Images';
import {useDispatch, useSelector} from 'react-redux';
import Constraints from '../../Constraints/Constraints';
import {emptyCart} from '../../../src/Redux/Action/actions';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const OrderDone = ({navigation, showOrderModal, hideOrderModal}) => {
  const dispatch = useDispatch();
  const scaleValue = useRef(new Animated.Value(0)).current;

  PushNotification.createChannel(
    {
      channelId: 'test-channel',
      channelName: 'My channel',
      channelDescription: 'A channel to categorise your notifications',
      playSound: true,
      soundName: 'default',
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );

  const showScheduleNotification = () => {
    if (Platform.OS === 'ios') {
      const date = new Date();
      date.setSeconds(date.getSeconds() + 6);
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: 'Mr.Fix',
        alertBody: 'Thank You for Placing Order 😃',
        fireDate: date.toISOString(),
        soundName: 'default',
      });
    } else {
      PushNotification.localNotificationSchedule({
        channelId: 'test-channel',
        title: 'Mr.Fix',
        message: 'Thank You for Placing Order 😃',
        date: new Date(Date.now() + 10 * 1000),
        allowWhileIdle: false,
      });
    }
  };

  const animateModal = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        hideOrderModal();
      }}
      visible={showOrderModal}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={styles.containerr}>
          <View style={styles.lotieContainer}>
            <LottieView
              style={styles.lotieViewLoader}
              source={Images.ORDER_DONE}
              autoPlay
              loop={false}
            />
          </View>
          <View style={styles.whiteContainer}>
            <Pressable>
              <Text style={styles.txtOrderDone}>
                {Constraints.ORDER_PLACED}
              </Text>
            </Pressable>
            <Pressable
              style={styles.loginBtn}
              onPress={() => {
                hideOrderModal();
                navigation.navigate('Home');
                dispatch(emptyCart());
                animateModal();
                showScheduleNotification();
              }}>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Bold',
                  fontSize: 17,
                  fontWeight: '800',
                  color: 'white',
                }}>
                {Constraints.OK}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};
export default OrderDone;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  containerr: {
    width: '75%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },
  lotieContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1E21',
  },
  lotieViewLoader: {width: 140, height: 140},
  whiteContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  txtOrderDone: {
    color: 'black',
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: '400',
    fontSize: 17,
  },

  loginBtn: {
    borderRadius: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '30%',
    marginTop: '5%',
    height: '18%',
    backgroundColor: 'red',
  },
});
