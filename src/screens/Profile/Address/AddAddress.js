import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export default function AddAddress() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Name</Text>
          <TextInput
            maxLength={30}
            autoCapitalize={'words'}
            style={styles.input}
            placeholder={'Kaiya Rhiel Madsen'}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Phone Number</Text>
          <TextInput
            maxLength={11}
            keyboardType={'numeric'}
            style={styles.input}
            placeholder={'+75 528485 758547'}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Flat, House, building no.</Text>
          <TextInput
            maxLength={3}
            keyboardType={'numeric'}
            style={styles.input}
            placeholder={'03'}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Address</Text>
          <TextInput
            maxLength={40}
            autoCapitalize={'words'}
            style={styles.input}
            placeholder={'House Vastral'}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>City</Text>
          <TextInput
            maxLength={32}
            autoCapitalize={'words'}
            style={styles.input}
            placeholder={'Melbourne'}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.text}>Address Type</Text>
          <TextInput
            textContentType={'fullStreetAddress'}
            style={styles.input}
            placeholder={'Home'}
          />
        </View>

        {/* // Button */}
        <View style={{height: 100, backgroundColor: 'white'}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.cartButton}
            colors={['#41B87F', '#86B841']}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Place Order');
              }}>
              <Text style={styles.cartTouch}>Save Changes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
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
  container: {
    // backgroundColor: 'red',
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    // backgroundColor: 'purple',
    height: 50,
    borderRadius: 20,
    borderColor: '#DFDFDF',
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 20,
    fontSize: 20,
    color: 'white',
    height: 65,
    marginHorizontal: 30,
    borderRadius: 50,
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
