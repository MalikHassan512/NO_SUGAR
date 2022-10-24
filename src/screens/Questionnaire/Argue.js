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
import Morning from '../../../assets/CravingTime/Morning.svg';
import Afternoon from '../../../assets/CravingTime/Afternoon.svg';
import Evening from '../../../assets/CravingTime/Evening.svg';
import Night from '../../../assets/CravingTime/LateNight.svg';
import {useNavigation, useRoute} from '@react-navigation/core';

let height = Dimensions.get('screen').height;

const GrabSnack = () => {
  const navigation = useNavigation();
  const [options, setOptions] = useState(0);
  const {params} = useRoute();

  const goto = val => {
    navigation.navigate('Training Program', {
      ans: [
        ...params?.ans,
        {
          q_uuid: '7996fabb-a4f0-4b52-8a40-68a6cd91fbfc',
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
        progress={0.55}
        color={'#66cc33'}
      />
      <View style={styles.container}>
        <Text style={styles.textSkip}> 5 out of 9 </Text>

        <TouchableOpacity
          onPress={() => {
            // setOptions(1);
            navigation.navigate('Training Program', {
              ans: [
                ...params?.ans,
                {
                  q_uuid: '7996fabb-a4f0-4b52-8a40-68a6cd91fbfc',
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
          When do you typically feel an urge to grab a snack?
        </Text>
        <View>
          <Card
            onPress={() => {
              setOptions(1);
              goto('Mornings');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 1 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Morning
                // style={{borderRadius: 70}}
                width={height * 0.08}
                height={height * 0.08}
              />

              <Text style={styles.textOption}>Mornings</Text>
            </View>
          </Card>

          <Card
            onPress={() => {
              setOptions(2);
              goto('Afternoon');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 2 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Afternoon
                // style={{borderRadius: 70}}
                width={height * 0.08}
                height={height * 0.08}
              />

              <Text style={styles.textOption}>Afternoon</Text>
            </View>
          </Card>

          <Card
            onPress={() => {
              setOptions(3);
              goto('Evenings');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 3 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Evening
                // style={{backgroundColor: '#141645', borderRadius: 20}}
                width={height * 0.08}
                height={height * 0.08}
              />

              <Text style={styles.textOption}>Evenings</Text>
            </View>
          </Card>
          <Card
            onPress={() => {
              setOptions(4);
              goto('Late at night');
            }}
            style={[
              styles.cardContainer,
              {borderWidth: options === 4 ? 1 : 0},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Night
                // style={{backgroundColor: '#0b0c21', borderRadius: 20}}
                width={height * 0.08}
                height={height * 0.08}
              />

              <Text style={styles.textOption}>Late at night</Text>
            </View>
          </Card>
          {/* <Card
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
          </Card> */}
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

export default GrabSnack;
