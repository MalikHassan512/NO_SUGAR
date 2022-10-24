import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import CommunityScreen from '../../../screens/Community';
import PostScreen from '../../../screens/Community/AddPost';
import AllComments from '../../../screens/Community/AllCommnets';
import {View, Dimensions, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const width = Dimensions.get('screen').width;

const Community = () => {
  const {navigate} = useNavigation();
  const name = useSelector(state => state?.profile?.name);
  console.log(name);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: '#41b87e',
        },
      }}>
      <Stack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          title: '',
          // headerTitleAlign: 'left',
          // headerTintColor: 'white',
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
        }}
      />
      <Stack.Screen
        name="AllComments"
        component={AllComments}
        options={({route}) => ({
          title: `${
            name === route?.params?.name ? 'Your' : route?.params?.name
          } Post`,
          // headerTitleAlign: 'left',
          // headerTintColor: 'white',
        })}
      />
      <Stack.Screen
        name="AddPost"
        component={PostScreen}
        options={{
          title: 'Add Post',
          // headerTintColor: 'white',
          // headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default Community;
