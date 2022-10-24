import React, {useState} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/core';

// import {useNavigation } from

let height = Dimensions.get('screen').height;

const weightkg = () => {
  const arr = [];
  for (let i = 5; i < 200; i++) {
    arr.push(i);
  }
  return arr;
};
const weightlbs = () => {
  const arr = [];
  for (let i = 5; i < 200; i++) {
    arr.push(i);
  }
  return arr;
};
const weightArray = weightkg();
const lbsarr = weightlbs();

const WeightLoose = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [item, setItem] = useState(11);
  const {params} = useRoute();

  const [weightButton, setWeightButton] = useState('LBS');
  const weightarr = weightButton === 'LBS' ? lbsarr : weightArray;
  return (
    <View style={styles.mainContainer}>
      <ProgressBar
        style={styles.progressBarStyle}
        // indeterminate
        progress={0.22}
        color={'#66cc33'}
      />
      <View style={styles.skipContainer}>
        <Text style={styles.textSkip}> 2 out of 9 </Text>

        <TouchableOpacity
          onPress={() => {
            // setOptions(1);
            navigation.navigate('Activities', {
              ans: [
                ...params?.ans,
                {
                  q_uuid: '0f5d3dd2-d855-4178-bf53-c637d532afba',
                  answer: '',
                },
              ],
            });
          }}>
          <Text style={[styles.textSkip, {color: 'gray'}]}> Skip </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.goalText}>How much weight do you want to loose?</Text>
      <View style={styles.inputContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.labelText}>Weight </Text>
          <View style={styles.weightContainer}>
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
          style={styles.activityContainer}>
          {weightarr.map((num, index) => (
            <TouchableOpacity
              onPress={() => {
                setItem(num);
                navigation.navigate('Activities', {
                  ans: [
                    ...params?.ans,
                    {
                      q_uuid: '0f5d3dd2-d855-4178-bf53-c637d532afba',
                      answer: num,
                    },
                  ],
                });
              }}
              key={index}>
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
      {/* <TouchableOpacity onPress={() => navigation.navigate('EmailScreen')}>
        <Text style={styles.backTouch}>Back</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#66cc33',
  },
  kgText: {
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: '700',
  },
  skipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.06,
  },
  lbsText: {
    textAlign: 'center',
    paddingTop: 5,
    marginRight: 5,
    width: 40,
    height: 30,
    fontWeight: '700',
    // borderWidth: 1,
    borderRadius: 10,
  },
  progressBarStyle: {
    height: 20,
    borderRadius: 10,
    marginTop: height * 0.06,
    marginBottom: 20,
  },
  textSkip: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: -3,
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
  weightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#66cc33',
  },
  ageNumber: {
    color: '#66cc33',
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
    color: '#66cc33',
    fontSize: 14,
    // fontWeight: '700',
    marginHorizontal: 25,
    // height: 40,
    // width: 40,
    // borderRadius: 20,

    textAlign: 'center',
    borderColor: '#66cc33',
  },

  nContainer: {
    // marginBottom: 60,
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    // justifyContent: 'space-between',
    // paddingTop: 60,
  },
  goalText: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: height * 0.06,
  },

  inputContainer: {
    marginVertical: height * 0.06,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    // justifyContent: 'space-between',
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
export default WeightLoose;
