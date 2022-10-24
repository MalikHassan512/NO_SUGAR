import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Glass from '../../../../assets/WaterGlass2.svg';
import GlassButton from '../../../../assets/Add Button.svg';
import StepsButton from '../../../../assets/Step Button.svg';
import SleepButton from '../../../../assets/Sleep Button.svg';
import MoodButton from '../../../../assets/Mood Button.svg';
import ProgressCircle from 'react-native-progress-circle';
import CarbsCount from '../../../../assets/Carbs Count.svg';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Mood from '../../../../assets/Mood.svg';
import Sleep from '../../../../assets/Sleeping.svg';
import LinearGradient from 'react-native-linear-gradient';
import {Card} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import FoodModal from './FoodModel';
import ProgressModal from './ProgressModal';

export default function SetGoal() {
  const navigation = useNavigation();
  const [waterNum, setWaterNum] = useState(0);
  const [carbsNum, setCarbsNum] = useState(0);
  const [sleepNum, setSleepNum] = useState(0);
  const [moodNum, setMoodNum] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [progessVisible, setProgressVisible] = useState(false);
  const activityValue = useSelector(state => state?.activityValue?.activity);

  const addWater = () => {
    waterNum === 1500 ? null : setWaterNum(1 + waterNum);
    navigation?.navigate('WaterIntake');
  };
  const addcarbs = () => {
    carbsNum === 1500 ? null : setCarbsNum(1 + carbsNum);
    setModalVisible(true);
  };

  const addsleep = () => {
    sleepNum === 1500 ? null : setSleepNum(1 + sleepNum);
    navigation?.navigate('SleepIntake');
  };

  const addmood = () => {
    moodNum === 1500 ? null : setMoodNum(1 + moodNum);
    navigation?.navigate('DailyIntakeScreen', {
      screen: 'Mood',
    });
  };

  return (
    <>
      {progessVisible && (
        <ProgressModal
          visible={progessVisible}
          onRequestClose={() => setProgressVisible(false)}
        />
      )}
      <FoodModal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      />

      <View style={styles.mainContainer}>
        <Card style={styles.dualContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.textStyle}>Food Intake</Text>
          </View>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={(activityValue?.Food?.net_carbs / 100) * 100}
              radius={45}
              borderWidth={8}
              color="#f0b333"
              shadowColor="#eaeaea"
              bgColor="#fff">
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('Home', {
                    screen: 'Food Activity',
                    initial: false,
                  });
                }}>
                <CarbsCount style={{marginTop: 5}} width={40} height={40} />
              </TouchableOpacity>
              <Text style={styles.value}>
                {activityValue?.Food?.net_carbs || 0}
              </Text>
            </ProgressCircle>
            <View style={styles.countContainer}>
              <Text style={styles.counter}>Net Carbs</Text>
              <TouchableOpacity onPress={addcarbs}>
                <StepsButton style={{marginTop: 5}} width={60} height={60} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        <Card style={styles.dualContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.textStyle}>Water Count</Text>
          </View>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={(activityValue?.Water?.quantity / 15) * 100}
              radius={45}
              borderWidth={8}
              color="#73d7f8"
              shadowColor="#eaeaea"
              bgColor="#fff">
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('Home', {
                    screen: 'Water Activity',
                    initial: false,
                  });
                }}>
                <Glass style={{marginTop: 5}} width={40} height={40} />
              </TouchableOpacity>
              <Text style={styles.value}>
                {activityValue?.Water?.quantity || 0}
              </Text>
            </ProgressCircle>

            <View style={styles.countContainer}>
              <Text style={styles.counter}>15 Glasses</Text>
              <TouchableOpacity onPress={addWater}>
                <GlassButton style={{marginTop: 5}} width={60} height={60} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.mainContainer}>
        <Card style={styles.dualContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.textStyle}>Sleep</Text>
          </View>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={(activityValue?.Sleep?.quantity / 20) * 100}
              radius={45}
              borderWidth={8}
              color="#9c33ff"
              shadowColor="#eaeaea"
              bgColor="#fff">
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('Home', {
                    screen: 'Sleep Activity',
                    initial: false,
                  });
                }}>
                <Sleep style={{marginTop: 5}} width={32} height={32} />
              </TouchableOpacity>
              <Text style={styles.value}>
                {activityValue?.Sleep?.quantity || 0}
              </Text>
            </ProgressCircle>

            <View style={styles.countContainer}>
              <Text style={styles.counter}>Hours</Text>
              <TouchableOpacity onPress={addsleep}>
                <SleepButton style={{marginTop: 5}} width={60} height={60} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        <Card style={styles.dualContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.textStyle}>Mood</Text>
          </View>
          <View style={styles.circleContainer}>
            <ProgressCircle
              percent={50}
              radius={45}
              borderWidth={8}
              color="#33ff69"
              shadowColor="#eaeaea"
              bgColor="#fff">
              <TouchableOpacity
                onPress={() => {
                  navigation?.navigate('Home', {
                    screen: 'Mood Activity',
                    initial: false,
                  });
                }}>
                <Mood style={{marginTop: 5}} width={30} height={30} />
              </TouchableOpacity>

              {/* <Text style={styles.value}>{activityValue?.Mood?.quantity}</Text> */}
            </ProgressCircle>
            <View style={styles.countContainer}>
              <Text style={styles.counter}>
                {activityValue?.Mood?.quantity || 'Normal'}
              </Text>
              <TouchableOpacity onPress={addmood}>
                <MoodButton style={{marginTop: 5}} width={60} height={60} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.trackButton}
        colors={['#41B87F', '#86B841']}>
        <TouchableOpacity
          onPress={() => setProgressVisible(true)}
          style={styles.touchStyle}>
          <Text style={styles.buttonText}>Add Your Activity</Text>
          <Ionicons
            style={{paddingHorizontal: 10, paddingTop: 2}}
            name="plus"
            color="white"
            size={35}
          />
        </TouchableOpacity>
      </LinearGradient>

      <View style={{marginTop: -15}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.trackButton}
          colors={['#41B87F', '#86B841']}>
          <TouchableOpacity style={styles.touchStyle}>
            <Text style={styles.buttonText}>Set Your Goals</Text>
            <Ionicons
              style={{paddingHorizontal: 10, paddingTop: 2}}
              name="plus"
              color="white"
              size={35}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  touchStyle: {
    marginVertical: 0,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#72b852',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  trackButton: {
    marginVertical: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '700',
    paddingTop: 5,
    paddingHorizontal: 10,
    width: '70%',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '25%',
    marginTop: -10,
    marginRight: -15,
  },
  Radius: {
    backgroundColor: 'white',
    marginTop: 20,
    borderWidth: 1,
    height: 90,
    width: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    fontSize: 12,
    marginVertical: 5,
  },
  value: {
    fontWeight: '700',
    fontSize: 16,
    width: 100,
    textAlign: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 14.5,
    margin: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.2,
    marginTop: 5,
  },
  dualContainer: {
    flex: 0.5,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    // elevation: 0.5,
    // borderColor: 'grey',
    // borderWidth: 1,
  },
  mainContainer: {
    height: 210,
    flexDirection: 'row',
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
});
