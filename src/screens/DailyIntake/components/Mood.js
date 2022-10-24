import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Happy from '../../../../assets/new/Happy.svg';
import Angry from '../../../../assets/new/Angry.svg';
import Normal from '../../../../assets/new/Normal.svg';
import Sad from '../../../../assets/new/Sad.svg';
import Energetic from '../../../../assets/new/Energetic.svg';
import Worried from '../../../../assets/new/Worried.svg';
import GradientButton from '../../../components/GradientBotton';
import {IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {postData} from '../../NetworkRequest';
import {getActivityValue} from '../../../redux/actions/homeStatActions';

import {useNavigation} from '@react-navigation/core';

const Mood = () => {
  const navigation = useNavigation();
  const [mood, setMood] = useState('none');
  const [moodValue, setMoodValue] = useState(5);
  const token = useSelector(state => state?.auth?.token);
  const dispatch = useDispatch();

  const addMood = async () => {
    try {
      await postData(token, 'user-progress/', {
        uuid: 'ecd19920-7318-4969-936f-94e709dff563',
        code: 'Mood',
        quantity: moodValue,
      });
      navigation.goBack();
      dispatch(getActivityValue(token));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles?.mainContainer}>
      <Text style={styles.text}>How is your mood right now?</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Happy width={80} height={80} />
          <Text style={styles.textsmall}>Happy</Text>
          <IconButton
            style={{alignSelf: 'center'}}
            onPress={() => {
              setMood('Happy');
              setMoodValue(10);
            }}
            color="#41B87F"
            icon={
              mood === 'Happy'
                ? 'checkbox-marked-circle-outline'
                : 'checkbox-blank-circle-outline'
            }
          />
        </View>
        <View>
          <Energetic width={80} height={80} />
          <Text style={styles.textsmall}>Energetic</Text>
          <IconButton
            style={{alignSelf: 'center'}}
            onPress={() => {
              setMood('Energetic');
              setMoodValue(8);
            }}
            color="#41B87F"
            icon={
              mood === 'Energetic'
                ? 'checkbox-marked-circle-outline'
                : 'checkbox-blank-circle-outline'
            }
          />
        </View>
        <View>
          <Normal width={80} height={80} />
          <Text style={styles.textsmall}>Normal</Text>
          <IconButton
            style={{alignSelf: 'center'}}
            onPress={() => {
              setMood('Normal');
              setMoodValue(6);
            }}
            color="#41B87F"
            icon={
              mood === 'Normal'
                ? 'checkbox-marked-circle-outline'
                : 'checkbox-blank-circle-outline'
            }
          />
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Worried width={80} height={80} />
          <Text style={styles.textsmall}>Worried</Text>
          <IconButton
            style={{alignSelf: 'center'}}
            onPress={() => {
              setMood('Worried');
              setMoodValue(4);
            }}
            color="#41B87F"
            icon={
              mood === 'Worried'
                ? 'checkbox-marked-circle-outline'
                : 'checkbox-blank-circle-outline'
            }
          />
        </View>
        <View>
          <Sad width={80} height={80} />
          <Text style={styles.textsmall}>Sad</Text>
          <IconButton
            style={{alignSelf: 'center'}}
            onPress={() => {
              setMood('Sad');
              setMoodValue(2);
            }}
            color="#41B87F"
            icon={
              mood === 'Sad'
                ? 'checkbox-marked-circle-outline'
                : 'checkbox-blank-circle-outline'
            }
          />
        </View>
        <View>
          <Angry width={80} height={80} />
          <Text style={styles.textsmall}>Angry</Text>
          <IconButton
            style={{alignSelf: 'center'}}
            onPress={() => {
              setMood('Angry');
              setMoodValue(0.1);
            }}
            color="#41B87F"
            icon={
              mood === 'Angry'
                ? 'checkbox-marked-circle-outline'
                : 'checkbox-blank-circle-outline'
            }
          />
        </View>
      </View>

      <GradientButton
        onSubmit={() => {
          addMood();
        }}
        height={60}
        borderRadius={35}
        title="Add"
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    // marginTop: 10,
  },
  textsmall: {
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,
  },
});

export default Mood;
