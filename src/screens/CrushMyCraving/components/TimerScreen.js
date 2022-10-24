import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  unstable_batchedUpdates,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Snackbar, ProgressBar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import WaterSVg from '../../../../assets/drinking-water.svg';
import ProgressCircle from 'react-native-progress-circle';
import {useNavigation} from '@react-navigation/core';
import EndModal from '../EndModal';
import {useDispatch, useSelector} from 'react-redux';
import {setCraving} from '../../../redux/actions/cravingActions';
import {postData} from '../../NetworkRequest';

const height = Dimensions.get('window').height;

const TimerScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [exitVisible, setExitVisible] = useState(false);
  const [skipVisible, setSkipVisible] = useState(false);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [text, setText] = useState('');
  const [timerCount, setTimer] = useState(30);
  const [number, setNumber] = useState(30);
  const [minute, setMinute] = useState(0);
  const navigation = useNavigation();
  const token = useSelector(state => state?.auth?.token);
  const dispatch = useDispatch();
  const sendPoints = async bol => {
    try {
      const data = await postData(token, 'crush-my-craving/', {
        uuid: '75402b6f-b5fe-47b3-916d-8763dc95fff9',
        step: 1,
        done: bol,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (timerCount === 0 && minute === 0) {
        clearInterval(interval);
        setModalVisible(true);

        return false;
      }
      if (timerCount === 0) {
        setMinute(lastMinuteCount => {
          lastMinuteCount <= 1 && clearInterval(interval);
          return lastMinuteCount - 1;
        });
        setTimer(60);
      }
      if (timerCount === 25 && minute === 0) {
        setVisibleSnackBar(true);

        setText('You got this!');
      }
      if (timerCount === 20 && minute === 0) {
        setVisibleSnackBar(false);
        // setText('You got this');
      }
      if (timerCount === 10 && minute === 0) {
        setVisibleSnackBar(true);
        setText('Almost there');
      }
      if (timerCount === 5 && minute === 0) {
        setVisibleSnackBar(false);
        // setText('You got this');
      }
      unstable_batchedUpdates(() => {
        setTimer(lastTimerCount => {
          lastTimerCount <= 1 && clearInterval(interval);
          return lastTimerCount - 1;
        });
        setNumber(lastNumber => {
          return lastNumber - 1;
        });
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [timerCount, minute, dispatch]);
  return (
    <SafeAreaView>
      {exitVisible && (
        <EndModal
          isVisible={exitVisible}
          onClose={() => setExitVisible(false)}
          onNo={() => {
            navigation.navigate('Congratulations');
            setExitVisible(false);

            sendPoints(true);
            dispatch(setCraving({order: '5', uuid: '555'}));
          }}
          text={'Wow! Have you crushed your craving? '}
          onYes={() => {
            navigation.navigate('NoProblem');
            setExitVisible(false);
            sendPoints(false);
            dispatch(setCraving({order: '5', uuid: '555'}));
          }}
        />
      )}
      {modalVisible && (
        <EndModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onYes={() => {
            skipVisible ? null : navigation.navigate('Congratulations');
            setModalVisible(false);
            setSkipVisible(false);
            sendPoints(true);
            dispatch(setCraving({order: '5', uuid: '555'}));
          }}
          text={
            skipVisible
              ? 'Would you like to skip and move to next step?'
              : 'It’s been 5 minutes. Are you still feeling the craving?'
          }
          onNo={() => {
            navigation.navigate('Music');
            setModalVisible(false);
            setSkipVisible(false);
            sendPoints(false);
            dispatch(setCraving({order: '2', uuid: '22'}));
          }}
        />
      )}
      <ScrollView>
        <LinearGradient
          style={styles.gradientContainer}
          colors={['#86B841', '#41B87F', '#41B87F']}>
          <View>
            <ProgressBar style={{height: 15}} color="white" progress={0.25} />
            {/* <IconButton
              //   style={{alignSelf: 'flex-start'}}
              icon="arrow-left"
              color="white"
              size={30}
            /> */}
            <View style={styles.stepStyle}>
              <Text style={styles.stepText}>Step 1</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setSkipVisible(true);
                  dispatch(setCraving({order: '2', uuid: '22'}));
                }}>
                <Text style={styles.stepText}>Skip</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.mainText}>Drink a glass of water!</Text>
            <View style={styles.imageContainer}>
              <WaterSVg height={height * 0.3} />
            </View>
          </View>

          <View style={styles.progressContainer}>
            <ProgressCircle
              percent={(number / 30) * 100}
              radius={75}
              borderWidth={8}
              color="white"
              shadowColor="#83cd9d"
              bgColor="#41B87F">
              <Text style={styles.timeText}>{`${minute}:${
                timerCount < 10 ? '0' + timerCount : timerCount
              }`}</Text>
            </ProgressCircle>
          </View>
          <TouchableOpacity onPress={() => setExitVisible(true)}>
            <Text
              style={{
                textAlign: 'center',
                marginVertical: 15,
                fontWeight: '500',
                color: 'white',
                fontSize: 20,
              }}>
              Exit
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        <Snackbar
          style={{borderRadius: 20}}
          wrapperStyle={{
            position: 'absolute',
            backgroundColor: '#000000',
            opacity: 0.5,
            bottom: height * 0.1,
          }}
          visible={visibleSnackBar}
          onDismiss={() => setVisibleSnackBar(false)}
          duration={5000}
          action={{
            label: '',
          }}>
          <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>
            {text}
          </Text>
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  touchStyle: {
    marginVertical: 0,
    height: 40,
    borderRadius: 5,
    width: 60,
    borderWidth: 1,
    borderColor: '#41B87F',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  timeText: {fontSize: 40, color: 'white', fontWeight: 'bold'},
  progressContainer: {marginTop: 10, alignSelf: 'center'},
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: -20,
    marginRight: -20,
    borderColor: '#86B841',
    borderWidth: 1,
  },
  textStyle: {
    // color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    fontWeight: '600',
    // textAlign: 'center',
    fontSize: 18,
    // color: 'gray',
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: '700',
  },
  buttonContainer: {
    backgroundColor: '#C0e7D1',
    alignSelf: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  mainText: {
    fontSize: 30,
    marginVertical: 20,
    marginHorizontal: 20,
    fontWeight: '700',
    width: '50%',
    color: 'white',
  },
  stepText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    alignSelf: 'flex-end',
  },
  stepStyle: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  mainContainer: {
    flex: 1,
  },
  gradientContainer: {
    width: '100%',
    minHeight: height,
    paddingVertical: 10,
    // justifyContent: 'space-between',
  },
});

export default TimerScreen;
