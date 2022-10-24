import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ProgressBar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';

const Rewards = () => {
  const navigation = useNavigation();
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.rewardContainer}
        colors={['#41B87F', '#86B841']}>
        {/* <Card style={{height: 50}}></Card> */}
        <View style={styles.textContainer}>
          <Text style={styles.textRewards}>Your Rewards</Text>
          <Text style={{color: 'white'}}>Last 7 Days</Text>
        </View>
        <View style={styles.numberContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textNumber}>275</Text>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Points</Text>
          </View>

          <TouchableOpacity style={styles.detailsButton}>
            <Text
              style={[styles.textRewards, {color: 'black'}]}
              onPress={() => navigation.navigate('My Reward')}>
              Details
            </Text>
          </TouchableOpacity>
        </View>
        <ProgressBar style={styles.progressBar} progress={0.7} color="white" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  rewardContainer: {
    borderRadius: 20,
    marginHorizontal: 10,
    height: 130,
    marginTop: 10,
    marginBottom: 30,
  },
  textContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'flex-end',
  },
  numberContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  textRewards: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  textNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 5,
  },
  detailsButton: {
    borderRadius: 25,
    height: 30,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
  },
  progressBar: {
    marginHorizontal: 10,
    marginTop: 10,
  },
});

export default Rewards;
