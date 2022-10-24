import React from 'react';
import {View, StyleSheet, Dimensions, Image, Platform} from 'react-native';
let height = Dimensions.get('screen').height;
let width = Dimensions.get('screen').width;

import Logo from '../../../assets/No Sugar Green logo';

const SplashScreen = () => {
  return (
    <View style={styles.mainContainer}>
      {/* <Ribbon /> */}
      <View>
        <Image
          resizeMode="cover"
          height={100}
          width={100}
          style={styles.ribbon}
          source={require('../../../assets/ribbon.png')}
        />
        <Image
          resizeMode="contain"
          height={300}
          width={200}
          style={styles.loginImage}
          source={require('../../../assets/nosugarText.png')}
        />
      </View>
      <Logo  style={[styles.logoImage, {position: 'absolute', bottom: 50}]} height={100} width={150}/>
      {/* <Image
        resizeMode="contain"
        height={300}
        width={200}
        style={[styles.logoImage, {position: 'absolute', bottom: 50}]}
        source={require('../../../assets/Logo.png')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  loginImage: {
    alignSelf: 'center',
    marginTop: 60,
    borderRadius: 20,
    width: width,

    height: height * 0.5,
  },
  logoImage: {
    alignSelf: 'center',
    marginTop: 60,
    borderRadius: 20,
    width: width - 60,

    height: height * 0.2,
  },
  mainContainer: {
    backgroundColor: '#41B87F',
    // marginBottom: 60,
    flex: 1,
  },
  ribbon: {
    // alignSelf: 'flex-end',
    width: 100,
    position: 'absolute',
    right: 40,
    top: Platform.OS === 'ios' ? 25 : 0,
    height: 100,
  },
});
export default SplashScreen;
