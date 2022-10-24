import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Garmin from '../../../../assets/garmin.svg';
import Fitbit from '../../../../assets/fitbit.svg';
import Withings from '../../../../assets/withings.svg';
export default function Devices() {
  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            IOS Health
            <Icons size={15} color="red" name="heart" />
          </Text>
        </View>
        <Garmin style={{borderRadius: 20}} width={70} height={70} />

        <Fitbit style={{borderRadius: 20}} width={70} height={70} />

        <Withings style={{borderRadius: 20}} width={70} height={70} />
      </View>
      <Text style={styles.textStyle}>Coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
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
