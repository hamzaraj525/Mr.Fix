import React, {useRef} from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Images from '../../Constraints/Images';
import Constraints from '../../Constraints/Constraints';

const CominSoonModal = props => {
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
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        props.hideModal();
      }}
      visible={props.showModal}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Animated.View style={styles.containerr}>
          <View style={styles.alertView}>
            <LottieView
              style={{width: 140, height: 140}}
              source={Images.alertComingSoon}
              autoPlay
              loop={false}
            />
          </View>
          <View style={styles.whiteContainer}>
            <Pressable>
              <Text style={styles.comingSoonTxt}>
                {Constraints.COMING_SOON}
              </Text>
            </Pressable>
            <Pressable
              style={styles.loginBtn}
              onPress={() => {
                props.hideModal();
                animateModal();
              }}>
              <Text style={styles.okBtnTxt}>{Constraints.OK}</Text>
            </Pressable>
          </View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};
export default CominSoonModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },
  alertView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1E21',
  },
  containerr: {
    width: '75%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 33,
  },
  whiteContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  comingSoonTxt: {
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
  okBtnTxt: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 17,
    fontWeight: '800',
    color: 'white',
  },
});
