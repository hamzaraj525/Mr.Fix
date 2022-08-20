import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  Pressable,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Animatable from 'react-native-animatable';
import firestore from '@react-native-firebase/firestore';
import Constraints from './../../Constraints/Constraints';
import {addToCart, emptyCart} from '../../Redux/Action/actions';

function SearchModal({navigation, route, searchModal, hideModal}) {
  const [input, setInput] = useState('');
  const [homeList, setHomeList] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [masterList, setMasterList] = useState([]);

  const dispatch = useDispatch();
  const {cartItems} = useSelector(reducers => reducers.cartReducer);

  const searchFlter = text => {
    if (text) {
      setTimeout(() => {
        setLoader(false);
      }, 1200);

      const filterArray = masterList.filter((item, i) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setLoader(true);
      setHomeList(filterArray);
    } else {
      setHomeList(null);
    }
  };

  useEffect(() => {
    fetchHomeServicesData();
  }, []);

  const fetchHomeServicesData = () => {
    var newArray = [];

    firestore()
      .collection('Services')
      .get()
      .then(querySnapshot => {
        console.log('Total HomeServices: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          newArray.push(documentSnapshot.data());
        });
      })
      .then(testing => {
        console.log('New Array Push is =', newArray);
        setHomeList(newArray);
        setMasterList(newArray);
      })
      .catch(error => {
        console.log(error);
        alert('Your Network Connection Is Not Good');
      });
  };

  const addtoCart = (item, index) => {
    hideModal();
    dispatch(addToCart(item, index));
    setTimeout(() => {
      navigation.navigate('Schedule');
    }, 700);
  };

  const renderSearchModal = ({item, index}) => {
    return (
      <Animatable.View
        iterationCount={1}
        useNativeDriver
        animation={'bounceInUp'}
        delay={index * 50}>
        <Pressable style={styles.cartItemsContainer}>
          <View style={styles.subContainer}>
            <View style={styles.img}>
              <FastImage
                resizeMode={FastImage.resizeMode.cover}
                style={styles.cartItemImage}
                source={{
                  uri: item.img,
                  priority: FastImage.priority.high,
                }}
              />
            </View>
            <View style={styles.cartItemDetailsContainer}>
              <Text style={styles.cartItemTitle}>{item.title}</Text>
              <Text style={styles.subTitxt}>{item.SubTitle}</Text>
              <Text style={styles.cartItemPrice}>PKR {item.Price}</Text>
              <TouchableOpacity
                onPress={() => {
                  addtoCart(item, index);
                }}
                activeOpacity={0.6}
                style={styles.cartItemButton}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 15,
                  }}>
                  {Constraints.ADD}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Animatable.View>
    );
  };

  const searchHomeServices = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={homeList}
        renderItem={renderSearchModal}
        keyExtractor={item => item.key}
      />
    );
  };

  return (
    <SafeAreaView>
      <Modal
        visible={searchModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          hideModal();
        }}>
        <SafeAreaView style={styles.modalSafeareaContainer}>
          <View style={styles.sectionStylee}>
            <Pressable
              style={{paddingHorizontal: '3%', paddingVertical: '3%'}}
              onPress={() => {
                dispatch(emptyCart());
                hideModal();
              }}>
              <Entypo name={'cross'} size={28} color={'black'} />
            </Pressable>
            <TextInput
              autoFocus={true}
              style={styles.searchInput}
              onChangeText={text => {
                setInput(text);
                searchFlter(text);
              }}
              placeholder="Search your ..."
              placeholderTextColor={'grey'}
              underlineColorAndroid="transparent"
            />
          </View>

          {showLoader ? (
            <ActivityIndicator
              style={styles.loaderInd}
              size="large"
              color="#0000ff"
            />
          ) : (
            <View style={styles.searchContainer}>{searchHomeServices()}</View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
export default SearchModal;

const styles = StyleSheet.create({
  loaderInd: {marginTop: '15%', alignSelf: 'center', width: 100, height: 100},
  searchInput: {
    fontSize: 18,
    paddingHorizontal: '5%',
    color: 'black',
  },
  searchContainer: {flex: 1, paddingHorizontal: '3%', paddingVertical: '3%'},
  container: {
    flex: 1,
  },
  cartItemsContainer: {
    borderWidth: 0.4,
    borderColor: 'grey',
    borderRadius: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '97%',
    paddingHorizontal: '2%',
    paddingVertical: '4%',
  },
  cartItemImage: {
    width: 95,
    height: 95,
    borderRadius: 10,
  },
  cartItemTitle: {
    color: 'black',
    width: 170,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 5,
  },
  cartItemPrice: {
    color: 'blue',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  subTitxt: {
    color: 'grey',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
  },
  cartItemDetailsContainer: {marginLeft: '4%', flexDirection: 'column'},
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 95,
    height: 95,
    borderRadius: 10,
  },
  modalSafeareaContainer: {flex: 1, backgroundColor: 'white'},
  cartItemButton: {
    backgroundColor: 'orange',
    borderRadius: 20,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
