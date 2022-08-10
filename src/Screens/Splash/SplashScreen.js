import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StatusBar,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Images from './../../Constraints/Images';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Constraints from '../../Constraints/Constraints';
import NetworkModal from './../../Components/Modal/NetworkModal';

function SplashScreen({navigation}) {
  const dispatch = useDispatch();
  const [color, setColor] = useState('white');
  const [showModal, setShowModal] = useState(false);
  const [networkModal, setNetworkModal] = useState(false);
  const {userId} = useSelector(reducers => reducers.cartReducer);
  const scaleValue = useRef(new Animated.ValueXY({x: 0, y: 70})).current;

  useEffect(() => {
    checkConnection();
  }, []);

  const hideModalNetwork = () => {
    setNetworkModal(false);
  };

  const animateModal = () => {
    Animated.timing(scaleValue, {
      toValue: {x: 0, y: 0},
      duration: 4210,
      useNativeDriver: true,
    }).start();
  };

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        setTimeout(() => {
          if (userId) {
            navigation.replace('Home');
          } else {
            navigation.replace('OtpStack');
          }
        }, 1700);
      } else {
        setTimeout(() => {
          setNetworkModal(true);
        }, 3000);
      }
      console.log('Is connected?', state.isConnected);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        hidden={true}
        backgroundColor="#0E0A30"
      />
      <View style={styles.subContainer}>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.image} source={Images.splashImg} />
          <Text style={styles.titleTxt}>{Constraints.MR_FIX}</Text>
          <Text style={styles.subTitleTxt}>{Constraints.WE_FIX_IT_RIGHT}</Text>
        </View>
      </View>

      <NetworkModal
        networkModal={networkModal}
        hideModalNetwork={hideModalNetwork}
        checkConnection={checkConnection}
        animateModal={animateModal}
      />
    </SafeAreaView>
  );
}
export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 70,
    height: 70,
  },
  subContainer: {
    width: Dimensions.get('window').width,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTxt: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 32,
    color: 'black',
    marginTop: 7,
  },
  subTitleTxt: {
    fontFamily: 'RobotoSlab-Bold',
    fontSize: 17,
    color: 'black',
    marginTop: 5,
  },
});
