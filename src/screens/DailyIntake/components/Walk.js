import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import GlassSvg from '../../../../assets/new/walk.svg';
import GradientButton from '../../../components/GradientBotton';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useSelector, useDispatch} from 'react-redux';
import {postData, patchData} from '../../NetworkRequest';
import {getActivityValue} from '../../../redux/actions/homeStatActions';
import {getGoalValue} from '../../../redux/actions/goalAction';

const WalkIntake = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(1000);
  const token = useSelector(state => state?.auth?.token);
  const dispatch = useDispatch();
  const {params} = useRoute();

  const addWalk = async () => {
    setIsLoading(true);
    try {
      params?.code === 'goal'
        ? await patchData(token, 'goal/', {
            walk: amount,

            goal_type: 'Burn',
          })
        : await postData(token, 'user-progress/', {
            uuid: '5b0af35f-92a8-48d4-9ed3-833351da35cd',
            code: 'Walk',
            quantity: amount,
          });
      dispatch(getGoalValue(token));
      navigation.goBack();
      dispatch(getActivityValue(token));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles?.mainContainer}>
      <Text style={styles.text}>
        {params?.code === 'goal'
          ? 'How many steps do you want to take everyday?'
          : 'How much did you walk?'}
      </Text>
      <View style={styles.amountContainer}>
        <Text style={{fontWeight: 'bold', fontSize: 72}}>{amount}</Text>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'flex-end',
            marginLeft: 10,
            marginBottom: 20,
            fontSize: 16,
          }}>
          step
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <GlassSvg width={150} height={150} />
      </View>
      <View style={styles.buttonContainer}>
        <GradientButton
          onSubmit={() => (amount > 100 ? setAmount(amount - 100) : null)}
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
          addWalk();
        }}
        height={60}
        borderRadius={35}
        title={params?.code === 'goal' ? 'Save' : 'Add'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default WalkIntake;
