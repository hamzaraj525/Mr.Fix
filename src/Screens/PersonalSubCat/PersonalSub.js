import React, {useEffect} from 'react';
import {
  Text,
  View,
  Pressable,
  StatusBar,
  FlatList,
  SafeAreaView,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import * as Animatable from 'react-native-animatable';
import Personal from '././../../DataStore/PersonalData';
import {Animations} from '../../../assets/Animations/Animation';

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
              <Text style={style.titleTxt}>{item.title}</Text>
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
          <View style={style.header}>
            <Text style={style.headerTxtone}>
              Which <Text style={style.headerTxttwo}>service {'\n'}</Text>
              do you{'\n'}
              <Text style={style.headerTxtthree}>need?</Text>
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
    </SafeAreaView>
  );
}
export default PersonalSub;
