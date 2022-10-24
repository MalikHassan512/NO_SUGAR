import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Card, IconButton, Snackbar} from 'react-native-paper';

import {Formik} from 'formik';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {url} from '../../constants/url';

let height = Dimensions.get('screen').height;
let width = Dimensions.get('screen').width;

const ResetPassword = () => {
  const navigation = useNavigation();
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const resetpassword = async values => {
    setIsLoading(true);
    try {
      await axios.post(`${url}validate-pass-code/`, values);
      navigation.navigate('Login');
      setIsLoading(false);
    } catch (error) {
      setIsMessageVisible(true);
      setIsLoading(false);
      setMessage(error?.response.data.message);
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
          height={300}
          width={200}
          style={styles.loginImage}
          source={require('../../../assets/nosugarText.png')}
        />
      </View>

      <View>
        <KeyboardAvoidingView behavior="position">
          <Card style={styles.loginView}>
            <Text style={styles.loginText}> Reset Password</Text>
            <Formik
              initialValues={{
                code: '',
                password: '',
                comfirm_password: '',
              }}
              onSubmit={values => resetpassword(values)}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputTextContainer}>
                      <IconButton
                        uppercase={false}
                        color="#868686"
                        icon="numeric"
                      />
                      <TextInput
                        placeholder="Code from your email"
                        keyboardType="numeric"
                        onChangeText={handleChange('code')}
                        onBlur={handleBlur('code')}
                        // multiline
                        placeholderTextColor="gray"
                        value={values.code}
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
                        secureTextEntry={true}
                        placeholderTextColor="gray"
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
                        onChangeText={handleChange('confirm_password')}
                        onBlur={handleBlur('confirm_password')}
                        value={values.confirm_password}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        placeholderTextColor="gray"
                        style={styles.inputText}
                      />
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={{color: '#41B87F', marginHorizontal: 10}}>
                          Remembered password! Login here
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.loginButton}
                    colors={['#41B87F', '#86B841']}>
                    <TouchableOpacity onPress={handleSubmit}>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        {isLoading ? <ActivityIndicator color="white" /> : null}
                        <Text style={styles.loginTouch}>Reset Password</Text>
                      </View>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              )}
            </Formik>
          </Card>
        </KeyboardAvoidingView>
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
    marginTop: 60,
    borderRadius: 20,
    width: 300,

    height: height * 0.2,
  },
  forgetText: {color: '#41B87F', marginHorizontal: 10},
  ribbon: {
    // alignSelf: 'flex-end',
    width: 100,
    position: 'absolute',
    right: 40,
    top: Platform.OS === 'ios' ? 15 : 0,
    height: 100,
  },
  loginTouch: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    marginHorizontal: 10,
  },
  orText: {
    color: '#868686',
    textAlign: 'center',
    fontSize: 22,
  },
  createTouch: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  mainContainer: {
    backgroundColor: '#41B87F',

    flex: 1,
  },
  loginView: {
    borderRadius: 30,
    minHeight: height * 0.68,
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.035,
    paddingVertical: height * 0.035,
  },
  loginText: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 10,
  },
  loginButton: {
    marginVertical: 5,
    borderRadius: 25,
    marginHorizontal: 10,
    height: 60,
    justifyContent: 'center',
  },
  inputContainer: {
    marginVertical: 15,
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
    // marginHorizontal: width * 0.13,
    marginTop: 20,
    // alignContent: 'center',
    alignItems: 'center',
    // marginTop: height * 0.07,
  },
  titleText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textDecorationStyle: 'dotted',
    fontSize: 48,
    // fontStyle: 'italic',
  },
});
export {ResetPassword};
