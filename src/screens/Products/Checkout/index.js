import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import Delete from '../../../../assets/Delete.svg';
import Plus from '../../../../assets/plus.svg';
import Minus from '../../../../assets/minus.svg';
import ProductDetailCard from '../Orders/components/ProductCard';
import LinearGradient from 'react-native-linear-gradient';
import CheckTick from '../../../../assets/checktick.svg';
import {useNavigation} from '@react-navigation/core';
import {useShopify} from '../../../custom_hooks/shopify_hook';
import PlaceholderImage from '../../../../assets/new/emptyCartPlaceholder.png';
import EmptyComponent from '../../Components/EmptyComponent';
import {Card} from 'react-native-paper';

export default function AddToCart() {
  const {navigate} = useNavigation();
  const {
    cartStatus,
    cartCount,
    updateQuantity,
    removeLineItem,
    checkoutState,
    setCount,
  } = useShopify();

  const decrementQuantity = (lineItemId, lineItemQuantity) => {
    const checkoutId = checkoutState.id;
    const updatedQuantity = lineItemQuantity - 1;
    updateQuantity(lineItemId, updatedQuantity, checkoutId);
  };

  const incrementQuantity = (lineItemId, lineItemQuantity) => {
    const checkoutId = checkoutState.id;
    const updatedQuantity = lineItemQuantity + 1;
    updateQuantity(lineItemId, updatedQuantity, checkoutId);
  };

  const deleteLineItem = lineItemId => {
    const checkoutId = checkoutState.id;
    removeLineItem(checkoutId, lineItemId);
  };
  useEffect(() => {
    const getCount = () => {
      let lineItems =
        checkoutState.lineItems && checkoutState.lineItems.length > 0
          ? checkoutState.lineItems
          : [];
      let count = 0;
      lineItems.forEach(item => {
        count += item.quantity;
        return count;
      });

      setCount(count);
    };

    getCount();
  }, [cartStatus, checkoutState, setCount]);

  return checkoutState.lineItems.length === 0 && cartCount === 0 ? (
    <>
      <EmptyComponent
        image={PlaceholderImage}
        message={'Your cart is empty'}
        messageTitle={'Empty Cart'}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.cartButton, {marginBottom: 20}]}
        colors={['#41B87F', '#86B841']}>
        <TouchableOpacity onPress={() => navigate('Products')}>
          <Text style={styles.cartTouch}>Back to Products</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  ) : checkoutState.lineItems.length === 0 ? (
    <View style={styles.activityContainer}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : (
    <ScrollView>
      <View>
        {/* ProductCard */}
        {checkoutState.lineItems &&
          checkoutState.lineItems.map((item, i) => (
            <Card key={item?.id} style={{borderRadius: 50, margin: 5}}>
              <View key={item?.id} style={styles.container}>
                <View style={styles.img}>
                  <View style={styles.imgInner}>
                    <Image
                      source={
                        item.variant.image?.src
                          ? {uri: item?.variant?.image?.src}
                          : require('../../../../assets/general/item_placeholder.png')
                      }
                      style={{height: 100, width: 100}}
                    />
                  </View>
                </View>
                <View style={{flex: 0.75, marginLeft: 5}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.content}>
                      <View>
                        <Text style={styles.ProTitle} numberOfLines={2}>
                          {item?.title}
                        </Text>
                        <Text style={{fontSize: 12, color: 'grey'}}>
                          Regular Price
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteLineItem(item.id)}
                      style={styles.delete}>
                      <Delete
                        style={{
                          marginTop: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* <View style={styles.price}> */}
                  <View style={styles.inner}>
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={() =>
                          decrementQuantity(item.id, item.quantity)
                        }
                        style={styles.circle}>
                        <Minus height={14} width={14} />
                      </TouchableOpacity>

                      <Text style={{fontSize: 18}}>{item?.quantity}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          incrementQuantity(item.id, item.quantity)
                        }
                        style={styles.circle}>
                        <Plus height={14} width={14} />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.amount}>
                      ${(item?.quantity * item?.variant.price).toFixed(2)}
                    </Text>
                  </View>
                  {/* </View> */}
                </View>
              </View>
            </Card>
          ))}
        {/* // UseRewardsContainer */}
        <View style={styles.container4}>
          <View style={styles.useRewards}>
            <CheckTick height={20} width={20} />
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Use Rewards</Text>
          </View>
          <Text style={styles.textColor}>Rewards balance: 0 </Text>
        </View>

        {/* // UseProductDetailCardComponent */}
        <ProductDetailCard
          tax={checkoutState?.totalTax}
          total={checkoutState?.totalPrice}
          subTotal={checkoutState?.subtotalPrice}
        />

        {/* // Button */}
        <View style={{height: 100, backgroundColor: 'white'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.cartButton}
            colors={['#41B87F', '#86B841']}>
            <TouchableOpacity
              onPress={() => Linking.openURL(checkoutState.webUrl)}>
              <Text style={styles.cartTouch}>Checkout</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  useRewards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 125,
  },
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartTouch: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  cartButton: {
    marginVertical: 5,
    borderRadius: 25,
    marginHorizontal: 30,
    height: 65,
    justifyContent: 'center',
  },
  imgInner: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    width: 75,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
  },
  container: {
    marginTop: 2,
    backgroundColor: 'white',
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  img: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -20,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // height: 100,
    width: '80%',
  },
  delete: {
    paddingTop: 20,
    paddingHorizontal: 10,
    height: 100,
    width: '100%',
  },
  price: {
    flexDirection: 'row',
    // height: 160,
    // width: '100%',
  },
  ProTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  button: {
    paddingHorizontal: 5,
    marginTop: -8,
    backgroundColor: '#EFEFEF',
    height: 30,
    borderRadius: 50,
    width: 110,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 27,
    width: 27,
    borderRadius: 15,
  },
  inner: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
    height: 30,
    textAlignVertical: 'center',
    marginTop: -5,
    marginRight: 10,
    color: '#66cc33',
  },
  container4: {
    alignItems: 'center',
    // backgroundColor: '#EFEFEF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    padding: 20,
  },
  textColor: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
