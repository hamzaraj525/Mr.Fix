import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox, SafeAreaView, View, Image, StyleSheet} from 'react-native';
// import store from './src/Redux/Store/store';
import {Provider} from 'react-redux';
import Navigation from './src/Screens/Navigations/Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/Redux/Store/store';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const RootStack = createNativeStackNavigator();
function App({}) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <RootStack.Navigator
              headerMode="none"
              screenOptions={{
                headerShown: false,
              }}>
              <RootStack.Screen name="Navigation" component={Navigation} />
            </RootStack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}
export default App;
const styles = StyleSheet.create({});
