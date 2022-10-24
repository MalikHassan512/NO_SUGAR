import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card} from 'react-native-paper';
import {logIn} from '../../redux/actions/authActions';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/core';

let height = Dimensions.get('screen').height;
let width = Dimensions.get('screen').width;

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {params} = useRoute();
  return (
    <ScrollView style={styles.mainContainer}>
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

      <View>
        <Card style={styles.loginView}>
          <Text style={styles.loginText}>Welcome to the</Text>
          <Text style={styles.loginText}>NO SUGAR IN ME App!</Text>

          <View>
            <Text style={styles.orText}>
              We are committed to changing the way people, by helping them
              eliminate sugar from their diet. One snack, one meal, one craving
              at a time
            </Text>
            <Text style={styles.lastText}>
              All we need is 5 min a day, so let's get started in this journey.
            </Text>
          </View>
          <View>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.loginButton}
              colors={['#41B87F', '#86B841']}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TutorialScreen', {
                    tokenData: params?.tokenData,
                  })
                }>
                <Text style={styles.loginTouch}>Let's get started</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginAccount: {
    color: '#41B87F',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  lastText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 30,
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  loginImage: {
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 20,
    width: 300,

    height: height * 0.2,
  },

  ribbon: {
    // alignSelf: 'flex-end',
    width: 100,
    position: 'absolute',
    right: 40,
    top: Platform.OS === 'ios' ? 25 : 0,
    height: 100,
  },
  loginTouch: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  orText: {
    color: '#868686',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 10,
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },

  mainContainer: {
    backgroundColor: '#41B87F',
    // marginBottom: 60,
    flex: 1,
  },
  loginView: {
    // marginHorizontal: 10,
    // backgroundColor: 'white',
    // justifyContent: 'space-evenly',
    borderRadius: 30,
    minHeight: height * 0.5,
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.035,
    paddingVertical: height * 0.035,
  },
  loginText: {
    // marginTop: height * 0.04,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 22,
    marginHorizontal: 10,
  },
  loginButton: {
    marginVertical: height * 0.05,
    borderRadius: 25,
    marginHorizontal: 20,
    height: 60,
    justifyContent: 'center',
  },
  inputContainer: {
    marginVertical: 15,
  },

  welcomeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 40,
  },
  textContainer: {
    marginTop: height * 0.1,
    alignItems: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textDecorationStyle: 'dotted',
    fontSize: 48,
  },
});
export default WelcomeScreen;
