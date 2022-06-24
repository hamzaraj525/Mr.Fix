import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import NetworkModal from './../../Components/Modal/NetworkModal';
import NetInfo from '@react-native-community/netinfo';
import {connect, useDispatch, useSelector} from 'react-redux';

function SplashScreen({navigation}) {
  const [color, setColor] = useState('white');
  const [networkModal, setNetworkModal] = useState(false);
  const dispatch = useDispatch();
  const {userId} = useSelector(reducers => reducers.cartReducer);
  useEffect(() => {
    checkConnection();
  }, []);

  const hideModalNetwork = () => {
    setNetworkModal(false);
  };
  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected === true) {
        setTimeout(() => {
          if (userId) {
            navigation.replace('Home', {
              address: 'address',
            });
          } else {
            navigation.replace('OtpStack');
          }
        }, 1700);
      } else {
        setTimeout(() => {
          setNetworkModal(true);
        }, 2000);
      }
      console.log('Is connected?', state.isConnected);
    });
  };

  return (
    <SafeAreaView style={[styles.container, {}]}>
      <StatusBar
        barStyle={'dark-content'}
        hidden={true}
        backgroundColor="#0E0A30"
      />
      <View
        style={{
          width: Dimensions.get('window').width,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={styles.image}
            source={require('./../../../assets/Images/consult.png')}
          />
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              fontSize: 32,
              color: 'black',
              marginTop: 7,
            }}>
            Mr.Fix
          </Text>
          <Text
            style={{
              fontFamily: 'RobotoSlab-Bold',
              fontSize: 17,
              color: 'black',
              marginTop: 5,
            }}>
            We Fix it Right
          </Text>
        </View>
      </View>
      <NetworkModal
        networkModal={networkModal}
        hideModalNetwork={hideModalNetwork}
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
});
