import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './navigations/AppNavigator';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import Orientation from 'react-native-orientation-locker';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import theme from './constants/theme';

import {store, persistor} from './redux/store';
import Splash from './screens/SplashScreen';

GoogleSignin.configure({
  iosClientId:
    '157288529748-u021jammpqb385rf35c6n7j2c1rjjn2g.apps.googleusercontent.com',
  webClientId:
    '157288529748-kpm2c2ssls7526vv1j2vu75j2k88j4td.apps.googleusercontent.com',
});
const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return clearTimeout();
  }, []);
  Orientation.lockToPortrait();

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            {/* <SafeAreaView> */}
            {loading ? <Splash /> : <AppNavigator />}
            {/* </SafeAreaView> */}
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
};

export default App;
