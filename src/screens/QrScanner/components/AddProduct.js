import React, {useEffect, Fragment, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/core';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import {Card, IconButton, Searchbar, Divider} from 'react-native-paper';
import axios from 'axios';
import {postData, getData} from '../../NetworkRequest';
import {useSelector} from 'react-redux';
import EmptyComponent from '../../Components/EmptyComponent';
import PlaceholderImage from '../../../../assets/emptyProduct.svg';

const height = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

const QrProduct = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const {params} = useRoute();
  const token = useSelector(state => state?.auth?.token);
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const onSerach = async () => {
    try {
      const searchResult = await getData(token, 'fat-food/', {
        search: searchQuery,
        brand: '',
      });

      setSearchData(searchResult);
    } catch (error) {}
  };
  const getProduct = async bar => {
    console.log('bar', bar, params.code);
    try {
      // const {data} = await axios.get(
      //   `https://buycott.com/api/v4/products/lookup?barcode=${bar}&access_token=cNDqXcvtVL230nfZ6ABBeBSlgLnYV8DJV7JdZk-G`,
      // );
      // console.log('QR scanner', data);
      // yarn andrioddata?.products[0] ? setProduct(data?.products[0]?.product_name) : null;

      // const searchResult = data?.products[0]
      const searchResult = await getData(token, 'buycott/', {
        barcode: bar,
      });
      // : [];
      setSearchData(searchResult);
      console.log('seaarch result', searchResult);
      searchResult?.edamam_result
        ? navigation.navigate('ScannedProductDetails', {
            dataResult: searchResult,
          })
        : null;
    } catch (error) {
      console.log(error);

      // setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const postFood = async () => {
    setIsLoading(true);
    try {
      await postData(token, 'fav-food/', {
        name: product?.title,
        // image_url: product?.images[0],
        fiber: '0',
        sugar: '0',
        carbohydrate: '0',
        protein: '0',
        weight: '0',
        weight_typ: 'grams',
        cat_code: 'ff',
        calories: '0',
        fats: '0',

        quantity: 1,
      });

      setIsLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };
  useEffect(() => {
    // params.code === 'chomp'
    //   ? getChompsData(params?.bar_code)
    //   : params.code === 'buycott'
    getProduct(params?.bar_code);
    // : setIsLoading(false);
  }, []);
  return isLoading ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : (
    // product?.product_name ? (
    //   <ScrollView style={styles.mainContainer}>
    //     <View style={styles.imageContainer}>
    //       <View>
    //         <Image
    //           // size={150}
    //           width={280}
    //           height={280}
    //           resizeMode="contain"
    //           style={{width: 280, height: 280}}
    //           source={
    //             product?.packaging_photos === null ||
    //             product?.packaging_photos === undefined
    //               ? require('../../../../assets/general/item_placeholder.png')
    //               : {uri: product?.packaging_photos?.front?.display}
    //           }
    //         />
    //       </View>
    //     </View>
    //     <Card style={styles.cardContainer}>
    //       <Card style={styles.heartContainer}>
    //         <IconButton size={30} color="#66cc33" icon="heart-outline" />
    //       </Card>
    //       <View style={styles.detailsContainer}>
    //         <Text style={styles.productName}>{product?.product_name}</Text>
    //         {/* <View style={styles.priceContainer}>
    //         <Chip>{product?.nutrition_facts} </Chip>
    //       </View> */}
    //         <Text style={styles.descriptionText}>
    //           {/* <RenderHTML
    //           contentWidth={width - 50}
    //           tagsStyles={tagsStyles}
    //           source={{html: product?.descriptionHtml}}
    //         /> */}
    //           {product?.product_description}
    //         </Text>
    //         <View>
    //           {/* <Menu.Item onPress={() => {}} title="One Time Purchase" />
    //         <Menu.Item onPress={() => {}} title="Monthly Purchase" />
    //         <Menu.Item onPress={() => {}} title="Yearly Purchase" /> */}
    //         </View>
    //         <LinearGradient
    //           start={{x: 0, y: 0}}
    //           end={{x: 1, y: 0}}
    //           style={styles.cartButton}
    //           colors={['#41B87F', '#86B841']}>
    //           {isLoading && <ActivityIndicator style={{marginRight: 10}} />}
    //           <TouchableOpacity
    //             onPress={() => {
    //               // items.filter(item => item?.id === product?.id).length < 1
    //               //   ? dispatch(addItem(product))
    //               //   : null;
    //               postFood();
    //             }}>
    //             <Text style={styles.cartTouch}>Add to Favorite</Text>
    //           </TouchableOpacity>
    //         </LinearGradient>
    //       </View>
    //     </Card>
    //   </ScrollView>
    // ) : (
    //   <EmptyComponent
    //     Svg={PlaceholderImage}
    //     message={'Product not found'}
    //     messageTitle={'No Product'}
    //   />
    // )
    <View>
      {searchData.length === 0 || searchData?.edamam_result === true ? (
        <>
          <Searchbar
            style={{margin: 10, marginBottom: 40}}
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={onSerach}
            placeholder="Please search for food items"
            // onKeyPress={onSerach}
          />
          <View style={{justifyContent: 'space-around', alignItems: 'center'}}>
            <PlaceholderImage width={300} height={300} />

            <Text style={{fontSize: 18, fontWeight: '700', marginVertical: 10}}>
              {searchData?.edamam_result ? 'Search with name' : 'No Bar Code'}
            </Text>
            <Text style={{fontSize: 16, fontWeight: '400'}}>
              Please enter name for search
            </Text>
          </View>
        </>
      ) : searchData?.edamam_result ? null : (
        <FlatList
          data={searchData}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ScannedProductDetails', {
                  id: item?.food_id,
                  brand_name: item?.brand_name,
                })
              }
              style={{
                padding: 15,
                backgroundColor: 'white',
                borderRadius: 20,
                margin: 5,
              }}>
              <Text style={{fontSize: 16, marginBottom: 5, fontWeight: '700'}}>
                {item?.food_name}{' '}
                {item?.brand_name ? (
                  <Text style={{fontSize: 12, fontWeight: '400'}}>
                    ({item?.brand_name})
                  </Text>
                ) : null}
              </Text>
              {/* <Divider style={{marginVertical: 10}} /> */}
              <Text>
                {item?.food_description}
                {/* {' '}
                {item?.calories == null ? 0 : item?.calories} Cal,{' '}
                {item?.fiber == null ? 0 : item?.fiber} Fib,{' '}
                {item?.sugar == null ? 0 : item?.sugar} Sug,{' '}
                {item?.net_carbs == null ? 0 : item?.net_carbs} Carbs,{' '}
                {item?.protien == null ? 0 : item?.protien} Pro */}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};
const tagsStyles = {
  p: {
    maxWidth: widthScreen - 40,
  },
};
const styles = StyleSheet.create({
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
  },
  cartTouch: {
    color: 'white',
    textAlign: 'center',
    // fontWeight: '700',
    fontSize: 18,
  },
  cartButton: {
    marginVertical: 5,
    borderRadius: 25,
    marginHorizontal: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  descriptionText: {
    margin: 10,
    textTransform: 'capitalize',
  },
  priceText: {
    color: '#66cc33',
    fontWeight: '600',
    fontSize: 25,

    alignSelf: 'center',
  },
  priceContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: 20,
    marginRight: 5,
  },
  productName: {
    fontWeight: '600',
    fontSize: 24,
    color: '#66cc33',
  },
  detailsContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  heartContainer: {
    // justifyContent: 'flex-end',
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    marginTop: -25,
    borderRadius: 15,
    marginHorizontal: widthScreen * 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 20,
    backgroundColor: '#c8f0cc',
    minHeight: height * 0.35,
  },
  cardContainer: {
    minHeight: height * 0.5,
    width: widthScreen,
    borderTopRightRadius: 50,
    // padding: height * 0.04,
    borderTopLeftRadius: 50,
  },
  mainContainer: {width: '100%', height: '100%', backgroundColor: '#c8f0cc'},
});

export default QrProduct;
