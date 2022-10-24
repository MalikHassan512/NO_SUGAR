import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Card, IconButton, Snackbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import app from '@react-native-firebase/app';
import {useNavigation} from '@react-navigation/core';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import axios from 'axios';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {url} from '../../constants/url';
import Facebook from '../../../assets/Social/Facebook';
import Apple from '../../../assets/Social/Apple';
import Google from '../../../assets/Social/Google2';
import {logIn} from '../../redux/actions/authActions';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestLoading, setGuestIsLoading] = useState(false);

  const onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
    console.log('apple authhh', credentialState);
    const currentID = await auth().currentUser.getIdToken(
      /* forceRefresh */ true,
    );
    console.log('currenttttttt', currentID);
    const {data} = await axios.post(`${url}f_login/`, {
      firebase_token: currentID,
    });
    console.log('tokennnnnnn', data);
    dispatch(logIn({uuid: data?.user_uuid, token: data?.token}));
  };
  const signIn = async () => {
    try {
      // await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      console.log(idToken);
      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken,
      );
      const dataaaa = await auth().signInWithCredential(googleCredential);
      console.log('dataaaaaa', dataaaa);
      const currentID = await auth().currentUser.getIdToken(
        /* forceRefresh */ true,
      );
      console.log('currenttttttt', currentID);
      const {data} = await axios.post(`${url}f_login/`, {
        firebase_token: currentID,
      });
      console.log('tokennnnnnn', data);
      dispatch(logIn({uuid: data?.user_uuid, token: data?.token}));

      // const {user} = await auth().signInWithCredential(googleCredential);
      // console.log('Token id', user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log(' some other error happened', error);
      }
    }
  };

  const auth_with_facebook = () => {
    return new Promise(async (res, rej) => {
      try {
        const result = await LoginManager.logInWithPermissions([
          'email',
          'public_profile',
        ]);
        if (result.isCancelled) {
          console.log('User cancelled the login process');
        }
        const currentID = await auth().currentUser.getIdToken(
          /* forceRefresh */ true,
        );
        // const datas = await AccessToken.getCurrentAccessToken();
        // console.log(datas);
        // if (!datas) {
        //   console.log('Something went wrong obtaining access token');
        // }
        // const facebookCredential = await auth.FacebookAuthProvider.credential(
        //   datas.accessToken,
        // );
        // console.log('facebook credntilass', facebookCredential);
        // const currentID = await auth().currentUser.getIdToken(
        //   /* forceRefresh */ true,
        // );
        // console.log('currenttttttt', currentID);
        // const {user} = await auth().signInWithCredential(facebookCredential);
        console.log('userrrrrrrr', currentID);
        const {data} = await axios.post(`${url}f_login/`, {
          firebase_token: currentID,
        });
        console.log('tokennnnnnn', data);
        dispatch(
          logIn({uuid: data?.user_uuid, token: data?.token, register: false}),
        );
      } catch (error) {
        console.log(`${error.message} ${error.code}`);
        console.log(error);
      }
    });
  };

  const login = async values => {
    setIsLoading(true);

    try {
      const {data} = await axios.post(`${url}login/`, values);

      dispatch(logIn({uuid: data?.user_uuid, token: data?.token}));
      setIsLoading(false);
    } catch (error) {
      setIsMessageVisible(true);
      setIsLoading(false);
      setMessage(error?.response.data.message);
    }
  };
  const register = async () => {
    setGuestIsLoading(true);
    try {
      dispatch(logIn({uuid: '', token: '', guest: true}));
    } catch (error) {
      console.log(error);

      setIsMessageVisible(true);
      setMessage(error?.response?.data?.message);
    } finally {
      setGuestIsLoading(false);
    }
  };
  return (
    <View style={styles.mainContainer}>
      {/* <Ribbon /> */}
      <View>
        <Image
          resizeMode="cover"
          height={100}
          width={100}
          style={styles.ribbon}
          source={require('../../../assets/ribbon.png')}
        />
        <Image
          resizeMode="contain"
          height={height * 0.2}
          width={200}
          style={styles.loginImage}
          source={require('../../../assets/nosugarText.png')}
        />
      </View>

      <View>
        <Card style={styles.loginView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.loginText}> Login</Text>
            <TouchableOpacity
              onPress={() => register()}
              style={{flexDirection: 'row'}}>
              {isGuestLoading ? <ActivityIndicator color="green" /> : null}
              <Text style={[styles.forgetText, {marginTop: 10}]}>
                Continue as Guest
              </Text>
            </TouchableOpacity>
          </View>
          <Formik
            initialValues={{username: '', password: ''}}
            onSubmit={values => login(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                <View style={styles.inputContainer}>
                  <View style={styles.inputTextContainer}>
                    <IconButton
                      uppercase={false}
                      color="#868686"
                      icon="email-outline"
                    />
                    <TextInput
                      placeholder="Email"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      // multiline
                      returnKeyType="next"
                      placeholderStyle={styles.inputText}
                      placeholderTextColor="gray"
                      value={values.username}
                      style={styles.inputText}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.inputTextContainer}>
                    <IconButton
                      uppercase={false}
                      color="#868686"
                      icon="lock-outline"
                    />
                    <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholder="Password"
                      returnKeyType="done"
                      secureTextEntry={true}
                      placeholderTextColor="gray"
                      style={styles.inputText}
                    />
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('ForgetPassword')}>
                      <Text style={styles.forgetText}>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.loginButton}
                  colors={['#41B87F', '#86B841']}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.loginContainer}>
                      {isLoading ? <ActivityIndicator color="white" /> : null}
                      <Text style={styles.loginTouch}>Login</Text>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            )}
          </Formik>
          <View>
            <Text style={styles.orText}>------ OR -------</Text>
            <View style={styles.SocialContainer}>
              <TouchableOpacity onPress={signIn}>
                <Google width={50} height={50} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onAppleButtonPress}>
                <Apple />
              </TouchableOpacity>

              <TouchableOpacity onPress={auth_with_facebook}>
                <Facebook />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('GoalsScreen')}>
              <Text style={styles.createTouch}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
      <Snackbar
        visible={isMessageVisible}
        style={{borderRadius: 30}}
        onDismiss={() => setIsMessageVisible(false)}
        action={{
          label: 'OK',
          onPress: () => {
            setIsMessageVisible(false);
          },
        }}>
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  SocialContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '60%',
    alignSelf: 'center',
    marginBottom: 15,
  },

  loginContainer: {flexDirection: 'row', alignSelf: 'center'},
  inputTextContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#868686',
  },
  loginImage: {
    alignSelf: 'center',
    marginTop: height * 0.05,
    borderRadius: 20,
    width: 300,

    height: height * 0.18,
  },
  forgetText: {color: '#41B87F', marginHorizontal: 10},
  ribbon: {
    // alignSelf: 'flex-end',
    width: 100,
    position: 'absolute',
    right: 40,
    top: Platform.OS === 'ios' ? 25 : 0,
    height: 100,
  },
  loginTouch: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 10,
    width: '50%',
  },
  orText: {
    color: '#868686',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
  },
  createTouch: {
    fontWeight: 'bold',

    fontSize: 20,
    color: '#41B87F',
    textAlign: 'center',
  },
  mainContainer: {
    backgroundColor: '#41B87F',

    flex: 1,
  },
  loginView: {
    borderRadius: 30,
    minHeight: height * 0.6,
    marginHorizontal: width * 0.03,
    marginVertical: height * 0.008,
    paddingVertical: height * 0.035,
  },
  loginText: {
    // marginTop: height * 0.04,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: height * 0.03,
    marginHorizontal: 10,
  },
  loginButton: {
    marginVertical: height * 0.02,
    borderRadius: 25,
    marginHorizontal: 10,
    height: 60,
    justifyContent: 'center',
  },
  inputContainer: {
    marginVertical: height * 0.01,
  },

  inputText: {
    fontSize: 18,
    width: '80%',
  },
  formContainer: {
    marginHorizontal: 20,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 40,
  },
  textContainer: {
    marginTop: height * 0.1,

    alignItems: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textDecorationStyle: 'dotted',
    fontSize: 48,
  },
});
export {Login};
