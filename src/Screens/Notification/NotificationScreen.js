import React, {PureComponent} from 'react';
import {Text, View, ScrollView, Pressable, SafeAreaView} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';

function NotificationScreen({navigation, props, route}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          marginTop: '4%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
        }}>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            style={{}}
            name={'arrow-back-outline'}
            size={30}
            color={'black'}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: 'RobotoSlab-Bold',
            color: 'black',
            fontWeight: '500',
            fontSize: 21,
          }}>
          Notifications
        </Text>
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {}}>
          <Ionicons style={{}} name={'share'} size={30} color={'white'} />
        </Pressable>
      </View>
      <View
        style={{
          alignSelf: 'center',
          width: '30%',
          height: 0.9,
          marginTop: -1,
          backgroundColor: 'black',
        }}
      />
      <View
        // key={index}
        style={{
          alignSelf: 'center',
          width: '90%',
          height: 110,
          marginTop: '8%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#ecf5fb',
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4.84,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            backgroundColor: 'pink',
            borderRadius: 60 / 2,
          }}>
          <Ionicons name="person" size={40} color={'black'} />
        </View>
        {/* <FastImage
          resizeMode="cover"
          style={{width: 40, height: 40, tintColor: 'pink'}}
          source={item.img}
        /> */}
        <Text
          style={{
            fontFamily: 'RobotoSlab-Bold',
            color: 'black',
            fontWeight: '400',
            fontSize: 15,
            width: '50%',
          }}>
          Your order has been generated Order Token is hm-56556
        </Text>
      </View>
      {/* <ScrollView
        contentContainerStyle={{paddingBottom: '4%'}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        {AboutDataa.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: 270,
                height: 170,
                marginTop: '1%',
                marginRight: 20,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                backgroundColor: '#ecf5fb',
              }}>
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Bold',
                  color: 'black',
                  fontWeight: '800',
                  fontSize: 15,
                }}>
                {item.title}
              </Text>
              <FastImage
                resizeMode="cover"
                style={{width: 40, height: 40, tintColor: 'pink'}}
                source={item.img}
              />
              <Text
                style={{
                  fontFamily: 'RobotoSlab-Bold',
                  paddingHorizontal: '7%',
                  color: 'black',
                  fontWeight: '300',
                  fontSize: 10,
                }}>
                {item.subTitle}
              </Text>
            </View>
            // </View>
          );
        })}
      </ScrollView> */}
    </SafeAreaView>
  );
}
export default NotificationScreen;
