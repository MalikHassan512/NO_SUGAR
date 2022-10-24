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
import IOS from '../../../assets/ios health.svg';
import Garmin from '../../../assets/garmin.svg';
import Fitbit from '../../../assets/fitbit.svg';
import Withings from '../../../assets/withings.svg';
import Other from '../../../assets/general/Other.svg';
import {useNavigation, useRoute} from '@react-navigation/core';

let height = Dimensions.get('screen').height;
let width = Dimensions.get('screen').width;

const FitnessTracker = () => {
  const navigation = useNavigation();
  const [options, setOptions] = useState(0);
  const {params} = useRoute();

  const goto = val => {
    navigation.navigate('Register', {
      ans: [
        ...params?.ans,
        {
          q_uuid: '35538e88-8f0f-41df-8291-347c9293f573',
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
        progress={0.778}
        color={'#66cc33'}
      />
      <View style={styles.container}>
        <Text style={styles.textSkip}> 7 out of 9 </Text>

        <TouchableOpacity
          onPress={() => {
            // setOptions(1);
            navigation.navigate('Register', {
              ans: [
                ...params?.ans,
                {
                  q_uuid: '35538e88-8f0f-41df-8291-347c9293f573',
                  answer: '',
                },
              ],
            });
          }}>
          <Text style={[styles.textSkip, {color: 'gray'}]}> Skip </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.goalText}>What fitness trackers do you use?</Text>
        <View>
          <Card
            onPress={() => {
              setOptions(1);
              goto('IOS Health');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 1 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.iosHealth}>
                <IOS width={height * 0.05} height={height * 0.08} />
              </View>
              <Text style={styles.textOption}>IOS Health</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(2);
              goto('Garmin');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 2 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Garmin
                style={{borderRadius: 20}}
                width={height * 0.08}
                height={height * 0.08}
              />

              <Text style={styles.textOption}>Garmin</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(3);
              goto('Fitbit');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 3 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Fitbit
                style={{borderRadius: 20}}
                width={height * 0.08}
                height={height * 0.08}
              />

              <Text style={styles.textOption}>Fitbit</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(4);
              goto('Withings');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 4 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Withings
                style={{borderRadius: 20}}
                width={height * 0.08}
                height={height * 0.08}
              />

              <Text style={styles.textOption}>Withings</Text>
            </View>
          </Card>
          <TouchableOpacity>
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
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  iosHealth: {
    borderWidth: 0.2,

    borderRadius: 20,
    flexDirection: 'row-reverse',
    width: width * 0.17,
    paddingLeft: 5,
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
    fontSize: height * 0.03,
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

export default FitnessTracker;
