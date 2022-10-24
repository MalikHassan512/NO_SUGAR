import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({isLoading, onSubmit, title, borderRadius, height}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={[styles.loginButton, {height: height, borderRadius: borderRadius}]}
      colors={['#41B87F', '#86B841']}>
      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.loginContainer}>
          {isLoading ? <ActivityIndicator color="white" /> : null}
          <Text style={styles.loginTouch}>{title}</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    marginVertical: 5,
    justifyContent: 'center',
  },
  loginContainer: {flexDirection: 'row', alignSelf: 'center'},
  loginTouch: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default Button;
