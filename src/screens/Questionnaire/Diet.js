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
import {useNavigation, useRoute} from '@react-navigation/core';
import {Card, ProgressBar} from 'react-native-paper';
import Sadantary from '../../../assets/general/d1.svg';
import Light from '../../../assets/general/d2.svg';
import Modrate from '../../../assets/general/d3.svg';
import Very from '../../../assets/general/d4.svg';
import LowFat from '../../../assets/general/Low fat.svg';
import LowCarb from '../../../assets/general/Low Carbs.svg';
import Paleo from '../../../assets/general/Paleo.svg';
import None from '../../../assets/none.svg';
import Other from '../../../assets/general/Other.svg';

let height = Dimensions.get('screen').height;

const Diet = () => {
  const navigation = useNavigation();
  const [options, setOptions] = useState(0);
  const {params} = useRoute();

  const goto = val => {
    navigation.navigate('Grab Snack', {
      ans: [
        ...params?.ans,
        {
          q_uuid: 'b2f79ce8-89e3-4dff-b224-45edcf4b9390',
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
        progress={0.44}
        color={'#66cc33'}
      />
      <View style={styles.container}>
        <Text style={styles.textSkip}> 4 out of 9 </Text>

        <TouchableOpacity
          onPress={() => {
            // setOptions(1);
            navigation.navigate('Grab Snack', {
              ans: [
                ...params?.ans,
                {
                  q_uuid: 'b2f79ce8-89e3-4dff-b224-45edcf4b9390',
                  answer: '',
                },
              ],
            });
          }}>
          <Text style={[styles.textSkip, {color: 'gray'}]}> Skip </Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior="position">
        <Text style={styles.goalText}>Are you on a specialty diet?</Text>
        <View>
          <Card
            onPress={() => {
              setOptions(1);
              goto('Keto');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 1 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Modrate width={height * 0.08} height={height * 0.08} />

              <Text style={styles.textOption}>Keto</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(2);
              goto('Atkins');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 2 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Light width={height * 0.08} height={height * 0.08} />

              <Text style={styles.textOption}>Atkins</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(3);
              goto('Mediterranean');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 3 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Sadantary width={height * 0.08} height={height * 0.08} />

              <Text style={styles.textOption}>Mediterranean</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(4);
              goto('Plant Base');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 4 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Very width={height * 0.08} height={height * 0.08} />

              <Text style={styles.textOption}>Plant Base</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(5);
              goto('Low Fat');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 4 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <LowFat width={height * 0.08} height={height * 0.08} />

              <Text style={styles.textOption}>Low Fat</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(6);
              goto('Low Carb');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 4 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <LowCarb width={height * 0.08} height={height * 0.08} />

              <Text style={styles.textOption}>Low Carb</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(7);
              goto('Paleo');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 4 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Paleo
                borderRadius={40}
                width={height * 0.08}
                height={height * 0.08}
              />

              <Text style={styles.textOption}>Paleo</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(8);
              goto('Other');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 4 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Other
                style={{backgroundColor: '#e69007', borderRadius: 20}}
                width={height * 0.08}
                height={height * 0.08}
              />

              <Text style={styles.textOption}>Other</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(5);
              goto('None');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 5 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.svgBackground}>
                <None width={height * 0.08} height={height * 0.08} />
              </View>
              <Text style={styles.textOption}>None</Text>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

export default Diet;
