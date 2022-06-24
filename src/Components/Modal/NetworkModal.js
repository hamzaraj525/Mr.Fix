import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Platform,
  Modal,
  Animated,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  removeFromCart,
  emptyCart,
} from '../../Redux/Action/actions';
import {useEffect} from 'react';

const NetworkModal = ({navigation, networkModal, hideModalNetwork}) => {
  const dispatch = useDispatch();
  const {cartItems, userId} = useSelector(reducers => reducers.cartReducer);
  const scaleValue = useRef(new Animated.Value(0)).current;

  const animateModal = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        hideModalNetwork();
      }}
      visible={networkModal}>
      <SafeAreaView
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#000000aa',
        }}>
        <Animated.View style={[styles.containerr, {}]}>
          <Text
            style={{
              fontSize: 47,
            }}>
            😐
          </Text>

          <Text
            style={{
              color: 'black',
              fontFamily: 'RobotoSlab-Bold',
              fontWeight: '600',
              fontSize: 17,
            }}>
            Network Error
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'RobotoSlab-Bold',
              fontWeight: '200',
              fontSize: 14,
            }}>
            Your requested action could not be completed due to connectivity
            issues
          </Text>
          <Pressable
            style={[
              styles.loginBtn,
              {
                width: '60%',
                marginTop: '5%',
                height: '18%',
                backgroundColor: 'red',
              },
            ]}
            onPress={() => {
              hideModalNetwork();
              animateModal();
            }}>
            <Text
              style={{
                fontFamily: 'RobotoSlab-Bold',
                fontSize: 17,
                fontWeight: '800',
                color: 'white',
              }}>
              Close
            </Text>
            <Entypo name={'cross'} size={26} color={'white'} />
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};
export default NetworkModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerr: {
    width: '75%',
    backgroundColor: 'white',
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    alignSelf: 'center',
  },

  loginBtn: {
    width: '60%',
    height: 50,
    borderRadius: 30,
    backgroundColor: 'orange',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 16,
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
