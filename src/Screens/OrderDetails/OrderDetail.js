import React, {useRef, useState, useEffect} from 'react';
import {Text, View, Pressable, SafeAreaView, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import style from './style';

function OrderDetail({navigation, route}) {
  const details = () => {
    const {items, item2} = route.params;
    return (
      <>
        <View style={style.cartItemsContainer}>
          <View
            style={{
              marginBottom: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={[style.subTitxt, {color: 'grey'}]}>
              {items.reservation}
            </Text>
            <Text style={[style.subTitxt, {color: 'white'}]}>
              {items.reservation}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={[style.subTitxt, {fontSize: 19}]}>#12323</Text>
            <Text style={[style.subTitxt, {color: 'red'}]}>Pending</Text>
          </View>
        </View>
        <View style={style.cartItemsContainer}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={[style.subTitxt, {fontSize: 18}]}>
              {items.Order.length} Items(s)
            </Text>
          </View>

          {items.Order.map(element => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginBottom: '6%',
                  marginTop: '3%',
                }}>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                  }}>
                  {element.img ? (
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                      priority={FastImage.priority.high}
                      style={{
                        borderRadius: 38 / 2,
                        width: 38,
                        height: 38,
                      }}
                      source={{uri: element.img}}
                    />
                  ) : (
                    <FastImage
                      resizeMode="cover"
                      priority={FastImage.priority.normal}
                      style={{
                        borderRadius: 38 / 2,
                        width: 38,
                        height: 38,
                      }}
                      source={require('../../../assets/Images/man.png')}
                    />
                  )}

                  <Text
                    numberOfLines={1}
                    ellipsizeMode={element.title.length > 10 ? 'tail' : null}
                    style={[style.subTitxt, {flex: 1, marginLeft: 7}]}>
                    {element.title}
                  </Text>
                </View>
                <Text style={style.subTitxt}>PKR {element.Price}</Text>
              </View>
            );
          })}
        </View>
        <View style={style.cartItemsContainer}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={[style.subTitxt, {fontSize: 19}]}>Toal Price</Text>
            <Text style={[style.subTitxt, {fontSize: 19}]}>
              PKR {items.TotalPrice}
            </Text>
          </View>
        </View>
        <Pressable
          style={style.contiBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'RobotoSlab-Bold',
              fontSize: 19,
              fontWeight: '600',
            }}>
            Back
          </Text>
        </Pressable>
      </>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontFamily: 'RobotoSlab-Bold',
          fontSize: 20,
          color: 'black',
          fontWeight: '600',
          marginTop: '2%',
          alignSelf: 'center',
        }}>
        Order Details
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: '35%',
        }}
        style={{marginTop: '2%'}}>
        {details()}
      </ScrollView>
    </SafeAreaView>
  );
}

export default OrderDetail;
