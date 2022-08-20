import React from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import Imaages from './../../Constraints/Images';
import Constraints from './../../Constraints/Constraints';
import StepIndicator from 'react-native-step-indicator';

function OrderDetail({navigation, route}) {
  const details = () => {
    const {items, item2} = route.params;
    const [currentPosition, setCurrent] = React.useState(
      items.Status === 'Pending'
        ? 1
        : items.Status === 'Confirmed'
        ? 2
        : items.Status === 'Work Started'
        ? 3
        : items.Status === 'Work End'
        ? 4
        : 5,
    );

    const labels = ['Pending', 'Confirmed', 'Started', 'End', 'Completed'];
    const customStyles = {
      stepIndicatorSize: 25,
      currentStepIndicatorSize: 33,
      separatorStrokeWidth: 2,
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: '#fe7013',
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: '#fe7013',
      stepStrokeUnFinishedColor: '#aaaaaa',
      separatorFinishedColor: '#fe7013',
      separatorUnFinishedColor: '#aaaaaa',
      stepIndicatorFinishedColor: '#fe7013',
      stepIndicatorUnFinishedColor: '#ffffff',
      stepIndicatorCurrentColor: '#ffffff',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: '#fe7013',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: '#aaaaaa',
      labelColor: '#999999',
      labelSize: 12,
      currentStepLabelColor: '#fe7013',
    };

    const progress = [
      {id: 1, title: 'Pending', step: 1},
      {
        id: 2,
        title: 'Confirmed',
        step: 2,
      },
      {
        id: 3,
        title: 'Started',
        step: 3,
      },
      {
        id: 4,
        title: 'End',
        step: 4,
      },
      {
        id: 5,
        title: 'Completed',
        step: 5,
      },
    ];
    const onPageChange = () => {
      if (items.Status === 'Pending') {
        setCurrent(0);
      }
      if (items.Status === 'Confirmed') {
        setCurrent(1);
      }
      if (items.Status === 'Work Started') {
        setCurrent(2);
      }
    };
    return (
      <>
        <View
          style={{
            paddingHorizontal: '2%',
            marginTop: 15,
            marginBottom: 11,
          }}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
          />
        </View>
        <View style={style.cartItemsContainer}>
          <View style={style.subContainer}>
            <Text style={[style.subTitxt, {color: 'grey'}]}>
              {items.reservation}
            </Text>
            <Text style={[style.subTitxt, {color: 'white'}]}>
              {items.reservation}
            </Text>
          </View>
          <View style={style.statusContainer}>
            <Text style={[style.subTitxt, {fontSize: 19}]}>#12323</Text>
            <Text style={[style.subTitxt, {color: 'red'}]}>{items.Status}</Text>
          </View>
        </View>
        <View style={style.cartItemsContainer}>
          <View style={style.itemLenthContainer}>
            <Text style={[style.subTitxt, {fontSize: 18}]}>
              {items.Order.length} Items(s)
            </Text>
          </View>

          {items.Order.map(element => {
            return (
              <View style={style.orderContainer}>
                <View style={style.subOrderContainer}>
                  {element.img ? (
                    <FastImage
                      resizeMode={FastImage.resizeMode.cover}
                      priority={FastImage.priority.high}
                      style={style.orderImgs}
                      source={{uri: element.img}}
                    />
                  ) : (
                    <FastImage
                      resizeMode="cover"
                      priority={FastImage.priority.normal}
                      style={style.orderImgs}
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
          <View style={style.priceTxtContainer}>
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
    <SafeAreaView style={style.container}>
      <Text style={style.orderDetailTxt}>Order Details</Text>
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
