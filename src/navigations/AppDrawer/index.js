import React, {useEffect} from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import CrushSvg from '../../../assets/cravingicon.svg';
import {IconButton} from 'react-native-paper';
import HomeSvg from '../../../assets/Home.svg';
import Home2Svg from '../../../assets/Home2.svg';
import AppDeviceSvg from '../../../assets/App & Device.svg';
import LiveTrackingSvg from '../../../assets/Live Tracking.svg';
import MealSvg from '../../../assets/Meal.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IntakeSvg from '../../../assets/intakeicon.svg';
import CrushMyCraving from '../../screens/CrushMyCraving';
import VideoList from '../../screens/Home/components/VideosList';
import ComingSoon from '../../screens/Home/components/ComingSoon';
import TrackProgress from '../../screens/DailyIntake';
import BottomTabs from '../BottomBar';
import {useDispatch, useSelector} from 'react-redux';
import dp from '../../../assets/male.png';
import {logOut} from '../../redux/actions/authActions';
import {useShopify} from '../../custom_hooks/shopify_hook';
import {getProfile} from '../../redux/actions/profileActions';
import Meal from '../../screens/Home/components/Meal';

const Drawer = createDrawerNavigator();
const {Navigator, Screen} = Drawer;
const width = Dimensions.get('screen').width;

const AppDrawer = () => {
  const {
    createShop,
    createCheckout,
    fetchProducts,
    // fetchCollection,
  } = useShopify();

  useEffect(() => {
    createShop();
    fetchProducts();
    createCheckout();
    // fetchCollection()
  }, []);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  // const [profileData, setProfileData] = useState(null);
  const profileData = useSelector(state => state?.profile?.profile_data);

  const token = useSelector(state => state?.auth?.token);
  const guest = useSelector(state => state?.auth?.guest);

  useEffect(() => {
    guest ? null : dispatch(getProfile(token));
  }, []);
  return (
    <Navigator
      drawerType="slide"
      drawerStyle={{
        backgroundColor: '#41B87F',
      }}
      screenOptions={{
        activeTintColor: 'black',
        labelStyle: {color: 'white'},
      }}
      drawerContent={props => (
        <DrawerContentScrollView
          // style={{backgroundColor: '#41B87F'}}
          {...props}>
          {false ? null : (
            <View>
              <Image
                style={styles.imageContainer}
                // size={100}
                source={profileData?.image ? {uri: profileData?.image} : dp}
              />

              <Text numberOfLines={1} style={styles.nameContainer}>
                {profileData?.email
                  ? profileData?.name
                    ? profileData?.name
                    : profileData?.email.slice(
                        0,
                        profileData?.email.indexOf('@'),
                      )
                  : 'Guest User'}
              </Text>
            </View>
          )}

          <DrawerItemList {...props} />

          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              // removeValue();

              dispatch(logOut());
            }}>
            <View style={styles.addressEditContainer}>
              <Icon color="#72B852" size={35} name="logout" />

              <View>
                <Text style={styles.editAddressText}>
                  {guest ? 'Go to Login' : 'Logout'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </DrawerContentScrollView>
      )}>
      <Screen
        name="HomeScreen"
        component={BottomTabs}
        active
        options={{
          drawerItemStyle: {display: 'none'},
          drawerIcon: ({focused, color}) =>
            focused ? <HomeSvg /> : <Home2Svg />,
          headerShown: false,
          title: 'Home',

          drawerLabelStyle: {color: 'black', fontSize: 16, fontWeight: '700'},
        }}
      />

      {guest ? null : (
        <Screen
          name="TrackMyProgress"
          component={TrackProgress}
          options={{
            title: '',
            // headerShown: false,
            drawerLabel: 'Track My Progress',
            headerLeft: () => {
              return (
                <View
                  style={{
                    marginLeft: width * 0.33,
                  }}>
                  <TouchableOpacity onPress={() => navigate('HomeScreen')}>
                    <Image
                      height={40}
                      width={60}
                      style={{height: 40, width: 110}}
                      source={require('../../../assets/nosugarTextGreen.png')}
                    />
                  </TouchableOpacity>
                </View>
              );
            },
            drawerItemStyle: {
              marginTop: 30,
            },
            drawerLabelStyle: {
              color: 'black',
              marginLeft: -8,
              fontSize: 16,
              fontWeight: '700',
            },
            drawerIcon: ({focused, color}) =>
              focused ? (
                <IntakeSvg width={30} height={30} />
              ) : (
                <IntakeSvg width={30} height={30} />
              ),
          }}
        />
      )}
      <Screen
        name="CrushMyCraving"
        component={CrushMyCraving}
        options={{
          title: '',
          // headerShown: false,
          drawerLabel: 'Crush My Craving',
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: width * 0.33,
                }}>
                <TouchableOpacity
                  onPress={() => navigate('HomeScreen', {screen: 'Home'})}>
                  <Image
                    height={40}
                    width={60}
                    style={{height: 40, width: 110}}
                    source={require('../../../assets/nosugarTextGreen.png')}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          drawerItemStyle: {
            marginTop: 10,
          },
          drawerLabelStyle: {
            color: 'black',
            marginLeft: 0,
            fontSize: 16,
            fontWeight: '700',
          },
          drawerIcon: ({focused, color}) =>
            focused ? <CrushSvg /> : <CrushSvg />,
        }}
      />
      <Screen
        name="Exercise"
        component={VideoList}
        options={{
          title: 'Videos List',
          drawerLabel: 'Exercise',
          headerTitleAlign: 'center',
          // headerShown: false,
          headerLeft: () => {
            return (
              <View style={{}}>
                <TouchableOpacity onPress={() => navigate('HomeScreen')}>
                  <IconButton icon="arrow-left" />
                </TouchableOpacity>
              </View>
            );
          },
          drawerItemStyle: {
            marginTop: 10,
          },
          drawerLabelStyle: {
            color: 'black',
            marginLeft: -5,
            fontSize: 16,
            fontWeight: '700',
          },
          drawerIcon: ({focused, color}) =>
            focused ? (
              <Icon color="#72B852" size={35} name="weight-lifter" />
            ) : (
              <Icon
                style={{marginLeft: -6}}
                color="#72B852"
                size={35}
                name="weight-lifter"
              />
            ),
        }}
      />
      {/* <Screen
        name="Meal"
        component={Meal}
        options={{
          title: '',
          drawerLabel: 'Meals',
          // headerShown: false,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: width * 0.33,
                }}>
                <TouchableOpacity onPress={() => navigate('HomeScreens')}>
                  <Image
                    height={40}
                    width={60}
                    style={{height: 40, width: 110}}
                    source={require('../../../assets/nosugarTextGreen.png')}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          drawerItemStyle: {
            marginTop: 10,
          },
          drawerLabelStyle: {
            color: 'black',
            marginLeft: -5,
            fontSize: 16,
            fontWeight: '700',
          },
          drawerIcon: ({focused, color}) =>
            focused ? (
              <MealSvg height={30} width={30} />
            ) : (
              <MealSvg height={30} width={30} />
            ),
        }}
      /> */}
      {/* <Screen
        name="Apps & Devices"
        component={ComingSoon}
        options={{
          title: '',
          drawerLabel: 'Apps & Devices',
          // headerShown: false,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: width * 0.33,
                }}>
                <TouchableOpacity onPress={() => navigate('HomeScreen')}>
                  <Image
                    height={40}
                    width={60}
                    style={{height: 40, width: 110}}
                    source={require('../../../assets/nosugarTextGreen.png')}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          drawerItemStyle: {
            marginTop: 10,
          },
          drawerLabelStyle: {
            color: 'black',
            marginLeft: -5,
            fontSize: 16,
            fontWeight: '700',
          },
          drawerIcon: ({focused, color}) =>
            focused ? (
              <AppDeviceSvg height={30} width={30} />
            ) : (
              <AppDeviceSvg height={30} width={30} />
            ),
        }}
      /> */}

      {/* <Screen
        name="Live Tracking"
        component={ComingSoon}
        options={{
          title: '',
          drawerLabel: 'Live Tracking',
          // headerShown: false,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: width * 0.33,
                }}>
                <TouchableOpacity onPress={() => navigate('HomeScreen')}>
                  <Image
                    height={40}
                    width={60}
                    style={{height: 40, width: 110}}
                    source={require('../../../assets/nosugarTextGreen.png')}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          drawerItemStyle: {
            marginTop: 10,
          },
          drawerLabelStyle: {
            color: 'black',
            marginLeft: -5,
            fontSize: 16,
            fontWeight: '700',
          },
          drawerIcon: ({focused, color}) =>
            focused ? (
              <LiveTrackingSvg height={30} width={30} />
            ) : (
              <LiveTrackingSvg height={30} width={30} />
            ),
        }}
      /> */}
    </Navigator>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 5,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    // marginVertical: 2,
  },
  nameContainer: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 20,
    marginVertical: 1,
    color: 'black',
  },
  editAddressText: {
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 25,
    marginTop: 7,
  },
  addressEditContainer: {
    flexDirection: 'row',
    // justifyContent: '',
    marginVertical: 10,
    marginHorizontal: 15,
    marginTop: 10,
  },

  iconContainer: {
    justifyContent: 'flex-end',
  },
});
export default AppDrawer;
