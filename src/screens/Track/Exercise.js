import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Divider} from 'react-native-paper';
import Chart from '../Home/components/ChartContainer';
import ProgressCircle from 'react-native-progress-circle';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import CalendarPickerModal from '../DailyIntake/components/Calendermodal';
import ModalAuth from '../../components/ModalAuth';
import {useSelector, useDispatch} from 'react-redux';
import {getData} from '../NetworkRequest';
import CalendarIcon from '../../../assets/filledCalendar';
import {getGoalValue} from '../../redux/actions/goalAction';
import ExerciseModal from '../Home/components/ExcerciseModal';
import {useIsFocused} from '@react-navigation/core';

export default function SleepHistory() {
  const navigation = useNavigation();
  const [details, setDetails] = useState([]);
  const guest = useSelector(state => state?.auth?.guest);
  const token = useSelector(state => state?.auth?.token);
  const dispatch = useDispatch();
  const [authVisible, setAuthVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [calenVisible, setCalenVisible] = useState(false);
  const goalValue = useSelector(state => state?.goals?.goal);
  const [date, setDate] = useState({start: Date.now(), end: Date.now()});
  const isFocused = useIsFocused();
  const getProgressDetails = async () => {
    try {
      await dispatch(getGoalValue(token));
      const data = await getData(token, 'progress-detail/', {
        code: 'Walk',
      });
      console.log('detailsss', data);
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getGoal = async () => {
    try {
      await dispatch(getGoalValue(token));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProgressDetails();
    getGoal();
  }, [isFocused]);

  return (
    <>
      {authVisible && (
        <ModalAuth
          isVisible={authVisible}
          onClose={() => setAuthVisible(false)}
        />
      )}
      {modalVisible && (
        <ExerciseModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        />
      )}
        {calenVisible && (
            <CalendarPickerModal
              isVisible={calenVisible}
              onClose={() => setCalenVisible(false)}
              onSetDate={currentDate => setDate(currentDate)}
            />
          )}
      <View style={{height: 50, backgroundColor: '#ff7824'}}></View>
      <ScrollView style={{
            flex: 0.9,
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -20,
          }}>
          <View style={styles.container}>
            {moment(date?.start).format('Do MMM YYYY') ===
              moment(Date.now()).format('Do MMM YYYY') && (
              <Text style={styles.Today}>
                {Math.ceil((Date.now() - date?.start) / (1000 * 60 * 60 * 24)) -
                  1 ===
                0
                  ? 'Today'
                  : Math.ceil(
                      (Date.now() - date?.start) / (1000 * 60 * 60 * 24),
                    ) -
                      1 ===
                    1
                  ? 'Yesterday'
                  : `${Math.ceil(
                      (Date.now() - date.start) / (1000 * 60 * 60 * 24),
                    )} days ago `}
              </Text>
            )}

            {moment(date?.start).format('Do MMM YYYY') ===
            moment(Date.now()).format('Do MMM YYYY') ? (
              <Text style={{fontSize: 16, marginLeft: -10}}>
                {moment(date?.start).format('Do MMM YYYY')}
              </Text>
            ) : (
              <>
                <Text style={{fontWeight: '700'}}>From</Text>
                <Text>{moment(date?.start).format('Do MMM YYYY')} </Text>
                <Text style={{fontWeight: '700'}}>to</Text>
                <Text>{moment(date?.end).format('Do MMM YYYY')}</Text>
              </>
            )}
            <TouchableOpacity onPress={() => setCalenVisible(true)}>
              <CalendarIcon
                color="#86B841"
                onDateChange={date => console.log(date)}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={{margin: 10}}>
              <ProgressCircle
                percent={
                  ((goalValue?.Walk?.Done || 0) /
                    (goalValue?.Walk?.Target || 8000)) *
                  100
                }
                radius={80}
                borderWidth={12}
                color="#ff7824"
                shadowColor="#ebeced"
                bgColor="#fff">
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                  {goalValue?.Walk?.Done || 0}
                </Text>
                <Text>Completed</Text>
              </ProgressCircle>
            </View>
            <View style={{justifyContent: 'center', marginRight: 20}}>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                {goalValue?.Walk?.Target || 10000}
              </Text>
              <Text style={{color: 'grey', marginBottom: 20}}>Steps</Text>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                {((goalValue?.Walk?.Target || 10000) / 1000).toFixed(2)}
              </Text>
              <Text style={{color: 'grey'}}>KM</Text>
            </View>
          </View>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.loginButton}
            colors={['#ff7824', '#ff7824']}>
            <TouchableOpacity
              onPress={() =>
                guest
                  ? setAuthVisible(true)
                  : navigation.navigate('WalkIntake', {code: 'goal'})
              }>
              <View style={styles.loginContainer}>
                <Text style={styles.loginTouch}>SET UP YOUR WALK GOAL</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>

          <Chart color="223, 133, 22" code="Workout" name="Calories Burned" />
          {/* <Chart name="Workout History" />

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.loginButton}
          colors={['#41B87F', '#86B841']}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DailyIntakeScreen', {
                screen: 'WalkIntake',
                params: {code: 'goal'},
              })
            }>
            <View style={styles.loginContainer}>
              <Text style={styles.loginTouch}>SET UP YOUR WORKOUT GOAL</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient> */}

          <Text style={styles.IntakeList}>Exercise List</Text>

          {details.length === 0 ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                textAlign: 'center',
                margin: 30,
              }}>
              No exercise log yet!
            </Text>
          ) : null}
          {details[0] &&
            details[0].map((item, index) => (
              <View key={index}>
                <View style={styles?.listingContainer}>
                  <Text numberOfLines={1} style={styles?.textListing}>
                    {moment(item?.detail?.created_at).format('ddd')}
                  </Text>
                  <Text maxLength={20} style={styles?.textListing}>
                    {item?.detail?.quantity} Steps
                  </Text>
                  <Text style={styles?.textListing}>
                    {moment(item?.detail?.created_at).format('HH:mm  DD MMM')}
                  </Text>
                </View>
                <Divider />
              </View>
            ))}
      </ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 0.7}}
        style={styles.plusButton}
        colors={['#ff7824', '#ff7824']}>
        <TouchableOpacity
          onPress={() =>
            // navigation.navigate('WalkIntake')
            guest ? setAuthVisible(true) : setModalVisible(true)
          }>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  IntakeList: {
    margin: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  plus: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },

  plusButton: {
    width: 60,
    height: 60,
    padding: 3,
    borderRadius: 30,
    // alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  Today: {
    fontSize: 18,
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
    textAlign: 'center',
  },
  dualContainer: {
    flex: 0.5,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    margin: 10,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  textListing: {fontSize: 14},
  loginButton: {
    borderRadius: 10,
    height: 50,
    margin: 10,
    justifyContent: 'center',
  },
  loginContainer: {flexDirection: 'row', alignSelf: 'center'},
  loginTouch: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 10,
  },
});
