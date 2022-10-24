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

import {Divider} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/core';
import MyCraving from '../Home/components/MyCravings';
import Chart from '../Home/components/ChartContainer';
import {getData} from '../NetworkRequest/index';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import ProgressModal from '../Home/components/ProgressModal';
import {getActivityValue} from '../../redux/actions/homeStatActions';
import moment from 'moment';
import CalendarIcon from '../../../assets/filledCalendar';
import CalendarPickerModal from '../DailyIntake/components/Calendermodal';
import ModalAuth from '../../components/ModalAuth';
import FoodBoxes from './components/FoodBoxes';
import FoodModal from '../../screens/Home/components/FoodModel';

const height = Dimensions.get('window').height;

const FoodActivity = () => {
  const [value, setValue] = useState('day');
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authVisible, setAuthVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [foodVisible, setFoodVisible] = useState(false);
  const isFocused = useIsFocused();
  const token = useSelector(state => state?.auth?.token);
  const guest = useSelector(state => state?.auth?.guest);
  const activityValue = useSelector(state => state?.activityValue?.activity);
  const dispatch = useDispatch();
  const [calenVisible, setCalenVisible] = useState(false);
  const [date, setDate] = useState({start: Date.now(), end: Date.now()});
  const navigation = useNavigation();
  const getProgressDetails = async () => {
    try {
      const data = await getData(token, 'progress-detail/', {
        code: 'Food',
      });

      setDetails(data);
      setLoading(false);
      dispatch(getActivityValue(token));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProgressDetails();
  }, [isFocused]);

  return false ? (
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
      {foodVisible && (
        <FoodModal
          visible={foodVisible}
          onRequestClose={() => setFoodVisible(false)}
        />
      )}
      <View style={{height: 50, backgroundColor: '#41B87F'}}></View>
      <ScrollView
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          marginTop: -20,
          paddingTop: 10,
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
        </View>
        <FoodBoxes data={activityValue?.Food} />
        <MyCraving data={activityValue?.Food} />
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.loginButton}
          colors={['#41B87F', '#41B87F']}>
          <TouchableOpacity
            onPress={() =>
              guest
                ? setAuthVisible(true)
                : navigation.navigate('FoodIntake', {code: 'goal'})
            }>
            <View style={styles.loginContainer}>
              <Text style={styles.loginTouch}>Set Your Goal</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <Chart
          value={value}
          color="65, 184, 126"
          code="Food"
          name="Calories Chart"
        />

        <Text style={styles.IntakeList}>Food Intake List</Text>

        {details.length === 0 ? (
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              textAlign: 'center',
              margin: 30,
            }}>
            No activity yet!
          </Text>
        ) : null}
        {details[0] &&
          details[0].map((item, index) => (
            <View key={index}>
              {console.log(item)}

              <View style={styles?.listingContainer}>
                <Text numberOfLines={1} style={{width: 40, textAlign: 'left'}}>
                  {moment(item?.detail?.created_at).format('ddd')}
                </Text>
                <Text maxLength={20} style={{width: 150, textAlign: 'left'}}>
                  {item?.detail?.quantity} {item?.detail?.name}
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
        end={{x: 1, y: 0}}
        style={styles.plusButton}
        colors={['#41B87F', '#41B87F']}>
        <TouchableOpacity
          onPress={() => (guest ? setAuthVisible(true) : setFoodVisible(true))}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.9,
    backgroundColor: 'white',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  IntakeList: {
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  loginContainer: {flexDirection: 'row', alignSelf: 'center'},
  loginTouch: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 10,
    width: '50%',
  },
  loginButton: {
    marginVertical: 5,
    borderRadius: 15,
    marginHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  listingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 10,
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
    // elevation: 0.5,
    // borderColor: 'grey',
    // borderWidth: 1,
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
    // justifyContent: 'cenetr',
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
    // alignSelf: 'center',
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
export default FoodActivity;
