import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card, ProgressBar} from 'react-native-paper';
import Coach from '../../../assets/coach.svg';
import MoveaLittle from '../../../assets/movealittle.svg';
import MoveLike from '../../../assets/movelike.svg';
import {useNavigation, useRoute} from '@react-navigation/core';

let height = Dimensions.get('screen').height;

const Activities = () => {
  const navigation = useNavigation();
  const [options, setOptions] = useState(0);
  const {params} = useRoute();

  const goto = val => {
    navigation.navigate('DietScreen', {
      ans: [
        ...params?.ans,
        {
          q_uuid: '0fefd3ac-ffc8-404e-98ba-27452bcdb0a8',
          answer: val,
        },
      ],
    });
  };
  return (
    <View style={styles.mainContainer}>
      <ProgressBar
        style={styles.progressBarStyle}
        // indeterminate
        progress={0.33}
        color={'#66cc33'}
      />
      <View style={styles.container}>
        <Text style={styles.textSkip}> 3 out of 9 </Text>

        <TouchableOpacity
          onPress={() => {
            // setOptions(1);
            navigation.navigate('DietScreen', {
              ans: [
                ...params?.ans,
                {
                  q_uuid: '0fefd3ac-ffc8-404e-98ba-27452bcdb0a8',
                  answer: '',
                },
              ],
            });
          }}>
          <Text style={[styles.textSkip, {color: 'gray'}]}> Skip </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.goalText}>How active are you?</Text>
      <View>
        <Card
          onPress={() => {
            setOptions(1);
            goto('Couch Potato');
          }}
          style={[styles.cardContainer, {borderWidth: options === 1 ? 1 : 0}]}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.svgBackground}>
              <Coach height={40} width={40} />
            </View>

            <Text style={styles.textOption}>Couch Potato </Text>
          </View>
        </Card>
        <Card
          onPress={() => {
            setOptions(2);
            goto('Move a Little');
          }}
          style={[styles.cardContainer, {borderWidth: options === 2 ? 1 : 0}]}>
          <View style={{flexDirection: 'row'}}>
            {/* <Light /> */}
            <View style={[styles.svgBackground, {backgroundColor: '#10c6c6'}]}>
              <MoveaLittle height={40} width={40} />
            </View>
            <Text style={styles.textOption}>Move a Little</Text>
          </View>
        </Card>
        {/* <Card
          onPress={() => {
            setOptions(3);
            goto();
          }}
          style={[styles.cardContainer, {borderWidth: options === 3 ? 1 : 0}]}>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.svgBackground, {backgroundColor: '#f2ad05'}]}>
              <NeedMotivitaion height={40} width={40} />
            </View>

            <Text style={styles.textOption}>I need motivation</Text>
          </View>
        </Card> */}
        <Card
          onPress={() => {
            setOptions(4);
            goto('I move like a pro athlete');
          }}
          style={[styles.cardContainer, {borderWidth: options === 4 ? 1 : 0}]}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={[styles.svgBackground, {backgroundColor: '#3a6ccd'}]}>
              <MoveLike height={40} width={40} />
            </View>

            <Text style={styles.textOption}>I move like a pro athlete </Text>
          </View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.06,
  },
  svgBackground: {
    backgroundColor: '#66cc33',
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSkip: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: -3,
  },
  progressBarStyle: {
    height: 20,
    borderRadius: 10,
    marginTop: height * 0.03,
    marginBottom: 20,
  },

  cardContainer: {
    height: 80,
    margin: 5,
    marginVertical: 10,
    borderRadius: 20,
    padding: 5,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#66cc33',
  },
  goalText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: height * 0.03,
  },
  textOption: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    alignSelf: 'center',
    width: '70%',
    // backgroundColor: 'red'

    // width: '50%',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    // justifyContent: 'space-between',
  },
});

export default Activities;
