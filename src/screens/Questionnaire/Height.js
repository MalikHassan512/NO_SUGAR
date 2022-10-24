import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/core';
import ServiceRequests from '../../utils/ServiceRequests';

let height = Dimensions.get('screen').height;

const heightfnc = () => {
  const arr = [];
  for (let i = 10; i <= 100; i++) {
    arr.push(i);
  }
  return arr;
};
const weightkg = () => {
  const arr = [];
  for (let i = 30; i <= 200; i++) {
    arr.push(i);
  }
  return arr;
};
const weightLbs = () => {
  const arr = [];
  for (let i = 50; i <= 400; i++) {
    arr.push(i);
  }
  return arr;
};
const incharr = [
  2.0,
  2.1,
  2.2,
  2.3,
  2.4,
  2.5,
  2.6,
  2.7,
  2.8,
  2.9,
  '2.10',
  2.11,
  3.0,
  3.1,
  3.2,
  3.3,
  3.4,
  3.5,
  3.6,
  3.7,
  3.8,
  3.9,
  '3.10',
  3.11,
  4.0,
  4.1,
  4.2,
  4.3,
  4.4,
  4.5,
  4.6,
  4.7,
  4.8,
  4.9,
  '4.10',
  4.11,
  5.0,
  5.1,
  5.2,
  5.3,
  5.4,
  5.5,
  5.6,
  5.7,
  5.8,
  5.9,
  '5.10',
  5.11,
  6.0,
  6.1,
  6.2,
  6.3,
  6.4,
  6.5,
  6.6,
  6.7,
  6.8,
  6.9,
  '6.10',
  6.11,
  7.0,
  7.1,
  7.2,
  7.3,
  7.4,
  7.5,
  7.6,
  7.7,
  7.8,
  7.9,
  7.1,
  7.11,
  8,
];
const weightkgarr = weightkg();
const weightLbsarr = weightLbs();
const heightarr = heightfnc();
const HeightScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = useRoute();
  const [item, setItem] = useState('');
  const [weight, setweight] = useState('');
  const scrollViewRef = useRef();
  const scrollViewRef2 = useRef();
  const [heightButton, setHeightButton] = useState('IN');
  const [weightButton, setWeightButton] = useState('LBS');
  const heightArray = heightButton === 'CM' ? heightarr : incharr;
  const weightArray = weightButton === 'LBS' ? weightLbsarr : weightkgarr;

  const submitQuestions = async () => {
    const request = new ServiceRequests(params?.tokenData?.token);
    try {
      await request.post('question/', [
        ...params?.ans,
        {
          q_uuid: 'df44d246-928a-4427-9162-1a96a352a943',
          answer: item,
        },
        {
          q_uuid: '479b0539-7ebe-427c-a9b6-96b3f62ee737',
          answer: weight,
        },
      ]);
      navigation.navigate('NewsLetter', {
        tokenData: params?.tokenData,
      });
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <ProgressBar
          style={styles.progressBarStyle}
          // indeterminate
          progress={1}
          color={'#66cc33'}
        />
        <View style={styles.outOfContainer}>
          <Text style={styles.textSkip}> 9 out of 9 </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('WelcomeScreen', {
                tokenData: params?.tokenData,
              })
            }>
            <Text style={[styles.textSkip, {color: 'gray'}]}> </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.labelText}>Height </Text>
          <View style={styles.cmContainer}>
            {/* <Button> Cm</Button>
            <Button> inch</Button> */}
            <TouchableOpacity
              onPress={() => setHeightButton('CM')}
              style={{
                backgroundColor: heightButton === 'CM' ? '#66cc33' : null,
                width: 40,
                height: 30,
                borderRadius: 20,
              }}>
              <Text style={styles.cmText}>IN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setHeightButton('IN')}
              style={{
                backgroundColor: heightButton === 'IN' ? '#66cc33' : null,
                width: 40,
                height: 30,
                borderRadius: 20,
              }}>
              <Text style={styles.inText}>FT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef2}
          // onContentSizeChange={() =>
          //   scrollViewRef.current.scrollToEnd({animated: true})
          // }
          onContentSizeChange={(contentWidth, contentHeight) => {
            // _scrollToBottomY = contentHeight;
            scrollViewRef2.current.scrollTo({
              x: contentWidth * 0.5,
              y: 0,
              animated: true,
            });
          }}
          style={{
            marginVertical: 10,
            borderBottomWidth: 2,
            borderBottomColor: 'gray',
          }}>
          {heightArray.map((num, index) => (
            <TouchableOpacity onPress={() => setItem(num)} key={index}>
              <Text
                style={[
                  styles.ageNumber,
                  num === item ? {borderWidth: 1} : {borderWidth: 0},
                ]}>
                {num}
              </Text>
              <Text style={styles.barruler}>|</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.labelText}>Weight </Text>
          <View style={styles.lbsContainer}>
            {/* <Button> Cm</Button>
            <Button> inch</Button> */}
            <TouchableOpacity
              onPress={() => setWeightButton('LBS')}
              style={{
                backgroundColor: weightButton === 'LBS' ? '#66cc33' : null,
                width: 40,
                height: 30,
                borderRadius: 20,
              }}>
              <Text style={styles.lbsText}>LBS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setWeightButton('KG')}
              style={{
                backgroundColor: weightButton === 'KG' ? '#66cc33' : null,
                width: 40,
                height: 30,
                borderRadius: 20,
              }}>
              <Text style={styles.kgText}>KG</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <TextInput
          // placeholder="Password"
          keyboardType="numeric"
          style={styles.inputText}
        /> */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          // onContentSizeChange={() =>
          //   scrollViewRef.current.scrollToEnd({animated: true})
          // }
          onContentSizeChange={(contentWidth, contentHeight) => {
            // _scrollToBottomY = contentHeight;
            scrollViewRef.current.scrollTo({
              x:
                weightButton === 'KG'
                  ? contentWidth * 0.18
                  : contentWidth * 0.4,
              y: 0,
              animated: true,
            });
          }}
          style={styles.weightContainer}>
          {weightArray.map((num, index) => (
            <TouchableOpacity onPress={() => setweight(num)} key={index}>
              <Text
                style={[
                  styles.ageNumber,
                  num === weight ? {borderWidth: 1} : {borderWidth: 0},
                ]}>
                {num}
              </Text>
              <Text style={styles.barruler}>|</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.nextButton}
          colors={['#41B87F', '#86B841']}>
          <TouchableOpacity onPress={() => submitQuestions()}>
            <Text style={styles.nextTouch}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
        {/* <TouchableOpacity onPress={() => navigation.navigate('HeightScreenScreen')}>
          <Text style={styles.backTouch}>Back</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weightContainer: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
  kgText: {
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: '700',
  },
  lbsText: {
    textAlign: 'center',
    paddingTop: 5,
    marginRight: 5,
    width: 40,
    height: 30,
    fontWeight: '700',
    borderRadius: 10,
  },
  lbsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#66cc33',
  },
  inText: {
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: '700',
  },
  cmText: {
    textAlign: 'center',
    paddingTop: 5,
    marginRight: 5,
    width: 40,
    height: 30,
    fontWeight: '700',
    // borderWidth: 1,
    borderRadius: 10,
  },

  cmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#66cc33',
  },
  outOfContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.06,
  },
  progressBarStyle: {
    height: 20,
    borderRadius: 10,
    marginTop: height * 0.03,
    marginBottom: 20,
  },
  textSkip: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: -3,
  },
  nextTouch: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
  },
  backTouch: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  labelText: {
    marginHorizontal: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  ageNumber: {
    color: 'gray',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 25,
    height: 40,
    width: 40,
    borderRadius: 20,
    paddingTop: 7,
    textAlign: 'center',
    borderColor: '#66cc33',
  },
  barruler: {
    color: 'gray',
    fontSize: 14,
    // fontWeight: '700',
    marginHorizontal: 25,
    // height: 40,
    // width: 40,
    // borderRadius: 20,

    textAlign: 'center',
    borderColor: '#66cc33',
  },
  iconsStyle: {
    alignSelf: 'center',
    marginTop: -25,
    backgroundColor: '#66cc33',
    borderRadius: 15,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imageStyle: {
    backgroundColor: '#f2ad05',
    borderRadius: 50,
    height: 100,
  },

  mainContainer: {
    // marginBottom: 60,
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
    // paddingTop: 60,
  },

  nextButton: {
    marginVertical: 10,

    borderRadius: 25,
    marginHorizontal: 10,
    height: 60,
    justifyContent: 'center',
  },
  inputContainer: {
    marginVertical: height * 0.03,
  },

  inputText: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#e5e5e5',
    color: 'gray',
    paddingHorizontal: 15,
    fontSize: 13,
    fontWeight: '600',
    height: 40,
  },
});
export default HeightScreen;
