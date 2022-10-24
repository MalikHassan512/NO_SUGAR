import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Image, Dimensions, TouchableOpacity} from 'react-native';
import Products from '../../../screens/Products';
import AllProducts from '../../../screens/Products/AllProducts';
import ProductDetail from '../../../screens/Products/ProductDetail';
import AddToCart from '../../../screens/Products/Checkout/index';
import PlaceOrder from '../../../screens/Products/Checkout/PlaceOrder';
import ModalFlag from '../../../components/ModalFlag';
import LocationSvg from '../../../../assets/00location.svg';
import {useNavigation} from '@react-navigation/core';

const Stack = createNativeStackNavigator();
const width = Dimensions.get('window').width;
const ProductsScreen = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      {visible && (
        <ModalFlag
          modalVisible={visible}
          onRequestClose={() => setVisible(false)}
        />
      )}
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="Products"
          component={Products}
          options={{
            title: '',
            headerTitleAlign: 'center',
            headerRight: () => {
              return (
                <View>
                  <TouchableOpacity onPress={() => setVisible(true)}>
                    <LocationSvg height={32} width={32} />
                  </TouchableOpacity>
                </View>
              );
            },
            headerLeft: () => {
              return (
                <View
                  style={{
                    marginLeft: width * 0.3,
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation?.navigate('Home')}>
                    <Image
                      height={40}
                      width={60}
                      style={{height: 35, width: 100, marginBottom: 0}}
                      source={require('../../../../assets/nosugarTextGreen.png')}
                    />
                  </TouchableOpacity>
                </View>
              );
            },
          }}
        />
        <Stack.Screen
          name="AllProducts"
          component={AllProducts}
          options={{
            title: 'Products',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            title: 'Add to Cart',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="AddToCart"
          component={AddToCart}
          options={{
            title: 'Checkout',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Place Order"
          component={PlaceOrder}
          options={{
            title: 'Checkout',
            headerTitleAlign: 'center',
            // headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default ProductsScreen;
