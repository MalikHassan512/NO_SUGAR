import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Button, Card, IconButton, Searchbar} from 'react-native-paper';

import {SliderBox} from 'react-native-image-slider-box';
import styled from 'styled-components';
import Catagories from './components/Catagories';
import NewProducts from './components/NewProduct';
import AllProducts from './components/AllProduct';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import {getData} from '../NetworkRequest';
import {useSelector} from 'react-redux';
import {useShopify} from '../../custom_hooks/shopify_hook';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [catagories, setCatagories] = useState([]);
  // const [products, setProducts] = useState([]);
  const [shopifyProducts, setShopifyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const country = useSelector(state => state?.country?.country);
  const token = useSelector(state => state?.auth?.token);
  const {
    products,
    fetchProducts,
    nextProducts,
    fetchNextProducts,
    featured,
    fetchCollection,
  } = useShopify();

  const onChangeSearch = query =>
    navigation.navigate('AllProducts', {name: '', query: query});

  const getCategories = async () => {
    try {
      const data = await getData(token, 'categries/', {cat_type: 'Product'});
      setCatagories(data);
    } catch (error) {
      console.log(error);
    }
  };
  // const data = fetchNextProducts(products);

  const getPosters = async () => {
    try {
      const data = await getData(token, 'quotation/', {type: 'Product'});
      // setCatagories(data);
    } catch (error) {
      console.log(error);
    }
  };
  // const getProducts = async () => {
  //   try {
  //     const data = await getData(token, 'RecentProduct/', {
  //       country: country === '' ? null : country,
  //     });
  //     // setProducts(data);
  //     setShopifyProducts(data);
  //     // console.log(data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     // setLoading(false);
  //   }
  // };

  useEffect(() => {
    try {
      fetchProducts(5);
      // fetchCollection();
      // // getProducts();
      getCategories();

      setLoading(false);
      // getPosters();
    } catch {}
  }, []);
  return loading || products.length === 0 ? (
    <View style={styles.container}>
      <ActivityIndicator color="#66cc33" size={50} />
    </View>
  ) : (
    <ScrollView style={styles.mainContainer}>
      {/* <View></View> */}
      <View style={{flexDirection: 'row'}}>
        <Searchbar
          // icon="search"
          // autoFocus={false}

          // onFocus={() =>
          //   navigation.navigate('AllProducts', {name: 'All Products'})
          // }
          // onFocus={() => navigation.navigate('AllProducts', {code: 'search'})}
          style={styles.searchInput}
          placeholder="Search all products"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <IconButton style={{marginLeft: -50}} icon="qrcode-scan" />
      </View>

      <FlatList
        horizontal
        data={catagories}
        showsHorizontalScrollIndicator={false}
        style={{
          marginVertical: 10,
          // backgroundColor: 'red',
        }}
        renderItem={({item}) => <Catagories key={item?.uuid} data={item} />}
        keyExtractor={(_, index) => `${index}`}
      />

      {/* </ScrollView> */}
      <View>
        <View style={styles.videoContainer}>
          <Text style={styles.videoTextContainer}>New Products</Text>
          <Button
            onPress={() => navigation.navigate('AllProducts', {name: ''})}
            color="#66cc33"
            style={styles.buttonView}
            uppercase={false}>
            View all
          </Button>
        </View>
        <FlatList
          horizontal
          data={products}
          showsHorizontalScrollIndicator={false}
          style={{
            marginVertical: 10,
          }}
          renderItem={({item}) => (
            <NewProducts
              onPress={() => navigation.navigate('ProductDetail')}
              key={item?.id}
              data={item}
            />
          )}
          keyExtractor={(_, index) => `${index}`}
        />
      </View>
      <View style={styles.sliderContainer}>
        <SliderBox
          ImageComponent={FastImage}
          imageLoadingColor="#66CC33"
          images={[
            require('../../../assets/Weareleadingnosugar.png'),
            require('../../../assets/general/proposter1.png'),

            // require('../../../assets/general/proposter3.png'),
            require('../../../assets/general/proposter4.png'),
          ]}
          sliderBoxHeight={260}
          dotColor="#66CC33"
          inactiveDotColor="#90A4AE"
          // paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'contain'}
          ImageComponentStyle={styles.imageComponent}
          paginationBoxStyle={{
            marginBottom: -40,
          }}
        />
      </View>
      <View>
        <View style={[styles.videoContainer, {marginTop: 20}]}>
          <Text style={styles.videoTextContainer}>All Products</Text>
          <Button
            onPress={() =>
              navigation.navigate('AllProducts', {name: 'All Products'})
            }
            color="#66cc33"
            style={styles.buttonView}
            uppercase={false}>
            View all
          </Button>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}>
          {products?.map(item => (
            <AllProducts key={item?.id} data={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageComponent: {
    borderRadius: 15,
    width: width - 10,
    marginRight: 20,

    marginTop: 5,
  },
  sliderContainer: {
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 30,
    borderRadius: 50,
  },
  mainContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  searchInput: {
    width: width - 30,
    color: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 5,
    borderRadius: 20,
  },
  videoContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoTextContainer: {
    fontWeight: 'bold',
    fontSize: 22,
    // textAlign: 'center',
  },
  buttonView: {
    fontSize: 22,
  },
});

export default Products;
