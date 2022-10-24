import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Image, TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DailyIntake from '../../../screens/DailyIntake/index';
import Ingredients from '../../../screens/DailyIntake/Ingredients';
import Mood from '../../../screens/DailyIntake/components/Mood';
import Exercise from '../../../screens/DailyIntake/Ingredients/Exercise';
import Devices from '../../../screens/DailyIntake/components/Device';
import PhotoSearch from '../../../screens/DailyIntake/components/PhotoSearch';

const Stack = createNativeStackNavigator();
const width = Dimensions.get('window').width;
const LifestyleScreen = () => {
  const {navigate} = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DailyIntake"
        component={DailyIntake}
        options={{
          title: '',
          //   headerShown: false,
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
                    style={{height: 35, width: 100, marginBottom: 0}}
                    source={require('../../../../assets/nosugarTextGreen.png')}
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Ingredients"
        component={Ingredients}
        options={{
          title: 'Add Intake',
          //   headerShown: false,

          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Add Exercise"
        component={Exercise}
        options={{
          title: 'Add Exercise',
          //   headerShown: false,

          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ConnectDevice"
        component={Devices}
        options={{
          title: 'Connect Device',
          //   headerShown: false,

          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PhotoSearch"
        component={PhotoSearch}
        options={{
          title: 'Take a Picture of your meal',
          //   headerShown: false,

          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Mood"
        component={Mood}
        options={{
          title: 'Add Mood',
          //   headerShown: false,

          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default LifestyleScreen;
