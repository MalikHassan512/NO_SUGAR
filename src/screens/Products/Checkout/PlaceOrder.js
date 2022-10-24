import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ProductDetailCard from '../Orders/components/ProductCard';
import LinearGradient from 'react-native-linear-gradient';
import Arrow from '../../../../assets/downarrow.svg';
import {useNavigation, useRoute} from '@react-navigation/core';

export default function PlaceOrder() {
  const navigation = useNavigation();
  const {params} = useRoute();

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {/* // AddressContainer */}
        <View style={styles.AddContainer}>
          <Text style={styles.Title}>Address</Text>
          <View style={styles.align}>
            <TextInput
              style={styles.TextContainer}
              placeholder={
                'Home: Flate A, Floor 3 House, New York '
              }></TextInput>
            <Arrow
              style={{marginVertical: 20, marginRight: 5}}
              height={15}
              width={15}
            />
          </View>
          <TouchableOpacity>
            <Text
              style={{marginTop: 10, color: '#74BD21'}}
              onPress={() => navigation.navigate('Add Address')}>
              Add New Address
            </Text>
          </TouchableOpacity>
        </View>

        {/* // PaymentMethodContainer */}
        <View style={styles.PaymentContainer}>
          <Text style={styles.Title}>Payment Method</Text>
          <Text style={{marginBottom: 5, marginTop: 10, fontWeight: 'bold'}}>
            Card Number
          </Text>
          <TextInput
            style={styles.TextContainer1}
            maxLength={16}
            keyboardType={'numeric'}
            placeholder={'1234  |  5678  |  9126  |  5555'}></TextInput>
          <View style={styles.SideBySide}>
            <View>
              <Text style={styles.TextStyle}>Exp Date</Text>
              <TextInput
                maxLength={7}
                keyboardType={'numbers-and-punctuation'}
                placeholder={'06 / 2024'}
                style={styles.ExpContainer}></TextInput>
            </View>
            <View>
              <Text style={styles.TextStyle}>cvv</Text>
              <TextInput
                maxLength={3}
                keyboardType={'numeric'}
                placeholder="..."
                style={styles.ExpContainer}></TextInput>
            </View>
          </View>
          <Text style={styles.TextStyle}>Card holder's Name</Text>
          <TextInput
            style={styles.TextContainer1}
            maxLength={30}
            autoCapitalize={'characters'}
            placeholder={'Denzel Washington'}></TextInput>
        </View>

        {/* // UseProductDetailCardComponent */}
        <ProductDetailCard total={params?.total} />

        {/* // Button */}
        <View style={{height: 100, backgroundColor: 'white'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.cartButton}
            colors={['#41B87F', '#86B841']}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Order Details');
              }}>
              <Text style={styles.cartTouch}>Place Order</Text>
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
  AddContainer: {
    height: 180,
    width: 'auto',
    backgroundColor: '#EFEFEF',
    borderRadius: 30,
    margin: 10,
    padding: 20,
  },
  Title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  TextContainer: {
    paddingVertical: 10,
    color: 'grey',
    fontSize: 14,
  },
  TextContainer1: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 52,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  align: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 52,
    borderRadius: 50,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  PaymentContainer: {
    height: 375,
    width: 'auto',
    backgroundColor: '#EFEFEF',
    borderRadius: 30,
    margin: 10,
    padding: 20,
  },
  ExpContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 52,
    width: 155,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  SideBySide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextStyle: {
    marginTop: 15,
    fontWeight: 'bold',
  },
});
