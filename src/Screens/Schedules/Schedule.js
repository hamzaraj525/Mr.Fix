import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import style from './style';
import FastImage from 'react-native-fast-image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import time from '../../DataStore/TimeData';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  removeFromCart,
  emptyCart,
} from '../../../src/Redux/Action/actions';
function Schedule({navigation, props, route}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [colorId, setColorId] = useState(0);
  const [timeTitle, setTimeTitle] = useState('9:00 AM');

  const dispatch = useDispatch();
  const {cartItems} = useSelector(reducers => reducers.cartReducer);

  const onPress = (key, item) => {
    setColorId(key);
    setTimeTitle(item);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const header = ({item, index}) => {
    return (
      <>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: 'RobotoSlab-Bold',
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
            marginTop: '5%',
          }}>
          Please select prefered visiting time
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            showDatepicker();
          }}
          style={{
            marginTop: '6%',
            alignSelf: 'center',
            width: '54%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 23, color: 'red'}}>
            {date.getDate() +
              ' / ' +
              (date.getMonth() + 1) +
              ' / ' +
              date.getFullYear()}
          </Text>
          <SimpleLineIcons
            style={{left: 10}}
            name={'arrow-right'}
            size={16}
            color={'red'}
          />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            style={{
              marginTop: '6%',
            }}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            minimumDate={new Date(moment().format('YYYY-MM-DD'))}
            maximumDate={
              new Date(moment().add(1, 'month').format('YYYY-MM-DD'))
            }
          />
        )}
      </>
    );
  };

  const renderTime = ({item, index}) => {
    return (
      <View style={style.parent}>
        <Pressable
          style={colorId === item.key ? style.red : style.white}
          onPress={() => {
            onPress(item.key, item.title);
          }}>
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
                  fontSize: 17,
                }}>
                {item.title}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

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
            dispatch(emptyCart());
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
          Schedule
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

      <FlatList
        data={time}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderTime}
        ListHeaderComponent={header}
        ListHeaderComponentStyle={{
          paddingHorizontal: '6%',
          marginBottom: '4%',
        }}
        keyExtractor={item => item.key}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          navigation.navigate('CheckOutScreen', {
            datee: date,
            timee: timeTitle,
          });
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontFamily: 'RobotoSlab-Bold',
            color: 'red',
            fontWeight: '500',
            fontSize: 20,
            marginTop: '5%',
          }}>
          CheckOut
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default Schedule;
