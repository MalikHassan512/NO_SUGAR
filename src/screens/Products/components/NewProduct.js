import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card, Chip, IconButton} from 'react-native-paper';
import AddButton from '../../../../assets/Add Item';
import MaterialIcon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components';
import {useShopify} from '../../../custom_hooks/shopify_hook';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const NewProducts = ({data, client, home}) => {
  const navigation = useNavigation();
  const [loadingCart, setLoadingCart] = useState(false);
  const {checkoutState, addVariant} = useShopify();

  const changeSize = async sizeId => {
    setLoadingCart(true);
    try {
      if (sizeId === '') {
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

  return home ? (
    <StyledCard color="white">
      {/* <ProductTmage /> */}
      <TouchableOpacity
        onPress={() =>
          home
            ? navigation.navigate('ProductScreen', {
                screen: 'ProductDetail',
                initial: false,
                params: {uuid: data?.uuid},
              })
            : navigation.navigate('ProductDetail', {
                uuid: data?.id ? data?.id : data?.uuid,
              })
        }>
        <Image
          width={width * 0.48}
          height={200}
          style={styles.imageContainer}
          source={
            data?.images?.src === null
              ? require('../../../../assets/general/item_placeholder.png')
              : {uri: data?.image}
          }
        />
      </TouchableOpacity>

      <View style={styles.nameContainer}>
        {/* <Text style={{fontWeight: 'bold', fontSize: 18}}>Dynamic Warmup</Text> */}
        <Text numberOfLines={2} style={{height: 40}}>
          {data?.name}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* <View style={{marginTop: 15, color: '#66cc33'}}> */}
          <Text
            style={{
              marginTop: 15,
              fontWeight: '700',
              fontSize: 16,
              color: '#66cc33',
            }}>
            $ {data?.price}
          </Text>
          {/* </View> */}
          <View style={styles.chipContainer}>
            <MaterialIcon
              size={15}
              // style={{marginTop: 2}}
              color="#F2AD05"
              name="star"
            />
            <TouchableOpacity onPress={() => data?.nextPageQueryAndPath()}>
              <Text style={styles.ratingNumber}> 5.0</Text>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              changeSize(data.variants && data.variants[0].id.toString());
            }}
            // onPress={() =>
            //   navigation.navigate('ProductDetail', {uuid: data?.id})
            // }
          >
            <AddButton style={{marginBottom: -5, marginRight: -10}} />
          </TouchableOpacity> */}
        </View>
      </View>
    </StyledCard>
  ) : (
    <StyledCard color="white">
      {/* <ProductTmage /> */}
      <TouchableOpacity
        onPress={() =>
          home
            ? navigation.navigate('ProductScreen', {
                screen: 'ProductDetail',
                initial: false,
                params: {uuid: data?.uuid},
              })
            : navigation.navigate('ProductDetail', {
                uuid: data?.id ? data?.id : data?.uuid,
              })
        }>
        <Image
          width={width * 0.48}
          height={200}
          style={styles.imageContainer}
          source={
            data?.images?.src === null
              ? require('../../../../assets/general/item_placeholder.png')
              : {uri: data?.images[0]?.src}
          }
        />
      </TouchableOpacity>

      <View style={styles.nameContainer}>
        {/* <Text style={{fontWeight: 'bold', fontSize: 18}}>Dynamic Warmup</Text> */}
        <Text numberOfLines={2} style={{height: 40}}>
          {data?.title}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.chipContainer}>
            <MaterialIcon
              size={15}
              style={{marginTop: 2}}
              color="#F2AD05"
              name="star"
            />
            <TouchableOpacity onPress={() => data?.nextPageQueryAndPath()}>
              <Text style={styles.ratingNumber}> 5.0</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              changeSize(data.variants && data.variants[0].id.toString());
            }}
            // onPress={() =>
            //   navigation.navigate('ProductDetail', {uuid: data?.id})
            // }
          >
            <AddButton style={{marginBottom: -5, marginRight: -10}} />
          </TouchableOpacity>
        </View>
      </View>
    </StyledCard>
  );
};

const styles = StyleSheet.create({
  ratingNumber: {
    color: '#F2AD05',
    // alignSelf: 'center',
  },
  nameContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  imageContainer: {
    width: width * 0.52,
    height: 210,
    borderRadius: 20,
    marginBottom: 5,
  },
  chipContainer: {
    backgroundColor: '#fcefcd',
    color: '#F2AD05',
    width: 65,
    // backgroundColor: '#fcefcd',
    borderRadius: 15,
    alignSelf: 'center',
    // width: 60,
    paddingHorizontal: 10,
    // height: '70%',
    flexDirection: 'row',
    justifyContent: 'center',

    marginTop: 10,
    padding: 5,
  },
});
const StyledCard = styled(Card)`
  background-color: ${props => props.color};
  align-self: center;

  width: ${() => `${width * 0.52}px`};
  height: 320px;
  margin: 10px;
  border-radius: 20px;
  border-color: #e9f0ea;
  /* border-width: 1px; */
`;

export default NewProducts;
