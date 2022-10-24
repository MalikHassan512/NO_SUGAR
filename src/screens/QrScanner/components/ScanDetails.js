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
import {Card, IconButton, Divider, Button} from 'react-native-paper';
import axios from 'axios';
import {postData, getData} from '../../NetworkRequest';
import {useSelector} from 'react-redux';
import EmptyComponent from '../../Components/EmptyComponent';
import PlaceholderImage from '../../../../assets/emptyProduct.svg';

const height = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

const ScannedProductDetails = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  const [isLoading, setIsLoading] = useState(params?.dataResult ? false : true);
  const [product, setProduct] = useState({});
  const token = useSelector(state => state?.auth?.token);
  const [selected, setSelected] = useState('br');

  const getProduct = async bar => {
    try {
      // yarn andrioddata?.products[0] ? setProduct(data?.products[0]?.product_name) : null;

      const data = await getData(token, 'fat-detail/', {
        id: params?.id,
      });

      setProduct(data);
      console.log(data);
    } catch (error) {
      console.log(error.response);

      // setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const postFood = async () => {
    setIsLoading(true);
    try {
      console.log('producttt', product?.name, params?.brand_name);
      await postData(token, 'fav-food/', {
        name: product?.name,

        // image_url: product?.images[0],
        fiber: product?.fiber,
        sugar: product?.sugar,
        carbohydrate: product?.carbohydrate,
        protein: product?.protein,
        weight: '100',
        weight_typ: 'grams',
        cat_code: 'ff',
        calories: product?.calories,
        fats: product?.fats,
        p_code: selected,
        quantity: 1,
      });

      setIsLoading(false);
      navigation.navigate('DailyIntakeScreen');
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };
  useEffect(() => {
    params?.dataResult ? setProduct(params?.dataResult) : getProduct();
  }, []);
  return isLoading ? (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : product?.name ? (
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
              product?.packaging_photos === null ||
              product?.packaging_photos === undefined
                ? require('../../../../assets/general/item_placeholder.png')
                : {uri: product?.packaging_photos?.front?.display}
            }
          />
        </View>
      </View>
      {/* <Card style={styles.cardContainer}> */}
      {/* <Card style={styles.heartContainer}>
          <IconButton size={30} color="#66cc33" icon="heart-outline" />
        </Card> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>
          {product?.name}
          <Text style={{fontSize: 16, fontWeight: '400'}}>
            {params?.brand_name ? ` (${params?.brand_name})` : null}
          </Text>
        </Text>
        {/* <View style={styles.priceContainer}>
            <Chip>{product?.nutrition_facts} </Chip>
          </View> */}

        {/* <List.Section
          titleStyle={{
            fontSize: 18,
            fontWeight: '700',
            padding: 0,
            color: 'black',
            marginLeft: -8,
          }}
          title="Servings:">
          {product?.servings?.serving?.calories
            ? [product?.servings?.serving]
            : product?.servings?.serving.map(item => (
                <List.Accordion
                  style={{backgroundColor: 'white', margin: 0, padding: 0}}
                  titleNumberOfLines={2}
                  titleStyle={{
                    textTransform: 'capitalize',
                    color: expanded === item?.serving_id ? '#66cc33' : 'black',
                  }}
                  right={props => (
                    <List.Icon
                      color="#66cc33"
                      {...props}
                      icon={
                        expanded === item?.serving_id
                          ? 'check-circle'
                          : 'circle-outline'
                      }
                    />
                  )}
                  key={item?.serving_id}
                  title={item?.serving_description}
                  expanded={expanded === item?.serving_id}
                  onPress={() =>
                    handlePress(item?.serving_id, {
                      fiber: item?.fiber,
                      sugar: item?.sugar,
                      carbohydrate: item?.carbohydrate,
                      protein: item?.protein,
                      calories: item?.calories,
                      fats: item?.fat,
                    })
                  }> */}
        <Card style={{marginHorizontal: 10, borderRadius: 10}}>
          <View style={styles.listDetail}>
            <Text style={styles.detailFont}> Calories </Text>
            <Text>{parseFloat(product?.calories).toFixed(2)} Kcl </Text>
          </View>
          <Divider />
          <View style={styles.listDetail}>
            <Text style={styles.detailFont}> Carbohydrate </Text>
            <Text>{parseFloat(product?.carbohydrate).toFixed(2)} G </Text>
          </View>
          <Divider />
          <View style={styles.listDetail}>
            <Text style={styles.detailFont}> Protein </Text>
            <Text>{parseFloat(product?.protein).toFixed(2)} G </Text>
          </View>
          <Divider />
          <View style={styles.listDetail}>
            <Text style={styles.detailFont}> Fat </Text>
            <Text>{parseFloat(product?.fats).toFixed(2)} G </Text>
          </View>
          <Divider />
          <View style={styles.listDetail}>
            <Text style={styles.detailFont}> Fiber </Text>
            <Text>{parseFloat(product?.fiber).toFixed(2)} G </Text>
          </View>
          <Divider />
          <View style={styles.listDetail}>
            <Text style={styles.detailFont}> Sugar </Text>
            <Text>{parseFloat(product?.sugar).toFixed(2)} G </Text>
          </View>
          <Divider />
          <View style={styles.listDetail}>
            <Text style={styles.detailFont}> Net Carbs </Text>
            <Text>
              {parseFloat(
                product?.carbohydrate - product?.sugar - product?.fiber,
              ).toFixed(2)}{' '}
              G{' '}
            </Text>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button
              onPress={() => setSelected('br')}
              color="black"
              icon={selected === 'br' ? 'check-circle' : 'circle-outline'}>
              <Text>Breakfast</Text>
            </Button>
            <Button
              onPress={() => setSelected('dn')}
              color="black"
              icon={selected === 'dn' ? 'check-circle' : 'circle-outline'}>
              {' '}
              <Text> Dinner</Text>
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button
              onPress={() => setSelected('ln')}
              color="black"
              icon={selected === 'ln' ? 'check-circle' : 'circle-outline'}>
              Lunch{' '}
            </Button>

            <Button
              onPress={() => setSelected('sn')}
              color="black"
              icon={selected === 'sn' ? 'check-circle' : 'circle-outline'}>
              {' '}
              Snacks
            </Button>
          </View>
        </Card>
        {/* </List.Accordion>
              ))}
        </List.Section> */}
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
          {isLoading && <ActivityIndicator style={{marginRight: 10}} />}
          <TouchableOpacity
            onPress={() => {
              // items.filter(item => item?.id === product?.id).length < 1
              //   ? dispatch(addItem(product))
              //   : null;
              postFood();
            }}>
            <Text style={styles.cartTouch}>Log Food</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      {/* </Card> */}
    </ScrollView>
  ) : (
    <EmptyComponent
      Svg={PlaceholderImage}
      message={'Product not found'}
      messageTitle={'No Product'}
    />
  );
};
const tagsStyles = {
  p: {
    maxWidth: widthScreen - 40,
  },
};
const styles = StyleSheet.create({
  detailFont: {
    fontWeight: '700',
    fontSize: 15,
  },
  listDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
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
    marginVertical: 15,
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
    textAlign: 'center',
    marginVertical: 10,
    // color: '#66cc33',
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
    height: height,
    width: widthScreen,
    justifyContent: 'space-between',
    borderTopRightRadius: 50,
    // padding: height * 0.04,
    borderTopLeftRadius: 50,
  },
  mainContainer: {width: '100%', backgroundColor: 'white', height: '100%'},
});

export default ScannedProductDetails;
