import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Coming() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textStyle}>Coming Soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: '#41B87F',
    fontWeight: '600',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});
