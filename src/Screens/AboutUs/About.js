import React, {PureComponent} from 'react';
import {Text, View, ScrollView, Pressable, SafeAreaView} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AboutDataa from './../../DataStore/AboutData';
import Constraints from '../../Constraints/Constraints';

function About({navigation, props, route}) {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <Pressable
          style={style.backBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name={'arrow-back-outline'} size={30} color={'black'} />
        </Pressable>
        <Text style={style.titleTxt}>{Constraints.ABOUT_US_TITLE}</Text>
        <Pressable style={style.backBtn} onPress={() => {}}>
          <Ionicons name={'share'} size={30} color={'white'} />
        </Pressable>
      </View>
      <View style={style.bottomLine} />
      <ScrollView
        contentContainerStyle={{paddingBottom: '6%'}}
        style={{paddingHorizontal: '5%'}}>
        <Text style={style.whoTxt}>{Constraints.WHO_WE_ARE}</Text>
        <Text style={style.whoDetailTxt}>
          Mr.Fix is an unrivaled online marketplace connecting home maintenance
          and handyman service providers and users in Lahore, Karachi,
          Islamabad, and Rawalpindi. We are recognized as the most trustworthy
          online platform to the people of these cities. With our determination
          and dedication, we have won thousands of hearts in these cities over
          the years and are expanding to other cities of Pakistan.
        </Text>

        <Text style={style.whatWeTxt}>{Constraints.WHAT_WE_DO}</Text>
        <Text style={style.whatWeTxtDetailTxt}>
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

        <Text style={style.howWeDo}>{Constraints.HOW_WE_DO}</Text>
        <Text style={style.howWeDoDetailTxt}>
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
              <View key={index} style={style.aboutData}>
                <Text style={style.titleTxt}>{item.title}</Text>
                <FastImage
                  resizeMode="cover"
                  style={style.ItemImg}
                  source={item.img}
                />
                <Text style={style.subTitleTxt}>{item.subTitle}</Text>
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
