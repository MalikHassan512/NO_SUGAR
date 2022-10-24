import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Droplets from '../../../../assets/Droplets.svg';
import Glass from '../../../../assets/GlassGoal.svg';
import Add from '../../../../assets/AddWater.svg';
import Sub from '../../../../assets/SubWater.svg';
import Moon from '../../../../assets/Moon.svg';
import Walk from '../../../../assets/Walk.svg';
import Calories from '../../../../assets/CalorieIcon.svg';
import GradientButton from '../../../components/GradientBotton';
import ProgressCircle from 'react-native-progress-circle';
import Slider from 'react-native-slider';
import {getData, postData} from '../../NetworkRequest';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

const width = Dimensions.get('window').width;
export default function SetYourGoal() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector(state => state?.auth?.token);
  const [goalData, setGaolData] = useState({});
  const [loading, setLoading] = useState(true);
  const [waterQuantity, setWaterQuantity] = useState(
    goalData?.Water?.Target || 8,
  );
  const [sleepQuantity, setSleepQuantity] = useState(
    goalData?.Sleep?.Target || 8,
  );
  const [walkQuantity, setWalkQuantity] = useState(goalData?.Walk?.Target || 2);
  const [caloriesQuantity, setCaloriesQuantity] = useState(
    goalData?.Calories?.Target || 1000,
  );
  const getGoalData = async () => {
    try {
      const data = await getData(token, 'goal/');
      setLoading(false);
      setGaolData(data);
      console.log('initial goal', data);
    } catch (error) {
      console.log(error?.response);
    }
  };
  const sendGoalData = async () => {
    setIsLoading(true);
    try {
      await postData(token, 'goal/', {
        calories: caloriesQuantity,
        sleep: sleepQuantity,
        water: waterQuantity,
        walk: walkQuantity * 1000,
        goal_type: 'Burn',
      });
      setIsLoading(false);
      getGoalData();
      navigation?.goBack();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGoalData();
  }, []);
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={{alignItems: 'center', marginVertical: 10}}>
        <ImageBackground
          style={styles.BannerBackground}
          source={require('../../../../assets/SetYourGoalBanner.png')}>
          <Text style={styles.textStyle}>
            You have 3 daily tasks to complete today
          </Text>
        </ImageBackground>
      </View>
      <Text style={styles.SetStyle}>Set Your Goal</Text>

      {/* Water */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          flex: 0.35,
          marginHorizontal: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
        colors={['#38DED4', '#2834A7']}>
        <View style={{flex: 0.9}}>
          <View style={styles.StepContainer}>
            <View style={{flex: 0.23, paddingTop: 10, alignItems: 'center'}}>
              <Droplets style={{marginLeft: -10}} height={30} width={30} />
              <Text style={{color: 'white', marginTop: 5}}>Water</Text>
              <Text style={styles.Count}>{waterQuantity}</Text>
              <Text style={{color: 'white', marginTop: 5}}>Glasses</Text>
            </View>
            <View style={{flex: 0.72}}>
              <View style={styles.WalkInContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={styles.Gradient}
                  colors={['#106267', '#0E1DA8']}>
                  <Text style={{color: 'white'}}>Set Your Water Goal</Text>
                  <View style={styles.WalkInnner}>
                    <Glass height={50} width={60} />

                    <TouchableOpacity
                      onPress={() =>
                        waterQuantity === 0
                          ? null
                          : setWaterQuantity(waterQuantity - 1)
                      }>
                      <Sub />
                    </TouchableOpacity>
                    <Text style={styles.number}>{waterQuantity}</Text>
                    <TouchableOpacity>
                      <Add
                        onPress={() => setWaterQuantity(waterQuantity + 1)}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row-reverse'}}>
                    <Text style={{color: 'white', fontSize: 12}}>Per Day</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Ideal}>
          <Text style={{fontSize: 8, color: 'white'}}>
            8 Glasses Ideal Water Intake/day
          </Text>
        </View>
      </LinearGradient>

      {/* Sleep */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          flex: 0.35,
          marginHorizontal: 10,
          borderRadius: 20,
          marginBottom: 10,
        }}
        colors={['#FF7288', '#FF7D25']}>
        <View style={{flex: 0.9}}>
          <View style={styles.StepContainer}>
            <View style={styles.IconContainer}>
              <Moon height={30} width={30} />
              <Text style={{color: 'white', marginTop: 5}}>Sleep</Text>
              <Text style={styles.Count}>{sleepQuantity}</Text>
              <Text style={{color: 'white', marginTop: 5}}>Hours</Text>
            </View>
            <View style={{flex: 0.72}}>
              <View style={styles.WalkInContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={styles.Gradient}
                  colors={['#FD6E0D', '#FD4C68']}>
                  <Text style={{color: 'white'}}>Set Your Sleep Goal</Text>
                  <Slider
                    onValueChange={e => setSleepQuantity(e)}
                    minimumValue={0}
                    maximumValue={12}
                    step={2}
                    value={sleepQuantity}
                    minimumTrackTintColor="#FFE5A3"
                    maximumTrackTintColor="#DACECE"
                    thumbTintColor="white"
                  />
                  <View style={styles.hourSetting}>
                    <Text style={styles.hourTime}></Text>
                    <Text style={styles.hourTime}>2h</Text>
                    <Text style={styles.hourTime}>4h</Text>
                    <Text style={styles.hourTime}>6h</Text>
                    <Text style={styles.hourTime}>8h</Text>
                    <Text style={styles.hourTime}>10h</Text>
                    <Text style={styles.hourTime}>12h</Text>
                  </View>
                  <View style={{flexDirection: 'row-reverse'}}>
                    <Text style={styles.PerDay}>Per Day</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Ideal}>
          <Text style={{fontSize: 8, color: 'white'}}>
            8 Hours Ideal Sleep/day
          </Text>
        </View>
      </LinearGradient>

      {/* Steps*/}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          flex: 0.35,
          marginHorizontal: 10,
          borderRadius: 20,
        }}
        colors={['#21449D', '#FA3392']}>
        <View style={{flex: 0.9}}>
          <View style={styles.StepContainer}>
            <View style={styles.IconContainer}>
              <Walk height={30} width={30} />
              <Text style={{color: 'white', marginTop: 5}}>Walk</Text>
              <Text style={styles.Count}>{walkQuantity * 1000}</Text>
              <Text style={{color: 'white', marginTop: 5}}>Steps</Text>
            </View>
            <View style={{flex: 0.72}}>
              <View style={styles.WalkInContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={styles.Gradient}
                  colors={['#0E2A74', '#FB1F89']}>
                  <Text style={{color: 'white'}}>Set Your Walk Goal</Text>
                  <View style={styles.WalkInnner}>
                    <ProgressCircle
                      percent={(walkQuantity / 10) * 100}
                      radius={30}
                      borderWidth={5}
                      color="#F354B4"
                      shadowColor="#eaeaea"
                      bgColor="#FB1F89">
                      <Text style={{color: 'white', fontSize: 12}}>
                        {walkQuantity * 1000}
                      </Text>
                      <Text style={{color: 'white'}}>Steps</Text>
                    </ProgressCircle>
                    <TouchableOpacity
                      onPress={() =>
                        walkQuantity === 0
                          ? null
                          : setWalkQuantity(walkQuantity - 1)
                      }>
                      <Sub />
                    </TouchableOpacity>
                    <View style={styles.kmSetting}>
                      <Text style={styles.number}>{walkQuantity}</Text>
                      <Text style={styles.km}>Km</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setWalkQuantity(walkQuantity + 1)}>
                      <Add />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.PerDaySetting}>
                    <Text style={styles.PerDay}>Per Day</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Ideal}>
          <Text style={styles.IdealText}>8-10 Km Ideal Walk/day</Text>
        </View>
      </LinearGradient>

      {/* Calories */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{
          flex: 0.35,
          marginHorizontal: 10,
          borderRadius: 20,
          marginVertical: 10,
        }}
        colors={['#9CD228', '#31C25A']}>
        <View style={{flex: 0.9}}>
          <View style={styles.StepContainer}>
            <View style={styles.IconContainer}>
              <Calories height={30} width={30} />
              <Text style={{color: 'white', marginTop: 5}}>Calories</Text>
              <Text style={styles.Count}>{caloriesQuantity}</Text>
              <Text style={{color: 'white', marginTop: 5}}>Kcal</Text>
            </View>
            <View style={{flex: 0.72}}>
              <View style={styles.WalkInContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  style={styles.Gradient}
                  colors={['#A6E420', '#09BF3C']}>
                  <Text style={{color: 'white'}}>Set Your Calories Goal</Text>
                  {/* <Slider
                    onValueChange={e => setCaloriesQuantity(e)}
                    minimumValue={0}
                    maximumValue={3000}
                    step={500}
                    value={caloriesQuantity}
                    minimumTrackTintColor="#FFE5A3"
                    maximumTrackTintColor="#DACECE"
                    thumbTintColor="white"
                  />
                  <View style={styles.hourSetting}>
                    <Text style={styles.hourTime}></Text>
                    <Text style={styles.hourTime}>500</Text>
                    <Text style={styles.hourTime}>1000</Text>
                    <Text style={styles.hourTime}>1500</Text>
                    <Text style={styles.hourTime}>2000</Text>
                    <Text style={styles.hourTime}>2500</Text>
                    <Text style={styles.hourTime}>3000</Text>
                  </View> */}
                  <View style={styles.WalkInnner}>
                    <ProgressCircle
                      percent={(caloriesQuantity / 2500) * 100}
                      radius={30}
                      borderWidth={5}
                      color="#A6E420"
                      shadowColor="white"
                      bgColor="#4CA507">
                      <Text style={{color: 'white', fontSize: 14}}>
                        {caloriesQuantity}
                      </Text>
                      <Text style={{color: 'white'}}>Kcal</Text>
                    </ProgressCircle>
                    <TouchableOpacity
                      onPress={() =>
                        caloriesQuantity === 0
                          ? null
                          : setCaloriesQuantity(caloriesQuantity - 100)
                      }>
                      <Sub />
                    </TouchableOpacity>
                    <View style={styles.kmSetting}>
                      <Text style={styles.number}>{caloriesQuantity}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        setCaloriesQuantity(caloriesQuantity + 100)
                      }>
                      <Add />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row-reverse'}}>
                    <Text style={styles.PerDay}>Per Day</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Ideal}>
          <Text style={{fontSize: 8, color: 'white'}}>
            2000 Kcal Ideal Calories/day
          </Text>
        </View>
      </LinearGradient>

      <GradientButton
        isLoading={isLoading}
        onSubmit={() => {
          sendGoalData();
        }}
        height={60}
        borderRadius={35}
        title={'Save'}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
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
    marginVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    height: 60,
    justifyContent: 'center',
  },
  Gradient: {
    flex: 0.96,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  hourSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: -10,
  },
  hourTime: {
    color: 'white',
    fontSize: 12,
  },
  StepContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  IconContainer: {
    flex: 0.23,
    paddingTop: 10,
    alignItems: 'center',
  },
  Count: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginTop: 5,
  },

  WalkInContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 20,
  },
  WalkInnner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kmSetting: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  km: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: '700',
    color: 'white',
  },
  PerDaySetting: {
    flexDirection: 'row-reverse',
    marginTop: -10,
  },
  IdealText: {
    fontSize: 8,
    color: 'white',
  },
  Ideal: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PerDay: {color: 'white', fontSize: 12},
  SetStyle: {
    fontWeight: '700',
    fontSize: 23,
    marginHorizontal: 15,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 25,
    marginHorizontal: 45,
  },
  BannerBackground: {
    height: 130,
    // width: 350,
    width: width - 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BannerContainer: {
    margin: 15,
    flex: 0.18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
});

{
  /* <LinearGradient
start={{x: 0, y: 0}}
end={{x: 1, y: 0}}
style={styles.loginButton}
colors={['#41B87F', '#86B841']}>
<TouchableOpacity
  onPress={() => {
    sendGoalData();
  }}>
  <View style={styles.loginContainer}>
    <Text style={styles.loginTouch}>Save</Text>
  </View>
</TouchableOpacity>
</LinearGradient> */
}
