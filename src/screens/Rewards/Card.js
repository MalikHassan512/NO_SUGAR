import React from 'react';
import {ImageBackground, View, Text, StyleSheet} from 'react-native';
import moment from 'moment';

export default function RewardsCards({data}) {
  return (
    <View style={styles.card}>
      <View>
        <ImageBackground
          source={require('../../../assets/points.png')}
          style={styles.backgroundImages}>
          <Text style={styles.number}> {data?.points} </Text>
          <Text style={styles.points}>
            {data?.point_type === 'Points' ? 'Points' : 'Dollar'}
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.two}>
        <Text style={styles.product}>{data?.obj_type}</Text>
        <Text style={{color: 'black'}}>
          {' '}
          {moment(data?.created_at).format('DD MMM YYYY')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },

  backgroundImages: {
    width: 65,
    height: 60,
  },
  backgroundImage: {
    width: 340,
    height: 230,
  },

  container3: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 0.45,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // padding: 5,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 9,
    borderColor: '#ddd',
    borderWidth: 1,
    // elevation: 8,
    shadowColor: '#ddd',
  },
  two: {
    // paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 10,
    minWidth: 80,
    backgroundColor: 'white',
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
    fontSize: 20,
    color: 'white',
    paddingTop: 10,
    margin: 0,
  },
  points: {
    marginTop: -5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    color: 'white',
  },
});
