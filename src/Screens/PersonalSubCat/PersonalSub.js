import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StatusBar,
  FlatList,
  Linking,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Personal from '././../../DataStore/PersonalData';
import {Animations} from '../../../assets/Animations/Animation';
import SliderBoxx from '../../Components/SliderBoxx';
import BottomTabs from './../../Components/BottomTabs/BottomTabs';
import Animated from 'react-native-reanimated';
const animations = Animations[Math.floor(Math.random() * Animations.length)];

function PersonalSub({navigation, route}) {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  renderPersonalServices = ({item, index}) => {
    return (
      <Animatable.View
        iterationCount={1}
        useNativeDriver
        animation={'fadeInLeft'}
        delay={index * 260}>
        <Pressable
          onPress={() => {
            navigation.navigate('PersonalSubDetail', {ItemPersonal: item});
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

  const personalServices = () => {
    return (
      <FlatList
        contentContainerStyle={{paddingBottom: 100}}
        data={Personal}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderPersonalServices}
        ListHeaderComponent={() => (
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
        )}
        keyExtractor={item => item.key}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <StatusBar barStyle="dark-content" />
      {personalServices()}

      {/* <BottomTabs navigation={navigation} /> */}
    </SafeAreaView>
  );
}
export default PersonalSub;
