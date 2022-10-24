import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import { PlaceOrderApi } from '../NetworkRequest';

export default function ThankYou() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      useAngle={true}
      angle={0}
      angleCenter={{x: 0.3, y: 0.7}}
      colors={['rgb(65, 184 , 127)', 'rgb(134, 184, 65)']}
      style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>Thank you!</Text>
        <Text style={{fontSize: 18, color: 'white'}}>
          Your order is successful.
        </Text>
      </View>
      <View style={styles.img}>
        <Image source={require('../../../assets/thankyouFrame.png')} />
      </View>
      <View style={styles.container2}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require('../../../assets/background.png')}>
          <View style={styles.badge}>
            <ImageBackground
              style={styles.pointsBadge}
              source={require('../../../assets/points.png')}>
              <Text style={styles.number}>300</Text>
              <Text style={styles.pointText}>Points</Text>
            </ImageBackground>
          </View>
          <View style={styles.points}>
            <Text style={{fontSize: 17}}>You have earned</Text>
            <Text style={{fontSize: 17}}>300 points</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text
            style={styles.button}
            onPress={() => navigation.navigate('HomeScreens')}>
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    color: 'white',
    height: 80,
    width: 'auto',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  img: {
    justifyContent: 'center',
    height: 300,
    width: 'auto',
    alignItems: 'center',
  },
  container2: {
    height: 150,
    width: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    marginHorizontal: 25,
    borderRadius: 50,
    height: 65,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: '42%',
  },
  pointsBadge: {
    backgroundColor: 'transparent',
    elevation: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    marginTop: -18,
  },
  points: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 140,
    width: '58%',
  },
  number: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
  },
  pointText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -5,
  },
  backgroundImage: {
    flexDirection: 'row',
    width: 320,
    height: 130,
  },
});
