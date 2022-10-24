import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {Card} from 'react-native-paper';
import {logIn} from '../../redux/actions/authActions';
import {useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/core';
import AppIntroSlider from 'react-native-app-intro-slider';
let height = Dimensions.get('screen').height;
let width = Dimensions.get('screen').width;
const slides = [
  {
    key: 1,

    image: require('../../../assets/introScreen/1.png'),
  },
  {
    key: 2,
    image: require('../../../assets/introScreen/2.jpeg'),
  },
  {
    key: 3,

    image: require('../../../assets/introScreen/3.jpeg'),
  },
  {
    key: 4,

    image: require('../../../assets/introScreen/4.jpeg'),
  },
  {
    key: 5,

    image: require('../../../assets/introScreen/5.jpeg'),
  },
  {
    key: 6,

    image: require('../../../assets/introScreen/6.jpeg'),
  },
  {
    key: 7,

    image: require('../../../assets/introScreen/7.jpeg'),
  },
  {
    key: 8,

    image: require('../../../assets/introScreen/8.png'),
  },
  {
    key: 9,

    image: require('../../../assets/introScreen/9.png'),
  },
  {
    key: 10,

    image: require('../../../assets/introScreen/10.jpeg'),
  },
  {
    key: 11,

    image: require('../../../assets/introScreen/11.jpeg'),
  },
  {
    key: 12,

    image: require('../../../assets/introScreen/12.jpeg'),
  },
  {
    key: 13,

    image: require('../../../assets/introScreen/13.jpeg'),
  },
];
const TutorialScreen = () => {
  const dispatch = useDispatch();
  const {params} = useRoute();
  const RenderItem = ({item}) => {
    return (
      <View>
        <ImageBackground
          style={{width: '100%', height: '100%'}}
          width={width}
          resizeMode="stretch"
          source={item.image}
        />
      </View>
    );
  };
  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    dispatch(logIn(params?.tokenData));
  };

  return (
    <AppIntroSlider
      showSkipButton
      renderItem={RenderItem}
      data={slides}
      onSkip={onDone}
      onDone={onDone}
    />
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
export default TutorialScreen;
