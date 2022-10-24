import React from 'react';
import PackageSVG from '../../../../assets/package.svg';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import ProductDetailCard from './components/ProductCard';
import LinearGradient from 'react-native-linear-gradient';
import OrderDetailsCard from './components/OrderCard';
import { PlaceOrderApi } from '../../NetworkRequest';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

export default function OrderDetails() {

  const navigation = useNavigation();
  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <View style={styles.container}>
          <View style={styles.circle}>
            <PackageSVG height={30} width={30} />
          </View>
          <View style={{marginRight: 60, paddingVertical: 8}}>
            <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}>
              Package Delivered
            </Text>
            <Text style={{color: 'white', marginTop: 5}}>
              You earn 20 rewards
            </Text>
          </View>
        </View>
        <View style={styles.container2}>
          <View>
            <Text style={styles.title}>Order Details</Text>
            <View style={[styles.sideBySide]}>
              <Text style={styles.textColor}>Order Reference</Text>
              <Text style={styles.textColor2}>PKG678574858</Text>
            </View>
            <View style={styles.sideBySide}>
              <Text style={styles.textColor}>Status</Text>
              <Text style={{color: '#72B852'}}>Delivered</Text>
            </View>
            <View style={styles.sideBySide}>
              <Text style={styles.textColor}>Placed On</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textColor}>11 Jun 2020 </Text>
                <Text style={styles.textColor2}>05:00 PM</Text>
              </View>
            </View>
            <View style={{paddingHorizontal: 20, marginVertical: 20}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Shipping Address
              </Text>
              <Text style={styles.shipText}>+75 1258454 52858</Text>
              <Text style={styles.shipText}>
                469 Woodridge Town, Winter Street NY
              </Text>
            </View>
            <View style={{height: 5, backgroundColor: '#EFEFEF'}}></View>
            <View style={styles.container3}>
              <Text style={styles.title}>Order Details</Text>
            </View>

            <OrderDetailsCard />

            <View style={styles.container4}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Payment Method
              </Text>
              <Text style={styles.textColor}>Credit Card</Text>
            </View>
          </View>
        </View>

        <ProductDetailCard />

          {/* // Button */}
        <View style={{height: 100, backgroundColor: 'white'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.cartButton}
            colors={['#41B87F', '#86B841']}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Thank You');
              }}>
              <Text style={styles.cartTouch}>Email Invoice</Text>
            </TouchableOpacity>
          </LinearGradient>
          </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 180,
    width: '100%',
    backgroundColor: '#3db874',
    padding: 30,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 70,
    width: 70,
    borderRadius: 50,
    elevation: 10,
  },
  packageText: {
    color: 'white',
  },
  container2: {
    backgroundColor: 'white',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    marginTop: -50,
  },

  sideBySide: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textColor: {
    color: 'grey',
    fontSize: 16,
  },
  textColor2: {
    fontSize: 'bold',
    fontSize: 16,
  },
  shipText: {
    color: 'grey',
    marginTop: 5,
  },
  container3: {
    height: 50,
    backgroundColor: 'white',
    marginTop: 10,
  },
  container4: {
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    padding: 20,
  },
  title4: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
  }
});
