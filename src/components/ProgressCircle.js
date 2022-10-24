import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
/**
 * Override styles that get passed from props
 **/
const propStyle = percent => {
  const base_degrees = -135;
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{rotateZ: `${rotateBy}deg`}],
  };
};

const CircularProgress = ({percent}) => {
  let stylesFromProps = propStyle(percent);
  return (
    <View style={styles.container}>
      <View style={[styles.progressLayer, stylesFromProps]}></View>
      <View style={styles.offsetLayer}>
        <Text> 4:00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderWidth: 15,
    borderRadius: 75,
    borderColor: '#83cd9d',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  progressLayer: {
    width: 150,
    height: 150,
    borderWidth: 15,
    borderRadius: 75,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'white',
    borderTopColor: 'white',
    transform: [{rotateZ: '-135deg'}],
  },
  offsetLayer: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderWidth: 15,
    borderRadius: 75,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#83cd9d',
    borderTopColor: '#83cd9d',
    transform: [{rotateZ: '-135deg'}],
  },
});

export default CircularProgress;
