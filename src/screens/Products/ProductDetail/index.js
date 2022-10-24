import React, {useEffect, useState} from 'react';
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
  useWindowDimensions,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card, IconButton, Menu, Chip} from 'react-native-paper';
import {getData} from '../../NetworkRequest';
// import {Dropdown} from 'react-native-material-dropdown';
import {addItem} from '../../../redux/actions/addToCartActions';
import RenderHTML from 'react-native-render-html';
import {useSelector, useDispatch} from 'react-redux';
import {useShopify} from '../../../custom_hooks/shopify_hook';
import MaterialIcon from 'react-native-vector-icons/Entypo';

const height = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

const ProductDetail = () => {
  const navigation = useNavigation();
  const [loadingCart, setLoadingCart] = useState(false);
  const {product, fetchProduct, checkoutState, addVariant} = useShopify();
  const defaultSize = product.variants && product.variants[0].id.toString();
  const {params} = useRoute();
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state?.auth?.token);
  const [recommended, setRecommended] = useState([]);
  const {width} = useWindowDimensions([]);
  // console.log('prooooooo0', product);

  const changeSize = async sizeId => {
    setLoadingCart(true);
    try {
      if (sizeId === '') {
        sizeId = defaultSize;
        const lineItemsToAdd = [{variantId: sizeId, quantity: 1}];
        const checkoutId = checkoutState.id;
        await addVariant(checkoutId, lineItemsToAdd);
        navigation.navigate('AddToCart');
        setLoadingCart(false);
      } else {
        const lineItemsToAdd = [{variantId: sizeId, quantity: 1}];
        const checkoutId = checkoutState.id;
        await addVariant(checkoutId, lineItemsToAdd);
        navigation.navigate('AddToCart');
        setLoadingCart(false);
      }
    } catch (error) {}
  };
  const getProduct = async () => {
    try {
      await fetchProduct(params?.uuid);
      setLoading(false);

      const rec = await getData(token, 'product-recommend/', {
        search: 'No Sugar T-Shirt for Women',
        country: 'us',
      });
      setRecommended(rec);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return loading || product === {} || product?.title === undefined ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <View>
          <Image
            // size={150}
            width={280}
            height={280}
            resizeMode="contain"
            style={{width: 280, height: 280}}
            source={
              product?.images === null || product?.images === undefined
                ? require('../../../../assets/general/item_placeholder.png')
                : {uri: product?.images[0]?.src}
            }
          />
        </View>
      </View>
      <Card style={styles.cardContainer}>
        <Card style={styles.heartContainer}>
          <IconButton size={30} color="#66cc33" icon="heart-outline" />
        </Card>
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product?.title}</Text>
          <View style={styles.priceContainer}>
            <Chip>No Sugar </Chip>
            <Text style={styles.priceText}>{`$ ${
              product?.variants && product?.variants[0]?.price
            }`}</Text>
          </View>
          <Text style={styles.descriptionText}>
            {/* <RenderHTML
              contentWidth={width - 50}
              tagsStyles={tagsStyles}
              source={{html: product?.descriptionHtml}}
            /> */}
            {product?.description}
          </Text>
          <View>
            {/* <Menu.Item onPress={() => {}} title="One Time Purchase" />
            <Menu.Item onPress={() => {}} title="Monthly Purchase" />
            <Menu.Item onPress={() => {}} title="Yearly Purchase" /> */}
          </View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.cartButton}
            colors={['#41B87F', '#86B841']}>
            {loadingCart && <ActivityIndicator style={{marginRight: 10}} />}
            <TouchableOpacity
              onPress={() => {
                // items.filter(item => item?.id === product?.id).length < 1
                //   ? dispatch(addItem(product))
                //   : null;

                changeSize(defaultSize);
              }}>
              <Text style={styles.cartTouch}>Add to Cart</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginVertical: 5}}>
            Recommended Products
          </Text>

          <View style={{height: 140}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {recommended.map(item => (
                <Card style={styles.cardStyle}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: 10,
                    }}>
                    <Image
                      // size={150}
                      width={30}
                      height={30}
                      resizeMode="contain"
                      style={{
                        width: 80,
                        height: 80,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 20,
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      source={
                        item?.image === null || item?.image === undefined
                          ? require('../../../../assets/general/item_placeholder.png')
                          : {uri: item?.image}
                      }
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 8,
                        paddingHorizontal: 10,
                        textAlign: 'center',
                        marginVertical: 5,
                      }}>
                      {item?.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 8,
                        color: '#41B87F',
                      }}>{`$ ${item?.price}`}</Text>
                    <View style={styles.chipContainer}>
                      <MaterialIcon size={9} color="#F2AD05" name="star" />
                      <TouchableOpacity
                      // onPress={() => data?.nextPageQueryAndPath()}
                      >
                        <Text style={styles.ratingNumber}> 5.0</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              ))}
            </ScrollView>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};
const tagsStyles = {
  p: {
    maxWidth: widthScreen - 40,
  },
};
const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 10,
    height: 130,
    width: 130,
    margin: 8,
  },
  ratingNumber: {
    fontSize: 8,
    color: '#F2AD05',
  },
  chipContainer: {
    backgroundColor: '#fcefcd',
    color: '#F2AD05',
    borderRadius: 15,
    alignItems: 'center',

    width: 30,
    flexDirection: 'row',
    justifyContent: 'center',
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
  },
  priceText: {
    color: '#66cc33',
    fontWeight: '600',
    fontSize: 25,

    alignSelf: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    marginRight: 10,
  },
  productName: {
    fontWeight: '600',
    fontSize: 24,
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

export default ProductDetail;
