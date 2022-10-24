import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Dimensions, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FavFoods from '../../../screens/Profile/Favorite';
import Profile from '../../../screens/Profile';
import {EditProfile} from '../../../screens/Profile/EditProfile';
import Rewards from '../../../screens/Rewards';
import Orders from '../../../screens/Products/Orders';
import OrderDetails from '../../../screens/Products/Orders/OrderDetails';
import ManageAddress from '../../../screens/Profile/ManageAddress';

const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;
const ProfileScreen = () => {
  const {navigate} = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: '',
          //   headerShown: false,
          headerLeft: () => {
            return (
              <View
                style={{
                  marginLeft: width * 0.33,
                }}>
                <TouchableOpacity onPress={() => navigate('Home')}>
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
          // headerStyle: {
          //   backgroundColor: '#86B841',
          // },
          // headerTitleAlign: 'center',
          // headerTintColor: 'white',
        }}
      />

      <Stack.Screen
        name="Manage Address"
        component={ManageAddress}
        options={{
          title: 'Manage Address',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name="Rewards"
        component={Rewards}
        options={{
          title: 'Your Rewards',
        }}
      />
      <Stack.Screen
        name="FavFoods"
        component={FavFoods}
        options={{
          title: 'Your Fav Foods',
        }}
      />
      <Stack.Screen
        name="OrdersList"
        component={Orders}
        options={{
          title: 'Orders History',
        }}
      />
      <Stack.Screen
        name="Order Details"
        component={OrderDetails}
        options={{
          title: 'Orders Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileScreen;
