import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  Dimensions,
  StatusBar,
  View,
  Pressable,
  FlatList,
  Linking,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import style from './style';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeServicesDataa from '././../../DataStore/HomeServicesData';
import {Animations} from '../../../assets/Animations/Animation';
import SliderBoxx from '../../Components/SliderBoxx';

const animations = Animations[Math.floor(Math.random() * Animations.length)];

function HomeSub({navigation, props, route}) {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);
  const renderHomeServices = ({item, index}) => {
    return (
      <Animatable.View
        iterationCount={1}
        useNativeDriver
        animation={'fadeInLeft'}
        delay={index * 260}>
        <Pressable
          onPress={() => {
            navigation.navigate('HomeSubDetail', {Item: item});
          }}
          style={style.parent}>
          <View style={style.subPraent}>
            <View style={style.productContainer}>
              <FastImage
                prioty={FastImage.priority.high}
                style={style.img}
                source={item.img}
              />
              <Text
                style={{
                  fontWeight: '600',
                  fontFamily: 'RobotoSlab-Bold',
                  color: '#004379',
                }}>
                {item.title}
              </Text>
            </View>
          </View>
        </Pressable>
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={HomeServicesDataa}
        contentContainerStyle={{paddingBottom: '10%'}}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderHomeServices}
        ListHeaderComponent={({item, index}) => {
          return (
            <View
              style={{
                paddingHorizontal: '7%',
                marginBottom: '5%',
                marginTop: '10%',
              }}>
              <Text
                style={{
                  color: 'black',
                  lineHeight: 37,
                  fontFamily: 'RobotoSlab-Bold',
                  fontWeight: '500',
                  fontSize: 32,
                }}>
                Which{' '}
                <Text
                  style={{
                    fontFamily: 'RobotoSlab-Bold',
                    color: 'red',
                    fontWeight: '700',
                    fontSize: 30,
                  }}>
                  service {'\n'}
                </Text>
                do you{'\n'}
                <Text
                  style={{
                    fontSize: 30,

                    fontFamily: 'RobotoSlab-Bold',
                    fontWeight: '700',
                    color: 'magenta',
                  }}>
                  need?
                </Text>
              </Text>
            </View>
          );
        }}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}
export default HomeSub;
