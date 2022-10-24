import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Delete from '../../../../assets/Delete.svg';
import Plus from '../../../../assets/plus.svg';
import Minus from '../../../../assets/minus.svg';
import ProductDetailCard from '../Orders/components/ProductCard';
import LinearGradient from 'react-native-linear-gradient';
import CheckTick from '../../../../assets/checktick.svg';
import {useNavigation} from '@react-navigation/core';

export default function AddToCart() {
  const navigation = useNavigation();

  const sum = array => {
    let tot = 0;

    array.forEach(element => {
      let mul = element?.quan ? element?.quan - 1 : 1;
      tot = tot + element?.price * mul;
    });
    return tot;
  };

  const data = useSelector(state => state?.cart?.items);
  const [quantity, setQuantity] = useState([]);
  const [count, setCount] = useState(1);

  // console.log('myTotal');
  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  };
  return (
    <ScrollView>
      <View style={{flex: 1, backgroundColor: '#EFEFEF'}}>
        {/* ProductCard */}
        {data?.map(item => (
          <View key={item?.id} style={styles.container}>
            <View style={styles.img}>
              <View style={styles.imgInner}>
                <Image
                  source={
                    item?.images[0]?.src
                      ? {uri: item?.images[0]?.src}
                      : require('../../../../assets/general/item_placeholder.png')
                  }
                  style={{height: 60, width: 60}}
                />
              </View>
            </View>
            <View style={{flex: 0.75}}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.ProTitle} numberOfLines={2}>
                      {item?.title}
                    </Text>
                    <Text style={{fontSize: 16, color: 'grey'}}>
                      Regular Price
                    </Text>
                  </View>
                </View>
                <View style={styles.delete}>
                  <Delete
                    style={{
                      marginTop: 5,
                    }}
                    height={25}
                    width={25}
                  />
                </View>
              </View>
              <View style={styles.price}>
                <View style={styles.inner}>
                  <View style={styles.button}>
                    <TouchableOpacity
                      onPress={() => {
                        quantity.filter(it => it?.id === item?.id)[
                          quantity.filter(it => it?.id === item?.id).length - 1
                        ]?.quan === 1 || quantity.length === 0
                          ? null
                          : setQuantity(
                              [
                                ...quantity,
                                {
                                  id: item?.id,
                                  price: parseFloat(item?.variants[0]?.price),
                                  quan:
                                    quantity.length === 0 ||
                                    quantity.filter(it => it?.id === item?.id)
                                      .length === 0
                                      ? 1
                                      : quantity.filter(
                                          it => it?.id === item?.id,
                                        )[
                                          quantity.filter(
                                            it => it?.id === item?.id,
                                          ).length - 1
                                        ]?.quan - 1,
                                },
                              ]
                                .slice()
                                .reverse()
                                .filter(
                                  (v, i, a) =>
                                    a.findIndex(t => t.id === v.id) === i,
                                )
                                .reverse(),
                            );
                      }}
                      style={styles.circle}>
                      <Minus height={14} width={14} />
                    </TouchableOpacity>
                    <Text style={{fontSize: 18}}>
                      {quantity.length === 0 ||
                      quantity.filter(it => it.id === item?.id).length === 0
                        ? 1
                        : quantity.filter(it => it.id === item?.id)[0]?.quan}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setQuantity(
                          [
                            ...quantity,
                            {
                              id: item?.id,
                              price: parseFloat(item?.variants[0]?.price),
                              quan:
                                quantity.length === 0 ||
                                quantity.filter(it => it?.id === item?.id)
                                  .length === 0
                                  ? 2
                                  : quantity.filter(it => it?.id === item?.id)[
                                      quantity.filter(it => it?.id === item?.id)
                                        .length - 1
                                    ]?.quan + 1,
                            },
                          ]
                            .slice()
                            .reverse()
                            .filter(
                              (v, i, a) =>
                                a.findIndex(t => t.id === v.id) === i,
                            )
                            .reverse(),
                        );
                      }}
                      style={styles.circle}>
                      <Plus height={14} width={14} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.amount}>
                    $
                    {parseFloat(
                      item?.variants[0]?.price *
                        quantity.filter(it => it?.id === item?.id)[
                          quantity.filter(it => it?.id === item?.id).length - 1
                        ]?.quan || 1 * item?.variants[0]?.price,
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        {/* // UseRewardsContainer */}
        <View style={styles.container4}>
          <View style={styles.useRewards}>
            <CheckTick height={20} width={20} />
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Use Rewards</Text>
          </View>
          <Text style={styles.textColor}>Rewards balance: 120</Text>
        </View>

        {/* // UseProductDetailCardComponent */}
        <ProductDetailCard
          total={quantity?.length === 0 ? sum(data) : sum(data) + sum(quantity)}
        />

        {/* // Button */}
        <View style={{height: 100, backgroundColor: 'white'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.cartButton}
            colors={['#41B87F', '#86B841']}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Place Order', {
                  total: quantity?.length === 0 ? sum(data) : sum(quantity),
                });
              }}>
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
    height: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: 100,
    width: 240,
  },
  delete: {
    paddingTop: 20,
    paddingHorizontal: 10,
    height: 100,
    width: '100%',
  },
  price: {
    flexDirection: 'row',
    height: 160,
    width: '100%',
  },
  ProTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 5,
    backgroundColor: '#EFEFEF',
    height: 45,
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
    height: 35,
    width: 35,
    borderRadius: 50,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 40,
    textAlignVertical: 'center',
  },
  container4: {
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
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
