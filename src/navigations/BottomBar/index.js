import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, Text} from 'react-native';
import HomeScreen from '../AppStacks/Home';
import {DrawerActions} from '@react-navigation/native';
import ProductsScreen from '../AppStacks/Products';
import CommunityScreen from '../AppStacks/Community';
import LifeStyle from '../AppStacks/LifeStyle';
import Product from '../../../assets/producticon.svg';
import Product2 from '../../../assets/producticon2.svg';
import Recipe from '../../../assets/RecipesGrey.svg';
import RecipeGreen from '../../../assets/RecipesGreen.svg';
import ProfileScreen from '../AppStacks/Profile';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/core';

const GrayText = styled(Text)`
  font-size: 10px;
  color: #72b852;
`;

const GreenText = styled(Text)`
  font-size: 10px;
  color: grey;
`;

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  // const guest = useSelector(state => state?.auth?.guest);
  const navigation = useNavigation();

  return (
    <>
      <Tab.Navigator 
      
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarButton: props => (
              <TouchableOpacity
                {...props}
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              />
            ),
            tabBarLabel: ({focused, color}) =>
              focused ? (
                <GreenText>Menu</GreenText>
              ) : (
                <GreenText>Menu</GreenText>
              ),
            headerShown: false,
            tabBarIcon: ({focused, color}) =>
              focused ? (
                <Ionicons color="#D2D2D2" size={30} name="menu" />
              ) : (
                <Ionicons color="#D2D2D2" size={30} name="menu" />
              ),
          }}
        />

        <Tab.Screen
          name="ProductScreen"
          component={ProductsScreen}
          options={{
            tabBarLabel: ({focused, color}) =>
              focused ? <GrayText>Shop</GrayText> : <GreenText>Shop</GreenText>,
            headerShown: false,
            tabBarIcon: ({focused, color}) =>
              focused ? <Product2 /> : <Product />,
          }}
        />

        <Tab.Screen
          name="LifeStyleScreen"
          component={LifeStyle}
          options={{
            tabBarLabel: ({focused, color}) =>
              focused ? (
                <GrayText>Recipes</GrayText>
              ) : (
                <GreenText>Recipes</GreenText>
              ),
            headerShown: false,
            tabBarIcon: ({focused, color}) =>
              focused ? (
                <RecipeGreen width={30} height={27} />
              ) : (
                <Recipe width={30} height={27} />
              ),
            // tabBarIcon: ({focused, color}) =>
            //   focused ? (
            //     <Ionicons color="#72B852" size={30} name="food-fork-drink" />
            //   ) : (
            //     <Ionicons color="grey" size={30} name="food-fork-drink" />
            //   ),
          }}
        />

        <Tab.Screen
          name="Community"
          component={CommunityScreen}
          options={{
            tabBarLabel: ({focused, color}) =>
              focused ? (
                <GrayText>Community</GrayText>
              ) : (
                <GreenText>Community</GreenText>
              ),

            headerShown: false,
            tabBarIcon: ({focused, color}) =>
              focused ? (
                <Ionicons
                  color="#72B852"
                  size={30}
                  name="google-circles-communities"
                />
              ) : (
                <Ionicons
                  color="#D2D2D2"
                  size={30}
                  name="google-circles-communities"
                />
              ),
          }}
        />

        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: ({focused, color}) =>
              focused ? (
                <GrayText>Profile</GrayText>
              ) : (
                <GreenText>Profile</GreenText>
              ),
            headerShown: false,
            tabBarIcon: ({focused, color}) =>
              focused ? (
                <Ionicons color="#72B852" size={30} name="account" />
              ) : (
                <Ionicons color="#D2D2D2" size={30} name="account" />
              ),
          }}
        />

        {/* <Tab.Screen
        name="Settings"
        component={<View></View>}
        options={({navigation}) => ({
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={() => console.log()} />
          ),
        })}
      /> */}
        {/* <Tab.Screen
          name="Drawer"
          component={Home}
          options={{
            tabBarIconStyle: {display: 'none'},
            tabBarLabelStyle: {display: 'none'},
            // tabBarStyle: {display: 'none'},
            tabBarLabel: '',

            headerShown: false,
            tabBarIcon: ({focused, color}) =>
              focused ? (
                <Ionicons color="#72B852" size={30} name="menu" />
              ) : (
                <Ionicons color="grey" size={30} name="menu" />
              ),
          }}
        /> */}
      </Tab.Navigator>
      {/* <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        style={{
          position: 'absolute',
          // top: height * 0.927,
          left: 20,
          paddingTop: height * 0.92,
          width: 35,
          zIndex: 2,
        }}>
        <Ionicons color="#D2D2D2" size={35} name="menu" />
        <Text style={{fontSize: 10, textAlign: 'center', color: 'grey'}}>
          Menu
        </Text>
      </TouchableOpacity> */}
    </>
  );
};

export default BottomTabs;
