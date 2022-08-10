import React, {useEffect} from 'react';
import {
  Text,
  StatusBar,
  View,
  Pressable,
  FlatList,
  SafeAreaView,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import {Animations} from '../../../assets/Animations/Animation';
import HomeServicesDataa from '././../../DataStore/HomeServicesData';
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
              <Text style={style.titleTxt}>{item.title}</Text>
            </View>
          </View>
        </Pressable>
      </Animatable.View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
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
            <View style={style.header}>
              <Text style={style.headerTxtOne}>
                Which <Text style={style.headerTxtTwo}>service {'\n'}</Text>
                do you{'\n'}
                <Text style={style.headerTxtThree}>need?</Text>
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
