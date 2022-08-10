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
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Constraints from '../../Constraints/Constraints';

const NetworkModal = props => {
  const dispatch = useDispatch();
  const {cartItems, userId} = useSelector(reducers => reducers.cartReducer);
  const scaleValue = useRef(new Animated.Value(0)).current;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        props.hideModalNetwork();
      }}
      visible={props.networkModal}>
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.containerr,
            {
              transform: [{translateX: scaleValue}],
            },
          ]}>
          <Text
            style={{
              fontSize: 47,
            }}>
            😐
          </Text>

          <Text style={styles.networkTxt}>{Constraints.NETWORK_ERROR}</Text>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.networkTxtOne}>
              {Constraints.NETWORK_CONNECTIVITY_ONE}
            </Text>
            <Text style={styles.networkTxtOne}>
              {Constraints.NETWORK_CONNECTIVITY}
            </Text>
          </View>
          <Pressable
            style={styles.loginBtn}
            onPress={() => {
              props.hideModalNetwork();
              props.checkConnection();
            }}>
            <Text style={styles.tryAgainTxt}>{Constraints.TRY_AGAIN}</Text>
            <Entypo name={'cross'} size={29} color={'white'} />
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};
export default NetworkModal;
const styles = StyleSheet.create({
  networkTxtOne: {
    color: 'black',
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: '200',
    fontSize: 14,
  },
  networkTxt: {
    color: 'black',
    fontFamily: 'RobotoSlab-Bold',
    fontWeight: '700',
    fontSize: 20,
  },
  tryAgainTxt: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 17,
    fontWeight: '800',
    color: 'white',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000aa',
  },

  containerr: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    height: 330,
    paddingVertical: '6%',
  },

  loginBtn: {
    borderRadius: 30,
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 16,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '60%',
    height: 55,
    backgroundColor: 'red',
  },
});
