import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/core';

export default function Newsletter() {
  const navigation = useNavigation();
  const {params} = useRoute();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.firstContainer}>
        <ImageBackground
          source={require('../../../assets/NewsletterImage.jpg')}
          style={styles.imageStyle}>
          <Text style={styles.imageText}>
            No pride for some of us without liberaton for all of us
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.secondContainer}>
        <Text style={styles.subscribe}>SUBSCRIBE AND STAY MOTIVATED</Text>
        <View>
          <Text style={styles.inspireText}>
            Get inspired with personalized reports on your workout stats,
            special rewards from No Sugar Company, and victory stories.
          </Text>
          <Text style={styles.unSubscribe}>
            You can unsubscribe at any time.
          </Text>
          <Text style={styles.policyText}>
            See our Privacy Policy or Contact us for more info;
          </Text>
          <Text style={styles.Address}>
            599 Hurontario St, Suite #106, Mississauga ON, L5G4S1, Canada
          </Text>
        </View>
        <View style={{marginBottom: 40}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.cartButton}
            colors={['#41B87F', '#86B841']}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WelcomeScreen', {
                  tokenData: params?.tokenData,
                })
              }>
              <Text style={styles.cartTouch}>
                Yes, I agree to receive e-mails
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.alignText}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('WelcomeScreen', {
                  tokenData: params?.tokenData,
                })
              }>
              {/* onPress={() => {
                navigation.navigate('Register');
              }}> */}
              <Text style={styles.textStyle}>Not Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Address: {
    textAlign: 'center',
    color: 'grey',
    marginHorizontal: 10,
  },
  policyText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'grey',
    marginHorizontal: 5,
  },
  unSubscribe: {
    marginVertical: 10,
    textAlign: 'center',
    color: 'grey',
    fontWeight: 'bold',
  },
  inspireText: {
    marginHorizontal: 20,
    fontSize: 18,
    color: 'grey',
    marginTop: 10,
    textAlign: 'center',
  },
  subscribe: {
    marginHorizontal: 20,
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 20,
    paddingHorizontal: 20,
    lineHeight: 35,
    textAlign: 'center',
  },
  imageStyle: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  alignText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
  cartTouch: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  cartButton: {
    marginVertical: 5,
    borderRadius: 30,
    marginHorizontal: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
  },
  firstContainer: {
    flex: 0.5,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
});
