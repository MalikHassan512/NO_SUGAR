import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/core';
import Happy from '../../../assets/new/Happy.svg';
import Angry from '../../../assets/new/Angry.svg';
import Normal from '../../../assets/new/Normal.svg';
import Sad from '../../../assets/new/Sad.svg';
import Energetic from '../../../assets/new/Energetic.svg';
import Worried from '../../../assets/new/Worried.svg';
import Chart from '../Home/components/ChartContainer';
import {getData} from '../NetworkRequest';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import ProgressModal from '../Home/components/ProgressModal';
import {getActivityValue} from '../../redux/actions/homeStatActions';
import moment from 'moment';
import CalendarIcon from '../../../assets/filledCalendar';
import CalendarPickerModal from '../DailyIntake/components/Calendermodal';
import ModalAuth from '../../components/ModalAuth';

const height = Dimensions.get('window').height;

const MoodActivity = () => {
  const [value, setValue] = useState('day');

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [authVisible, setAuthVisible] = useState(false);
  const isFocused = useIsFocused();
  const token = useSelector(state => state?.auth?.token);
  const guest = useSelector(state => state?.auth?.guest);
  const activityValue = useSelector(state => state?.activityValue?.activity);

  const [calenVisible, setCalenVisible] = useState(false);
  const [date, setDate] = useState({start: Date.now(), end: Date.now()});
  const navigation = useNavigation();

  const addmood = () => {
    // moodNum === 1500 ? null : setMoodNum(1 + moodNum);
    guest
      ? setAuthVisible(true)
      : navigation?.navigate('DailyIntakeScreen', {
          screen: 'Mood',
        });
  };
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(1000).then(() => setRefreshing(false));

  // }, [isFocused]);

  // function wait(timeout) {
  //   return new Promise(resolve => {
  //     setTimeout(resolve, timeout);
  //   });
  // }

  // const getProgressDetails = async () => {
  //   try {
  //     const data = await getData(token, 'progress-detail/', {
  //       code: 'Mood',
  //     });
  //     console.log(data);
  //     setDetails(data);
  //     dispatch(getActivityValue(token));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getProgressDetails();
  // }, []);

  const getMyIntake = async () => {
    try {
      await getData(token, 'my-intake/');

      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };
  useEffect(() => {
    guest ? setLoading(false) : getMyIntake();
  }, [isFocused]);

  return loading ? (
    <View style={styles?.loader}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : (
    <>
      {authVisible && (
        <ModalAuth
          isVisible={authVisible}
          onClose={() => setAuthVisible(false)}
        />
      )}
      {modalVisible && (
        <ProgressModal
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
      <View style={{height: 50, backgroundColor: '#ffc014'}}></View>
      <ScrollView
      style={{
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
              <CalendarIcon onDateChange={date => console.log(date)} />
            </TouchableOpacity>
            {/* <Button
            uppercase={false}
            onPress={() => setValue('day')}
            style={{backgroundColor: value === 'day' ? 'black' : 'white'}}
            color={value === 'day' ? 'white' : 'grey'}
            mode="text">
            Today
          </Button>

          <Button
            uppercase={false}
            onPress={() => setValue('week')}
            style={{backgroundColor: value === 'week' ? 'black' : 'white'}}
            color={value === 'week' ? 'white' : 'grey'}
            mode="text">
            Weekly
          </Button>

          <Button
            uppercase={false}
            onPress={() => setValue('month')}
            style={{backgroundColor: value === 'month' ? 'black' : 'white'}}
            color={value === 'month' ? 'white' : 'grey'}
            mode="text">
            Monthly
          </Button> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View style={{margin: 10}}>
              {activityValue?.Mood?.quantity <= 0 ? (
                <Normal width={140} height={140} />
              ) : activityValue?.Mood?.quantity < 2 ? (
                <Angry width={140} height={140} />
              ) : activityValue?.Mood?.quantity < 4 ? (
                <Sad width={140} height={140} />
              ) : activityValue?.Mood?.quantity < 6 ? (
                <Worried width={140} height={140} />
              ) : activityValue?.Mood?.quantity < 8 ? (
                <Normal width={140} height={140} />
              ) : activityValue?.Mood?.quantity < 10 ? (
                <Energetic width={140} height={140} />
              ) : (
                <Happy width={140} height={140} />
              )}
            </View>
            <View style={{justifyContent: 'center', marginRight: 20}}>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                {activityValue?.Mood?.quantity <= 0
                  ? 'Normal'
                  : activityValue?.Mood?.quantity < 2
                  ? 'Angry'
                  : activityValue?.Mood?.quantity < 4
                  ? 'Sad'
                  : activityValue?.Mood?.quantity < 6
                  ? 'Worried'
                  : activityValue?.Mood?.quantity < 8
                  ? 'Normal'
                  : activityValue?.Mood?.quantity < 10
                  ? 'Energetic'
                  : 'Happy'}
              </Text>
              <Text style={{color: 'grey', marginBottom: 20}}>Mood</Text>
              <Text maxLength={1} style={{fontSize: 22, fontWeight: 'bold'}}>
                {`${activityValue?.Mood?.quantity.toFixed(1) || 10} / 10`}
              </Text>
              <Text style={{color: 'grey'}}>Average</Text>
            </View>
          </View>

          {/* <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.loginButton}
            colors={['#ffc014', '#ffc014']}>
            <TouchableOpacity
              onPress={() =>
                guest
                  ? setAuthVisible(true)
                  : navigation.navigate('MoodIntake', {code: 'goal'})
              }>
              <View style={styles.loginContainer}>
                <Text style={styles.loginTouch}>SET UP YOUR MOOD GOAL</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient> */}
          <Chart color="255, 196, 0" value={value} name="Mood History" />
          {/* {detail.map((item, index) => (
            <List key={index} data={item.detail} />
          ))} */}
      </ScrollView>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.plusButton}
        colors={['#ffc014', '#ffc014']}>
        <TouchableOpacity onPress={addmood}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DateStyle: {
    margin: 20,
    flexDirection: 'row',
  },
  plus: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    width: 60,
    height: 60,
    padding: 3,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
let example = [
  {
    color: '#F2AD05',
    quote: 'Work out, eat well, Be Patient. Your body will reward.',
  },
  {
    color: '#10c6c6',
    quote: 'All progress takes place outside the comfort zone.',
  },
];
export default MoodActivity;
