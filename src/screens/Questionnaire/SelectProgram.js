import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Card, ProgressBar} from 'react-native-paper';
import WW from '../../../assets/general/WeightWatchers.svg';
import NutriSystem from '../../../assets/general/Nutrisystem.svg';
import Jenny from '../../../assets/general/Jenny.svg';
import Other from '../../../assets/general/Other.svg';
import None from '../../../assets/none.svg';
import {useNavigation, useRoute} from '@react-navigation/core';

let height = Dimensions.get('screen').height;

const Program = () => {
  const navigation = useNavigation();
  const [options, setOptions] = useState(0);
  const {params} = useRoute();

  const goto = val => {
    navigation.navigate('Fitness Tracker', {
      ans: [
        ...params?.ans,
        {
          q_uuid: '71666771-333e-43aa-b506-05cd3a431f8d',
          answer: val,
        },
      ],
    });
  };
  return (
    <ScrollView style={styles.mainContainer}>
      <ProgressBar
        style={styles.progressBarStyle}
        // indeterminate
        progress={0.667}
        color={'#66cc33'}
      />
      <View style={styles.container}>
        <Text style={styles.textSkip}> 6 out of 9 </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Fitness Tracker', {
              ans: [
                ...params?.ans,
                {
                  q_uuid: '71666771-333e-43aa-b506-05cd3a431f8d',
                  answer: '',
                },
              ],
            });
          }}>
          <Text style={[styles.textSkip, {color: 'gray'}]}> Skip </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.goalText}>
          Which of the following weight loss programs have you used in the past
          12 months?
        </Text>
        <View>
          <Card
            onPress={() => {
              setOptions(1);
              goto('WW (Weight Watchers)');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 2 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <View style={{backgroundColor: '#000585', borderRadius: 20}}>
                <WW width={height * 0.08} height={height * 0.08} />
              </View>
              <Text style={styles.textOption}>WW (Weight Watchers)</Text>
            </View>
          </Card>

          <Card
            onPress={() => {
              setOptions(2);
              goto('Nutrisystem');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 2 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <View style={{backgroundColor: '#70B33E', borderRadius: 20}}>
                <NutriSystem width={height * 0.08} height={height * 0.08} />
              </View>
              <Text style={styles.textOption}>Nutrisystem</Text>
            </View>
          </Card>

          <Card
            onPress={() => {
              setOptions(3);
              goto('Jenny Craig');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 3 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <View style={{backgroundColor: '#0080C4', borderRadius: 20}}>
                <Jenny width={height * 0.08} height={height * 0.08} />
              </View>
              <Text style={styles.textOption}>Jenny Craig</Text>
            </View>
          </Card>

          <Card
            onPress={() => {
              setOptions(4);
              goto('None');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 4 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.svgBackground}>
                <None width={height * 0.08} height={height * 0.08} />
              </View>
              <Text style={styles.textOption}>None</Text>
            </View>
          </Card>

          <Card
            onPress={() => {
              setOptions(5);
              goto('Other');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 5 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <View style={{backgroundColor: '#e69007', borderRadius: 20}}>
                <Other width={height * 0.08} height={height * 0.08} />
              </View>
              <Text style={styles.textOption}>Other</Text>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  other: {
    backgroundColor: '#e69007',
    borderRadius: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.05,
  },
  svgBackground: {
    backgroundColor: '#dee0e3',
    width: height * 0.08,
    height: height * 0.08,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSkip: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: -3,
    marginHorizontal: 10,
  },
  progressBarStyle: {
    height: 20,
    borderRadius: 10,
    marginTop: height * 0.03,
    marginBottom: 20,
  },
  nextTouch: {color: 'white', fontWeight: 'bold', textAlign: 'center'},
  backTouch: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  labelText: {
    margin: 10,
    marginBottom: 5,
    fontWeight: 'bold',
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
  textSelect: {},
  nextButton: {
    marginVertical: 10,

    borderRadius: 25,
    marginHorizontal: 10,
    height: 60,
    justifyContent: 'center',
  },
  cardContainer: {
    height: height * 0.09,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 20,
    padding: 5,
    alignContent: 'center',
    flexDirection: 'row',
    borderColor: '#66cc33',
  },
  goalText: {
    fontSize: height * 0.025,
    fontWeight: '700',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  textOption: {
    fontSize: height * 0.02,
    fontWeight: '700',
    marginHorizontal: 20,
    alignSelf: 'center',
    width: '50%',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: height * 0.03,
    // justifyContent: 'space-between',
  },
});

export default Program;
