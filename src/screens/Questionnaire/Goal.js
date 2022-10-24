import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card, ProgressBar} from 'react-native-paper';
import WeightLoss from '../../../assets/general/weightloss.svg';
import LifeStyle from '../../../assets/general/lifestyle.svg';
import GainWeight from '../../../assets/general/gainweight.svg';
let height = Dimensions.get('screen').height;

const Goals = () => {
  const navigation = useNavigation();
  const [options, setOptions] = useState(null);

  return (
    <View style={styles.mainContainer}>
      <ProgressBar
        style={styles.container}
        // indeterminate
        progress={0.111}
        color={'#66cc33'}
      />
      <View style={styles.outOfContainer}>
        <Text style={styles.textSkip}> 1 out of 9 </Text>

        <TouchableOpacity
          onPress={() => {
            // setOptions(1);
            navigation.navigate('Activities', {
              ans: [
                {
                  q_uuid: '39dd9bee-e553-4c36-aee2-105f5c34302b',
                  answer: '',
                },
              ],
            });
          }}>
          <Text style={[styles.textSkip, {color: 'gray'}]}> Skip </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.goalText}>Your Goal?</Text>

      <View>
        <Card
          onPress={() => {
            setOptions(1);
            navigation.navigate('WeightLoss', {
              ans: [
                {
                  q_uuid: '39dd9bee-e553-4c36-aee2-105f5c34302b',
                  answer: 'Loose Weight',
                },
              ],
            });
          }}
          style={[styles.cardContainer, {borderWidth: options === 1 ? 1 : 0}]}>
          <View style={{flexDirection: 'row', marginTop: 0}}>
            <View style={styles.svgBackground}>
              <WeightLoss height={40} width={40} />
            </View>

            <Text style={styles.textOption}>Loose Weight</Text>
          </View>
        </Card>

        {/* <Card
          onPress={() => setOptions(2)}
          style={[styles.cardContainer, {borderWidth: options === 2 ? 1 : 0}]}>
          <View style={{flexDirection: 'row', marginTop: 0}}>
            <View style={[styles.svgBackground, {backgroundColor: '#f2ad05'}]}>
              <Energy height={40} width={40} />
            </View>

            <Text style={styles.textOption}>Gain Energy</Text>
          </View>
        </Card> */}
        <Card
          onPress={() => {
            setOptions(2);
            navigation.navigate('GainWeight', {
              ans: [
                {
                  q_uuid: '39dd9bee-e553-4c36-aee2-105f5c34302b',
                  answer: 'Gain Weight',
                },
              ],
            });
          }}
          style={[styles.cardContainer, {borderWidth: options === 2 ? 1 : 0}]}>
          <View style={{flexDirection: 'row', marginTop: 0}}>
            <View style={styles.svgBackground}>
              <GainWeight height={40} width={40} />
            </View>

            <Text style={styles.textOption}>Gain Weight</Text>
          </View>
        </Card>

        <Card
          onPress={() => {
            setOptions(3);
            navigation.navigate('Activities', {
              ans: [
                {
                  q_uuid: '39dd9bee-e553-4c36-aee2-105f5c34302b',
                  answer: 'Healthier lifestyle',
                },
              ],
            });
          }}
          style={[styles.cardContainer, {borderWidth: options === 3 ? 1 : 0}]}>
          <View style={{flexDirection: 'row', marginTop: 0}}>
            <View style={[styles.svgBackground]}>
              <LifeStyle height={40} width={40} />
            </View>

            <Text style={styles.textOption}>Healthier Lifestyle</Text>
          </View>
        </Card>
      </View>
      {/* <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.nextButton}
          colors={['#41B87F', '#86B841']}>
          <TouchableOpacity onPress={() => navigation.navigate('ActiveScreen')}>
            <Text style={styles.nextTouch}>Next</Text>
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity onPress={() => navigation.navigate('HeightScreen')}>
          <Text style={styles.backTouch}>Back</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  outOfContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.06,
  },
  container: {
    height: 20,
    borderRadius: 10,
    // width: width - 150,
    marginTop: height * 0.03,
    marginBottom: 20,
  },
  nextTouch: {color: 'white', fontWeight: 'bold', textAlign: 'center'},
  backTouch: {color: 'black', fontWeight: 'bold', textAlign: 'center'},
  textSelect: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  svgBackground: {
    backgroundColor: '#66cc33',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardContainer: {
    height: 80,
    marginHorizontal: 10,
    // marginVertical: height * 0.03,
    marginVertical: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingLeft: 10,
    alignContent: 'center',
    flexDirection: 'column',
    borderColor: '#66cc33',
  },
  textSkip: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: -3,
  },
  textOption: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    alignSelf: 'center',
    // color: 'gray',
    width: '50%',
  },
  goalText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: height * 0.03,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    // justifyContent: 'space-between',
  },
});

export default Goals;
