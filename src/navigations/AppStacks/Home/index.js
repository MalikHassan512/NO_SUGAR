import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {IconButton, Badge} from 'react-native-paper';
import OrderDetails from '../../../screens/Products/Orders/OrderDetails';
import {useNavigation} from '@react-navigation/core';
import HomeScreen from '../../../screens/Home';
import Videos from '../../../screens/Home/components/Videos';
import VideosList from '../../../screens/Home/components/VideosList';
import Profile from '../../../screens/Profile';
import {EditProfile} from '../../../screens/Profile/EditProfile';
import CrushMyCraving from '../../../screens/CrushMyCraving/index';
import GeneralScreen from '../../../screens/CrushMyCraving/components/GeneralScreen';
import SetYourGoal from '../../../screens/DailyIntake/components/SetYourGoal';
import AddMeal from '../../../screens/Home/components/AddMeal';
import TimerScreen from '../../../screens/CrushMyCraving/components/TimerScreen';
import Congratulations from '../../../screens/CrushMyCraving/components/Congratulation';
import CrushStat from '../../../screens/CrushMyCraving/CrushStat';
import Music from '../../../screens/CrushMyCraving/Music/GeneralScreen';
import MusicTimer from '../../../screens/CrushMyCraving/Music/TimerScreen';
import Snacks from '../../../screens/CrushMyCraving/Snacks/GeneralScreen';
import SnacksTimer from '../../../screens/CrushMyCraving/Snacks/TimerScreen';
import Exercise from '../../../screens/CrushMyCraving/Exercise/GeneralScreen';
import ExerciseTimer from '../../../screens/CrushMyCraving/Exercise/TimerScreen';
import NoProblem from '../../../screens/CrushMyCraving/Exercise/NoProblem';
import {useSelector} from 'react-redux';
import Auth from '../Auth';
import Products from '../Products';
import Intakes from '../DailyIntake';
import {getData} from '../../../screens/NetworkRequest';
import PlaceOrder from '../../../screens/Products/Checkout/PlaceOrder';
import AddAddress from '../../../screens/Profile/Address/AddAddress';
import ThankYou from '../../../screens/Thankyou';
import CartSvg from '../../../../assets/00cart.svg';
import FoodActivity from '../../../screens/Track/Food';
import WaterActivity from '../../../screens/Track/Water';
import ExerciseActivity from '../../../screens/Track/Exercise';
import SleepActivity from '../../../screens/Track/Sleep';
import MoodActivity from '../../../screens/Track/Mood';
import WaterIntake from '../../../screens/DailyIntake/components/Water';
import SleepIntake from '../../../screens/DailyIntake/components/Sleep';
import WalkIntake from '../../../screens/DailyIntake/components/Walk';
import FoodIntake from '../../../screens/DailyIntake/components/Calories';
import NetCarbsCalculator from '../../../screens/Home/components/CarbsCalculator';
import AddMEal from '../../../screens/Home/components/AddMeal';
import Rewards from '../../../screens/Rewards';
import QrScanner from '../../../screens/QrScanner';
import QrProduct from '../../../screens/QrScanner/components/AddProduct';
import ScannedProductDetails from '../../../screens/QrScanner/components/ScanDetails';
import PhotoSearch from '../../../screens/DailyIntake/components/PhotoSearch';
const width = Dimensions.get('screen').width;
const Stack = createNativeStackNavigator();

const Home = () => {
  const navigation = useNavigation();
  const [points, setPoints] = useState(0);
  const token = useSelector(state => state?.auth.token);
  const guest = useSelector(state => state?.auth.guest);
  const cartCount = useSelector(state => state.shopifyState.cartCount);
  const [visible, setVisible] = useState(false);
  const getRewards = async () => {
    try {
      const data = await getData(token, 'activity_reward/');
      //   console.log('rewardsssss dataaa', data);
      setPoints(data?.points);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    guest ? null : getRewards();
  }, []);
  const {Navigator, Screen} = Stack;
  useEffect(() => {}, []);
  return (
    <>
      <Navigator screenOptions={{}} defaultStatus="open">
        <Screen
          name="HomeScreens"
          component={HomeScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: 'linear-gradient(#e66465, #9198e5);',
            },

            headerTitleAlign: 'center',
            // headerTitleStyle: {fontSize: 24, marginTop: 20},
            headerLeft: () => {
              return (
                <>
                  <View
                    style={{
                      marginLeft: width * 0.3,
                    }}>
                    <TouchableOpacity>
                      <Image
                        height={35}
                        width={50}
                        style={{
                          height: 35,
                          width: 100,
                          marginBottom: 0,
                          marginLeft: width * 0.05,
                        }}
                        source={require('../../../../assets/nosugarTextGreen.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </>
              );
            },
            headerRight: () => {
              return (
                <View style={styles.headerStyle}>
                  {/* <TouchableOpacity
                    onPress={() => navigation.navigate('Rewardss')}>
                    <Text style={styles.headerText}>{points}</Text>
                    <Text style={styles.text}>
                      {points < 2 ? 'Points' : 'Points'}
                    </Text>
                  </TouchableOpacity> */}
                  {cartCount ? (
                    <TouchableOpacity
                      onPress={() => navigation.navigate('AddToCart')}
                      style={{marginLeft: 20, justifyContent: 'flex-end'}}>
                      <CartSvg height={30} width={30} />
                      {1 > 0 ? (
                        <View style={styles.container}>
                          <Badge
                            size={20}
                            style={{
                              color: 'white',
                              backgroundColor: '#72b853',
                              marginTop: 10,
                            }}>
                            {cartCount}
                          </Badge>
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  ) : null}
                  {/* <TouchableOpacity onPress={navigation?.navigate('Home')}>
                  <Image
                    height={40}
                    width={60}
                    style={{height: 40, width: 110}}
                    source={require('../../../../assets/nosugarTextGreen.png')}
                  />
                </TouchableOpacity> */}
                  {/* <TouchableOpacity onPress={() => setVisible(true)}>
                  <LocationSvg height={32} width={32} />
                </TouchableOpacity>
             
                <TouchableOpacity style={{marginHorizontal: 0}}>
                  <NotificationSvg height={32} width={32} />
                  {1 > 0 ? (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        marginTop: -10,
                        marginRight: -5,
                      }}>
                      <Badge
                        size={15}
                        style={{color: 'white', backgroundColor: '#72b853'}}>
                        {1}
                      </Badge>
                    </View>
                  ) : null}
                </TouchableOpacity> */}
                </View>
              );
            },
          }}
        />
        {/* <Screen
        name="OrderList"
        // component={ProductCard}
        options={{
          title: 'Orders',
          headerTitleAlign: 'center',
          // headerShown: false,
        }}
      /> */}
        <Stack.Screen
          name="Rewardss"
          component={Rewards}
          options={{
            title: 'Your Rewards',
          }}
        />
        <Screen
          name="VideoScreen"
          component={Videos}
          options={{
            title: 'Home',
            headerBackTitle: 'Back',
            headerTitleAlign: 'center',
            // headerShown: false,
          }}
        />

        <Screen
          name="Add Address"
          component={AddAddress}
          options={{
            title: 'Add Address',
            headerTitleAlign: 'center',
            // headerShown: false,
          }}
        />
        <Screen
          name="Add Meal"
          component={AddMEal}
          options={{
            title: 'Add Meal',
            headerTitleAlign: 'center',
            headerLeft: () => {
              return (
                <View style={{}}>
                  <IconButton
                    onPress={() => navigation?.goBack()}
                    icon="arrow-left"
                  />
                </View>
              );
            },
            // headerShown: false,
          }}
        />
        <Screen
          name="Thank You"
          component={ThankYou}
          options={{
            // title: 'Add Address',
            headerTitleAlign: 'center',
            // headerShown: false,
          }}
        />

        <Screen
          name="Order Details"
          component={OrderDetails}
          options={{
            title: 'Order Details',
            headerTitleAlign: 'center',
            // headerShown: false,
          }}
        />

        <Screen
          name="VideosListScreen"
          component={VideosList}
          options={{
            title: 'Videos List',
            headerTitleAlign: 'center',
            headerBackTitle: 'Back',
            // headerShown: false,
            // headerBackVisible: false,
            // headerShadowVisible: false,
          }}
        />
        <Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'My Profile',
            //   headerShown: false,
            headerStyle: {
              backgroundColor: '#86B841',
            },
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: 'Edit Profile',
          }}
        />
        <Screen
          name="CrushMyCraving"
          component={CrushMyCraving}
          options={{
            title: 'Crush My Craving',
          }}
        />
        <Screen
          name="GeneralScreen"
          component={GeneralScreen}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="TimerScreen"
          component={TimerScreen}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Congratulations"
          component={Congratulations}
          options={{
            headerShown: false,
          }}
        />

        <Screen
          name="Snacks"
          component={Snacks}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="SnacksTimer"
          component={SnacksTimer}
          options={{
            headerShown: false,
          }}
        />

        <Screen
          name="Music"
          component={Music}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="MusicTimer"
          component={MusicTimer}
          options={{
            headerShown: false,
          }}
        />

        <Screen
          name="Exercise"
          component={Exercise}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="ExerciseTimer"
          component={ExerciseTimer}
          options={{
            headerShown: false,
          }}
        />

        <Screen
          name="NoProblem"
          component={NoProblem}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="CrushStat"
          component={CrushStat}
          options={{
            // headerShown: false,
            headerLeft: () => {
              return (
                <IconButton
                  mode="outlined"
                  icon="arrow-left"
                  // size={30}
                  // style={{paddindBottom: 20}}
                  color={'gray'}
                  onPress={() => navigation.navigate('HomeScreens')}
                  // disabled={displaybutton}
                />
              );
            },
            title: 'Crush My Sugar Craving',
          }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            title: 'Auth',
            headerShown: false,
            headerTitleAlign: 'Auth',
          }}
        />
        <Stack.Screen
          name="ProductStack"
          component={Products}
          options={{
            title: 'Products',
            headerShown: false,
            // headerTitleAlign: 'Auth',
          }}
        />
        <Stack.Screen
          name="PhotoSearchHome"
          component={PhotoSearch}
          options={{
            title: 'Take a Picture of your meal',
            //   headerShown: false,

            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="DailyIntakeScreen"
          component={Intakes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Food Activity"
          component={FoodActivity}
          options={{
            title: 'Food History ',
            headerTitleAlign: 'center',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#41B87F',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',

            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Water Activity"
          component={WaterActivity}
          options={{
            title: 'Water History',
            headerStyle: {
              backgroundColor: '#1b95e0',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="SetYourGoal"
          component={SetYourGoal}
          options={{
            title: 'Set Your Goal',
            headerTitleAlign: 'center',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Exercise Activity"
          component={ExerciseActivity}
          options={{
            title: 'Exercise History',
            headerStyle: {
              backgroundColor: '#ff7824',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Sleep Activity"
          component={SleepActivity}
          options={{
            title: 'Sleep History',
            headerStyle: {
              backgroundColor: '#aa00d9',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Mood Activity"
          component={MoodActivity}
          options={{
            title: 'Mood History ',
            headerStyle: {
              backgroundColor: '#ffc014',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerShown: true,
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="CarbsCalculator"
          component={NetCarbsCalculator}
          options={{
            title: 'Calculator',
            headerTitleAlign: 'center',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="WaterIntake"
          component={WaterIntake}
          options={{
            title: 'Add Water',
            //   headerShown: false,

            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="SleepIntake"
          component={SleepIntake}
          options={{
            title: 'Add Sleep',
            //   headerShown: false,

            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FoodIntake"
          component={FoodIntake}
          options={{
            title: 'Add Calories',
            //   headerShown: false,
            // headerLeft: ({navigation, goBack}) => {
            //   return (
            //     <IconButton
            //       onPress={() => navigation.navigate('Water Activity')}
            //       icon={'arrow-left'}
            //     />
            //   );
            // },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="WalkIntake"
          component={WalkIntake}
          options={{
            title: 'Add Walk',
            //   headerShown: false,

            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ProductScanner"
          component={QrScanner}
          options={{
            title: 'Scan Your Product',
            //   headerShown: false,

            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="QrProduct"
          component={QrProduct}
          options={{
            title: 'Add Product',
            //   headerShown: false,

            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="ScannedProductDetails"
          component={ScannedProductDetails}
          options={{
            title: 'Product Detail',
            //   headerShown: false,

            headerTitleAlign: 'center',
          }}
        />
      </Navigator>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: -8,
    marginRight: -5,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    // color: '#66cc33',
    color: 'black',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    // color: '#66cc33',
    color: 'black',
  },
  headerStyle: {
    flexDirection: 'row',
    height: 40,
    marginBottom: 10,
  },
});
