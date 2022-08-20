import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  Pressable,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import style from './style';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import time from '../../DataStore/TimeData';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {emptyCart} from '../../../src/Redux/Action/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Constraints from '../../Constraints/Constraints';

function Schedule({navigation, props, route}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [colorId, setColorId] = useState(0);
  const [date, setDate] = useState(new Date());
  const [timeTitle, setTimeTitle] = useState('9:00 AM');
  const {cartItems} = useSelector(reducers => reducers.cartReducer);

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //     dispatch(emptyCart()),
  //   );

  //   return () => backHandler.remove();
  // }, []);

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
        <Text style={style.scheduleSubTitle}>
          {Constraints.SCHEDULE_subTitle}
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            showDatepicker();
          }}
          style={style.datePickerBtn}>
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
              <Text style={style.timeTitle}>{item.title}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <Pressable
          style={style.btnBack}
          onPress={() => {
            navigation.goBack();
            dispatch(emptyCart());
          }}>
          <Ionicons name={'arrow-back-outline'} size={30} color={'black'} />
        </Pressable>
        <Text style={style.titleSchedule}>{Constraints.SCHEDULE}</Text>
        <Pressable style={style.shreBtn}>
          <Ionicons name={'share'} size={30} color={'white'} />
        </Pressable>
      </View>
      <View style={style.bottomLine} />

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
        style={style.btnCheckOut}
        onPress={() => {
          navigation.navigate('CheckOutScreen', {
            datee: date,
            timee: timeTitle,
          });
        }}>
        <Text style={style.btnCheckOutTxt}>{Constraints.CHECKOUT}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default Schedule;
