import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

export default function RewardCard() {
  return (
    <View style={styles.card}>
      <View>
        <ImageBackground
          source={require('../../../../assets/points.png')}
          style={styles.backgroundImages}>
          <Text style={styles.number}> 14 </Text>
          <Text style={styles.points}> Points</Text>
        </ImageBackground>
      </View>
      <View style={styles.two}>
        <Text style={styles.product}> Product purchase</Text>
        <Text style={{color: 'black'}}> 12 Jan 2020</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImages: {
    marginTop: 1,
    width: 87,
    height: 87,
  },

  two: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    minWidth: 80,
    flex: 1,
  },

  product: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  number: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
    color: 'white',
    paddingTop: 10,
  },

  points: {
    marginTop: -5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    color: 'white',
  },

  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 25,
    borderColor: '#ddd',
    elevation: 8,
  },
});
