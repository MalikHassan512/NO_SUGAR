import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card, Chip, IconButton, Button} from 'react-native-paper';
import {useShopify} from '../../../custom_hooks/shopify_hook';
import MaterialIcon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components';
import AddButton from '../../../../assets/Add Item';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const AllProducts = ({data}) => {
  const navigation = useNavigation();

  const {checkoutState, addVariant} = useShopify();
  // const defaultSize = product.variants && product.variants[0].id.toString();

  const changeSize = async sizeId => {
    try {
      if (sizeId === '') {
        // sizeId = defaultSize;
        const lineItemsToAdd = [{variantId: sizeId, quantity: 1}];
        const checkoutId = checkoutState.id;
        await addVariant(checkoutId, lineItemsToAdd);
        navigation.navigate('AddToCart');
      } else {
        const lineItemsToAdd = [{variantId: sizeId, quantity: 1}];
        const checkoutId = checkoutState.id;
        await addVariant(checkoutId, lineItemsToAdd);
        navigation.navigate('AddToCart');
      }
    } catch (error) {}
  };

  return (
    <StyledCard
      onPress={() => navigation.navigate('ProductDetail', {uuid: data?.id})}
      color="white">
      <View style={styles.cardContainer}>
        <Card style={styles.imageCardContainer}>
          <Image
            width={75}
            height={75}
            style={styles.imageContainer}
            source={
              data?.images[0]?.src === undefined || data?.images?.src === null
                ? require('../../../../assets/general/item_placeholder.png')
                : {uri: data?.images[0]?.src}
            }
          />
        </Card>

        <View style={styles.detailContainer}>
          {/* <Text style={{fontWeight: 'bold', fontSize: 18}}>Dynamic Warmup</Text> */}
          <Text style={{height: 45}} numberOfLines={2}>
            {data?.title}
          </Text>
          <View style={styles.priceContainer}>
            <Text
              style={styles.priceText}>{`$${data?.variants[0]?.price}`}</Text>

            <View style={styles.chipContainer}>
              <MaterialIcon
                style={{marginTop: 2}}
                size={15}
                color="#F2AD05"
                name="star"
              />
              <Text style={styles.ratingNumber}> 5.0</Text>
            </View>
          </View>
        </View>
        <View style={{justifyContent: 'space-between'}}>
          <IconButton icon="heart-outline" />
          <TouchableOpacity
            // onPress={() => {
            //         changeSize(defaultSize);
            //       }}
            onPress={() =>
              changeSize(data.variants && data.variants[0].id.toString())
            }>
            <AddButton />
          </TouchableOpacity>
        </View>
      </View>
    </StyledCard>
  );
};

const styles = StyleSheet.create({
  ratingNumber: {
    color: '#F2AD05',
  },
  imageContainer: {
    // margin: 5,
    width: 80,
    height: 80,
  },
  imageCardContainer: {
    // margin: 5,
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  priceText: {
    color: '#74bd21',
    // marginRight: 5,
  },
  chipContainer: {
    backgroundColor: '#fcefcd',
    borderRadius: 15,

    // width: 60,
    paddingHorizontal: 10,

    // height: '70%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',

    // alignSelf: 'center',
    padding: 5,
  },
  detailContainer: {
    justifyContent: 'flex-end',
    width: width * 0.5,
    // backgroundColor: 'aqua',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    marginVertical: 10,
  },
});
const StyledCard = styled(Card)`
  background-color: ${props => props.color};
  align-self: center;

  width: ${() => `${width - 20}px`};
  height: 100px;
  margin: 10px;
  border-radius: 20px;
  border-color: #e9f0ea;
  /* border-width: 1px; */
`;

export default AllProducts;
