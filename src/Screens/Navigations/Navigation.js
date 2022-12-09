import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LogBox, SafeAreaView, View, Image, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../Home/HomeScreen';
import Chat from './../Chat/Chat';
import CheckOutScreen from '../CheckOut/CheckOutScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import ProfileEditt from '../ProfileEdit/ProfileEditt';
import BookingScreen from '../Bookings/BookingScreen';
import PersonalSub from '../PersonalSubCat/PersonalSub';
import HomeSub from '../HomeSubCat/HomeSub';
import HomeSubDetail from '../HomeSubDetails/HomeSubDetail';
import About from '../AboutUs/About';
import TermsCondition from '../Terms/TermsCondition';
import Privacy from '../PrivacyPolicy/Privacy';
import {DrawerContent} from '../Drawer/DrawerContent.js';

import NotificationScreen from '../Notification/NotificationScreen';
import Otp from '../Authentication/Otp/Otp';
import Verify from '../Authentication/Otp/Verify';
import Schedule from '../Schedules/Schedule';
import SignUpOtpp from '../SignUpOtp/SignUpOtpp';
import SplashScreen from '../Splash/SplashScreen';
import OrderDetail from '../OrderDetails/OrderDetail';
import PersonalSubDetail from '../PersonalSubDetails/PersonalSubDetail';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createNativeStackNavigator();
const ScreenDrawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

homeStack = () => (
  <Stack.Navigator
    initialRouteName="homeStack"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      options={{header: () => null}}
      name="Home"
      component={HomeScreen}
    />
    <Stack.Screen
      options={{header: () => null}}
      name="PersonalSub"
      component={PersonalSub}
    />
    <Stack.Screen
      options={{header: () => null}}
      name="HomeSub"
      component={HomeSub}
    />
    <Stack.Screen
      options={{header: () => null}}
      name="HomeSubDetail"
      component={HomeSubDetail}
    />
    <Stack.Screen
      options={{header: () => null}}
      name="PersonalSubDetail"
      component={PersonalSubDetail}
    />
  </Stack.Navigator>
);
const OtpStack = () => (
  <Stack.Navigator
    initialRouteName="OtpStack"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen options={{header: () => null}} name="Otp" component={Otp} />

    <Stack.Screen
      options={{header: () => null}}
      name="SignUpOtpp"
      component={SignUpOtpp}
    />
    <Stack.Screen
      options={{header: () => null}}
      name="Verify"
      component={Verify}
    />
  </Stack.Navigator>
);

function Navigation({}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen
            options={{header: () => null}}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{header: () => null}}
            name="SignUp"
            component={SignUp}
          /> */}
      <Stack.Screen
        options={{header: () => null}}
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="OtpStack"
        component={OtpStack}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="Chat"
        component={Chat}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="PersonalSub"
        component={PersonalSub}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="HomeSub"
        component={HomeSub}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="HomeSubDetail"
        component={HomeSubDetail}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="PersonalSubDetail"
        component={PersonalSubDetail}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="Profile"
        component={ProfileScreen}
      />

      <Stack.Screen
        options={{header: () => null}}
        name="ProfileEditt"
        component={ProfileEditt}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="BookingScreen"
        component={BookingScreen}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="OrderDetail"
        component={OrderDetail}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="About"
        component={About}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="TermsCondition"
        component={TermsCondition}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="Privacy"
        component={Privacy}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="Schedule"
        component={Schedule}
      />
      <Stack.Screen
        options={{header: () => null}}
        name="CheckOutScreen"
        component={CheckOutScreen}
      />
    </Stack.Navigator>
  );
}
export default Navigation;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.45,
    elevation: 5,
    shadowRadius: 3.5,
  },
  cartBtnBlue: {
    width: '10%',
    borderRadius: 100,
    height: 45,
    width: 45,
    backgroundColor: '#DA2328',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
