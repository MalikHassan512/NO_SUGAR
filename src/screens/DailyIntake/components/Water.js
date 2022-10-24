import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import GlassSvg from '../../../../assets/new/glassin.svg';
import GradientButton from '../../../components/GradientBotton';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {postData, patchData} from '../../NetworkRequest';
import {getGoalValue} from '../../../redux/actions/goalAction';

const WaterIntake = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {params} = useRoute();
  const [amount, setAmount] = useState(8);
  const token = useSelector(state => state?.auth?.token);
  const dispatch = useDispatch();

  const addWater = async () => {
    setIsLoading(true);
    try {
      params?.code === 'goal'
        ? await patchData(token, 'goal/', {
            water: amount,

            goal_type: 'Burn',
          })
        : await postData(token, 'user-progress/', {
            uuid: 'ac8dfc3f-609d-4d6c-9b34-8a5a6a258918 ',
            code: 'Water',
            quantity: amount,
          });
      navigation.goBack();
      dispatch(getGoalValue(token));
      // dispatch(
      //   params?.code === 'goal' ? getGoalValue(token) : getActivityValue(token),
      // );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles?.mainContainer}>
      <Text style={styles.text}>
        {params?.code === 'goal'
          ? 'How many glasses of water will you be taking everyday?'
          : 'How much did you drink?'}
      </Text>
      <View style={styles.amountContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 72}}>{amount}</Text>
        <Text style={styles.glass}>glass</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <GlassSvg width={150} height={150} />
      </View>
      <View style={styles.buttonContainer}>
        <GradientButton
          onSubmit={() => (amount > 1 ? setAmount(amount - 1) : null)}
          borderRadius={5}
          title="- "
        />
        <Text style={styles.counterText}>{amount}</Text>
        <GradientButton
          onSubmit={() => setAmount(amount + 1)}
          borderRadius={5}
          title="+ "
        />
      </View>
      <GradientButton
        isLoading={isLoading}
        onSubmit={() => {
          addWater();
        }}
        height={60}
        borderRadius={35}
        title={params?.code === 'goal' ? 'Save' : 'Add'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  glass: {
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginLeft: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
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
    padding: 20,
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default WaterIntake;
