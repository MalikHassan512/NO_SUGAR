import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from '../AppStacks/Auth';
import {useSelector} from 'react-redux';
import AppDrawer from '../AppDrawer';

const AppNavigator = () => {
  const status = useSelector(state => state.auth?.status);

  return (
    <NavigationContainer>
      {status ? <AppDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
