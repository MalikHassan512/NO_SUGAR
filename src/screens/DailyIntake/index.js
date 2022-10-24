import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Card, Divider, Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/core';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getData} from '../NetworkRequest';
import ProgressCircle from 'react-native-progress-circle';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Steps from '../../../assets/DailyIntake/Sugar';
import Fat from '../../../assets/DailyIntake/NetCarbs';
import Sleep from '../../../assets/DailyIntake/Sleep';
import Line from '../../../assets/DailyIntake/Line 110';
import Water from '../../../assets/DailyIntake/Water';
import Line2 from '../../../assets/DailyIntake/Line 113';
import StepsPink from '../../../assets/DailyIntake/stepsPink';
import Line3 from '../../../assets/DailyIntake/Line 109';
import Camera from '../../../assets/DailyIntake/Camera';
import QrCode from '../../../assets/DailyIntake/QR Code';
import Tea from '../../../assets/DailyIntake/Tea';
import AddButton from '../../../assets/DailyIntake/add';
import {ProgressBar} from 'react-native-paper';
import CalendarPickerModal from '../DailyIntake/components/Calendermodal';
import ModalAuth from '../../components/ModalAuth';
import CardIntakes from './components/CardIntakes';
import WaterGlass from '../../../assets/DailyIntake/waterGlass';
import DrinkingWater from '../../../assets/DailyIntake/drinkingWater';
import TookSleep from '../../../assets/DailyIntake/tookSleep';
import SleepEmoji from '../../../assets/DailyIntake/sleepEmoji';
import StepsCounting from '../../../assets/DailyIntake/stepsCounting';
import WalkSteps from '../../../assets/DailyIntake/walkSteps';
import PersonExercise from '../../../assets/DailyIntake/personExercise';
import ExerciseIco from '../../../assets/DailyIntake/exerciseIco';
import ArrowLeft from '../../../assets/DailyIntake/arrowLeft';
import ArrowRight from '../../../assets/DailyIntake/arrowRight';
import MyCraving from '../Home/components/MyCravings';
import FoodCard from './components/FoodCard';
import {getGoalValue} from '../../redux/actions/goalAction';
import ExerciseModal from '../Home/components/ProgressModal';

const height = Dimensions.get('window').height;

const DailyIntake = () => {
  const navigation = useNavigation();
  const [calenVisible, setCalenVisible] = useState(false);
  const [exerciseVisible, setExerciseVisible] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  // const [open, setOpen] = useState('');
  // const activityValue = useSelector(state => state?.activityValue?.activity);
  const goalData = useSelector(state => state?.goals.goal);
  const token = useSelector(state => state?.auth?.token);
  const dispatch = useDispatch();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    dispatch(
      getGoalValue(token, {
        date_range: `${moment(currentDate).format('YYYY-MM-DD')},${moment(
          currentDate,
        ).format('YYYY-MM-DD')}`,
      }),
    );
  };

  const showDatepicker = () => {
    setShow(true);
  };
  console.log('Goal DAta', goalData);
  const getGoalData = async () => {
    try {
      await dispatch(getGoalValue(token));
    } catch (error) {
      console.log(error?.response);
    } finally {
      setLoading(false);
    }
  };
  console.log(goalData);
  const takePhoto = () => {
    launchCamera(
      {
        maxHeight: 513,
        maxWidth: 513,
        // durationLimit: 1000,
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          navigation.navigate('PhotoSearch', {
            file: `data:image/jpeg;base64,${response?.assets[0]?.base64}`,
          });
        }
      },
    );
  };
  useEffect(() => {
    // getProgressDetails();
    getGoalData();
  }, []);
  return loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color="#66cc33" />
    </View>
  ) : (
    <>
      <View style={{height: 50, backgroundColor: '#6AB85A'}}></View>
      <ScrollView style={styles.innerContainer}>
        {exerciseVisible && (
          <ExerciseModal
            visible={exerciseVisible}
            onRequestClose={() => setExerciseVisible(false)}
          />
        )}
        {Platform.OS === 'android' ? (
          <>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                maximumDate={Date.now()}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </>
        ) : (
          <>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                maximumDate={Date.now()}
                mode={'date'}
                is24Hour={true}
                display="inline"
                onChange={onChange}
              />
            )}
          </>
        )}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 30,
            alignItems: 'center',
            marginVertical: 10,
            // flexDirection: 'row',
          }}
          onPress={showDatepicker}>
          <ArrowLeft />
          <Text
            style={{
              fontWeight: '500',
              fontSize: 14,
              textAlign: 'center',
            }}>
            {moment(date).format('DD MMMM YYYY') ===
            moment().format('DD MMMM YYYY')
              ? 'Today'
              : moment(date).format('DD MMMM YYYY')}
          </Text>
          <ArrowRight />
        </TouchableOpacity>

        <Divider />
        {/* {show && ( */}

        <View style={styles.align}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Steps />
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {goalData?.consumed?.calories.toFixed(1)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold'}}>Gained</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#EBEBEB',
              padding: 8,
              borderRadius: 100,
              elevation: 5,
            }}>
            <ProgressCircle
              percent={
                goalData?.Sleep?.Target === 0
                  ? 0
                  : (goalData?.Calories?.Done / goalData?.Calories?.Target) *
                    100
              }
              radius={55}
              borderWidth={7}
              color="#6AB85A"
              shadowColor="white"
              bgColor="#fff">
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {(
                  goalData?.Calories?.Target - goalData?.Calories?.Done
                ).toFixed(1)}
              </Text>
              <Text style={{color: '#979797'}}>Kcal left</Text>
            </ProgressCircle>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Fat />
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {parseFloat(goalData?.burned?.calories).toFixed(1)}
            </Text>
            <Text style={{fontWeight: 'bold'}}>Consumed</Text>
          </View>
        </View>
        <MyCraving data={goalData?.progress_data} />
        <View style={styles.alignCards}>
          <Card style={styles.cardStyle}>
            <View style={{alignItems: 'center', marginVertical: 10}}>
              <Sleep height={25} width={25} />
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Sleep</Text>
              <ProgressBar
                style={{height: 2, width: 80, marginVertical: 5}}
                color="#F0854A"
                progress={
                  goalData?.Sleep?.Target === 0
                    ? 0
                    : goalData?.Sleep?.Done / goalData?.Sleep?.Target
                }
              />
              {/* <Line width={80} height={10} /> */}
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {goalData?.Sleep?.Done}
              </Text>
              <Text style={{color: '#979797'}}>Hours</Text>
            </View>
          </Card>
          <Card style={styles.cardStyle}>
            <View style={{alignItems: 'center', marginVertical: 10}}>
              <Water height={25} width={25} />
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Water</Text>
              <ProgressBar
                style={{height: 2, width: 80, marginVertical: 5}}
                color="#59BFD9"
                progress={
                  goalData?.Water?.Target === 0
                    ? 0
                    : goalData?.Water?.Done / goalData?.Water?.Target
                }
              />
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {goalData?.Water?.Done}
              </Text>
              <Text style={{color: '#979797'}}>Glasses</Text>
            </View>
          </Card>
          <Card style={styles.cardStyle}>
            <View style={{alignItems: 'center', marginVertical: 10}}>
              <StepsPink height={30} width={30} />
              <Text style={{fontWeight: 'bold', fontSize: 16}}>Steps</Text>
              <ProgressBar
                style={{height: 2, width: 80, marginVertical: 5}}
                color="#D467BC"
                progress={
                  goalData?.Walk?.Target === 0
                    ? 0
                    : goalData?.Walk?.Done / goalData?.Walk?.Target
                }
              />
              <Text style={{fontWeight: 'bold', fontSize: 16}}>
                {goalData?.Walk?.Done}
              </Text>
              <Text style={{color: '#979797'}}>Steps</Text>
            </View>
          </Card>
        </View>

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.activityContainer}
          colors={['#41B87F', '#86B841']}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                margin: 20,
                fontSize: 14,
                color: 'white',
                fontWeight: '500',
              }}>
              Activities
            </Text>
          </View>
          <Text
            style={{
              marginHorizontal: 20,
              fontSize: 16,
              color: 'white',
              marginBottom: 40,
            }}>
            Automatically track your activities by connecting to your health
            apps
          </Text>
        </LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            marginTop: -20,
            justifyContent: 'space-evenly',
          }}>
          <Button
            style={{borderRadius: 15}}
            mode="contained"
            onPress={() => navigation.navigate('ConnectDevice')}
            uppercase={false}
            color="#EEC638">
            Connect Device
          </Button>
          <Button
            onPress={() => setExerciseVisible(true)}
            style={{borderRadius: 15}}
            mode="contained"
            uppercase={false}
            color="#EEC638">
            Add an activity
          </Button>
        </View>
        <Card style={{padding: 10, margin: 20, borderRadius: 15, elevation: 5}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 5}}>
              Food
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/* <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  justifyContent: 'center',
                  height: 25,
                  width: 80,
                  borderRadius: 5,
                  marginRight: 5,
                }}
                colors={['#41B87F', '#86B841']}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Add Meal')}>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 12, color: 'white'}}>Add Meal</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient> */}
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  justifyContent: 'center',
                  height: 25,
                  width: 100,
                  borderRadius: 5,
                  marginRight: 5,
                }}
                colors={['#41B87F', '#86B841']}>
                <TouchableOpacity>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Camera />
                    <TouchableOpacity onPress={takePhoto}>
                      <Text style={{fontSize: 12, color: 'white'}}>
                        TAKE PHOTO
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                  justifyContent: 'center',
                  height: 25,
                  width: 100,
                  borderRadius: 5,
                  marginRight: 5,
                }}
                colors={['#41B87F', '#86B841']}>
                <TouchableOpacity>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    {/* <QrCode color="white" /> */}
                    <Icons name="qrcode-scan" color="white" />
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ProductScanner')}>
                      <Text
                        style={{fontSize: 12, marginLeft: 5, color: 'white'}}>
                        SCAN PRODUCT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          <FoodCard data={goalData} />
        </Card>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.loginButton}
          colors={['#41B87F', '#86B841']}>
          <TouchableOpacity onPress={() => navigation.navigate('SetYourGoal')}>
            <View style={styles.loginContainer}>
              <Text style={styles.loginTouch}>SET UP YOUR GOAL</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
        <CardIntakes
          unit="Glasses"
          name="Water"
          Svg1={DrinkingWater}
          Svg2={WaterGlass}
          goal={goalData?.Water?.Target}
          done={goalData?.Water?.Done}
          onAdd={() => navigation?.navigate('WaterIntake')}
        />
        <CardIntakes
          unit="Hours"
          name="Sleep"
          Svg1={TookSleep}
          Svg2={SleepEmoji}
          goal={goalData?.Sleep?.Target}
          done={goalData?.Sleep?.Done}
          onAdd={() => navigation?.navigate('SleepIntake')}
        />

        <CardIntakes
          unit="Steps"
          name="Walk"
          Svg1={StepsCounting}
          Svg2={WalkSteps}
          goal={goalData?.Walk?.Target}
          done={goalData?.Walk?.Done}
          onAdd={() => navigation?.navigate('WalkIntake')}
        />
        <CardIntakes
          unit="Minutes"
          name="Exercise"
          Svg1={PersonExercise}
          Svg2={ExerciseIco}
          goal={goalData?.exercise?.Target || 90}
          done={goalData?.exercise?.Done}
          onAdd={() => navigation?.navigate('Add Exercise')}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  Today: {
    fontSize: 18,
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
    textAlign: 'center',
  },
  container: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    marginVertical: 5,
    padding: 10,
    elevation: 3,
  },
  activityContainer: {
    borderRadius: 15,
    // height: 50,
    // width: 160,
    marginTop: 5,
    marginHorizontal: 20,
    // justifyContent: 'center',
  },
  loginButton: {
    borderRadius: 20,
    height: 50,
    // width: 160,

    marginHorizontal: 20,
    justifyContent: 'center',
  },
  loginContainer: {flexDirection: 'row', alignSelf: 'center'},
  loginTouch: {
    color: 'white',
    fontSize: 14.5,
    textAlign: 'center',
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  alignCards: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 25,
  },
  cardStyle: {
    height: 130,
    width: 'auto',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    padding: 10,
  },
  align: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 40,
  },
  innerContainer: {
    flex: 0.9,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
  },
  loadingContainer: {
    flex: 1,
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default DailyIntake;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
// } from 'react-native';
// import {useIsFocused} from '@react-navigation/core';
// import LinearGradient from 'react-native-linear-gradient';
// import {useNavigation} from '@react-navigation/core';
// import MyCraving from '../Home/components/MyCravings';
// import Chart from '../Home/components/ChartContainer';
// import {getPaginationData} from '../NetworkRequest';
// import {useSelector} from 'react-redux';
// import ProgressModal from '../Home/components/ProgressModal';
// import GoalContainer from './components/GoalContainer';
// import moment from 'moment';
// import CalendarIcon from '../../../assets/filledCalendar';
// import AuthModal from '../../components/ModalAuth';
// import CalendarPickerModal from './components/Calendermodal';
// import {useDispatch} from 'react-redux';
// import {Divider} from 'react-native-paper';
// import {getGoalValue} from '../../redux/actions/goalAction';
// import {usePaginatorParams} from '../../custom_hooks/pagination_params_hook';

// const height = Dimensions.get('window').height;

// const DailyIntake = props => {
//   const [value, setValue] = useState('day');
//   const navigation = useNavigation();
//   const [modalVisible, setModalVisible] = useState(false);
//   const isFocused = useIsFocused();
//   const token = useSelector(state => state?.auth?.token);
//   const guest = useSelector(state => state?.auth?.guest);
//   const [authVisible, setAuthVisible] = useState(false);
//   const [calenVisible, setCalenVisible] = useState(false);
//   const activityValue = useSelector(state => state?.activityValue?.activity);
//   const [dateRange, setDateRange] = useState(null);
//   const [
//     listloading,
//     isRefreshing,
//     details,
//     loadMore,
//     refreshdDetails,
//     newData,
//   ] = usePaginatorParams(getPaginationData, 'progress-detailpage/', {
//     date_range: dateRange,
//   });

//   const goalData = useSelector(state => state?.goals.goal);
//   // const [details, setDetails] = useState([]);
//   const [date, setDate] = useState({start: Date.now(), end: Date.now()});
//   const dispatch = useDispatch();

//   const getGoalData = async () => {
//     try {
//       dispatch(getGoalValue(token));
//     } catch (error) {
//       console.log(error?.response);
//     }
//   };

//   useEffect(() => {
//     // getProgressDetails();
//     getGoalData();
//     refreshdDetails();
//   }, [isFocused]);

//   return (
//     <>
//       {authVisible && (
//         <AuthModal
//           isVisible={authVisible}
//           onClose={() => setAuthVisible(false)}
//         />
//       )}
//       {calenVisible && (
//         <CalendarPickerModal
//           isVisible={calenVisible}
//           onClose={() => setCalenVisible(false)}
//           onSetDate={currentDate => setDate(currentDate)}
//           onSetDateRange={val => {
//             newData({date_range: val});
//           }}
//         />
//       )}
//       <FlatList
//         data={[0]}
//         style={{backgroundColor: 'white'}}
//         renderItem={({dat}) => (
//           <>
//             {modalVisible && (
//               <ProgressModal
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//               />
//             )}

//             <View style={styles.container}>
//               {moment(date?.start).format('Do MMM YYYY') ===
//                 moment(Date.now()).format('Do MMM YYYY') && (
//                 <Text style={styles.Today}>
//                   {Math.ceil(
//                     (Date.now() - date?.start) / (1000 * 60 * 60 * 24),
//                   ) -
//                     1 ===
//                   0
//                     ? 'Today'
//                     : Math.ceil(
//                         (Date.now() - date?.start) / (1000 * 60 * 60 * 24),
//                       ) -
//                         1 ===
//                       1
//                     ? 'Yesterday'
//                     : `${Math.ceil(
//                         (Date.now() - date.start) / (1000 * 60 * 60 * 24),
//                       )} days ago `}
//                 </Text>
//               )}

//               {moment(date?.start).format('Do MMM YYYY') ===
//               moment(Date.now()).format('Do MMM YYYY') ? (
//                 <Text style={{fontSize: 16, marginLeft: -10}}>
//                   {moment(date?.start).format('Do MMM YYYY')}
//                 </Text>
//               ) : (
//                 <>
//                   <Text style={{fontWeight: '700'}}>From</Text>
//                   <Text>{moment(date?.start).format('Do MMM YYYY')} </Text>
//                   <Text style={{fontWeight: '700'}}>to</Text>
//                   <Text>{moment(date?.end).format('Do MMM YYYY')}</Text>
//                 </>
//               )}
//               <TouchableOpacity onPress={() => setCalenVisible(true)}>
//                 <CalendarIcon
//                   color="#86B841"
//                   onDateChange={date => console.log(date)}
//                 />
//               </TouchableOpacity>
//             </View>

//             <GoalContainer data={goalData} />

//             <MyCraving data={activityValue?.Food} />
//             <LinearGradient
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 0}}
//               style={styles.loginButton}
//               colors={['#41B87F', '#86B841']}>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('SetYourGoal')}>
//                 <View style={styles.loginContainer}>
//                   {/* {isLoading ? <ActivityIndicator color="white" /> : null} */}
//                   <Text style={styles.loginTouch}>Set Your Goal</Text>
//                 </View>
//               </TouchableOpacity>
//             </LinearGradient>

//             <Chart
//               color="134, 184, 65"
//               value={value}
//               code="all"
//               name="Activity Chart"
//             />

//             <Text style={styles.IntakeList}>Activity List</Text>

//             {details.length === 0 ? (
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: '400',
//                   textAlign: 'center',
//                   margin: 30,
//                 }}>
//                 No activity yet!
//               </Text>
//             ) : null}
//             <FlatList
//               data={details?.map(item => {
//                 return item;
//               })}
//               // data={[]}
//               onEndReached={loadMore}
//               renderItem={({item}) => (
//                 <View>
//                   <View style={styles?.listingContainer}>
//                     <Text
//                       numberOfLines={1}
//                       style={{width: 60, textAlign: 'left'}}>
//                       {moment(item?.detail?.created_at).format('ddd')}
//                     </Text>
//                     <Text
//                       numberOfLines={1}
//                       style={{width: 150, textAlign: 'left'}}
//                       maxLength={20}>
//                       {item?.detail?.quantity}{' '}
//                       {item?.detail?.name === 'Water'
//                         ? `Glass Water`
//                         : item?.detail?.name === 'Sleep'
//                         ? 'Hour Sleep'
//                         : item?.detail?.name === 'Walk'
//                         ? 'Steps Walk'
//                         : item?.detail?.name}
//                     </Text>
//                     <Text style={styles?.textListing}>
//                       {moment(item?.detail?.created_at).format('HH:mm  DD MMM')}
//                     </Text>
//                   </View>
//                   <Divider />
//                 </View>
//               )}
//             />
//           </>
//         )}
//       />

//       <LinearGradient
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}
//         style={styles.plusButton}
//         colors={['#41B87F', '#86B841']}>
//         <TouchableOpacity
//           onPress={() =>
//             guest ? setAuthVisible(true) : setModalVisible(true)
//           }>
//           <Text style={styles.plus}>+</Text>
//         </TouchableOpacity>
//       </LinearGradient>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   IntakeList: {
//     margin: 10,
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   listingContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 15,
//     marginVertical: 10,
//   },
//   // textListing: {fontSize: 12, fontWeight: '400'},
//   loginContainer: {flexDirection: 'row', alignSelf: 'center'},
//   loginTouch: {
//     color: 'white',
//     fontSize: 22,
//     fontWeight: '700',
//     textAlign: 'center',
//     marginHorizontal: 10,
//     width: '50%',
//   },
//   loginButton: {
//     marginVertical: 5,
//     borderRadius: 15,
//     marginHorizontal: 10,
//     height: 50,
//     justifyContent: 'center',
//   },
//   Today: {
//     fontSize: 18,
//     backgroundColor: 'black',
//     color: 'white',
//     // width: '20%',
//     padding: 3,
//     textAlign: 'center',
//   },
//   dualContainer: {
//     flex: 0.5,
//     borderRadius: 10,
//     marginHorizontal: 10,
//     marginVertical: 10,
//   },
//   container: {
//     margin: 10,
//     marginHorizontal: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   DateStyle: {
//     margin: 20,
//     flexDirection: 'row',
//     // justifyContent: 'cenetr',
//   },
//   plus: {
//     fontSize: 40,
//     color: 'white',
//     textAlign: 'center',
//   },
//   loader: {
//     flex: 1,
//     height: height * 0.5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   plusButton: {
//     width: 60,
//     height: 60,
//     padding: 3,
//     borderRadius: 30,
//     // alignSelf: 'center',
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//   },
// });
// let example = [
//   {
//     color: '#F2AD05',
//     quote: 'Work out, eat well, Be Patient. Your body will reward.',
//   },
//   {
//     color: '#10c6c6',
//     quote: 'All progress takes place outside the comfort zone.',
//   },
// ];
// export default DailyIntake;
