import React, {PureComponent} from 'react';
import {Text, View, ScrollView, Pressable, SafeAreaView} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutDataa from './../../DataStore/AboutData';

function About({navigation, props, route}) {
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
          About Us
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
          width: '22%',
          height: 0.9,
          marginTop: -1,
          backgroundColor: 'black',
        }}
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: '6%'}}
        style={{paddingHorizontal: '5%'}}>
        <Text
          style={{
            fontFamily: 'RobotoSlab-Bold',
            marginTop: '5%',
            color: 'black',
            fontWeight: '700',
            fontSize: 21,
          }}>
          Who We Are?
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'RobotoSlab-Bold',
            fontWeight: '400',
            marginTop: '3%',
            fontSize: 14,
            lineHeight: 18,
          }}>
          Mr.Fix is an unrivaled online marketplace connecting home maintenance
          and handyman service providers and users in Lahore, Karachi,
          Islamabad, and Rawalpindi. We are recognized as the most trustworthy
          online platform to the people of these cities. With our determination
          and dedication, we have won thousands of hearts in these cities over
          the years and are expanding to other cities of Pakistan.
        </Text>

        <Text
          style={{
            fontFamily: 'RobotoSlab-Bold',
            color: 'black',
            fontWeight: '700',
            marginTop: '3%',
            fontSize: 21,
          }}>
          What We Do?
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'RobotoSlab-Bold',
            fontWeight: '400',
            marginTop: '3%',
            fontSize: 14,
            lineHeight: 18,
          }}>
          We aim to make home maintenance and handyman services more accessible,
          efficient, and easy-on-the-pocket for our customers. Along with this,
          we are also endeavoring to help thousands of local technicians in
          finding reliable earning opportunities and make a good livelihood. Our
          mission is to make the booking of plumbing, electrician, handyman,
          cleaning, carpentry, and fixing services risk-free and guaranteed.
          During registration process, we perform the background check and
          professional analysis of our technicians. Additionally, we offer
          trackable transaction process to accomplish sought-after user
          experience and 100% satisfaction.
        </Text>

        <Text
          style={{
            fontFamily: 'RobotoSlab-Bold',
            color: 'black',
            fontWeight: '700',
            marginTop: '2%',
            fontSize: 21,
          }}>
          How We Do It – Technician ?
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'RobotoSlab-Bold',
            fontWeight: '400',
            marginTop: '3%',
            fontSize: 14,
            lineHeight: 18,
          }}>
          Mr.Fix is connecting service providers (technicians) with users
          (customers) through our online platform. The customers and technicians
          can use our website and app (platforms), which are designed to make
          the booking of services technicians more accessible and risk-free. To
          get registered as a technician or signup as a customer at our
          platform, all you have to do is follow few simple steps and provide
          some basic information. Our hassle-free platforms have been crafted,
          keeping the unique needs of our users in mind. With us, you can enjoy
          a stress-free online service that ensures 24/7 responsiveness.
        </Text>
        <ScrollView
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
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
export default About;
