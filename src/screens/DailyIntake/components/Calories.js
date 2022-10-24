import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import GlassSvg from '../../../../assets/carbs.svg';
import GradientButton from '../../../components/GradientBotton';
import {useNavigation, useRoute} from '@react-navigation/core';
import {postData, patchData} from '../../NetworkRequest';
import {getGoalValue} from '../../../redux/actions/goalAction';

const Calories = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState(1000);
  const token = useSelector(state => state?.auth?.token);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {params} = useRoute();

  const addSleep = async () => {
    setIsLoading(true);
    try {
      params?.code === 'goal'
        ? await patchData(token, 'goal/', {
            calories: amount,

            goal_type: 'Burn',
          })
        : await postData(token, 'user-progress/', {
            uuid: '14627acf-accf-4072-acd7-f629dc06b8b7',
            code: 'Sleep',
            quantity: amount,
          });
      navigation.goBack();
      dispatch(getGoalValue(token));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles?.mainContainer}>
      <Text style={styles.text}>
        {params?.code === 'goal'
          ? 'How many calories do you want to consume everyday? '
          : 'How much calories did you took?'}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 20,
          justifyContent: 'center',
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 72}}>{amount}</Text>
        <Text style={styles.hour}>Kcal</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <GlassSvg width={150} height={150} />
      </View>
      <View style={styles.buttonContainer}>
        <GradientButton
          onSubmit={() => (amount > 1 ? setAmount(amount - 100) : null)}
          borderRadius={5}
          title="- "
        />
        <Text style={styles.counterText}>{amount}</Text>
        <GradientButton
          onSubmit={() => setAmount(amount + 100)}
          borderRadius={5}
          title="+ "
        />
      </View>
      <GradientButton
        isLoading={isLoading}
        onSubmit={() => {
          addSleep();
        }}
        height={60}
        borderRadius={35}
        title={params?.code === 'goal' ? 'Save' : 'Add'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hour: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginLeft: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 40,
    justifyContent: 'space-evenly',
  },
  counterText: {fontSize: 20, alignSelf: 'center', fontWeight: '600'},
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 20,
  },
  text: {
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default Calories;
